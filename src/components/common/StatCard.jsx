export default function StatCard({ label, value, icon }) {
  return (
    <article className="card admin-stat-card rounded-2xl p-4 sm:p-5 min-w-0">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <span className="text-xs font-semibold text-gray-400">إحصائية</span>
      </div>
      <div className="font-display text-2xl sm:text-3xl font-extrabold tabular-nums" style={{ color: "var(--teal-900)" }}>{value}</div>
      <div className="text-xs sm:text-sm text-gray-500 mt-1 leading-5">{label}</div>
    </article>
  );
}
