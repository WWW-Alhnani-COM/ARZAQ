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
      {/* ✅ عرض إعلانات الهيرو - بنر احترافي متجاوب */}
      {heroAds.length > 0 && (
        <div className="relative w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-2 md:py-3 lg:py-4">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {heroAds.map((ad) => (
                <a
                  key={ad.id}
                  href={ad.targetUrl || ad.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* صورة البنر */}
                  {ad.imageUrl ? (
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' /* نسبة 16:9 */ }}>
                      <img 
                        src={ad.imageUrl} 
                        alt={ad.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* طبقة شفافة فوق الصورة للنص */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* نص الإعلان فوق الصورة */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                        <h3 className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg line-clamp-2 drop-shadow-lg">
                          {ad.title}
                        </h3>
                        <span className="inline-block mt-1 text-white/80 text-[10px] sm:text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                          اضغط للمزيد ←
                        </span>
                      </div>
                    </div>
                  ) : (
                    // إذا لم توجد صورة - عرض نصي
                    <div className="relative w-full bg-gradient-to-br from-teal-600 to-orange-600" style={{ paddingBottom: '56.25%' }}>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                        <span className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                          {ad.title}
                        </span>
                        <span className="text-white/80 text-[10px] sm:text-xs mt-1">
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

      {/* ✅ عرض إعلانات الفوتر - بنر احترافي متجاوب */}
      {footerAds.length > 0 && (
        <div className="relative w-full bg-gray-100 py-2 sm:py-3 md:py-4 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
              {footerAds.map((ad) => (
                <a
                  key={ad.id}
                  href={ad.targetUrl || ad.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.05]"
                >
                  {ad.imageUrl ? (
                    <div className="relative w-full" style={{ paddingBottom: '75%' /* نسبة 4:3 */ }}>
                      <img 
                        src={ad.imageUrl} 
                        alt={ad.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2">
                        <p className="text-white font-medium text-[8px] sm:text-xs line-clamp-1 drop-shadow-lg">
                          {ad.title}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full bg-gradient-to-br from-teal-500 to-orange-500" style={{ paddingBottom: '75%' }}>
                      <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
                        <span className="text-white font-bold text-[8px] sm:text-xs line-clamp-2">
                          {ad.title}
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
