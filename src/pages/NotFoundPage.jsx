import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-28 text-center">
      <div className="font-display text-5xl font-extrabold mb-4" style={{ color: "var(--teal-900)" }}>404</div>
      <p className="text-gray-500 mb-6">الصفحة التي تبحث عنها غير موجودة.</p>
      <Link to="/" className="btn-primary rounded-xl px-6 py-3 font-bold text-sm inline-block">العودة للرئيسية</Link>
    </div>
  );
}
