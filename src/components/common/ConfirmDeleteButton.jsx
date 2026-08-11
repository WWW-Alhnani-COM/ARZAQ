import { useState } from "react";

export default function ConfirmDeleteButton({ onConfirm, label }) {
  const [confirming, setConfirming] = useState(false);
  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <button onClick={() => { onConfirm(); setConfirming(false); }} className="text-xs font-bold text-red-600">تأكيد</button>
        <button onClick={() => setConfirming(false)} className="text-xs text-gray-400">إلغاء</button>
      </span>
    );
  }
  return (
    <button onClick={() => setConfirming(true)} className="btn-danger text-xs font-semibold px-2.5 py-1.5 rounded-lg">
      {label || "حذف"}
    </button>
  );
}

