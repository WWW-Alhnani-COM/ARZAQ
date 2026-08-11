import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Logo from "../../components/layout/Logo";

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

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="admin-shell flex" dir="rtl">
      <AdminSidebar
        items={ITEMS}
        active={active}
        setActive={(id) => navigate(id ? `/admin/${id}` : "/admin")}
        title="لوحة المشرف الرئيسي"
        onLogout={handleLogout}
        Logo={Logo}
      />
      <main className="flex-1 p-6 md:p-8 max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
}
