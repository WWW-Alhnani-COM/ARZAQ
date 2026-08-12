// مصادقة المشرفين فقط (Main Admin / Ads Admin) عبر Firebase Authentication.
// الدور يُقرأ من Firestore: admins/{uid}
// لا يوجد أي تسجيل دخول للزوار أو الباحثين عن عمل.

import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { isFirebaseConfigured, auth, db } from "./config";

// حسابات العرض التجريبي فقط.
// لا تُستخدم عندما يكون Firebase مفعّلًا.
const DEMO_ACCOUNTS = {
  "admin@arzaq.com": {
    password: "admin123",
    role: "main",
  },
  "semomedu@gmail.com": {
    password: "semo123",
    role: "ads",
  },
};

/**
 * تسجيل دخول المشرف.
 *
 * Production:
 * 1. تسجيل الدخول عبر Firebase Authentication.
 * 2. الحصول على UID.
 * 3. قراءة admins/{uid}.
 * 4. قراءة role من المستند.
 */
export async function signInAdmin(email, password) {
  if (isFirebaseConfigured) {
    const cred = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    const uid = cred.user.uid;

    const adminRef = doc(db, "admins", uid);
    const adminSnap = await getDoc(adminRef);

    if (!adminSnap.exists()) {
      await signOut(auth);
      throw new Error("ADMIN_PROFILE_NOT_FOUND");
    }

    const adminData = adminSnap.data();
    const role = adminData.role;

    if (role !== "main" && role !== "ads") {
      await signOut(auth);
      throw new Error("INVALID_ADMIN_ROLE");
    }

    return {
      uid,
      role,
      displayName: adminData.displayName || "",
    };
  }

  // Demo Mode فقط
  const acc = DEMO_ACCOUNTS[(email || "").trim()];

  if (acc && acc.password === password) {
    return {
      uid: email,
      role: acc.role,
      displayName: acc.role === "main" ? "Main Admin" : "Ads Admin",
    };
  }

  return null;
}

export async function signOutAdmin() {
  if (isFirebaseConfigured) {
    return signOut(auth);
  }
}

export const demoAccountsInfo = DEMO_ACCOUNTS;
