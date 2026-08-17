export default function AdminSidebar({ items, active, setActive, onLogout, title, Logo, mobileOpen, onClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 bg-white border-l h-screen sticky top-0 flex flex-col" style={{ borderColor: "var(--line)" }}>
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

      {/* Mobile overlay sidebar */}
      <div className={`md:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}>
        {/* backdrop */}
        <div
          onClick={onClose}
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* panel */}
        <div className={`fixed right-0 top-0 bottom-0 w-64 bg-white border-l z-50 transform transition-transform duration-200 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ borderColor: "var(--line)" }}>
          <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "var(--line)" }}>
            <div className="flex items-center gap-3">
              <Logo />
              <div className="text-xs text-gray-400">{title}</div>
            </div>
            <button onClick={onClose} className="p-2 rounded-md">✕</button>
          </div>

          <nav className="p-3 space-y-1">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => { setActive(it.id); if (onClose) onClose(); }}
                className={"admin-nav-item w-full text-right px-3 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 " + (active === it.id ? "active" : "text-gray-600 hover:bg-gray-50")}
              >
                <span>{it.icon}</span><span>{it.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-3 border-t" style={{ borderColor: "var(--line)" }}>
            <button onClick={() => { onLogout(); if (onClose) onClose(); }} className="w-full text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl py-2.5">تسجيل الخروج</button>
          </div>
        </div>
      </div>
    </>
  );
}
