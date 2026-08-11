export default function StatCard({ label, value, icon }) {
  return (
    <div className="card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-2"><span className="text-2xl">{icon}</span></div>
      <div className="font-display text-2xl font-extrabold" style={{ color: "var(--teal-900)" }}>{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}
