// src/services/imageUploadService.js

// ✅ الـ API Key الخاص بك من ImgBB
const IMGBB_API_KEY = 'd87626f06546fb03a2bfb61cdb55657a';

/**
 * رفع صورة إلى ImgBB
 * @param {File} file - ملف الصورة
 * @returns {Promise<string>} - رابط الصورة
 */
export async function uploadImageToImgBB(file) {
  // التحقق من حجم الملف (حد أقصى 32MB لـ ImgBB)
  if (file.size > 32 * 1024 * 1024) {
    throw new Error('حجم الصورة كبير جداً. الحد الأقصى 32 ميجابايت');
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error?.message || 'فشل رفع الصورة');
    }

    // إرجاع رابط الصورة المباشر
    return data.data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * حذف الصورة (ImgBB لا يدعم الحذف عبر API)
 */
export async function deleteImageFromImgBB(imageUrl) {
  // ImgBB لا يوفر API للحذف، الصور تبقى مخزنة
  console.log('ℹ️ ImgBB لا يدعم حذف الصور عبر API');
  return true;
}
