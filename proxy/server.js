// ARZAQ ImgBB proxy — run as a separate Render Web Service.
// Keep IMGBB_API_KEY in Render environment variables; never commit the key.
import http from "node:http";

const PORT = Number(process.env.PORT || 10000);
const API_KEY = process.env.IMGBB_API_KEY;
const ALLOWED_ORIGINS = new Set([
  "https://arzaq-rj6i.onrender.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

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
    res.writeHead(200).end(JSON.stringify({ ok: true, configured: Boolean(API_KEY) }));
    return;
  }
  if (req.method !== "POST" || req.url !== "/upload") {
    res.writeHead(404).end(JSON.stringify({ error: "Not found" }));
    return;
  }
  if (!API_KEY) {
    res.writeHead(503).end(JSON.stringify({ error: "ImgBB proxy is missing its server-side API key." }));
    return;
  }

  try {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 45 * 1024 * 1024) {
        res.writeHead(413).end(JSON.stringify({ error: "Request too large." }));
        return;
      }
      chunks.push(chunk);
    }
    const input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (typeof input.image !== "string" || !input.image) {
      res.writeHead(400).end(JSON.stringify({ error: "Image data is required." }));
      return;
    }
    const raw = input.image.replace(/^data:[^;]+;base64,/, "");
    const image = Buffer.from(raw, "base64");
    if (!image.length || image.length > 32 * 1024 * 1024) {
      res.writeHead(400).end(JSON.stringify({ error: "Image must be less than 32 MB." }));
      return;
    }
    const form = new FormData();
    form.append("image", new Blob([image], { type: input.mimeType || "application/octet-stream" }), input.fileName || "image");
    const upstream = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(API_KEY)}`, {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(60000),
    });
    const payload = await upstream.text();
    res.writeHead(upstream.status).end(payload);
  } catch (error) {
    console.error("ImgBB proxy error:", error);
    if (!res.headersSent) res.writeHead(502).end(JSON.stringify({ error: "Could not reach ImgBB from the server." }));
  }
});

server.listen(PORT, "0.0.0.0", () => console.log(`ARZAQ ImgBB proxy listening on ${PORT}`));
