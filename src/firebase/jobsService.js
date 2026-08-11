// كل عمليات القراءة/الكتابة على مجموعة "jobs" في Firestore تمر من هنا فقط.
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { isFirebaseConfigured, db } from "./config";
import { jobsStore } from "../data/localStore";
import { slugify } from "../utils/slugify";
import { uid, todayISO } from "../utils/ids";

const COLLECTION = "jobs";

export function subscribeToJobs(callback) {
  if (isFirebaseConfigured) {
    const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
  }
  return jobsStore.subscribe(callback);
}

export async function createJob(data) {
  if (isFirebaseConfigured) {
    const ref = await addDoc(collection(db, COLLECTION), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await updateDoc(ref, { slug: slugify(data.jobTitle, ref.id) });
    return ref.id;
  }
  const id = uid("job");
  jobsStore.add({ ...data, id, slug: slugify(data.jobTitle, id), createdAt: todayISO(), updatedAt: todayISO() });
  return id;
}

export async function updateJob(id, data) {
  if (isFirebaseConfigured) {
    return updateDoc(doc(db, COLLECTION, id), { ...data, updatedAt: serverTimestamp() });
  }
  jobsStore.update(id, { ...data, updatedAt: todayISO() });
}

export async function deleteJob(id) {
  if (isFirebaseConfigured) return deleteDoc(doc(db, COLLECTION, id));
  jobsStore.remove(id);
}
