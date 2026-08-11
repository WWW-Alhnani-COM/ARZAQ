// بيانات أولية بشكل Firestore documents تمامًا — تُستخدم فقط في وضع العرض
// التجريبي (عندما لا تتوفر إعدادات Firebase في .env). بمجرد ربط مشروع
// Firebase حقيقي، تتوقف هذه البيانات عن الاستخدام تلقائيًا ويقرأ التطبيق
// من Firestore مباشرة عبر src/firebase/*.js.
import { slugify } from "../utils/slugify";

export const seedCategories = [
  "تقنية المعلومات", "المبيعات والتسويق", "المحاسبة والمالية", "الموارد البشرية",
  "الهندسة", "التعليم", "الصحة", "خدمة العملاء", "اللوجستيات",
].map((name, i) => ({ id: `cat_${i}`, name }));

export const seedCities = [
  "صنعاء", "عدن", "تعز", "الحديدة", "إب", "المكلا", "حضرموت", "عن بُعد",
].map((name, i) => ({ id: `city_${i}`, name }));

export const seedOrganizations = [
  { id: "org_1", name: "شركة نماء الرقمية", logo: "💠", description: "شركة تقنية متخصصة في تطوير المنتجات الرقمية.", website: "https://namaa.example.com" },
  { id: "org_2", name: "مجموعة الوادي التجارية", logo: "🧮", description: "مجموعة تجارية متعددة الأنشطة.", website: "https://alwadi.example.com" },
  { id: "org_3", name: "وكالة المدى للإعلان", logo: "📣", description: "وكالة تسويق وإعلان رقمي.", website: "https://almada.example.com" },
  { id: "org_4", name: "شركة البناء الحديث", logo: "🏗️", description: "شركة مقاولات وإنشاءات.", website: "" },
  { id: "org_5", name: "مجموعة أرَام القابضة", logo: "🧑‍💼", description: "مجموعة قابضة متعددة القطاعات.", website: "" },
  { id: "org_6", name: "استوديو بكسل التقني", logo: "📱", description: "استوديو تطوير تطبيقات جوال.", website: "" },
  { id: "org_7", name: "مركز اتصال يمن كول", logo: "🎧", description: "مركز اتصال ودعم عملاء.", website: "" },
  { id: "org_8", name: "مدارس النور الأهلية", logo: "📘", description: "مدارس أهلية للتعليم العام.", website: "" },
];

const rawJobs = [
  { id: 1, jobTitle: "مطوّر واجهات أمامية React", organizationName: "شركة نماء الرقمية", organizationLogo: "💠", category: "تقنية المعلومات", city: "صنعاء", workMode: "هجين", jobType: "دوام كامل", experienceLevel: "1-3 سنوات", salary: "600 - 900 $", description: "نبحث عن مطوّر واجهات أمامية شغوف بالتفاصيل للانضمام لفريق المنتج وبناء تجارب استخدام سريعة وسلسة لعملائنا.", responsibilities: ["بناء واجهات مستخدم باستخدام React", "التعاون مع فريق UX/UI لتحويل التصاميم إلى كود", "تحسين أداء التطبيق وسرعة التحميل"], requirements: ["خبرة عملية بـ React أو ما يعادلها", "إلمام جيد بـ HTML/CSS/JavaScript", "القدرة على العمل ضمن فريق"], skills: ["React", "JavaScript", "Tailwind CSS", "Git"], languages: ["العربية", "إنجليزية جيدة"], benefits: ["تأمين صحي", "عمل مرن", "بيئة تعلم مستمر"], publishDate: "2026-08-05", expiryDate: "2026-09-10", featured: true, status: "published" },
  { id: 2, jobTitle: "محاسب أول", organizationName: "مجموعة الوادي التجارية", organizationLogo: "🧮", category: "المحاسبة والمالية", city: "عدن", workMode: "حضوري", jobType: "دوام كامل", experienceLevel: "3-5 سنوات", salary: "500 - 700 $", description: "مطلوب محاسب أول لإدارة الحسابات العامة وإعداد التقارير المالية الدورية لإدارة المجموعة.", responsibilities: ["إعداد القيود المحاسبية الشهرية", "مراجعة التقارير المالية", "متابعة الحسابات البنكية والتسويات"], requirements: ["بكالوريوس محاسبة", "خبرة لا تقل عن 3 سنوات", "إتقان برامج المحاسبة الإلكترونية"], skills: ["Excel", "QuickBooks", "التقارير المالية"], languages: ["العربية"], benefits: ["بدل مواصلات", "تأمين صحي"], publishDate: "2026-08-08", expiryDate: "2026-09-01", featured: true, status: "published" },
  { id: 3, jobTitle: "أخصائي تسويق رقمي", organizationName: "وكالة المدى للإعلان", organizationLogo: "📣", category: "المبيعات والتسويق", city: "عن بُعد", workMode: "عن بُعد", jobType: "دوام كامل", experienceLevel: "1-3 سنوات", salary: "400 - 600 $", description: "انضم لفريق التسويق الرقمي لإدارة الحملات الإعلانية وتحليل الأداء عبر منصات التواصل الاجتماعي.", responsibilities: ["إدارة حملات إعلانية على السوشيال ميديا", "تحليل بيانات الأداء وإعداد تقارير", "إعداد محتوى تسويقي"], requirements: ["خبرة في إدارة الحملات الإعلانية", "إلمام بأدوات التحليل"], skills: ["Meta Ads", "Google Ads", "تحليل البيانات"], languages: ["العربية", "إنجليزية أساسية"], benefits: ["عمل عن بُعد بالكامل", "ساعات مرنة"], publishDate: "2026-08-09", expiryDate: "2026-09-15", featured: false, status: "published" },
  { id: 4, jobTitle: "مهندس مدني موقع", organizationName: "شركة البناء الحديث", organizationLogo: "🏗️", category: "الهندسة", city: "تعز", workMode: "حضوري", jobType: "دوام كامل", experienceLevel: "3-5 سنوات", salary: "يُحدد بعد المقابلة", description: "مطلوب مهندس مدني للإشراف على تنفيذ مشاريع الإنشاءات ومتابعة الجودة في الموقع.", responsibilities: ["الإشراف اليومي على الموقع", "متابعة الجداول الزمنية للتنفيذ", "التنسيق مع المقاولين والموردين"], requirements: ["بكالوريوس هندسة مدنية", "خبرة ميدانية في مواقع الإنشاء"], skills: ["AutoCAD", "إدارة المواقع", "قراءة المخططات"], languages: ["العربية"], benefits: ["سكن للموظف", "تأمين صحي"], publishDate: "2026-08-02", expiryDate: "2026-08-30", featured: false, status: "published" },
  { id: 5, jobTitle: "مسؤول موارد بشرية", organizationName: "مجموعة أرَام القابضة", organizationLogo: "🧑‍💼", category: "الموارد البشرية", city: "صنعاء", workMode: "حضوري", jobType: "دوام كامل", experienceLevel: "1-3 سنوات", salary: "450 - 600 $", description: "نبحث عن مسؤول موارد بشرية لإدارة عمليات التوظيف والشؤون الإدارية للموظفين.", responsibilities: ["إدارة عمليات التوظيف من الإعلان حتى التعيين", "متابعة ملفات الموظفين", "تنظيم برامج التدريب الداخلي"], requirements: ["بكالوريوس إدارة أعمال أو ما يعادله", "مهارات تواصل قوية"], skills: ["التوظيف", "إدارة الأداء", "Excel"], languages: ["العربية"], benefits: ["تأمين صحي", "بدل هاتف"], publishDate: "2026-08-07", expiryDate: "2026-09-05", featured: false, status: "published" },
  { id: 6, jobTitle: "مطوّر تطبيقات موبايل Flutter", organizationName: "استوديو بكسل التقني", organizationLogo: "📱", category: "تقنية المعلومات", city: "عن بُعد", workMode: "عن بُعد", jobType: "عقد مؤقت", experienceLevel: "1-3 سنوات", salary: "700 - 1000 $", description: "مطلوب مطوّر Flutter لبناء تطبيق جوال جديد بالتعاون مع فريق مصغّر وسريع الحركة.", responsibilities: ["بناء واجهات التطبيق باستخدام Flutter", "ربط التطبيق بواجهات Firebase", "اختبار وإصلاح الأخطاء"], requirements: ["خبرة عملية في Flutter/Dart", "معرفة أساسية بـ Firebase"], skills: ["Flutter", "Dart", "Firebase"], languages: ["العربية", "إنجليزية جيدة"], benefits: ["عمل عن بُعد", "دفعات مرحلية"], publishDate: "2026-08-10", expiryDate: "2026-09-20", featured: true, status: "published" },
  { id: 7, jobTitle: "ممثل خدمة عملاء", organizationName: "مركز اتصال يمن كول", organizationLogo: "🎧", category: "خدمة العملاء", city: "الحديدة", workMode: "حضوري", jobType: "دوام كامل", experienceLevel: "حديث التخرج", salary: "300 - 400 $", description: "مطلوب ممثلي خدمة عملاء للرد على استفسارات العملاء عبر الهاتف والدردشة.", responsibilities: ["الرد على مكالمات العملاء", "تسجيل الشكاوى ومتابعتها", "تقديم حلول سريعة للمشاكل"], requirements: ["مهارة تواصل ممتازة", "القدرة على العمل بنظام الورديات"], skills: ["خدمة العملاء", "حل المشكلات"], languages: ["العربية"], benefits: ["تدريب مدفوع", "حوافز شهرية"], publishDate: "2026-08-01", expiryDate: "2026-08-25", featured: false, status: "published" },
  { id: 8, jobTitle: "معلم/ة رياضيات", organizationName: "مدارس النور الأهلية", organizationLogo: "📘", category: "التعليم", city: "إب", workMode: "حضوري", jobType: "دوام كامل", experienceLevel: "1-3 سنوات", salary: "350 - 500 $", description: "مطلوب معلم/ة رياضيات للمرحلة الثانوية للعام الدراسي القادم.", responsibilities: ["تدريس منهج الرياضيات للمرحلة الثانوية", "إعداد الاختبارات وتصحيحها", "متابعة مستوى الطلاب"], requirements: ["بكالوريوس رياضيات أو تربية", "خبرة تدريسية يُفضل"], skills: ["التدريس", "إدارة الصف"], languages: ["العربية"], benefits: ["تأمين صحي", "إجازة صيفية"], publishDate: "2026-07-29", expiryDate: "2026-08-20", featured: false, status: "published" },
];

export const seedJobs = rawJobs.map((j) => ({
  ...j,
  id: String(j.id),
  slug: slugify(j.jobTitle, j.id),
  createdAt: j.publishDate,
  updatedAt: j.publishDate,
}));

export const seedAds = [
  { id: "ad_1", title: "إعلان بنك التضامن", imageUrl: "", targetUrl: "https://example.com", active: true, startDate: "2026-08-01", endDate: "2026-09-01" },
  { id: "ad_2", title: "دعاية معهد التقنية", imageUrl: "", targetUrl: "https://example.com", active: false, startDate: "2026-07-01", endDate: "2026-07-31" },
];

export const seedPlacements = [
  { id: "pl_1", adId: "ad_1", page: "الرئيسية", position: "أعلى الصفحة", priority: 1 },
  { id: "pl_2", adId: "ad_1", page: "صفحة الوظيفة", position: "الشريط الجانبي", priority: 2 },
];
