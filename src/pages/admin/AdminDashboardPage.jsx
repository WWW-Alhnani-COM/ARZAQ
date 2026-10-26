import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

const fmt = (value) => new Intl.NumberFormat("ar").format(value || 0);

export default function AdminDashboardPage() {
  const { jobs, organizations, categories, cities, loading } = useData();
  const published = jobs.filter((job) => job.status === "published").length;
  const featured = jobs.filter((job) => Boolean(job.featured)).length;
  const paused = jobs.filter((job) => job.status === "paused").length;
  const archived = jobs.filter((job) => job.status === "archived").length;
  const categoryStats = categories.map((category) => ({ ...category, count: jobs.filter((job) => job.category === category.name).length })).sort((a, b) => b.count - a.count).slice(0, 6);
  const recentJobs = [...jobs].slice(0, 6);
  const stats = [
    { label: "إجمالي الوظائف", value: jobs.length, detail: "جميع الوظائف المسجلة", icon: "▤", tone: "teal" },
    { label: "وظائف منشورة", value: published, detail: "ظاهرة للباحثين عن عمل", icon: "✓", tone: "green" },
    { label: "وظائف مميزة", value: featured, detail: "تحظى بأولوية الظهور", icon: "☆", tone: "orange" },
    { label: "الجهات والشركات", value: organizations.length, detail: "جهات مسجلة بالمنصة", icon: "⌂", tone: "blue" },
  ];
  const total = Math.max(1, jobs.length);
  return <div className="dashboard-page" dir="rtl">
    <section className="dashboard-welcome"><div><div className="dashboard-eyebrow"><span className="dashboard-live-dot" /> مركز إدارة أرزاق</div><h1>نظرة عامة</h1><p>ملخص حيّ لأداء منصة الوظائف ومحتواها.</p></div><div className="dashboard-welcome-actions"><span className="dashboard-updated">● البيانات من قاعدة المنصة</span><Link to="/admin/jobs" className="dashboard-primary-action">＋ إضافة وظيفة</Link></div></section>
    <section className="dashboard-stat-grid" aria-label="إحصائيات المنصة">{stats.map((stat) => <article className="dashboard-stat-card" key={stat.label}><div className="dashboard-stat-top"><span>{stat.label}</span><span className={"dashboard-stat-icon " + stat.tone}>{stat.icon}</span></div><div className="dashboard-stat-value">{loading ? "…" : fmt(stat.value)}</div><div className="dashboard-stat-detail">{stat.detail}</div></article>)}</section>
    <section className="dashboard-main-grid">
      <article className="dashboard-panel"><div className="dashboard-panel-heading"><div><h2>حالة الوظائف</h2><p>توزيع الوظائف حسب حالتها الحالية</p></div><Link to="/admin/jobs">إدارة الوظائف ←</Link></div><div className="dashboard-status-total"><strong>{fmt(jobs.length)}</strong><span>وظيفة في المنصة</span></div><div className="dashboard-status-track"><span style={{ width: published / total * 100 + "%", background: "#15966b" }} /><span style={{ width: paused / total * 100 + "%", background: "#d99018" }} /><span style={{ width: archived / total * 100 + "%", background: "#87939b" }} /></div><div className="dashboard-status-legend">{[{ label: "منشورة", count: published, color: "#15966b" }, { label: "متوقفة", count: paused, color: "#d99018" }, { label: "مؤرشفة", count: archived, color: "#87939b" }].map((item) => <div key={item.label}><span className="dashboard-legend-name"><i style={{ background: item.color }} />{item.label}</span><strong>{fmt(item.count)} <small>{jobs.length ? Math.round(item.count / jobs.length * 100) : 0}%</small></strong></div>)}</div></article>
      <article className="dashboard-panel"><div className="dashboard-panel-heading"><div><h2>التصنيفات الأكثر نشاطًا</h2><p>عدد الوظائف لكل تصنيف</p></div><Link to="/admin/categories">عرض الكل ←</Link></div>{categoryStats.length ? <div className="dashboard-category-list">{categoryStats.map((category, index) => <div className="dashboard-category-row" key={category.id || category.name}><div className="dashboard-category-label"><span className="dashboard-category-rank">{index + 1}</span><span>{category.name}</span><strong>{fmt(category.count)}</strong></div><div className="dashboard-bar-track"><span style={{ width: category.count / Math.max(1, ...categoryStats.map((item) => item.count)) * 100 + "%" }} /></div></div>)}</div> : <div className="dashboard-empty">لا توجد تصنيفات لعرضها حتى الآن.</div>}</article>
    </section>
    <section className="dashboard-panel dashboard-recent-panel"><div className="dashboard-panel-heading"><div><h2>أحدث الوظائف</h2><p>مراجعة سريعة للوظائف المسجلة</p></div><Link to="/admin/jobs">إدارة جميع الوظائف ←</Link></div><div className="dashboard-table-wrap"><table className="dashboard-table"><thead><tr><th>المسمى الوظيفي</th><th>الجهة</th><th>المدينة</th><th>الحالة</th><th>النوع</th></tr></thead><tbody>{recentJobs.map((job) => <tr key={job.id}><td><strong>{job.jobTitle || "بدون عنوان"}</strong></td><td>{job.organizationName || "—"}</td><td>{job.city || "—"}</td><td><span className={"dashboard-status-pill " + (job.status || "unknown")}>{job.status === "published" ? "منشورة" : job.status === "paused" ? "متوقفة" : job.status === "archived" ? "مؤرشفة" : "مسودة"}</span></td><td>{job.featured ? <span className="dashboard-featured">★ مميزة</span> : "عادية"}</td></tr>)}{!recentJobs.length && <tr><td colSpan="5"><div className="dashboard-empty">لا توجد وظائف مسجلة حتى الآن.</div></td></tr>}</tbody></table></div><div className="dashboard-panel-footer"><span>عرض {fmt(recentJobs.length)} من {fmt(jobs.length)} وظيفة</span><span>{fmt(categories.length)} تصنيف · {fmt(cities.length)} مدينة</span></div></section>
  </div>;
}