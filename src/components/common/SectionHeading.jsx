export default function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <div className="text-xs font-bold tracking-wide mb-1" style={{ color: "var(--orange-600)" }}>{eyebrow}</div>
        <h2 className="font-display text-2xl font-extrabold" style={{ color: "var(--teal-900)" }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}
