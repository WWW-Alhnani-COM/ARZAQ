// حالة مصادقة المشرفين (Main Admin / Ads Admin) على مستوى التطبيق.
// role يكون null | "main" | "ads" — لا علاقة له بأي مستخدم/زائر عادي.
import { createContext, useContext, useState } from "react";
import * as authService from "../firebase/authService";

const AdminAuthContext = createContext(null);

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  return ctx;
}

export function AdminAuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [authError, setAuthError] = useState("");

  async function login(expectedRole, email, password) {
    setAuthError("");
    try {
      const result = await authService.signInAdmin(email, password);
      if (result && result.role === expectedRole) {
        setRole(result.role);
        return true;
      }
      setAuthError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      return false;
    } catch (e) {
      setAuthError("تعذر تسجيل الدخول. تحقق من البيانات وحاول مجددًا.");
      return false;
    }
  }

  function logout() {
    authService.signOutAdmin();
    setRole(null);
  }

  return (
    <AdminAuthContext.Provider value={{ role, login, logout, authError }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

