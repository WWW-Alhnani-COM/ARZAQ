// Upload images through the existing Render service; Vercel Blob stores the public file.
const IMAGE_UPLOAD_PROXY_URL =
  import.meta.env.VITE_IMAGE_UPLOAD_PROXY_URL ||
  "https://arzaq-imgbb-proxy.onrender.com/upload";

export async function uploadAdImageToVercelBlob(file) {
  if (!file || !file.type?.startsWith("image/")) {
    throw new Error("يرجى اختيار ملف صورة صالح.");
  }
  if (file.size > 32 * 1024 * 1024) {
    throw new Error("حجم الصورة كبير جداً. الحد الأقصى 32 ميجابايت.");
  }

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("تعذرت قراءة ملف الصورة."));
    reader.readAsDataURL(file);
  });

  let response;
  try {
    response = await fetch(IMAGE_UPLOAD_PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: dataUrl,
        mimeType: file.type,
        fileName: file.name,
      }),
    });
  } catch (error) {
    console.error("ARZAQ Vercel Blob proxy request failed:", error);
    throw new Error("تعذر الاتصال بخادم رفع الصور على Render. حاول مرة أخرى.");
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error(`استجابة غير مفهومة من خادم الرفع (HTTP ${response.status}).`);
  }

  if (!response.ok || !result?.success || !result?.data?.url) {
    const message = typeof result?.error === "string"
      ? result.error
      : result?.error?.message;
    throw new Error(message || `فشل رفع الصورة (HTTP ${response.status}).`);
  }

  return result.data.url;
}

// Removing an image from an ad only clears its saved URL; Blob cleanup is separate.
export async function deleteImageFromVercelBlob(imageUrl) {
  console.info("لم يتم حذف ملف Blob من المخزن:", imageUrl);
  return true;
}
