// src/services/imageUploadService.js
// Upload through ARZAQ's server-side proxy so the browser does not need to resolve api.imgbb.com.
const IMGBB_PROXY_URL = import.meta.env.VITE_IMGBB_PROXY_URL || "https://arzaq-imgbb-proxy.onrender.com/upload";

export async function uploadAdImageToImgBB(file) {
  if (!file || !file.type?.startsWith("image/")) throw new Error("يرجى اختيار ملف صورة صالح.");
  if (file.size > 32 * 1024 * 1024) throw new Error("حجم الصورة كبير جداً. الحد الأقصى 32 ميجابايت.");

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("تعذرت قراءة ملف الصورة."));
    reader.readAsDataURL(file);
  });

  let response;
  try {
    response = await fetch(IMGBB_PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: dataUrl, mimeType: file.type, fileName: file.name }),
    });
  } catch (error) {
    console.error("ARZAQ ImgBB proxy request failed:", error);
    throw new Error("تعذر الاتصال بخادم رفع الصور. تحقق من نشر خدمة ImgBB Proxy.");
  }

  let result;
  try { result = await response.json(); }
  catch { throw new Error(`استجابة غير مفهومة من خادم الرفع (HTTP ${response.status}).`); }

  if (!response.ok || !result?.success || !result?.data?.url) {
    throw new Error(result?.error?.message || result?.error || `فشل رفع الصورة (HTTP ${response.status}).`);
  }
  return result.data.url;
}

// Existing form only clears the URL; remote ImgBB deletion is not implemented.
export async function deleteImageFromImgBB(imageUrl) {
  console.info("لم يتم حذف الصورة من ImgBB:", imageUrl);
  return true;
}
