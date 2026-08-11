// نافذة التقديم — القلب النابض للمنصة: اسم + هاتف، ثم فتح واتساب مباشرة.
// لا يوجد أي تسجيل أو حفظ لهذه البيانات كحساب مستخدم في أي مكان.
import { useEffect, useRef, useState } from "react";
import { buildWhatsappLink } from "../../utils/whatsapp";
import { logWhatsappClick } from "../../firebase/analyticsService";

export default function ApplyModal({ job, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!name.trim()) errs.name = "الاسم مطلوب";
    if (!phone.trim()) errs.phone = "رقم الهاتف مطلوب";
    else if (!/^[0-9+\s-]{7,15}$/.test(phone.trim())) errs.phone = "رقم الهاتف غير صحيح";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    logWhatsappClick(job.id);
    const link = buildWhatsappLink(job, { name: name.trim(), phone: phone.trim() });
    window.open(link, "_blank");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" onClick={onClose}>
      <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6 fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-display font-bold text-lg" style={{ color: "var(--teal-900)" }}>التقديم عبر واتساب</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl leading-none">×</button>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          للوظيفة: <span className="font-semibold text-gray-700">{job.jobTitle}</span> — لا حاجة لإنشاء حساب.
        </p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">اسم المتقدم</label>
            <input
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك الكامل"
              className={"w-full rounded-xl border px-4 py-2.5 text-sm " + (errors.name ? "border-red-400" : "border-gray-200")}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">رقم الهاتف</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="أدخل رقم هاتفك"
              dir="ltr"
              className={"w-full rounded-xl border px-4 py-2.5 text-sm text-right " + (errors.phone ? "border-red-400" : "border-gray-200")}
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>
          <button type="submit" className="btn-primary w-full rounded-xl py-3 font-bold text-sm flex items-center justify-center gap-2">
            <span>تقديم عبر واتساب</span>
            <span>💬</span>
          </button>
          <p className="text-[11px] text-gray-400 text-center">
            سيتم فتح واتساب برسالة جاهزة تحتوي بيانات الوظيفة وبياناتك لإرسالها إلى فريق التوظيف.
          </p>
        </form>
      </div>
    </div>
  );
}

