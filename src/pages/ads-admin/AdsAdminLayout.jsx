import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Logo from "../../components/layout/Logo";

const ITEMS = [
  { id: "", label: "نظرة عامة", icon: "📊" },
  { id: "ads", label: "الإعلانات", icon: "📢" },
  { id: "placements", label: "مواضع العرض", icon: "📌" },
];

// لوحة منفصلة تمامًا عن /admin — صلاحيات Ads Admin فقط (custom claim "ads")،
// ولا تصل مطلقًا لإدارة الوظائف أو الجهات أو التصنيفات.
export default function AdsAdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname.replace(/^\/ads-admin\/?/, "");

  function handleLogout() {
    logout();
    navigate("/ads-admin/login");
  }

  return (
    <div className="admin-shell flex" dir="rtl">
      <AdminSidebar
        items={ITEMS}
        active={active}
        setActive={(id) => navigate(id ? `/ads-admin/${id}` : "/ads-admin")}
        title="لوحة مشرف الإعلانات"
        onLogout={handleLogout}
        Logo={Logo}
      />
      <main className="flex-1 p-6 md:p-8 max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
}
