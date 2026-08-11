// عمليات مجموعة "advertisement_placements" في Firestore.
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { isFirebaseConfigured, db } from "./config";
import { placementsStore } from "../data/localStore";
import { uid } from "../utils/ids";

const COLLECTION = "advertisement_placements";

export function subscribeToPlacements(callback) {
  if (isFirebaseConfigured) {
    return onSnapshot(collection(db, COLLECTION), (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
  }
  return placementsStore.subscribe(callback);
}

export async function createPlacement(data) {
  if (isFirebaseConfigured) return addDoc(collection(db, COLLECTION), data);
  placementsStore.add({ ...data, id: uid("pl") });
}

export async function deletePlacement(id) {
  if (isFirebaseConfigured) return deleteDoc(doc(db, COLLECTION, id));
  placementsStore.remove(id);
}
