import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function CitiesPage() {
  const { jobs = [], cities = [], loading } = useData();
  const publishedJobs = jobs.filter((job) => job.status === "published");

  return (
    <div className="page-container mx-auto max-w-6xl px-4 py-10 sm:py-12 md:px-8 md:py-14">
      <header className="mb-7 sm:mb-8">
        <p className="mb-2 text-xs font-bold tracking-wide" style={{ color: "var(--teal)" }}>فرص قريبة منك</p>
        <h1 className="font-display text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--teal-900)" }}>الوظائف حسب المدينة</h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">اختر المدينة لمشاهدة الفرص المتاحة فيها.</p>
      </header>
      {loading ? (
        <div className="page-state" role="status"><span className="state-spinner" aria-hidden="true" /> جاري تحميل المدن...</div>
      ) : cities.length ? (
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {cities.map((city) => {
            const count = publishedJobs.filter((job) => job.city === city.name).length;
            return (
              <Link key={city.id || city.name} to={`/jobs?city=${encodeURIComponent(city.name)}`} className="tick-mark card rounded-2xl p-5 text-right transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700">
                <div className="mb-2 font-display font-bold" style={{ color: "var(--teal-900)" }}>{city.name}</div>
                <div className="text-sm text-gray-500">{count} وظيفة منشورة</div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="page-state"><strong>لا توجد مدن مضافة حاليًا</strong><span>ستظهر المدن هنا عند توفر الوظائف.</span><Link className="btn-primary mt-2 rounded-xl px-5 py-3 text-sm font-bold" to="/jobs">تصفح الوظائف</Link></div>
      )}
    </div>
  );
}
