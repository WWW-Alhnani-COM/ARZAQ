import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import ApplyModal from "../components/jobs/ApplyModal";
import { InfoRow, InfoList } from "../components/common/InfoDisplay";
import { logJobView } from "../firebase/analyticsService";

function DetailSection({ title, children }) {
  return (
    <section className="mb-8 last:mb-0">
      <h2 className="mb-3 font-display text-lg font-bold" style={{ color: "var(--teal-900)" }}>{title}</h2>
      {children}
    </section>
  );
}

function EmptyDetail({ children }) {
  return <p className="text-sm leading-7 text-gray-500">{children}</p>;
}

export default function JobDetailPage() {
  const { slug } = useParams();
  const { jobs = [] } = useData();
  const job = jobs.find((item) => item.slug === slug && item.status === "published");
  const [showApply, setShowApply] = useState(false);

  useEffect(() => {
    if (job) logJobView(job.id);
  }, [job?.id]);

  useEffect(() => {
    document.title = job ? `${job.jobTitle} — ${job.organizationName} | أرزاق` : "تفاصيل الوظيفة | أرزاق";
    return () => {
      document.title = "أرزاق | فرصتك القادمة";
    };
  }, [job?.jobTitle, job?.organizationName]);

  if (!job) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:py-24">
        <div className="card rounded-2xl px-6 py-10 sm:px-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl" style={{ background: "var(--teal-100)", color: "var(--teal-800)" }} aria-hidden="true">⌕</div>
          <h1 className="font-display text-xl font-extrabold" style={{ color: "var(--teal-900)" }}>الوظيفة غير متاحة</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">قد تكون الوظيفة غير منشورة أو لم يعد الرابط متاحًا.</p>
          <Link className="btn-primary mt-6 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold" to="/jobs">
            استعراض جميع الوظائف
          </Link>
        </div>
      </div>
    );
  }

  const responsibilities = Array.isArray(job.responsibilities) ? job.responsibilities : [];
  const requirements = Array.isArray(job.requirements) ? job.requirements : [];
  const benefits = Array.isArray(job.benefits) ? job.benefits : [];
  const skills = Array.isArray(job.skills) ? job.skills : [];
  const languages = Array.isArray(job.languages) ? job.languages : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-28 sm:py-8 md:px-8 md:pb-12">
      <nav aria-label="مسار التنقل" className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="transition hover:text-teal-800">الرئيسية</Link>
        <span aria-hidden="true">/</span>
        <Link to="/jobs" className="transition hover:text-teal-800">الوظائف</Link>
        <span aria-hidden="true">/</span>
        <span className="max-w-[55vw] truncate font-medium text-gray-700" aria-current="page">{job.jobTitle}</span>
      </nav>

      <header className="card mb-6 overflow-hidden rounded-2xl">
        <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, var(--orange), var(--teal))" }} />
        <div className="p-5 sm:p-7 md:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl sm:h-16 sm:w-16 sm:text-3xl"
                style={{ background: "var(--teal-100)", color: "var(--teal-900)" }}
                aria-hidden="true"
              >
                {job.organizationLogo || "🏢"}
              </div>
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {job.featured && <span className="badge-featured rounded-full px-2.5 py-1 text-[11px] font-bold">وظيفة مميزة</span>}
                  {job.category && <span className="badge rounded-full px-2.5 py-1 text-[11px] font-semibold">{job.category}</span>}
                </div>
                <h1 className="break-words font-display text-2xl font-extrabold leading-tight sm:text-3xl" style={{ color: "var(--teal-900)" }}>{job.jobTitle}</h1>
                <p className="mt-2 text-sm font-medium text-gray-600 sm:text-base">{job.organizationName}</p>
                {job.publishDate && <p className="mt-2 text-xs text-gray-400">تاريخ النشر: {job.publishDate}</p>}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowApply(true)}
              className="btn-primary hidden shrink-0 items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold shadow-sm sm:inline-flex"
            >
              <span>تقديم الآن</span><span aria-hidden="true">←</span>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t pt-5 sm:grid-cols-3 lg:grid-cols-4" style={{ borderColor: "var(--line)" }}>
            <InfoRow label="المدينة" value={job.city} />
            <InfoRow label="نوع الوظيفة" value={job.jobType} />
            <InfoRow label="نمط العمل" value={job.workMode} />
            <InfoRow label="الخبرة" value={job.experienceLevel} />
            <InfoRow label="الراتب" value={job.salary} />
            <InfoRow label="آخر موعد للتقديم" value={job.expiryDate} />
          </div>
        </div>
      </header>

      <div className="grid items-start gap-6 md:grid-cols-3 md:gap-8">
        <main className="min-w-0 space-y-6 md:col-span-2">
          <div className="card rounded-2xl p-5 sm:p-7">
            <DetailSection title="نبذة عن الوظيفة">
              {job.description ? (
                <p className="whitespace-pre-line break-words text-sm leading-8 text-gray-600">{job.description}</p>
              ) : (
                <EmptyDetail>لم تتم إضافة وصف تفصيلي لهذه الوظيفة بعد.</EmptyDetail>
              )}
            </DetailSection>
            <div className="border-t pt-6" style={{ borderColor: "var(--line)" }}>
              <InfoList title="المسؤوليات" items={responsibilities} />
              <InfoList title="المؤهلات المطلوبة" items={requirements} />
              <InfoList title="المميزات" items={benefits} />
              {!responsibilities.length && !requirements.length && !benefits.length && (
                <EmptyDetail>لم تُضف تفاصيل إضافية عن المسؤوليات أو المؤهلات أو المميزات.</EmptyDetail>
              )}
            </div>
          </div>

          <div className="card rounded-2xl p-5 sm:p-7">
            <DetailSection title="طريقة التقديم">
              <p className="text-sm leading-7 text-gray-600">
                ابدأ التقديم من الزر أدناه. أدخل اسمك ورقم هاتفك، ثم راجع الرسالة الجاهزة التي ستُفتح في واتساب وأرسلها إلى جهة التوظيف.
              </p>
              <button
                type="button"
                onClick={() => setShowApply(true)}
                className="btn-primary mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold sm:w-auto sm:px-8"
              >
                التقديم على هذه الوظيفة <span aria-hidden="true">←</span>
              </button>
            </DetailSection>
          </div>
        </main>

        <aside className="space-y-5 md:sticky md:top-6">
          <div className="card rounded-2xl p-5">
            <h2 className="mb-4 font-display text-base font-bold" style={{ color: "var(--teal-900)" }}>ملخص الوظيفة</h2>
            <dl className="space-y-4">
              {job.city && <div><dt className="text-xs text-gray-400">الموقع</dt><dd className="mt-1 break-words text-sm font-semibold text-gray-700">{job.city}</dd></div>}
              {job.jobType && <div><dt className="text-xs text-gray-400">نوع الوظيفة</dt><dd className="mt-1 break-words text-sm font-semibold text-gray-700">{job.jobType}</dd></div>}
              {job.workMode && <div><dt className="text-xs text-gray-400">نمط العمل</dt><dd className="mt-1 break-words text-sm font-semibold text-gray-700">{job.workMode}</dd></div>}
              {job.experienceLevel && <div><dt className="text-xs text-gray-400">مستوى الخبرة</dt><dd className="mt-1 break-words text-sm font-semibold text-gray-700">{job.experienceLevel}</dd></div>}
              {job.salary && <div><dt className="text-xs text-gray-400">الراتب</dt><dd className="mt-1 break-words text-sm font-bold" style={{ color: "var(--orange-600)" }}>{job.salary}</dd></div>}
            </dl>
            <button type="button" onClick={() => setShowApply(true)} className="btn-primary mt-6 hidden w-full rounded-xl py-3 text-sm font-bold md:block">
              تقديم الآن عبر واتساب
            </button>
          </div>

          {skills.length > 0 && (
            <div className="card rounded-2xl p-5">
              <h2 className="mb-3 font-display text-sm font-bold text-gray-700">المهارات المطلوبة</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => <span key={`${skill}-${index}`} className="badge max-w-full break-words rounded-full px-2.5 py-1.5 text-xs">{skill}</span>)}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="card rounded-2xl p-5">
              <h2 className="mb-3 font-display text-sm font-bold text-gray-700">اللغات</h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((language, index) => <span key={`${language}-${index}`} className="badge max-w-full break-words rounded-full px-2.5 py-1.5 text-xs">{language}</span>)}
              </div>
            </div>
          )}
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-3 shadow-[0_-8px_24px_rgba(18,46,51,0.08)] backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold" style={{ color: "var(--teal-900)" }}>{job.jobTitle}</p>
            <p className="truncate text-xs text-gray-500">{job.organizationName}</p>
          </div>
          <button type="button" onClick={() => setShowApply(true)} className="btn-primary shrink-0 rounded-xl px-5 py-3 text-sm font-bold">
            تقديم الآن
          </button>
        </div>
      </div>

      {showApply && <ApplyModal job={job} onClose={() => setShowApply(false)} />}
    </div>
  );
}
