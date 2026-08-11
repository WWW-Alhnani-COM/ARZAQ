import { useState } from "react";
import { todayISO } from "../../utils/ids";

export default function AdFormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial || { title: "", imageUrl: "", targetUrl: "", active: true, startDate: todayISO(), endDate: "" });
  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));
  function submit(e) { e.preventDefault(); if (!form.title.trim()) return; onSave(form); }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-md rounded-2xl p-6 fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg" style={{ color: "var(--teal-900)" }}>{initial ? "تعديل الإعلان" : "إضافة إعلان جديد"}</h3>
          <button onClick={onClose} className="text-gray-400 text-xl leading-none">×</button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">عنوان الإعلان</label><input required value={form.title} onChange={(e) => set("title", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">رابط الصورة (Firebase Storage)</label><input value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} dir="ltr" placeholder="https://..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-left" /></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">رابط الوجهة عند النقر</label><input value={form.targetUrl} onChange={(e) => set("targetUrl", e.target.value)} dir="ltr" placeholder="https://..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-left" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">تاريخ البدء</label><input type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
            <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">تاريخ الانتهاء</label><input type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} /> إعلان نشط</label>
          <div className="flex gap-3 pt-1"><button type="submit" className="btn-primary rounded-xl px-6 py-2.5 font-bold text-sm">حفظ</button><button type="button" onClick={onClose} className="btn-outline rounded-xl px-6 py-2.5 font-bold text-sm">إلغاء</button></div>
        </form>
      </div>
    </div>
  );
}

