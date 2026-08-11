// مصادقة المشرفين فقط (Main Admin / Ads Admin) عبر Firebase Authentication.
// لا يُستخدم هذا الملف إطلاقًا لأي حساب زائر أو باحث عن عمل.
import { signInWithEmailAndPassword, signOut, getIdTokenResult } from "firebase/auth";
import { isFirebaseConfigured, auth } from "./config";

// حسابات تجريبية لوضع العرض بدون Firebase — في الإنتاج يُستبدل هذا بالكامل
// بحسابات Firebase Auth حقيقية ودور كل حساب يُقرأ من custom claims فقط.
const DEMO_ACCOUNTS = {
  "admin@arzaq.com": { password: "admin123", role: "main" },
  "ads@arzaq.com": { password: "ads123", role: "ads" },
};

export async function signInAdmin(email, password) {
  if (isFirebaseConfigured) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const token = await getIdTokenResult(cred.user);
    return { uid: cred.user.uid, role: token.claims.role || null };
  }
  const acc = DEMO_ACCOUNTS[(email || "").trim()];
  if (acc && acc.password === password) return { uid: email, role: acc.role };
  return null;
}

export async function signOutAdmin() {
  if (isFirebaseConfigured) return signOut(auth);
}

export const demoAccountsInfo = DEMO_ACCOUNTS;
