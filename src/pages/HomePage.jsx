import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import JobCard from "../components/jobs/JobCard";
import SectionHeading from "../components/common/SectionHeading";

const ROLES = ["مطوّر برمجيات", "محاسب أول", "أخصائي تسويق", "مهندس مدني", "معلم/ة"];

function Hero() {
  const navigate = useNavigate();
  const { cities } = useData();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2200);
    return () => clearInterval(t);
  }, []);

  function search() {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (city) params.set("city", city);
    navigate(`/jobs?${params.toString()}`);
  }

  return (
    <section className="brand-grad relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20" style={{ background: "var(--orange)" }}></div>
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-20 pb-24 text-center relative">
        <span className="inline-block text-xs font-semibold tracking-wide text-white/80 border border-white/25 rounded-full px-3 py-1 mb-6">
          بلا تسجيل • التقديم مباشرة عبر واتساب
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          ابحث عن فرصتك القادمة <br className="hidden md:block" />
          <span className="word-rotate inline-block" style={{ color: "var(--orange)" }}>
            <span key={idx}>{ROLES[idx]}</span>
          </span>{" "}
          بانتظارك
        </h1>
        <p className="text-white/75 max-w-xl mx-auto mb-10">اكتشف أحدث الوظائف والفرص المهنية المناسبة لمهاراتك وخبراتك.</p>
        <div className="bg-white rounded-2xl p-2.5 shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="المسمى الوظيفي أو المهارة"
            className="flex-1 px-4 py-3 rounded-xl text-sm text-gray-800 focus:outline-none"
          />
          <select value={city} onChange={(e) => setCity(e.target.value)} className="px-4 py-3 rounded-xl text-sm text-gray-600 border md:border-0 border-gray-200">
            <option value="">كل المدن</option>
            {cities && cities.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
          <button onClick={search} className="btn-primary rounded-xl px-6 py-3 font-bold text-sm whitespace-nowrap">
            بحث عن الوظائف
          </button>
        </div>
      </div>
    </section>
  );
}

// ✅ دالة مساعدة لجلب الإعلانات النشطة
function getActiveAds(ads, placements, page, position) {
  if (!ads || !placements) return [];
  
  return placements
    .filter((p) => p.page === page && p.position === position)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0))
    .map((p) => ads.find((a) => a.id === p.adId && a.active === true))
    .filter(Boolean);
}

export default function HomePage() {
  const { jobs, categories, ads, placements, loading } = useData();
  const navigate = useNavigate();
  
  // ✅ استخدام الأسماء الإنجليزية (المطابقة لـ Firebase)
  const heroAds = getActiveAds(ads, placements, "home", "hero");
  const footerAds = getActiveAds(ads, placements, "home", "footer");
  
  const published = jobs ? jobs.filter((j) => j.status === "published") : [];
  const featured = published.filter((j) => j.featured);
  const latest = [...published]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 6);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">جاري التحميل...</div>;
  }

  return (
    <div>
      {/* ✅ عرض إعلانات الهيرو - بنر 970×250 */}
      {heroAds.length > 0 && (
        <div className="relative w-full bg-gray-100 py-2 md:py-3">
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            {/* بنر أفقي 970×250 */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {heroAds.map((ad) => (
                <a
                  key={ad.id}
                  href={ad.targetUrl || ad.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group block w-full md:w-[970px] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]"
                  style={{ aspectRatio: '970/250' }}
                >
                  {ad.imageUrl ? (
                    <>
                      <img 
                        src={ad.imageUrl} 
                        alt={ad.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* طبقة شفافة مع نص البنر */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent">
                        <div className="flex flex-col items-start justify-center h-full px-4 sm:px-6 md:px-8 lg:px-12">
                          <h3 className="text-white font-bold text-base sm:text-lg md:text-2xl lg:text-3xl drop-shadow-lg line-clamp-2 max-w-[70%]">
                            {ad.title}
                          </h3>
                          <span className="mt-2 inline-flex items-center gap-2 text-white/90 text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full hover:bg-white/30 transition">
                            اضغط للمزيد
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    // إذا لم توجد صورة
                    <div className="w-full h-full bg-gradient-to-r from-teal-600 to-orange-600 flex items-center justify-center p-4">
                      <div className="text-center">
                        <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                          {ad.title}
                        </span>
                        <span className="block text-white/80 text-sm sm:text-base mt-2">
                          اضغط للمزيد ←
                        </span>
                      </div>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <Hero />

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <SectionHeading
          eyebrow="فرص منتقاة"
          title="الوظائف المميزة"
          action={<button onClick={() => navigate("/jobs")} className="text-sm font-semibold" style={{ color: "var(--teal)" }}>عرض الكل ←</button>}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((j) => <JobCard key={j.id} job={j} />)}
        </div>
      </section>

      <section className="py-16" style={{ background: "var(--teal-100)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            eyebrow="جديدة كل يوم"
            title="أحدث الوظائف"
            action={<button onClick={() => navigate("/jobs")} className="text-sm font-semibold" style={{ color: "var(--teal)" }}>عرض الكل ←</button>}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.map((j) => <JobCard key={j.id} job={j} />)}
          </div>
        </div>
      </section>

      {/* ✅ عرض إعلانات الفوتر - بنر صغير */}
      {footerAds.length > 0 && (
        <div className="relative w-full bg-gray-50 py-2 sm:py-3 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {footerAds.map((ad) => (
                <a
                  key={ad.id}
                  href={ad.targetUrl || ad.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  style={{ width: '234px', height: '60px' }}
                >
                  {ad.imageUrl ? (
                    <>
                      <img 
                        src={ad.imageUrl} 
                        alt={ad.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
                        <div className="flex items-center h-full px-3">
                          <p className="text-white font-bold text-xs sm:text-sm line-clamp-1 drop-shadow-lg">
                            {ad.title}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-teal-500 to-orange-500 flex items-center justify-center px-3">
                      <span className="text-white font-bold text-xs sm:text-sm text-center line-clamp-1">
                        {ad.title}
                      </span>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-16 text-center">
        <h2 className="font-display text-2xl font-extrabold mb-3" style={{ color: "var(--teal-900)" }}>استكشف حسب التصنيف</h2>
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {categories && categories.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate(`/jobs?category=${encodeURIComponent(c.name)}`)}
              className="card rounded-full px-4 py-2 text-sm font-medium hover:shadow-md transition"
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
