import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="page-container mx-auto max-w-4xl px-4 py-10 sm:py-12 md:px-8 md:py-16">
      <section className="brand-grad relative overflow-hidden rounded-3xl p-6 text-white sm:p-9 md:p-12">
        <p className="mb-3 text-xs font-bold text-white/70">عن منصة أرزاق</p>
        <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">فرصتك القادمة تبدأ من هنا</h1>
        <p className="mt-4 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">أرزاق (ARZAQ) منصة وظائف عامة تهدف إلى تسهيل وصول الباحثين عن عمل إلى الفرص المهنية المناسبة، دون تعقيدات إنشاء الحسابات أو الملفات الشخصية.</p>
      </section>
      <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
        <article className="card rounded-2xl p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold" style={{ color: "var(--teal-900)" }}>تجربة مباشرة</h2>
          <p className="mt-2 text-sm leading-7 text-gray-600">استعرض الوظائف المنشورة وتفاصيلها، ثم تواصل مع جهة التوظيف عبر طريقة التقديم الموضحة في الإعلان.</p>
        </article>
        <article className="card rounded-2xl p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold" style={{ color: "var(--teal-900)" }}>سهولة الوصول</h2>
          <p className="mt-2 text-sm leading-7 text-gray-600">يمكنك البحث حسب المسمى والمدينة والتصنيف ونمط العمل من الهاتف أو الكمبيوتر.</p>
        </article>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link to="/jobs" className="btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold">استعرض الوظائف</Link>
        <Link to="/contact" className="btn-outline inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold">تواصل معنا</Link>
      </div>
    </div>
  );
}
