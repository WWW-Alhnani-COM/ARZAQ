import { Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import AdminLoginForm from "../../components/admin/AdminLoginForm";

export default function AdsAdminLoginPage() {
  const { role, login, authError, loading } = useAdminAuth(); // ✅ تأكد من وجود loading
  const navigate = useNavigate();

  if (role === "ads") return <Navigate to="/ads-admin" replace />;

  async function handleSubmit(email, password) {
    const ok = await login("ads", email, password);
    if (ok) navigate("/ads-admin");
  }

  return (
    <AdminLoginForm 
      role="ads" 
      roleLabel="دخول لوحة الإعلانات" 
      onSubmit={handleSubmit} 
      authError={authError}  // ✅ تمرير الخطأ
      loading={loading}      // ✅ تمرير حالة التحميل
    />
  );
}
