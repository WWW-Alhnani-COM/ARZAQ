// src/firebase/config.js
// إعداد Firebase لمنصة ARZAQ
// Firestore + Authentication + Storage فقط

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgpCQ3UHymqRMRxjO7bORdPWNKa3wFeig",
  authDomain: "arzaq-platform.firebaseapp.com",
  projectId: "arzaq-platform",
  storageBucket: "arzaq-platform.firebasestorage.app",
  messagingSenderId: "947677437343",
  appId: "1:947677437343:web:a7da2164c306f5e3fb31aa",
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Authentication
export const auth = getAuth(app);

// Storage
export const storage = getStorage(app);

export default app;
