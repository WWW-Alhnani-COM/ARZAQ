import { useState } from "react";
import { AD_PAGES, AD_POSITIONS } from "../../utils/constants";

export default function PlacementFormModal({ onClose, onSave, ads }) {
  const [form, setForm] = useState({ adId: ads[0]?.id || "", page: AD_PAGES[0], position: AD_POSITIONS[0], priority: 1 });
  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));
  function submit(e) { e.preventDefault(); if (!form.adId) return; onSave(form); }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-md rounded-2xl p-6 fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg" style={{ color: "var(--teal-900)" }}>إضافة موضع إعلاني</h3>
          <button onClick={onClose} className="text-gray-400 text-xl leading-none">×</button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">الإعلان</label><select value={form.adId} onChange={(e) => set("adId", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">{ads.map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}</select></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">الصفحة</label><select value={form.page} onChange={(e) => set("page", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">{AD_PAGES.map((p) => <option key={p}>{p}</option>)}</select></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">الموضع</label><select value={form.position} onChange={(e) => set("position", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">{AD_POSITIONS.map((p) => <option key={p}>{p}</option>)}</select></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">الأولوية</label><input type="number" min="1" value={form.priority} onChange={(e) => set("priority", Number(e.target.value))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
          <div className="flex gap-3 pt-1"><button type="submit" className="btn-primary rounded-xl px-6 py-2.5 font-bold text-sm">حفظ</button><button type="button" onClick={onClose} className="btn-outline rounded-xl px-6 py-2.5 font-bold text-sm">إلغاء</button></div>
        </form>
      </div>
    </div>
  );
}
