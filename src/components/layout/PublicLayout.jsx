import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// القالب المشترك لكل الصفحات العامة (الزوار) — بدون أي رابط تسجيل دخول
// أو حساب مستخدم بداخله، تمامًا كما ينص المتطلب الأصلي.
export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
