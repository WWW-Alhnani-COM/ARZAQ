import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="page-container mx-auto max-w-4xl px-4 py-10 sm:py-12 md:px-8 md:py-16">
      <header className="mb-7 sm:mb-8">
        <p className="mb-2 text-xs font-bold" style={{ color: "var(--teal)" }}>نحن هنا للمساعدة</p>
        <h1 className="font-display text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--teal-900)" }}>تواصل معنا</h1>
        <p className="mt-2 text-sm leading-7 text-gray-500">للاستفسارات أو لأصحاب الشركات الراغبين بنشر وظيفة، تواصل مع فريق أرزاق.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        <a href="https://wa.me/967774218060" target="_blank" rel="noopener noreferrer" className="card flex min-w-0 items-start gap-4 rounded-2xl p-5 transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 sm:p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg" style={{ background: "var(--teal-100)", color: "var(--teal-900)" }} aria-hidden="true">W</span>
          <span className="min-w-0"><strong className="block" style={{ color: "var(--teal-900)" }}>واتساب</strong><span className="mt-1 block break-words text-sm text-gray-500" dir="ltr">+967 774 218 060</span><span className="mt-3 inline-block text-sm font-bold" style={{ color: "var(--orange-600)" }}>ابدأ المحادثة ←</span></span>
        </a>
        <div className="card flex min-w-0 items-start gap-4 rounded-2xl p-5 sm:p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg" style={{ background: "var(--teal-100)", color: "var(--teal-900)" }} aria-hidden="true">@</span>
          <span className="min-w-0"><strong className="block" style={{ color: "var(--teal-900)" }}>البريد الإلكتروني</strong><span className="mt-1 block break-words text-sm text-gray-500">info@arzaq-jobs.com</span><span className="mt-1 block text-xs text-gray-400">للاستفسارات العامة</span></span>
        </div>
      </div>
      <p className="mt-6 rounded-xl border p-4 text-sm leading-7 text-gray-500" style={{ borderColor: "var(--line)", background: "#fff" }}>تُضاف الوظائف من فريق الإدارة فقط. إذا كنت تمثل شركة وترغب في نشر فرصة، يرجى التواصل معنا عبر واتساب.</p>
      <Link to="/jobs" className="mt-5 inline-flex text-sm font-bold underline underline-offset-4" style={{ color: "var(--teal-800)" }}>العودة إلى الوظائف</Link>
    </div>
  );
}
