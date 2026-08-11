import { useState } from "react";

export default function OrgFormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial || { name: "", logo: "🏢", description: "", website: "" });
  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));
  function submit(e) { e.preventDefault(); if (!form.name.trim()) return; onSave(form); }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-md rounded-2xl p-6 fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg" style={{ color: "var(--teal-900)" }}>{initial ? "تعديل الجهة" : "إضافة جهة جديدة"}</h3>
          <button onClick={onClose} className="text-gray-400 text-xl leading-none">×</button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">اسم الجهة</label><input required value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">رمز/شعار (نص أو إيموجي — في الإنتاج: رابط من Firebase Storage)</label><input value={form.logo} onChange={(e) => set("logo", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">الوصف</label><textarea rows="3" value={form.description} onChange={(e) => set("description", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"></textarea></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">الموقع الإلكتروني (اختياري)</label><input value={form.website} onChange={(e) => set("website", e.target.value)} dir="ltr" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-left" /></div>
          <div className="flex gap-3 pt-1"><button type="submit" className="btn-primary rounded-xl px-6 py-2.5 font-bold text-sm">حفظ</button><button type="button" onClick={onClose} className="btn-outline rounded-xl px-6 py-2.5 font-bold text-sm">إلغاء</button></div>
        </form>
      </div>
    </div>
  );
}
