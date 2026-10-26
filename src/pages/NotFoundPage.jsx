import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="page-container mx-auto flex min-h-[55vh] max-w-3xl items-center justify-center px-4 py-16 text-center sm:py-24">
      <div className="w-full rounded-3xl border bg-white px-6 py-10 sm:px-10 sm:py-14" style={{ borderColor: "var(--line)" }}>
        <p className="font-display text-6xl font-extrabold sm:text-7xl" style={{ color: "var(--teal-900)" }}>404</p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full" style={{ background: "var(--orange)" }} />
        <h1 className="mt-5 font-display text-xl font-extrabold sm:text-2xl" style={{ color: "var(--teal-900)" }}>لم نعثر على هذه الصفحة</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">قد يكون الرابط غير صحيح أو أن الصفحة نُقلت. يمكنك العودة للرئيسية أو استعراض الوظائف المتاحة.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold">الرئيسية</Link>
          <Link to="/jobs" className="btn-outline inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold">استعراض الوظائف</Link>
        </div>
      </div>
    </div>
  );
}
