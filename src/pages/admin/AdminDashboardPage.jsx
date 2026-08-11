import { useData } from "../../context/DataContext";
import StatCard from "../../components/common/StatCard";

export default function AdminDashboardPage() {
  const { jobs, organizations, categories } = useData();
  const published = jobs.filter((j) => j.status === "published").length;
  const featured = jobs.filter((j) => j.featured).length;

  return (
    <div>
      <h2 className="font-display text-xl font-extrabold mb-5" style={{ color: "var(--teal-900)" }}>نظرة عامة</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="إجمالي الوظائف" value={jobs.length} icon="📋" />
        <StatCard label="وظائف منشورة" value={published} icon="✅" />
        <StatCard label="وظائف مميزة" value={featured} icon="⭐" />
        <StatCard label="الجهات المسجّلة" value={organizations.length} icon="🏢" />
      </div>
      <div className="card rounded-2xl p-5">
        <h3 className="font-bold text-sm mb-3 text-gray-700">توزيع الوظائف حسب التصنيف</h3>
        <div className="space-y-2">
          {categories.map((c) => {
            const count = jobs.filter((j) => j.category === c.name).length;
            const pct = jobs.length ? Math.round((count / jobs.length) * 100) : 0;
            return (
              <div key={c.id} className="flex items-center gap-3 text-xs">
                <span className="w-32 shrink-0 text-gray-500">{c.name}</span>
                <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden"><div className="h-full rounded-full" style={{ width: pct + "%", background: "var(--teal)" }}></div></div>
                <span className="w-6 text-gray-400">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
