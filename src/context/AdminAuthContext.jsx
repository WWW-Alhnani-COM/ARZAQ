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
      
      // ✅ التعديل: قبول الدور "ads" حتى لو كان مكتوباً بشكل مختلف
      if (result) {
        // إذا كان الدور المطلوب هو "ads"
        if (expectedRole === "ads") {
          // اقبل أي دور يحتوي على "ad" (بأي حالة أحرف)
          const roleLower = String(result.role).toLowerCase();
          if (roleLower.includes("ad")) {
            setRole("ads"); // ثبت الدور كـ "ads"
            return true;
          }
        }
        
        // إذا كان الدور المطلوب هو "main"
        if (expectedRole === "main") {
          const roleLower = String(result.role).toLowerCase();
          if (roleLower.includes("main") || roleLower === "admin") {
            setRole("main");
            return true;
          }
        }
        
        // المقارنة المباشرة (إذا كانت متطابقة)
        if (result.role === expectedRole) {
          setRole(result.role);
          return true;
        }
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
