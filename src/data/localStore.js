// طبقة تخزين محلي في الذاكرة (In-Memory) تحاكي واجهة Firestore Realtime
// (subscribe يشبه onSnapshot) — تُستخدم فقط في وضع العرض التجريبي عندما
// لا يوجد اتصال Firebase حقيقي. هذا ليس localStorage ولا أي تخزين متصفح؛
// البيانات تُعاد لحالتها الأولية عند إعادة تحميل الصفحة.
function createCollectionStore(seed) {
  let items = [...seed];
  let listeners = [];

  function notify() {
    listeners.forEach((cb) => cb([...items]));
  }

  return {
    subscribe(cb) {
      listeners.push(cb);
      cb([...items]);
      return () => {
        listeners = listeners.filter((l) => l !== cb);
      };
    },
    add(item) {
      items = [item, ...items];
      notify();
    },
    update(id, data) {
      items = items.map((i) => (i.id === id ? { ...i, ...data } : i));
      notify();
    },
    remove(id) {
      items = items.filter((i) => i.id !== id);
      notify();
    },
    removeWhere(pred) {
      items = items.filter((i) => !pred(i));
      notify();
    },
  };
}

import { seedJobs, seedCategories, seedCities, seedOrganizations, seedAds, seedPlacements } from "./seedData";

export const jobsStore = createCollectionStore(seedJobs);
export const categoriesStore = createCollectionStore(seedCategories);
export const citiesStore = createCollectionStore(seedCities);
export const organizationsStore = createCollectionStore(seedOrganizations);
export const adsStore = createCollectionStore(seedAds);
export const placementsStore = createCollectionStore(seedPlacements);

