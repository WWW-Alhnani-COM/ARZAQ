import { useState } from "react";

export default function AdminSidebar({ items, active, setActive, onLogout, title, Logo, mobileOpen = false, onClose }) {
  const [collapsed, setCollapsed] = useState(false);

  const renderItems = (isCollapsed = false, closeOnSelect = false) => (
    <nav className="flex-1 overflow-y-auto p-3 space-y-1">
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          title={isCollapsed ? it.label : undefined}
          aria-current={active === it.id ? "page" : undefined}
          onClick={() => {
            setActive(it.id);
            if (closeOnSelect && onClose) onClose();
          }}
          className={"admin-nav-item w-full text-right px-3 py-3 rounded-xl text-sm font-medium flex items-center gap-3 " + (isCollapsed ? "justify-center" : "") + " " + (active === it.id ? "active" : "text-gray-600 hover:bg-gray-50")}
        >
          <span className="inline-flex w-5 shrink-0 items-center justify-center text-base" aria-hidden="true">{it.icon}</span>
          {!isCollapsed && <span className="min-w-0 flex-1 truncate">{it.label}</span>}
          {!isCollapsed && active === it.id && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />}
        </button>
      ))}
    </nav>
  );

  const renderLogout = (isCollapsed = false, closeOnSelect = false) => (
    <div className="border-t p-3" style={{ borderColor: "var(--line)" }}>
      <button
        type="button"
        title={isCollapsed ? "تسجيل الخروج" : undefined}
        onClick={() => {
          onLogout();
          if (closeOnSelect && onClose) onClose();
        }}
        className={"w-full rounded-xl py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 flex items-center gap-3 " + (isCollapsed ? "justify-center" : "justify-center")}
      >
        <span aria-hidden="true">↪</span>
        {!isCollapsed && <span>تسجيل الخروج</span>}
      </button>
    </div>
  );

  return (
    <>
      <aside
        className={"hidden md:flex shrink-0 bg-white border-l h-screen sticky top-0 flex-col transition-[width] duration-300 ease-in-out " + (collapsed ? "w-[5.25rem]" : "w-64")}
        style={{ borderColor: "var(--line)" }}
        aria-label={title}
      >
        <div className={"border-b p-4 " + (collapsed ? "flex flex-col items-center gap-4" : "")} style={{ borderColor: "var(--line)" }}>
          <div className={"flex items-center gap-3 " + (collapsed ? "justify-center" : "justify-between")}>
            <div className="min-w-0 overflow-hidden">
              <Logo />
            </div>
            <button
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              className="shrink-0 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              aria-label={collapsed ? "توسيع القائمة الجانبية" : "طي القائمة الجانبية"}
              title={collapsed ? "توسيع القائمة" : "طي القائمة"}
            >
              <span className="block transition-transform duration-300" aria-hidden="true">{collapsed ? "⇤" : "⇥"}</span>
            </button>
          </div>
          {!collapsed && <div className="mt-3 text-xs text-gray-400">{title}</div>}
        </div>
        {renderItems(collapsed)}
        {renderLogout(collapsed)}
      </aside>

      <div className={"md:hidden " + (mobileOpen ? "" : "pointer-events-none")}>
        <button
          type="button"
          aria-label="إغلاق القائمة"
          onClick={onClose}
          className={"fixed inset-0 z-40 bg-black/45 transition-opacity duration-300 " + (mobileOpen ? "opacity-100" : "opacity-0")}
        />
        <aside
          className={"fixed right-0 top-0 bottom-0 z-50 flex w-[min(20rem,88vw)] flex-col border-l bg-white shadow-2xl transition-transform duration-300 ease-in-out " + (mobileOpen ? "translate-x-0" : "translate-x-full")}
          style={{ borderColor: "var(--line)" }}
          aria-label={title}
          aria-hidden={!mobileOpen}
        >
          <div className="flex items-center justify-between gap-3 border-b p-4" style={{ borderColor: "var(--line)" }}>
            <div className="min-w-0">
              <Logo />
              <div className="mt-2 text-xs text-gray-400">{title}</div>
            </div>
            <button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" aria-label="إغلاق القائمة">✕</button>
          </div>
          {renderItems(false, true)}
          {renderLogout(false, true)}
        </aside>
      </div>
    </>
  );
}
