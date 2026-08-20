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
            {cities.map((c) => (
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
  return placements
    .filter((p) => p.page === page && p.position === position)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0))
    .map((p) => ads.find((a) => a.id === p.adId && a.active === true))
    .filter(Boolean);
}

export default function HomePage() {
  const { jobs, categories, ads, placements, loading } = useData();
  const navigate = useNavigate();
  
  // ✅ جلب إعلانات الهيرو
  const heroAds = getActiveAds(ads, placements, "home", "hero");
  
  const published = jobs.filter((j) => j.status === "published");
  const featured = published.filter((j) => j.featured);
  const latest = [...published]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 6);

  return (
    <div>
      {/* ✅ عرض معلومات التشخيص (سيظهر فقط للمطور) */}
      <div className="bg-gray-900 text-white text-xs p-3 font-mono border-b border-yellow-500">
        <details>
          <summary className="cursor-pointer text-yellow-400 font-bold">🔧 معلومات التشخيص (اضغط للعرض)</summary>
          <div className="mt-2 space-y-1">
            <div>📢 عدد الإعلانات: <span className="text-green-400">{ads.length}</span></div>
            <div>📍 عدد المواضع: <span className="text-green-400">{placements.length}</span></div>
            <div>✅ الإعلانات النشطة: <span className="text-green-400">{ads.filter(a => a.active).length}</span></div>
            <div>🏠 مواضع الصفحة الرئيسية: <span className="text-green-400">{placements.filter(p => p.page === "home").length}</span></div>
            <div>🎯 إعلانات الهيرو: <span className="text-yellow-400 font-bold">{heroAds.length}</span></div>
            
            {heroAds.length === 0 && (
              <div className="text-red-400 mt-2">
                ⚠️ لا توجد إعلانات في الهيرو!
                <div className="text-gray-400 mt-1 text-xs">
                  تأكد من:
                  <ul className="list-disc list-inside mr-4">
                    <li>وجود إعلانات في Firebase</li>
                    <li>الإعلانات مفعلة (active: true)</li>
                    <li>وجود موضع بالصفحة "home" والموضع "hero"</li>
                  </ul>
                </div>
              </div>
            )}
            
            {/* عرض تفاصيل الإعلانات */}
            {ads.length > 0 && (
              <details className="mt-2">
                <summary className="cursor-pointer text-blue-400">📋 عرض جميع الإعلانات</summary>
                <div className="mt-1 space-y-1 text-gray-300">
                  {ads.map(ad => (
                    <div key={ad.id} className="border border-gray-700 p-1 rounded">
                      <span className="text-white">{ad.title}</span>
                      <span className={`mr-2 px-1 rounded ${ad.active ? 'bg-green-600' : 'bg-red-600'}`}>
                        {ad.active ? 'نشط' : 'غير نشط'}
                      </span>
                      <span className="text-gray-500 text-xs">ID: {ad.id}</span>
                    </div>
                  ))}
                </div>
              </details>
            )}
            
            {/* عرض تفاصيل المواضع */}
            {placements.length > 0 && (
              <details className="mt-2">
                <summary className="cursor-pointer text-blue-400">📍 عرض جميع المواضع</summary>
                <div className="mt-1 space-y-1 text-gray-300">
                  {placements.map(p => (
                    <div key={p.id} className="border border-gray-700 p-1 rounded">
                      <span>الصفحة: {p.page}</span>
                      <span className="mr-2">الموضع: {p.position}</span>
                      <span className="mr-2">الأولوية: {p.priority}</span>
                      <span className="text-gray-500 text-xs">adId: {p.adId}</span>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        </details>
      </div>

      {/* ✅ عرض إعلانات الهيرو */}
      {heroAds.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 py-3 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-3">
            {heroAds.map((ad) => (
              <a
                key={ad.id}
                href={ad.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105"
                style={{ backgroundColor: "var(--orange)" }}
              >
                <span>📢</span>
                {ad.title}
                <span>←</span>
              </a>
            ))}
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

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-16 text-center">
        <h2 className="font-display text-2xl font-extrabold mb-3" style={{ color: "var(--teal-900)" }}>استكشف حسب التصنيف</h2>
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {categories.map((c) => (
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
