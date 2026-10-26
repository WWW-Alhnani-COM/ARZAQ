// src/services/imageUploadService.js
// Store advertisement images in the Firebase Storage bucket configured for ARZAQ.
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

/**
 * Upload an image to Firebase Storage and return its public download URL.
 * The signed-in admin must be allowed to write to the /ads path by Storage Rules.
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function uploadImageToFirebaseStorage(file) {
  if (!file || !file.type?.startsWith("image/")) {
    throw new Error("يرجى اختيار ملف صورة صالح.");
  }

  if (file.size > 32 * 1024 * 1024) {
    throw new Error("حجم الصورة كبير جداً. الحد الأقصى 32 ميجابايت.");
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `ads/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
  const imageRef = ref(storage, path);

  try {
    const snapshot = await uploadBytes(imageRef, file, {
      contentType: file.type,
      cacheControl: "public,max-age=31536000",
    });
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Firebase Storage upload failed:", error);

    const messages = {
      "storage/unauthorized": "لا توجد صلاحية لرفع الصور. تحقق من Firebase Storage Rules وحساب المشرف.",
      "storage/unauthenticated": "انتهت جلسة تسجيل الدخول. سجّل الدخول مجدداً ثم حاول.",
      "storage/bucket-not-found": "حاوية Firebase Storage غير موجودة أو لم يتم تفعيل Storage في مشروع Firebase.",
      "storage/quota-exceeded": "تم تجاوز حصة التخزين المتاحة في Firebase.",
      "storage/retry-limit-exceeded": "انتهت مهلة الاتصال أثناء رفع الصورة. تحقق من الإنترنت وحاول مجدداً.",
      "storage/canceled": "تم إلغاء رفع الصورة.",
    };
    throw new Error(messages[error?.code] || `تعذر رفع الصورة إلى Firebase Storage (${error?.code || error?.message || "خطأ غير معروف"}).`);
  }
}

/**
 * Firebase Storage objects are managed in Firebase Console.
 * This function is kept for compatibility with existing imports.
 */
export async function deleteImageFromImgBB(imageUrl) {
  console.info("حذف الصورة من التخزين يحتاج إلى مسار الملف وصلاحيات الحذف في Firebase Storage.", imageUrl);
  return true;
}
