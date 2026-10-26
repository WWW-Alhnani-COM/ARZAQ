import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Logo from "../../components/layout/Logo";
import { useState } from "react";

const ITEMS = [
  {
    "id": "",
    "label": "نظرة عامة",
    "icon": "▦"
  },
  {
    "id": "ads",
    "label": "الإعلانات",
    "icon": "▣"
  },
  {
    "id": "placements",
    "label": "مواضع العرض",
    "icon": "⌖"
  }
];

export default function AdsAdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname.slice("/ads-admin".length).replace(/^\/?/, "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("admin-dark"));

  function handleLogout() {
    logout();
    navigate("/ads-admin/login");
  }
  function toggleTheme() {
    setDark((value) => {
      const next = !value;
      document.documentElement.classList.toggle("admin-dark", next);
      return next;
    });
  }
  const pageLabel = location.pathname === "/ads-admin" ? "نظرة عامة" : ITEMS.find((item) => item.id && location.pathname.startsWith("/ads-admin/" + item.id))?.label || "إدارة المنصة";

  return <div className="admin-shell flex min-h-screen" dir="rtl">
    <AdminSidebar items={ITEMS} active={active} setActive={(id) => navigate(id ? `/ads-admin/${id}` : "/ads-admin")} title="لوحة تحكم المعلن" onLogout={handleLogout} Logo={Logo} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    <main className="admin-main min-w-0 flex-1">
      <header className="admin-topbar">
        <div className="admin-topbar-title"><button type="button" onClick={() => setMobileOpen(true)} className="admin-menu-trigger md:hidden" aria-label="فتح القائمة الجانبية">☰</button><div><span>ARZAQ / الإعلانات</span><strong>{pageLabel}</strong></div></div>
        <div className="admin-topbar-actions"><span className="admin-topbar-status"><i /> النظام متصل</span><button type="button" className="admin-icon-button" onClick={toggleTheme} aria-label={dark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"} title="تغيير المظهر">{dark ? "☼" : "☾"}</button><button type="button" onClick={handleLogout} className="admin-logout-button">تسجيل الخروج ↗</button></div>
      </header>
      <div className="admin-content"><Outlet /></div>
    </main>
  </div>;
}
