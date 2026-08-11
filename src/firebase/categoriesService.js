// عمليات مجموعة "categories" في Firestore.
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { isFirebaseConfigured, db } from "./config";
import { categoriesStore } from "../data/localStore";
import { uid } from "../utils/ids";

const COLLECTION = "categories";

export function subscribeToCategories(callback) {
  if (isFirebaseConfigured) {
    return onSnapshot(collection(db, COLLECTION), (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
  }
  return categoriesStore.subscribe(callback);
}

export async function createCategory(name) {
  if (isFirebaseConfigured) return addDoc(collection(db, COLLECTION), { name });
  categoriesStore.add({ id: uid("cat"), name });
}

export async function deleteCategory(id) {
  if (isFirebaseConfigured) return deleteDoc(doc(db, COLLECTION, id));
  categoriesStore.remove(id);
}
