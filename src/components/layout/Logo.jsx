export default function Logo({ light }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-black text-lg"
        style={{ background: light ? "rgba(255,255,255,.15)" : "var(--teal-100)", color: light ? "#fff" : "var(--teal-800)" }}
      >
        أ
      </div>
      <div className="leading-tight">
        <div className={"font-display font-extrabold text-lg " + (light ? "text-white" : "")} style={!light ? { color: "var(--teal-900)" } : {}}>
          أرزاق
        </div>
        <div className={"text-[10px] tracking-widest -mt-1 " + (light ? "text-white/70" : "text-gray-400")}>ARZAQ</div>
      </div>
    </div>
  );
}
