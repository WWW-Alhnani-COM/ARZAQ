import { useState } from "react";

export default function ConfirmDeleteButton({ onConfirm, label }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <span className="inline-flex flex-wrap items-center gap-2 rounded-lg border border-red-100 bg-red-50 p-1.5" role="group" aria-label="تأكيد الحذف">
        <span className="text-xs font-semibold text-red-700 px-1">حذف نهائي؟</span>
        <button type="button" onClick={() => { onConfirm(); setConfirming(false); }} className="text-xs font-bold rounded-md bg-red-600 text-white px-3 py-2 min-h-9">
          نعم، احذف
        </button>
        <button type="button" onClick={() => setConfirming(false)} className="text-xs font-semibold text-gray-600 rounded-md bg-white border border-gray-200 px-3 py-2 min-h-9">
          إلغاء
        </button>
      </span>
    );
  }

  return (
    <button type="button" onClick={() => setConfirming(true)} className="btn-danger text-xs font-semibold px-3 py-2 min-h-9 rounded-lg" aria-label={label || "حذف"}>
      {label || "حذف"}
    </button>
  );
}
