// AdminLoginForm.jsx
import { useState } from "react";

export default function AdminLoginForm({ role, roleLabel, onSubmit, authError, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">{roleLabel}</h2>
        
        {/* ✅ عرض رسالة الخطأ */}
        {authError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {authError}
          </div>
        )}
        
        {/* ✅ عرض حالة التحميل */}
        {loading && (
          <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg text-sm text-center">
            ⏳ جاري تسجيل الدخول...
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="أدخل البريد الإلكتروني"
              required
              disabled={loading}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="أدخل كلمة المرور"
              required
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white font-bold ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : role === "main" 
                  ? "bg-blue-500 hover:bg-blue-600" 
                  : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "⏳ جاري التحميل..." : "تسجيل الدخول"}
          </button>
        </form>
        
        {/* ✅ رسائل مساعدة حسب نوع الدخول */}
        {role === "ads" && (
          <div className="mt-4 text-xs text-gray-500 text-center border-t pt-4">
            <p>💡 ملاحظة: هذا الدخول مخصص لمديري الإعلانات فقط</p>
            <p className="mt-1 text-gray-400">للحصول على صلاحيات، يرجى التواصل مع المدير العام</p>
          </div>
        )}
        
        {role === "main" && (
          <div className="mt-4 text-xs text-gray-500 text-center border-t pt-4">
            <p>🔐 هذا الدخول مخصص للمدير العام فقط</p>
          </div>
        )}
      </div>
    </div>
  );
}
