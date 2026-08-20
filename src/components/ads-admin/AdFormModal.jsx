import { useState } from "react";
import { todayISO } from "../../utils/ids";
import { uploadImageToImgBB } from "../../services/imageUploadService";

export default function AdFormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial || { 
    title: "", 
    imageUrl: "", 
    targetUrl: "", 
    active: true, 
    startDate: todayISO(), 
    endDate: "" 
  });
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(initial?.imageUrl || "");

  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  // ✅ دالة رفع الصورة إلى ImgBB
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // التحقق من نوع الملف
    if (!file.type.startsWith('image/')) {
      alert('الرجاء اختيار ملف صورة صالح');
      return;
    }

    // التحقق من حجم الملف
    if (file.size > 32 * 1024 * 1024) {
      alert('حجم الصورة يجب أن يكون أقل من 32 ميجابايت');
      return;
    }

    setUploading(true);
    try {
      // رفع الصورة إلى ImgBB
      const imageUrl = await uploadImageToImgBB(file);
      setForm(prev => ({ ...prev, imageUrl }));
      setPreview(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('حدث خطأ في رفع الصورة: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  // ✅ حذف الصورة (من الواجهة فقط)
  function handleRemoveImage() {
    setForm(prev => ({ ...prev, imageUrl: '' }));
    setPreview('');
  }

  function submit(e) { 
    e.preventDefault(); 
    if (!form.title.trim()) {
      alert('الرجاء إدخال عنوان الإعلان');
      return; 
    }
    if (!form.imageUrl) {
      alert('الرجاء إضافة صورة للإعلان');
      return;
    }
    onSave(form); 
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-md rounded-2xl p-6 fade-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg" style={{ color: "var(--teal-900)" }}>
            {initial ? "تعديل الإعلان" : "إضافة إعلان جديد"}
          </h3>
          <button onClick={onClose} className="text-gray-400 text-xl leading-none">×</button>
        </div>
        
        <form onSubmit={submit} className="space-y-4">
          {/* عنوان الإعلان */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">عنوان الإعلان</label>
            <input 
              required 
              value={form.title} 
              onChange={(e) => set("title", e.target.value)} 
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" 
              placeholder="مثل: عرض خاص 50%"
            />
          </div>

          {/* ✅ رفع الصورة */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">صورة الإعلان</label>
            
            {/* معاينة الصورة */}
            {preview && (
              <div className="relative mb-2">
                <img 
                  src={preview} 
                  alt="معاينة الإعلان" 
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}

            {/* زر رفع الصورة */}
            <div className="flex items-center gap-2">
              <label className={`flex-1 cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
                <div className="border-2 border-dashed border-gray-300 rounded-lg px-4 py-3 text-center hover:border-teal-500 transition">
                  <span className="text-sm text-gray-500">
                    {uploading ? '⏳ جاري الرفع...' : '📤 اضغط لاختيار صورة'}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              الصيغ المدعومة: JPG, PNG, GIF • الحد الأقصى: 32MB
            </p>
            {uploading && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full animate-pulse w-full"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">جاري رفع الصورة إلى السحابة...</p>
              </div>
            )}
          </div>

          {/* رابط الوجهة */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">رابط الوجهة عند النقر</label>
            <input 
              value={form.targetUrl} 
              onChange={(e) => set("targetUrl", e.target.value)} 
              dir="ltr" 
              placeholder="https://example.com" 
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-left" 
            />
          </div>

          {/* التواريخ */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">تاريخ البدء</label>
              <input 
                type="date" 
                value={form.startDate} 
                onChange={(e) => set("startDate", e.target.value)} 
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">تاريخ الانتهاء</label>
              <input 
                type="date" 
                value={form.endDate} 
                onChange={(e) => set("endDate", e.target.value)} 
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" 
              />
            </div>
          </div>

          {/* حالة النشاط */}
          <label className="flex items-center gap-2 text-sm font-medium">
            <input 
              type="checkbox" 
              checked={form.active} 
              onChange={(e) => set("active", e.target.checked)} 
            /> 
            إعلان نشط
          </label>

          {/* أزرار التحكم */}
          <div className="flex gap-3 pt-1">
            <button 
              type="submit" 
              className="btn-primary rounded-xl px-6 py-2.5 font-bold text-sm"
              disabled={uploading}
            >
              {uploading ? '⏳ جاري الرفع...' : '💾 حفظ'}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="btn-outline rounded-xl px-6 py-2.5 font-bold text-sm"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
            }
