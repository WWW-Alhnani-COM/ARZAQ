// عمليات مجموعة "advertisements" في Firestore. الكتابة مقصورة على Ads Admin
// (يُفرض ذلك عبر Firestore Security Rules استنادًا لـ custom claims، وليس هنا).
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { isFirebaseConfigured, db } from "./config";
import { adsStore, placementsStore } from "../data/localStore";
import { uid } from "../utils/ids";

const COLLECTION = "advertisements";

export function subscribeToAds(callback) {
  if (isFirebaseConfigured) {
    return onSnapshot(collection(db, COLLECTION), (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
  }
  return adsStore.subscribe(callback);
}

export async function createAd(data) {
  if (isFirebaseConfigured) return addDoc(collection(db, COLLECTION), data);
  adsStore.add({ ...data, id: uid("ad") });
}

export async function updateAd(id, data) {
  if (isFirebaseConfigured) return updateDoc(doc(db, COLLECTION, id), data);
  adsStore.update(id, data);
}

export async function deleteAd(id) {
  if (isFirebaseConfigured) return deleteDoc(doc(db, COLLECTION, id));
  adsStore.remove(id);
  placementsStore.removeWhere((p) => p.adId === id);
}

