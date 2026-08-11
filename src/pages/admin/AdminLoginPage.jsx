import { Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import AdminLoginForm from "../../components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  const { role, login, authError } = useAdminAuth();
  const navigate = useNavigate();

  if (role === "main") return <Navigate to="/admin" replace />;

  async function handleSubmit(email, password) {
    const ok = await login("main", email, password);
    if (ok) navigate("/admin");
  }

  return <AdminLoginForm role="main" roleLabel="دخول لوحة الإدارة" onSubmit={handleSubmit} authError={authError} />;
}
