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
    "id": "jobs",
    "label": "الوظائف",
    "icon": "▤"
  },
  {
    "id": "organizations",
    "label": "الجهات والشركات",
    "icon": "⌂"
  },
  {
    "id": "categories",
    "label": "التصنيفات",
    "icon": "◇"
  },
  {
    "id": "cities",
    "label": "المدن",
    "icon": "⌖"
  }
];

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname.replace(/^\/admin\\/?/, "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("admin-dark"));

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }
  function toggleTheme() {
    setDark((value) => {
      const next = !value;
      document.documentElement.classList.toggle("admin-dark", next);
      return next;
    });
  }
  const pageLabel = location.pathname === "/admin" ? "نظرة عامة" : ITEMS.find((item) => item.id && location.pathname.startsWith("/admin/" + item.id))?.label || "إدارة المنصة";

  return <div className="admin-shell flex min-h-screen" dir="rtl">
    <AdminSidebar items={ITEMS} active={active} setActive={(id) => navigate(id ? `/admin/${id}` : "/admin")} title="لوحة المشرف الرئيسي" onLogout={handleLogout} Logo={Logo} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    <main className="admin-main min-w-0 flex-1">
      <header className="admin-topbar">
        <div className="admin-topbar-title"><button type="button" onClick={() => setMobileOpen(true)} className="admin-menu-trigger md:hidden" aria-label="فتح القائمة الجانبية">☰</button><div><span>ARZAQ / لوحة الإدارة</span><strong>{pageLabel}</strong></div></div>
        <div className="admin-topbar-actions"><span className="admin-topbar-status"><i /> النظام متصل</span><button type="button" className="admin-icon-button" onClick={toggleTheme} aria-label={dark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"} title="تغيير المظهر">{dark ? "☼" : "☾"}</button><button type="button" onClick={handleLogout} className="admin-logout-button">تسجيل الخروج ↗</button></div>
      </header>
      <div className="admin-content"><Outlet /></div>
    </main>
  </div>;
}
