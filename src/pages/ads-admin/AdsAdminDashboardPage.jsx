import { useData } from "../../context/DataContext";
import StatCard from "../../components/common/StatCard";

export default function AdsAdminDashboardPage() {
  const { ads, placements } = useData();
  const active = ads.filter((a) => a.active).length;
  return (
    <div>
      <h2 className="font-display text-xl font-extrabold mb-5" style={{ color: "var(--teal-900)" }}>نظرة عامة على الإعلانات</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="إجمالي الإعلانات" value={ads.length} icon="📢" />
        <StatCard label="إعلانات نشطة" value={active} icon="🟢" />
        <StatCard label="مواضع معرّفة" value={placements.length} icon="📌" />
      </div>
    </div>
  );
}
