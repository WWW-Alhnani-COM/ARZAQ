export default function AdminSidebar({ items, active, setActive, onLogout, title, Logo }) {
  return (
    <aside className="w-64 shrink-0 bg-white border-l h-screen sticky top-0 flex flex-col" style={{ borderColor: "var(--line)" }}>
      <div className="p-5 border-b" style={{ borderColor: "var(--line)" }}>
        <Logo />
        <div className="text-xs text-gray-400 mt-2">{title}</div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setActive(it.id)}
            className={"admin-nav-item w-full text-right px-3 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 " + (active === it.id ? "active" : "text-gray-600 hover:bg-gray-50")}
          >
            <span>{it.icon}</span><span>{it.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-3 border-t" style={{ borderColor: "var(--line)" }}>
        <button onClick={onLogout} className="w-full text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl py-2.5">تسجيل الخروج</button>
      </div>
    </aside>
  );
}
