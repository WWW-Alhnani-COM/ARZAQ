// ثوابت عامة مستخدمة عبر المشروع — قوائم اختيار موحّدة لكل النماذج والفلاتر.
export const WORK_MODES = ["حضوري", "عن بُعد", "هجين"];
export const JOB_TYPES = ["دوام كامل", "دوام جزئي", "تدريب", "عقد مؤقت"];
export const EXP_LEVELS = ["حديث التخرج", "1-3 سنوات", "3-5 سنوات", "أكثر من 5 سنوات"];
export const JOB_STATUSES = ["published", "paused", "archived"];
export const STATUS_LABEL = { published: "منشورة", paused: "متوقفة", archived: "مؤرشفة" };

// ✅ تم التعديل: استخدام الإنجليزية للقيم مع الاحتفاظ بالأسماء العربية للعرض
export const AD_PAGES = ["home", "job", "jobs", "categories"];
export const AD_POSITIONS = ["hero", "sidebar", "footer", "between"];

// ✅ إضافة كائنات لعرض الأسماء العربية في الواجهة
export const AD_PAGES_LABELS = {
  home: "الرئيسية",
  job: "صفحة الوظيفة",
  jobs: "صفحة كل الوظائف",
  categories: "التصنيفات"
};

export const AD_POSITIONS_LABELS = {
  hero: "أعلى الصفحة",
  sidebar: "الشريط الجانبي",
  footer: "أسفل الصفحة",
  between: "بين النتائج"
};
