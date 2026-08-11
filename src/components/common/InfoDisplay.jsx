export function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold text-gray-700">{value}</span>
    </div>
  );
}

export function InfoList({ title, items }) {
  if (!items || !items.length) return null;
  return (
    <div className="mb-8">
      <h3 className="font-display font-bold text-lg mb-3" style={{ color: "var(--teal-900)" }}>{title}</h3>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--orange)" }}></span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
