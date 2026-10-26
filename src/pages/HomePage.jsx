import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import JobCard from "../components/jobs/JobCard";
import SectionHeading from "../components/common/SectionHeading";

const ROLES = ["مطوّر برمجيات", "محاسب أول", "أخصائي تسويق", "مهندس مدني", "معلم/ة"];

function Hero() {
  const navigate = useNavigate();
  const { cities = [] } = useData();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((current) => (current + 1) % ROLES.length), 2600);
    return () => clearInterval(timer);
  }, []);

  function search(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (city) params.set("city", city);
    const suffix = params.toString();
    navigate(suffix ? `/jobs?${suffix}` : "/jobs");
  }

  return (
    <section className="brand-grad relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-20 md:h-96 md:w-96" style={{ background: "var(--orange)" }} />
      <div aria-hidden="true" className="absolute -bottom-32 -right-20 h-64 w-64 rounded-full border border-white/10 md:h-80 md:w-80" />
      <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-16 text-center sm:pb-20 md:px-8 md:pt-20 md:pb-24">
        <span className="mb-6 inline-flex items-center rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-white/85">
          بلا تسجيل • التقديم مباشرة عبر واتساب
        </span>
        <h1 className="mb-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          ابحث عن فرصتك القادمة
          <span className="mt-2 block" style={{ color: "var(--orange)" }}>
            <span key={idx} className="word-rotate inline-block">{ROLES[idx]}</span> بانتظارك
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
          اكتشف أحدث الوظائف والفرص المهنية المناسبة لمهاراتك وخبراتك.
        </p>
        <form onSubmit={search} role="search" className="mx-auto flex max-w-3xl flex-col gap-2 rounded-2xl bg-white p-2.5 shadow-2xl md:flex-row">
          <label className="sr-only" htmlFor="home-job-query">المسمى الوظيفي أو المهارة</label>
          <input
            id="home-job-query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="المسمى الوظيفي أو المهارة"
            className="min-w-0 flex-1 rounded-xl px-4 py-3 text-sm text-gray-800"
          />
          <label className="sr-only" htmlFor="home-job-city">المدينة</label>
          <select
            id="home-job-city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 md:max-w-48 md:border-0"
          >
            <option value="">كل المدن</option>
            {cities.map((item) => (
              <option key={item.id || item.name} value={item.name}>{item.name}</option>
            ))}
          </select>
          <button type="submit" className="btn-primary rounded-xl px-6 py-3 text-sm font-bold whitespace-nowrap">
            بحث عن الوظائف
          </button>
        </form>
        <p className="mt-4 text-xs text-white/60">ابحث بالمسمى أو المهارة، ويمكنك تحديد المدينة أيضًا.</p>
      </div>
    </section>
  );
}

function getActiveAds(ads, placements, page, position) {
  if (!Array.isArray(ads) || !Array.isArray(placements)) return [];
  return placements
    .filter((placement) => placement.page === page && placement.position === position)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0))
    .map((placement) => ads.find((ad) => ad.id === placement.adId && ad.active === true))
    .filter(Boolean);
}

function AdBanner({ ad, size = "hero" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const isHero = size === "hero";
  const href = ad.targetUrl || ad.link;

  return (
    <a
      href={href || undefined}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      aria-label={href ? `عرض الإعلان: ${ad.title}` : undefined}
      className={[
        "group relative block w-full overflow-hidden bg-gradient-to-l from-teal-700 to-orange-500 shadow-sm transition hover:shadow-lg",
        isHero
          ? "rounded-none max-w-none"
          : "min-h-0 max-w-none rounded-none",
        href ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2" : "cursor-default",
      ].join(" ")}
      style={{ aspectRatio: "970 / 250" }}
    >
      {ad.imageUrl && !imageFailed && (
        <img
          src={ad.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}
      <div className={`absolute inset-0 ${isHero ? "bg-gradient-to-r from-black/75 via-black/35 to-transparent" : "bg-gradient-to-l from-black/70 via-black/35 to-black/10"}`} />
      <div className={`relative flex h-full w-full items-center justify-start text-right ${isHero ? "p-4 sm:p-6 md:p-10" : "p-4 sm:p-6 md:p-10"}`}>
        <div className={isHero ? "max-w-[80%]" : "w-full max-w-3xl"}>
          <p className={`${isHero ? "text-base sm:text-xl md:text-3xl" : "text-sm sm:text-lg md:text-2xl"} line-clamp-2 break-words font-bold leading-snug text-white drop-shadow`}>
            {ad.title || "إعلان"}
          </p>
          {href && (
            <span className="mt-2 inline-flex rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm sm:mt-3 sm:text-sm">
              اكتشف المزيد
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

function EmptySection({ children }) {
  return (
    <div className="card rounded-2xl border-dashed px-5 py-8 text-center text-sm leading-6 text-gray-500">
      {children}
    </div>
  );
}

export default function HomePage() {
  const { jobs = [], categories = [], ads = [], placements = [], loading } = useData();
  const navigate = useNavigate();

  const heroAds = getActiveAds(ads, placements, "home", "hero");
  const footerAds = getActiveAds(ads, placements, "home", "footer");
  const published = jobs.filter((job) => job.status === "published");
  const featured = published.filter((job) => job.featured).slice(0, 6);
  const latest = [...published]
    .sort((a, b) => new Date(b.publishDate || 0) - new Date(a.publishDate || 0))
    .slice(0, 6);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center" role="status" aria-live="polite">
        <span className="inline-flex items-center gap-3 text-sm text-gray-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-teal-700" aria-hidden="true" />
          جاري تحميل الوظائف...
        </span>
      </div>
    );
  }

  return (
    <div>
      {heroAds.length > 0 && (
        <section aria-label="إعلانات مميزة" className="m-0 w-full border-b border-gray-100 bg-gray-50 p-0">
          <div className="flex w-full flex-col items-stretch justify-center gap-0">
            {heroAds.map((ad) => <AdBanner key={ad.id} ad={ad} />)}
          </div>
        </section>
      )}

      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <SectionHeading
          eyebrow="فرص منتقاة"
          title="الوظائف المميزة"
          action={<button type="button" onClick={() => navigate("/jobs")} className="text-sm font-semibold" style={{ color: "var(--teal)" }}>عرض كل الوظائف ←</button>}
        />
        {featured.length ? (
          <div className="grid items-stretch gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {featured.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        ) : (
          <EmptySection>لا توجد وظائف مميزة حاليًا. استعرض جميع الوظائف للاطلاع على الفرص المتاحة.</EmptySection>
        )}
      </section>

      <section className="py-12 md:py-16" style={{ background: "var(--teal-100)" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="أُضيفت حديثًا"
            title="أحدث الوظائف"
            action={<button type="button" onClick={() => navigate("/jobs")} className="text-sm font-semibold" style={{ color: "var(--teal)" }}>عرض الكل ←</button>}
          />
          {latest.length ? (
            <div className="grid items-stretch gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {latest.map((job) => <JobCard key={job.id} job={job} />)}
            </div>
          ) : (
            <EmptySection>لا توجد وظائف منشورة حاليًا. يرجى العودة لاحقًا للاطلاع على الفرص الجديدة.</EmptySection>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 text-center md:px-8 md:py-16">
        <h2 className="font-display text-2xl font-extrabold" style={{ color: "var(--teal-900)" }}>استكشف حسب التصنيف</h2>
        <p className="mt-2 text-sm text-gray-500">اختر المجال الذي يناسب خبرتك للوصول إلى الوظائف المرتبطة به.</p>
        {categories.length ? (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id || category.name}
                type="button"
                onClick={() => navigate(`/jobs?category=${encodeURIComponent(category.name)}`)}
                className="card rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
              >
                {category.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-6"><EmptySection>ستظهر التصنيفات هنا عند توفرها.</EmptySection></div>
        )}
      </section>

      {footerAds.length > 0 && (
        <section aria-label="إعلانات" className="m-0 w-full border-0 bg-white p-0">
          <div className="flex w-full flex-col items-stretch justify-center gap-0">
            {footerAds.map((ad) => <AdBanner key={ad.id} ad={ad} size="footer" />)}
          </div>
        </section>
      )}
    </div>
  );
}
