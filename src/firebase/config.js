// نقطة الإعداد الوحيدة لمشروع Firebase — Firestore وAuth وStorage فقط.
// لا يوجد أي Backend خارجي: Firebase هو الـ Backend الكامل للمنصة.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// إن لم تُملأ متغيرات البيئة، يعمل التطبيق تلقائيًا بوضع العرض التجريبي
// (بيانات محلية في src/data) بدل الاتصال بـ Firebase — مفيد للتطوير والعرض
// دون الحاجة لإنشاء مشروع Firebase فورًا.
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

export const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const db = isFirebaseConfigured ? getFirestore(app) : null;
export const auth = isFirebaseConfigured ? getAuth(app) : null;
export const storage = isFirebaseConfigured ? getStorage(app) : null;
