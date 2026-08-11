// معرّف عشوائي قصير يُستخدم في وضع العرض التجريبي (Demo Mode) بدل معرّفات Firestore التلقائية.
export function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
