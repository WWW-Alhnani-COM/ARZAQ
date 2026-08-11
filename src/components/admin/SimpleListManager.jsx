import { useState } from "react";
import ConfirmDeleteButton from "../common/ConfirmDeleteButton";

// إدارة بسيطة (إضافة/حذف) لقوائم مثل التصنيفات والمدن — تُعاد استخدامها
// في أكثر من صفحة إدارية بدل تكرار نفس الجدول.
export default function SimpleListManager({ title, items, onAdd, onDelete, placeholder }) {
  const [value, setValue] = useState("");
  return (
    <div>
      <h2 className="font-display text-xl font-extrabold mb-5" style={{ color: "var(--teal-900)" }}>{title}</h2>
      <div className="card rounded-2xl p-5 mb-5">
        <div className="flex gap-2">
          <input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          <button
            onClick={() => { if (value.trim()) { onAdd(value.trim()); setValue(""); } }}
            className="btn-primary rounded-lg px-4 py-2 text-sm font-bold"
          >
            إضافة
          </button>
        </div>
      </div>
      <div className="card rounded-2xl divide-y" style={{ borderColor: "var(--line)" }}>
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between px-5 py-3">
            <span className="text-sm font-medium text-gray-700">{it.name}</span>
            <ConfirmDeleteButton onConfirm={() => onDelete(it.id)} />
          </div>
        ))}
        {items.length === 0 && <div className="text-center text-gray-400 py-8 text-sm">لا توجد عناصر بعد</div>}
      </div>
    </div>
  );
}
