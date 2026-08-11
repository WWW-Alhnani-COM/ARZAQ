// كتابة أحداث تحليلية فقط (job_views, whatsapp_clicks, advertisement_impressions,
// advertisement_clicks) — بدون أي بيانات شخصية للمتقدمين على الإطلاق.
// اسم/هاتف المتقدم لا يُكتبان هنا أبدًا؛ يغادران المتصفح فقط داخل رابط واتساب.
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { isFirebaseConfigured, db } from "./config";

async function logEvent(collectionName, payload) {
  if (isFirebaseConfigured) {
    return addDoc(collection(db, collectionName), { ...payload, timestamp: serverTimestamp() });
  }
  // وضع العرض التجريبي: تسجيل في الـ console فقط بدون أي تخزين.
  console.log(`[analytics:${collectionName}]`, payload);
}

export const logJobView = (jobId) => logEvent("job_views", { jobId });
export const logWhatsappClick = (jobId) => logEvent("whatsapp_clicks", { jobId });
export const logAdImpression = (adId, page) => logEvent("advertisement_impressions", { adId, page });
export const logAdClick = (adId, page) => logEvent("advertisement_clicks", { adId, page });
