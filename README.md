# أرزاق | ARZAQ — منصة الوظائف (React.js + Firebase)

مشروع React.js حقيقي (Vite) لمنصة أرزاق — بدون أي حسابات مستخدمين، التقديم على
الوظائف عبر واتساب فقط، وFirebase هو الـ Backend الوحيد.

## البنية

```
src/
  firebase/          # طبقة الاتصال الوحيدة بـ Firebase (Firestore/Auth/Storage)
    config.js
    jobsService.js
    categoriesService.js
    citiesService.js
    organizationsService.js
    adsService.js
    placementsService.js
    analyticsService.js
    authService.js
  data/
    seedData.js       # بيانات بشكل Firestore documents لوضع العرض التجريبي
    localStore.js      # مخزن في الذاكرة يحاكي onSnapshot عند عدم توفر Firebase
  context/
    DataContext.jsx    # مصدر بيانات موحّد لكل التطبيق (jobs, categories, ...)
    AdminAuthContext.jsx
  routes/
    ProtectedRoute.jsx  # يحمي /admin و /ads-admin بحسب الدور
  components/
    layout/            # Header, Footer, Logo, PublicLayout
    jobs/               # JobCard, ApplyModal (تدفّق واتساب), JobFilters
    common/             # SectionHeading, StatCard, ConfirmDeleteButton, InfoDisplay
    admin/               # نماذج ومكونات لوحة المشرف الرئيسي
    ads-admin/            # نماذج ومكونات لوحة مشرف الإعلانات
  pages/
    HomePage, JobsPage, JobDetailPage, CategoriesPage, CitiesPage,
    RemotePage, AboutPage, ContactPage, NotFoundPage
    admin/    AdminLoginPage, AdminLayout, AdminDashboardPage, AdminJobsPage, ...
    ads-admin/ AdsAdminLoginPage, AdsAdminLayout, AdsAdminDashboardPage, ...
  App.jsx     # كل مسارات React Router في مكان واحد
  main.jsx    # نقطة الدخول
  index.css   # الهوية البصرية (الألوان، الخطوط، مكونات CSS المشتركة)
```

## المسارات (React Router)

عامة (بدون أي حساب مستخدم):
`/` · `/jobs` · `/jobs/:slug` · `/categories` · `/cities` · `/remote-jobs` · `/about` · `/contact`

إدارية (Firebase Authentication فقط):
`/admin/login` · `/admin` · `/admin/jobs` · `/admin/organizations` · `/admin/categories` · `/admin/cities`
`/ads-admin/login` · `/ads-admin` · `/ads-admin/ads` · `/ads-admin/placements`

## التشغيل محليًا

```bash
npm install
npm run dev
```

يفتح على `http://localhost:5173`.

## وضعان للتشغيل

**1) وضع العرض التجريبي (Demo Mode) — يعمل مباشرة بدون أي إعداد:**
إن تُرك ملف `.env` فارغًا أو غير موجود، يكتشف `src/firebase/config.js` ذلك تلقائيًا
(`isFirebaseConfigured = false`) وتستخدم كل الخدمات في `src/firebase/*.js`
مخزنًا محليًا في الذاكرة (`src/data/localStore.js`) بدل Firestore. مفيد للتطوير
والعرض السريع للتصميم والتدفقات دون إنشاء مشروع Firebase فورًا. لا يستخدم أي
`localStorage` — البيانات تُعاد لحالتها الأولية عند تحديث الصفحة.

**2) وضع الإنتاج — Firebase حقيقي:**

```bash
cp .env.example .env
# املأ القيم من إعدادات مشروعك في Firebase Console
npm run dev
```

بمجرد ملء `.env`، تتحول كل الخدمات تلقائيًا للقراءة والكتابة من/إلى Firestore
الحقيقي عبر `onSnapshot` (تحديثات لحظية) و`addDoc`/`updateDoc`/`deleteDoc`،
ومصادقة `/admin` و`/ads-admin` تتحول لـ `signInWithEmailAndPassword` الحقيقي مع
قراءة الدور (`role: "main" | "ads"`) من custom claims في التوكن.

## Firestore Schema و Security Rules

راجع `ARZAQ_Firebase_Architecture.md` في هذا المجلد — يحتوي كل المجموعات
(collections)، قواعد الأمان الكاملة لـ Firestore وStorage، وأدوار Auth.

## حسابات الدخول التجريبية (Demo Mode فقط)

| الدور | البريد | كلمة المرور |
|---|---|---|
| Main Admin | admin@arzaq.com | admin123 |
| Ads Admin | ads@arzaq.com | ads123 |

هذه الحسابات معرّفة في `src/firebase/authService.js` ولا تُستخدم إطلاقًا عند
ضبط `.env` باتصال Firebase حقيقي.

## ملاحظات مهمة

- لا يوجد Register / Login لأي زائر أو باحث عن عمل — بحث فقط تسجيل الدخول
  الإداري لدورين اثنين فقط (Main Admin, Ads Admin).
- التقديم على أي وظيفة هو فقط عبر نافذة (اسم + هاتف) تفتح رابط واتساب جاهز؛
  لا تُخزَّن هذه البيانات في أي مكان كحساب أو سجل مستخدم.
- التصميم والهوية البصرية (الألوان `#2C929E` / `#FD9604` / `#FFFFFF`، الخطوط
  العربية، تخطيط RTL) محفوظة بالكامل من النسخة السابقة.
- Tailwind مُحمّل عبر CDN داخل `index.html` للتبسيط؛ للإنتاج الجاد يُستحسن
  استبداله ببناء Tailwind عبر PostCSS ضمن خط أنابيب Vite.
