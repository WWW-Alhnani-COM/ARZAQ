// عمليات مجموعة "cities" في Firestore.
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { isFirebaseConfigured, db } from "./config";
import { citiesStore } from "../data/localStore";
import { uid } from "../utils/ids";

const COLLECTION = "cities";

export function subscribeToCities(callback) {
  if (isFirebaseConfigured) {
    return onSnapshot(collection(db, COLLECTION), (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
  }
  return citiesStore.subscribe(callback);
}

export async function createCity(name) {
  if (isFirebaseConfigured) return addDoc(collection(db, COLLECTION), { name });
  citiesStore.add({ id: uid("city"), name });
}

export async function deleteCity(id) {
  if (isFirebaseConfigured) return deleteDoc(doc(db, COLLECTION, id));
  citiesStore.remove(id);
}
