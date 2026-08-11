import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../layout/Logo";
import { demoAccountsInfo } from "../../firebase/authService";
import { isFirebaseConfigured } from "../../firebase/config";

// نموذج دخول مشترك بين /admin/login و /ads-admin/login — الفرق فقط
// بالدور المتوقع (role) والحساب التجريبي المعروض.
export default function AdminLoginForm({ role, roleLabel, onSubmit, authError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const demoAccount = Object.entries(demoAccountsInfo).find(([, v]) => v.role === role);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email.trim(), password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center admin-shell px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-6 flex justify-center w-full"><Logo /></Link>
        <div className="card rounded-2xl p-7 shadow-sm">
          <h1 className="font-display font-bold text-lg mb-1" style={{ color: "var(--teal-900)" }}>{roleLabel}</h1>
          <p className="text-xs text-gray-400 mb-6">مصادقة عبر Firebase Authentication</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">البريد الإلكتروني</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-left" placeholder="name@arzaq.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">كلمة المرور</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} dir="ltr" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-left" placeholder="••••••••" />
            </div>
            {authError && <p className="text-xs text-red-500">{authError}</p>}
            <button type="submit" className="btn-primary w-full rounded-xl py-3 font-bold text-sm">تسجيل الدخول</button>
          </form>
          {!isFirebaseConfigured && demoAccount && (
            <div className="mt-5 bg-gray-50 rounded-xl p-3 text-[11px] text-gray-400 leading-relaxed">
              وضع العرض التجريبي (بدون Firebase) — بيانات دخول تجريبية:{" "}
              <span dir="ltr" className="inline-block">{demoAccount[0]} / {demoAccount[1].password}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

