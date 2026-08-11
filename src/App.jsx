import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import PublicLayout from "./components/layout/PublicLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import CategoriesPage from "./pages/CategoriesPage";
import CitiesPage from "./pages/CitiesPage";
import RemotePage from "./pages/RemotePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminJobsPage from "./pages/admin/AdminJobsPage";
import AdminOrganizationsPage from "./pages/admin/AdminOrganizationsPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminCitiesPage from "./pages/admin/AdminCitiesPage";

import AdsAdminLoginPage from "./pages/ads-admin/AdsAdminLoginPage";
import AdsAdminLayout from "./pages/ads-admin/AdsAdminLayout";
import AdsAdminDashboardPage from "./pages/ads-admin/AdsAdminDashboardPage";
import AdsAdminAdsPage from "./pages/ads-admin/AdsAdminAdsPage";
import AdsAdminPlacementsPage from "./pages/ads-admin/AdsAdminPlacementsPage";

// خريطة المسارات الكاملة لمنصة أرزاق ARZAQ:
//   عامة (بدون أي حساب مستخدم):
//     /  /jobs  /jobs/:slug  /categories  /cities  /remote-jobs  /about  /contact
//   إدارية (Firebase Authentication فقط):
//     /admin/login  /admin  /admin/jobs  /admin/organizations  /admin/categories  /admin/cities
//     /ads-admin/login  /ads-admin  /ads-admin/ads  /ads-admin/placements
export default function App() {
  return (
    <DataProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:slug" element={<JobDetailPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/cities" element={<CitiesPage />} />
              <Route path="/remote-jobs" element={<RemotePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="main">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="jobs" element={<AdminJobsPage />} />
              <Route path="organizations" element={<AdminOrganizationsPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="cities" element={<AdminCitiesPage />} />
            </Route>

            <Route path="/ads-admin/login" element={<AdsAdminLoginPage />} />
            <Route
              path="/ads-admin"
              element={
                <ProtectedRoute role="ads">
                  <AdsAdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdsAdminDashboardPage />} />
              <Route path="ads" element={<AdsAdminAdsPage />} />
              <Route path="placements" element={<AdsAdminPlacementsPage />} />
            </Route>

            <Route path="*" element={<PublicLayout />}>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </DataProvider>
  );
}

