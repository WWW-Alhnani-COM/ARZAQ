import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

// يحمي أي مسار إداري بدور محدد (main أو ads). إن لم يكن المستخدم مسجلاً
// دخوله بالدور المطلوب، يُعاد توجيهه لشاشة الدخول المناسبة — تمامًا كما
// تفرضه Firestore Security Rules على مستوى البيانات (custom claims).
export default function ProtectedRoute({ role, children }) {
  const { role: currentRole } = useAdminAuth();
  if (currentRole !== role) {
    return <Navigate to={role === "ads" ? "/ads-admin/login" : "/admin/login"} replace />;
  }
  return children;
}

