import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import JobCard from "../components/jobs/JobCard";
import SectionHeading from "../components/common/SectionHeading";
import { InteractiveGridPattern } from "../components/ui/interactive-grid-pattern";

const ROLES = ["مطوّر برمجيات", "محاسب أول", "أخصائي تسويق", "مهندس مدني", "معلم/ة"];

function Hero({ heroAds = [] }) {
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
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <InteractiveGridPattern
          width={36}
          height={36}
          squares={[32, 16]}
          className="inset-x-0 inset-y-[-20%] h-[140%] w-full border-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,white_0%,transparent_78%)]"
          squaresClassName="stroke-white/20"
        />
      </div>
      {heroAds.length > 0 && (
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-4 sm:pt-6 md:px-8" aria-label="إعلانات مميزة">
          <div className="flex flex-col gap-3 sm:gap-4">
            {heroAds.map((ad) => <AdBanner key={ad.id} ad={ad} />)}
          </div>
        </div>
      )}
      <div className={`relative z-10 mx-auto max-w-5xl px-4 pb-16 text-center sm:pb-20 md:px-8 md:pb-24 ${heroAds.length ? "pt-8 sm:pt-10 md:pt-12" : "pt-16 sm:pt-16 md:pt-20"}`}>
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
        "group relative isolate block w-full overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-l from-teal-800 to-orange-500 shadow-[0_12px_35px_rgba(18,46,51,0.12)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(18,46,51,0.2)]",
        "aspect-[16/7] min-h-[160px] sm:aspect-[16/5] sm:min-h-[200px] md:aspect-[970/250] md:min-h-[230px]",
        href ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-4" : "cursor-default",
      ].join(" ")}
    >
      {ad.imageUrl && !imageFailed && (
        <img
          src={ad.imageUrl}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          loading={isHero ? "eager" : "lazy"}
          onError={() => setImageFailed(true)}
        />
      )}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 ${isHero
          ? "bg-gradient-to-l from-[#10282dcc] via-[#10282d80] to-[#10282d08]"
          : "bg-gradient-to-l from-[#10282dcc] via-[#10282d70] to-[#10282d18]"}`}
      />
      <div className="flex h-full w-full items-center justify-start p-4 text-right sm:p-6 md:p-9">
        <div className="w-full max-w-[88%] sm:max-w-[75%] md:max-w-[68%]">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/20 px-2.5 py-1 text-[10px] font-bold text-white/90 backdrop-blur-md sm:mb-3 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" aria-hidden="true" />
            إعلان مميز
          </span>
          <p className="line-clamp-2 break-words text-base font-extrabold leading-snug text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.35)] sm:text-2xl md:text-3xl">
            {ad.title || "إعلان"}
          </p>
          {href && (
            <span className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white px-4 py-2 text-xs font-extrabold text-[#173f46] shadow-lg transition group-hover:bg-[var(--orange)] group-hover:text-white sm:mt-4 sm:px-5 sm:py-2.5 sm:text-sm">
              اكتشف المزيد
              <span aria-hidden="true">←</span>
            </span>
          )}
        </div>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-1 w-1/3 bg-[var(--orange)] transition-all duration-500 group-hover:w-full" />
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
      <Hero heroAds={heroAds} />

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
        <section aria-label="إعلانات" className="w-full border-t border-[var(--line)] px-4 py-6 md:py-8" style={{ background: "var(--sand)" }}>
          <div className="mx-auto flex w-full max-w-7xl flex-col items-stretch gap-4 md:gap-5">
            {footerAds.map((ad) => <AdBanner key={ad.id} ad={ad} size="footer" />)}
          </div>
        </section>
      )}
    </div>
  );
}
