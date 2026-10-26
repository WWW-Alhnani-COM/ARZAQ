// src/services/imageUploadService.js
// رفع صور الإعلانات إلى Firebase Storage بدل الاعتماد على ImgBB/DNS خارجي.

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";

/**
 * Upload an ad image to Firebase Storage and return its download URL.
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

  const safeName = file.name
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(-100) || "image";
  const filePath = `advertisements/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
  const imageRef = ref(storage, filePath);

  try {
    const snapshot = await uploadBytes(imageRef, file, {
      contentType: file.type,
      customMetadata: { originalName: file.name.slice(0, 200) },
    });
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Firebase Storage upload failed:", error);
    if (error?.code === "storage/unauthorized" || error?.code === "storage/unauthenticated") {
      throw new Error("ليس لديك صلاحية رفع الصور. تحقق من قواعد Firebase Storage ومن تسجيل الدخول بحساب مشرف الإعلانات.");
    }
    if (error?.code === "storage/bucket-not-found" || error?.code === "storage/no-default-bucket") {
      throw new Error("Firebase Storage غير مفعّل للمشروع. فعّله من Firebase Console ثم أعد المحاولة.");
    }
    if (error?.code === "storage/retry-limit-exceeded" || error?.code === "storage/canceled") {
      throw new Error("تعذّر إكمال رفع الصورة بسبب الاتصال. تحقق من الشبكة ثم أعد المحاولة.");
    }
    throw new Error(error?.message || "فشل رفع الصورة إلى Firebase Storage.");
  }
}

/**
 * Compatibility export: image removal in the current form only clears the form field.
 * Existing stored files are not deleted by this function.
 */
export async function deleteImageFromImgBB(imageUrl) {
  console.info("لم يتم حذف ملف Firebase Storage من التخزين:", imageUrl);
  return true;
}
