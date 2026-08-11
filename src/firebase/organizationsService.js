// عمليات مجموعة "organizations" في Firestore — بيانات الجهات المرتبطة بالوظائف فقط
// (لا يوجد أي حساب دخول للشركات).
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { isFirebaseConfigured, db } from "./config";
import { organizationsStore } from "../data/localStore";
import { uid } from "../utils/ids";

const COLLECTION = "organizations";

export function subscribeToOrganizations(callback) {
  if (isFirebaseConfigured) {
    return onSnapshot(collection(db, COLLECTION), (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
  }
  return organizationsStore.subscribe(callback);
}

export async function createOrganization(data) {
  if (isFirebaseConfigured) return addDoc(collection(db, COLLECTION), data);
  organizationsStore.add({ ...data, id: uid("org") });
}

export async function updateOrganization(id, data) {
  if (isFirebaseConfigured) return updateDoc(doc(db, COLLECTION, id), data);
  organizationsStore.update(id, data);
}

export async function deleteOrganization(id) {
  if (isFirebaseConfigured) return deleteDoc(doc(db, COLLECTION, id));
  organizationsStore.remove(id);
}
