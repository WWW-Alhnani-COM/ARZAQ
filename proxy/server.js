// ARZAQ image upload proxy — hosted on Render, stores public images in Vercel Blob.
import http from "node:http";
import { put } from "@vercel/blob";

const PORT = Number(process.env.PORT || 10000);
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const ALLOWED_ORIGINS = new Set([
  "https://arzaq-rj6i.onrender.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);
const MAX_IMAGE_BYTES = 32 * 1024 * 1024;
const MAX_REQUEST_BYTES = 45 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

// Basic per-process protection against accidental/repeated upload abuse.
const uploadCounts = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const entry = uploadCounts.get(ip);
  if (!entry || now - entry.startedAt > 60 * 60 * 1000) {
    uploadCounts.set(ip, { startedAt: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > 20;
}

function send(res, status, body) {
  res.writeHead(status).end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") {
    res.writeHead(204).end();
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    send(res, 200, { ok: true, configured: Boolean(BLOB_TOKEN), storage: "vercel-blob" });
    return;
  }

  if (req.method !== "POST" || req.url !== "/upload") {
    send(res, 404, { error: "Not found" });
    return;
  }

  if (!ALLOWED_ORIGINS.has(origin)) {
    send(res, 403, { error: "Origin not allowed." });
    return;
  }

  if (!BLOB_TOKEN) {
    send(res, 503, { error: "Render is missing BLOB_READ_WRITE_TOKEN for the arzaq-images Vercel Blob store." });
    return;
  }

  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").toString().split(",")[0].trim();
  if (isRateLimited(ip)) {
    send(res, 429, { error: "تم تجاوز عدد مرات رفع الصور المسموح بها مؤقتًا. حاول لاحقًا." });
    return;
  }

  try {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > MAX_REQUEST_BYTES) {
        send(res, 413, { error: "Request too large." });
        return;
      }
      chunks.push(chunk);
    }

    const input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (typeof input.image !== "string" || !input.image) {
      send(res, 400, { error: "Image data is required." });
      return;
    }

    const mimeType = String(input.mimeType || "").toLowerCase();
    if (!ALLOWED_TYPES.has(mimeType)) {
      send(res, 400, { error: "صيغة الصورة غير مدعومة. استخدم JPG أو PNG أو WEBP أو GIF أو AVIF." });
      return;
    }

    const raw = input.image.replace(/^data:[^;]+;base64,/, "");
    const image = Buffer.from(raw, "base64");
    if (!image.length || image.length > MAX_IMAGE_BYTES) {
      send(res, 400, { error: "Image must be less than 32 MB." });
      return;
    }

    // Keep user-provided names safe and store all uploaded ad images in one folder.
    const originalName = String(input.fileName || "image").split(/[\\/]/).pop();
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-100) || "image";
    const pathname = `ads/${Date.now()}-${safeName}`;

    const blob = await put(pathname, image, {
      access: "public",
      addRandomSuffix: true,
      contentType: mimeType,
      token: BLOB_TOKEN,
    });

    send(res, 200, {
      success: true,
      data: { url: blob.url, display_url: blob.url },
    });
  } catch (error) {
    console.error("ARZAQ Vercel Blob upload error:", error);
    if (!res.headersSent) {
      send(res, 502, { error: "تعذر رفع الصورة إلى Vercel Blob. تحقق من إعدادات المخزن والرمز السري في Render." });
    }
  }
});

server.listen(PORT, "0.0.0.0", () => console.log(`ARZAQ Vercel Blob proxy listening on ${PORT}`));
