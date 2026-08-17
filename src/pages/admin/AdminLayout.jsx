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
    <div className="admin-shell flex" dir="rtl">
      {/* Desktop sidebar (hidden on small screens) */}
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

      <main className="flex-1">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--line)" }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
              ☰
            </button>
            <Logo />
          </div>
          <div>
            <button onClick={handleLogout} className="text-red-500 font-semibold">
              تسجيل الخروج
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8 max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
