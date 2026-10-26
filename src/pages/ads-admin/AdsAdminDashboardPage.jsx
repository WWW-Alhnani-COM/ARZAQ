import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

const fmt = (value) => new Intl.NumberFormat("ar").format(value || 0);

export default function AdsAdminDashboardPage() {
  const { ads, placements, loading } = useData();
  const [query, setQuery] = useState("");
  const active = ads.filter((ad) => Boolean(ad.active)).length;
  const inactive = ads.length - active;
  const today = new Date().toISOString().slice(0, 10);
  const current = ads.filter((ad) => ad.active && (!ad.startDate || ad.startDate <= today) && (!ad.endDate || ad.endDate >= today)).length;
  const placementStats = placements.map((placement) => ({ ...placement, count: ads.filter((ad) => ad.placement === placement.id || ad.placementId === placement.id || ad.placement === placement.name || ad.placementName === placement.name).length })).sort((a, b) => b.count - a.count).slice(0, 6);
  const matchingAds = ads.filter((ad) => !query.trim() || String(ad.title || "").toLowerCase().includes(query.toLowerCase()));
  const recentAds = matchingAds.slice(0, 8);
  const exportAds = () => {
    const rows = [["عنوان الإعلان", "تاريخ البداية", "تاريخ النهاية", "الحالة"], ...matchingAds.map((ad) => [ad.title || "", ad.startDate || "", ad.endDate || "", ad.active ? "مفعّل" : "متوقف"])];
    const csv = "\uFEFF" + rows.map((row) => row.map((value) => '"' + String(value).replaceAll('"', '""') + '"').join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "arzaq-ads.csv"; link.click(); URL.revokeObjectURL(url);
  };
  const total = Math.max(1, ads.length);
  const stats = [
    { label: "إجمالي الإعلانات", value: ads.length, detail: "كل الإعلانات المسجلة", icon: "▣", tone: "teal" },
    { label: "إعلانات مفعّلة", value: active, detail: "مفعّلة من لوحة التحكم", icon: "✓", tone: "green" },
    { label: "نشطة ضمن الفترة", value: current, detail: "وفق تاريخ البداية والنهاية", icon: "◷", tone: "orange" },
    { label: "مواضع العرض", value: placements.length, detail: "أماكن ظهور الإعلانات", icon: "⌖", tone: "blue" },
  ];
  return <div className="dashboard-page" dir="rtl">
    <section className="dashboard-welcome"><div><div className="dashboard-eyebrow"><span className="dashboard-live-dot" /> إدارة المساحات الإعلانية</div><h1>نظرة عامة على الإعلانات</h1><p>راقب الإعلانات ومواضع ظهورها من مكان واحد.</p></div><div className="dashboard-welcome-actions"><span className="dashboard-updated">● البيانات من قاعدة المنصة</span><Link to="/ads-admin/ads" className="dashboard-primary-action">＋ إضافة إعلان</Link></div></section>
    <section className="dashboard-stat-grid" aria-label="إحصائيات الإعلانات">{stats.map((stat) => <article className="dashboard-stat-card" key={stat.label}><div className="dashboard-stat-top"><span>{stat.label}</span><span className={"dashboard-stat-icon " + stat.tone}>{stat.icon}</span></div><div className="dashboard-stat-value">{loading ? "…" : fmt(stat.value)}</div><div className="dashboard-stat-detail">{stat.detail}</div></article>)}</section>
    <section className="dashboard-main-grid">
      <article className="dashboard-panel"><div className="dashboard-panel-heading"><div><h2>حالة الإعلانات</h2><p>نسبة الإعلانات المفعّلة إلى الإجمالي</p></div><Link to="/ads-admin/ads">إدارة الإعلانات ←</Link></div><div className="dashboard-status-total"><strong>{fmt(ads.length)}</strong><span>إعلان مسجل</span></div><div className="dashboard-status-track"><span style={{ width: active / total * 100 + "%", background: "#15966b" }} /><span style={{ width: inactive / total * 100 + "%", background: "#cbd3d8" }} /></div><div className="dashboard-status-legend"><div><span className="dashboard-legend-name"><i style={{ background: "#15966b" }} />مفعّلة</span><strong>{fmt(active)} <small>{ads.length ? Math.round(active / ads.length * 100) : 0}%</small></strong></div><div><span className="dashboard-legend-name"><i style={{ background: "#cbd3d8" }} />متوقفة</span><strong>{fmt(inactive)} <small>{ads.length ? Math.round(inactive / ads.length * 100) : 0}%</small></strong></div></div></article>
      <article className="dashboard-panel"><div className="dashboard-panel-heading"><div><h2>الإعلانات حسب موضع العرض</h2><p>عدد الإعلانات المرتبطة بكل موضع</p></div><Link to="/ads-admin/placements">عرض المواضع ←</Link></div>{placementStats.length ? <div className="dashboard-category-list">{placementStats.map((placement, index) => <div className="dashboard-category-row" key={placement.id || placement.name}><div className="dashboard-category-label"><span className="dashboard-category-rank">{index + 1}</span><span>{placement.name || placement.title || "موضع عرض"}</span><strong>{fmt(placement.count)}</strong></div><div className="dashboard-bar-track"><span style={{ width: placement.count / Math.max(1, ...placementStats.map((item) => item.count)) * 100 + "%" }} /></div></div>)}</div> : <div className="dashboard-empty">لم تتم إضافة مواضع عرض بعد.</div>}</article>
    </section>
    <section className="dashboard-panel dashboard-recent-panel"><div className="dashboard-panel-heading dashboard-recent-heading"><div><h2>الإعلانات الأخيرة</h2><p>ابحث في الإعلانات أو صدّر نتائج البحث</p></div><div className="dashboard-table-tools"><input aria-label="البحث في الإعلانات" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن إعلان..." /><button type="button" onClick={exportAds} className="dashboard-export-button">تصدير CSV ↓</button><Link to="/ads-admin/ads">إدارة الكل ←</Link></div></div><div className="dashboard-table-wrap"><table className="dashboard-table"><thead><tr><th>عنوان الإعلان</th><th>تاريخ البداية</th><th>تاريخ النهاية</th><th>الحالة</th></tr></thead><tbody>{recentAds.map((ad) => <tr key={ad.id}><td><strong>{ad.title || "بدون عنوان"}</strong></td><td>{ad.startDate || "—"}</td><td>{ad.endDate || "مفتوح"}</td><td><span className={"dashboard-status-pill " + (ad.active ? "published" : "archived")}>{ad.active ? "مفعّل" : "متوقف"}</span></td></tr>)}{!recentAds.length && <tr><td colSpan="4"><div className="dashboard-empty">لا توجد إعلانات مسجلة حتى الآن.</div></td></tr>}</tbody></table></div><div className="dashboard-panel-footer"><span>عرض {fmt(recentAds.length)} من {fmt(matchingAds.length)} نتيجة</span><span>{fmt(placements.length)} موضع عرض</span></div></section>
  </div>;
}