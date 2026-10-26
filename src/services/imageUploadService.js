// src/services/imageUploadService.js

// ImgBB API key used by the existing ARZAQ image uploader.
const IMGBB_API_KEY = "d87626f06546fb03a2bfb61cdb55657a";

/**
 * Upload an image to ImgBB and return its direct URL.
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function uploadImageToImgBB(file) {
  if (!file || !file.type?.startsWith("image/")) {
    throw new Error("يرجى اختيار ملف صورة صالح.");
  }

  if (file.size > 32 * 1024 * 1024) {
    throw new Error("حجم الصورة كبير جداً. الحد الأقصى 32 ميجابايت.");
  }

  const formData = new FormData();
  formData.append("image", file);

  let response;
  try {
    response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
  } catch (error) {
    console.error("ImgBB network request failed:", error);
    throw new Error(
      "تعذر الاتصال بخدمة ImgBB. تحقق من الإنترنت أو جرّب تعطيل مانع الإعلانات/الحماية مؤقتاً ثم أعد المحاولة."
    );
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(
      `أعادت خدمة ImgBB استجابة غير مفهومة (HTTP ${response.status}). حاول لاحقاً.`
    );
  }

  if (!response.ok || !data?.success || !data?.data?.url) {
    const apiMessage = data?.error?.message;
    throw new Error(
      apiMessage || `فشل رفع الصورة إلى ImgBB (HTTP ${response.status}). تحقق من مفتاح API وحاول مجدداً.`
    );
  }

  return data.data.url;
}

/**
 * ImgBB does not provide image deletion through this upload API.
 * This compatibility function does not delete the remote image.
 */
export async function deleteImageFromImgBB(imageUrl) {
  console.info("ImgBB لا يدعم حذف الصورة عبر واجهة الرفع الحالية.", imageUrl);
  return true;
}
