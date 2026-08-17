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
  const [loading, setLoading] = useState(false);

  async function login(expectedRole, email, password) {
    setAuthError("");
    setLoading(true);
    
    try {
      // التحقق من إدخال البيانات
      if (!email || !password) {
        setAuthError("❌ يرجى إدخال البريد الإلكتروني وكلمة المرور.");
        setLoading(false);
        return false;
      }
      
      const result = await authService.signInAdmin(email, password);
      
      console.log("📥 نتيجة تسجيل الدخول:", result);
      
      if (!result) {
        setAuthError("❌ البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        setLoading(false);
        return false;
      }
      
      // ✅ التحقق من الدور المطلوب
      if (expectedRole === "ads") {
        // تحقق من أن الدور هو "ads"
        const roleLower = String(result.role).toLowerCase();
        if (roleLower === "ads" || roleLower.includes("ad")) {
          setRole("ads");
          setAuthError("");
          setLoading(false);
          console.log("✅ تم تسجيل الدخول كـ: ads");
          return true;
        } else {
          setAuthError(`❌ هذا الحساب ليس مدير إعلانات. الدور الحالي: ${result.role}`);
          setLoading(false);
          return false;
        }
      }
      
      if (expectedRole === "main") {
        const roleLower = String(result.role).toLowerCase();
        if (roleLower === "main" || roleLower === "admin") {
          setRole("main");
          setAuthError("");
          setLoading(false);
          console.log("✅ تم تسجيل الدخول كـ: main");
          return true;
        } else {
          setAuthError(`❌ هذا الحساب ليس مدير عام. الدور الحالي: ${result.role}`);
          setLoading(false);
          return false;
        }
      }
      
      // إذا تطابق الدور تماماً
      if (result.role === expectedRole) {
        setRole(result.role);
        setAuthError("");
        setLoading(false);
        console.log("✅ تم تسجيل الدخول كـ:", result.role);
        return true;
      }
      
      setAuthError(`❌ هذا الحساب ليس لديه صلاحيات ${expectedRole === "ads" ? "مدير إعلانات" : "مدير عام"}`);
      setLoading(false);
      return false;
      
    } catch (e) {
      console.error("❌ خطأ في تسجيل الدخول:", e);
      
      // رسائل خطأ محددة من Firebase
      if (e.code === "auth/user-not-found") {
        setAuthError("❌ المستخدم غير موجود. يرجى التأكد من البريد الإلكتروني.");
      } else if (e.code === "auth/wrong-password") {
        setAuthError("❌ كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.");
      } else if (e.code === "auth/invalid-email") {
        setAuthError("❌ البريد الإلكتروني غير صحيح. يرجى إدخال بريد صحيح.");
      } else if (e.code === "auth/too-many-requests") {
        setAuthError("❌ تم إرسال العديد من المحاولات. يرجى الانتظار قليلاً.");
      } else if (e.code === "auth/network-request-failed") {
        setAuthError("❌ مشكلة في الاتصال بالإنترنت. يرجى التحقق من الاتصال.");
      } else if (e.message === "ADMIN_PROFILE_NOT_FOUND") {
        setAuthError("❌ لم يتم العثور على بيانات المشرف. يرجى التواصل مع الدعم الفني.");
      } else if (e.message === "INVALID_ADMIN_ROLE") {
        setAuthError("❌ دور المشرف غير صحيح. يجب أن يكون 'مدير عام' أو 'مدير إعلانات'.");
      } else {
        setAuthError(`❌ ${e.message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."}`);
      }
      
      setLoading(false);
      return false;
    }
  }

  function logout() {
    authService.signOutAdmin();
    setRole(null);
    setAuthError("");
    setLoading(false);
  }

  return (
    <AdminAuthContext.Provider value={{ 
      role, 
      login, 
      logout, 
      authError, 
      loading,
      isAdmin: role !== null,
      isMainAdmin: role === "main",
      isAdsAdmin: role === "ads"
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
