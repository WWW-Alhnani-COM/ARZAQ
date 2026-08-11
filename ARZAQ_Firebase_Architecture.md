# أرزاق | ARZAQ — الوثيقة التقنية (Firebase Architecture)

هذه الوثيقة تكمّل النموذج الأولي (`index.html`) وتوثّق كل ما يلزم لربط الواجهة الأمامية بـ Firebase كخدمة Backend وحيدة، دون أي حسابات مستخدمين وبدون أي خادم تقليدي.

---

## 1. مبدأ النظام
- لا يوجد Register / Login / Profile لزوار الموقع أو للشركات.
- التقديم على الوظائف يتم حصريًا عبر رابط WhatsApp Click-to-Chat (`wa.me`).
- Firebase Authentication يُستخدم فقط لحسابين إداريين: **Main Admin** و **Ads Admin** (عبر custom claims).
- كل البيانات العامة (وظائف، تصنيفات، مدن، جهات، إعلانات، إحصائيات) تُخزَّن في Firestore.

---

## 2. مخطط Firestore (Schema)

```
jobs (collection)
  {jobId}
    jobTitle: string
    organizationName: string
    organizationLogo: string (Storage URL)
    category: string
    city: string
    workMode: "حضوري" | "عن بُعد" | "هجين"
    jobType: "دوام كامل" | "دوام جزئي" | "تدريب" | "عقد مؤقت"
    experienceLevel: string
    salary: string | null
    description: string
    responsibilities: string[]
    requirements: string[]
    skills: string[]
    languages: string[]
    benefits: string[]
    publishDate: timestamp
    expiryDate: timestamp
    featured: boolean
    status: "draft" | "published" | "paused" | "archived"
    slug: string (unique, indexed)
    createdAt: timestamp
    updatedAt: timestamp

categories (collection)
  {categoryId}: { name, slug, order }

cities (collection)
  {cityId}: { name, slug }

organizations (collection)
  {orgId}: { name, logo (Storage URL), description, website }

advertisements (collection)
  {adId}: { title, imageUrl (Storage URL), targetUrl, active, startDate, endDate }

advertisement_placements (collection)
  {placementId}: { adId, page, position, priority }

advertisement_impressions (collection)   -- write-only, no personal data
  {eventId}: { adId, page, timestamp }

advertisement_clicks (collection)        -- write-only, no personal data
  {eventId}: { adId, page, timestamp }

job_views (collection)                   -- write-only analytics, no personal data
  {eventId}: { jobId, timestamp, referrer? }

whatsapp_clicks (collection)             -- write-only analytics, no personal data
  {eventId}: { jobId, timestamp }
  -- NOTE: applicant name/phone are NEVER written here. They only ever
  -- leave the browser inside the wa.me deep link sent to WhatsApp.

admins (collection, metadata only — optional)
  {uid}: { displayName, role: "main" | "ads", createdAt }
```

---

## 3. أدوار Firebase Authentication

| الدور | الوصول | آلية التمييز |
|---|---|---|
| Main Admin | `/admin` — كل الصلاحيات على `jobs`, `categories`, `cities`, `organizations` | custom claim `role: "main"` |
| Ads Admin | `/ads-admin` — صلاحيات على `advertisements`, `advertisement_placements` فقط | custom claim `role: "ads"` |
| الزوار | قراءة عامة فقط، بلا تسجيل دخول | بدون Auth |

يتم تعيين الـ custom claims عبر Firebase Function تُستدعى يدويًا من Main Admin فقط (لا يوجد تسجيل ذاتي للمشرفين).

---

## 4. Firestore Security Rules (مسودة)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isMainAdmin() {
      return request.auth != null && request.auth.token.role == 'main';
    }
    function isAdsAdmin() {
      return request.auth != null && request.auth.token.role == 'ads';
    }

    // محتوى عام — قراءة مفتوحة للجميع، كتابة للـ Main Admin فقط
    match /jobs/{jobId} {
      allow read: if resource.data.status == 'published' || isMainAdmin();
      allow write: if isMainAdmin();
    }
    match /categories/{id} { allow read: if true; allow write: if isMainAdmin(); }
    match /cities/{id}     { allow read: if true; allow write: if isMainAdmin(); }
    match /organizations/{id} { allow read: if true; allow write: if isMainAdmin(); }

    // إعلانات — قراءة عامة، كتابة لمشرف الإعلانات فقط
    match /advertisements/{id}            { allow read: if true; allow write: if isAdsAdmin(); }
    match /advertisement_placements/{id}  { allow read: if true; allow write: if isAdsAdmin(); }

    // إحصائيات — كتابة فقط (create)، بدون قراءة أو تعديل من الزوار
    match /advertisement_impressions/{id} { allow create: if true; allow read, update, delete: if isMainAdmin() || isAdsAdmin(); }
    match /advertisement_clicks/{id}      { allow create: if true; allow read, update, delete: if isMainAdmin() || isAdsAdmin(); }
    match /job_views/{id}                 { allow create: if true; allow read, update, delete: if isMainAdmin(); }
    match /whatsapp_clicks/{id}           { allow create: if true; allow read, update, delete: if isMainAdmin(); }

    // بيانات المشرفين فقط (metadata) — لا وصول للزوار إطلاقًا
    match /admins/{uid} { allow read, write: if isMainAdmin(); }
  }
}
```

## 5. Storage Security Rules (مسودة)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /organizations/{allPaths=**} { allow read: if true; allow write: if request.auth != null; }
    match /ads/{allPaths=**}           { allow read: if true; allow write: if request.auth != null; }
  }
}
```

---

## 6. Firebase Functions (اختياري لكنه مُستحسن)

- `logAnalyticsEvent` (Callable/HTTP): يستقبل `{jobId, type}` ويكتب إلى `job_views` أو `whatsapp_clicks` — طبقة تحقق خفيفة قبل الكتابة المباشرة من العميل.
- `setAdminRole` (Callable, قابل للاستدعاء من Main Admin فقط): يضبط custom claims لمشرف جديد.
- `onJobWrite` (Firestore Trigger): يحدّث `updatedAt` تلقائيًا ويتحقق من تفرّد الـ `slug`.

---

## 7. الفهرسة (Indexes) المطلوبة في Firestore

- `jobs`: مركّب على (`status`, `featured`, `publishDate` DESC) لصفحة الوظائف المميزة.
- `jobs`: مركّب على (`status`, `category`, `publishDate` DESC).
- `jobs`: مركّب على (`status`, `city`, `publishDate` DESC).
- `jobs`: حقل `slug` (unique lookup لصفحة `/jobs/[slug]`).

> بحث النص الحر (title/skills/description) لا يدعمه Firestore native بكفاءة لمجموعات بيانات كبيرة؛ الحل الموصى به عند النمو هو فهرسة خارجية (Algolia/Typesense) تُغذّى من `onJobWrite`. النموذج الحالي يستخدم فلترة من جهة العميل، وهي كافية لحجم بيانات صغير-متوسط.

---

## 8. SEO

- كل وظيفة تُقدَّم عبر SSR/SSG (Next.js على Firebase Hosting + Cloud Functions أو `output: export` مع ISR بديل) بحيث تُفهرَس محركات البحث المسار `/jobs/[slug]` مباشرة.
- `<title>` و meta description ديناميكيان من `jobTitle` + `organizationName` + `city`.
- بيانات مهيكلة (Structured Data) بنوع `JobPosting` (schema.org) لكل صفحة وظيفة، مبنية من نفس حقول Firestore.
- Sitemap ديناميكي يُولَّد من مجموعة `jobs` (الوظائف المنشورة فقط).

---

## 9. تسلسل التنفيذ الموصى به

1. تهيئة مشروع Firebase (Firestore + Auth + Storage + Hosting + Functions).
2. إنشاء المجموعات (collections) أعلاه وتحميل بيانات أولية (categories, cities).
3. نشر Security Rules (Firestore + Storage) كما هو موضّح أعلاه.
4. إنشاء حساب Main Admin يدويًا في Firebase Auth Console + تعيين `role: "main"` عبر Function.
5. بناء واجهات `/admin` و `/ads-admin` (نماذج CRUD) مرتبطة بـ Firestore عبر الـ SDK.
6. ربط صفحات الزوار (`/`, `/jobs`, `/jobs/[slug]`, ...) بقراءات Firestore الحقيقية بدل البيانات الوهمية في `index.html`.
7. تفعيل أحداث `job_views` و `whatsapp_clicks` من صفحة الوظيفة ومودال التقديم.
8. اختبار تدفق واتساب على Android وiPhone وDesktop.
9. ربط SSR/SSG + structured data + sitemap.
10. النشر عبر Firebase Hosting وربط الدومين.

---

## 10. ملاحظة حول رقم واتساب

الرقم المستخدم في الرابط داخل `index.html` هو `967774218060` (افتراض أن `774218060` رقم يمني ويُسبق برمز الدولة `967` لضمان عمل `wa.me` على كل الأجهزة). إن كان الرقم يتبع دولة أخرى، يجب تعديل الثابت `WHATSAPP_NUMBER` في أعلى ملف `index.html`.
