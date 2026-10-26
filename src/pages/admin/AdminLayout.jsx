import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Logo from "../../components/layout/Logo";
import { useState } from "react";

const ITEMS = [
  { id: "", label: "نظرة عامة", icon: "📊" },
  { id: "jobs", label: "الوظائف", icon: "📋" },
  { id: "organizations", label: "الجهات والشركات", icon: "🏢" },
  { id: "categories", label: "التصنيفات", icon: "🏷️" },
  { id: "cities", label: "المدن", icon: "📍" },
];

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname.replace(/^\/admin\/?/, "");
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="admin-shell flex min-h-screen" dir="rtl">
      <AdminSidebar
        items={ITEMS}
        active={active}
        setActive={(id) => navigate(id ? `/admin/${id}` : "/admin")}
        title="لوحة المشرف الرئيسي"
        onLogout={handleLogout}
        Logo={Logo}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 flex items-center justify-between border-b bg-white/95 p-3 backdrop-blur md:hidden" style={{ borderColor: "var(--line)" }}>
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" onClick={() => setMobileOpen(true)} className="rounded-lg p-2 transition hover:bg-gray-100" aria-label="فتح القائمة الجانبية" aria-expanded={mobileOpen}>☰</button>
            <span className="truncate text-sm font-semibold text-gray-700">لوحة المشرف الرئيسي</span>
          </div>
          <button type="button" onClick={handleLogout} className="shrink-0 rounded-lg px-2 py-2 text-sm font-semibold text-red-500 hover:bg-red-50">خروج</button>
        </div>
        <div className="w-full min-w-0 p-4 sm:p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
