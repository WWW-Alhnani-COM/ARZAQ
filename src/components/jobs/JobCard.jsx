import { Link } from "react-router-dom";

function formatPublishDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export default function JobCard({ job }) {
  const publishedDate = formatPublishDate(job.publishDate);

  return (
    <Link
      to={`/jobs/${job.slug}`}
      aria-label={`عرض تفاصيل وظيفة ${job.jobTitle} لدى ${job.organizationName}`}
      className="tick-mark card group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--line)] p-4 text-right shadow-sm transition duration-200 hover:-translate-y-1 hover:border-teal-700/25 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 sm:p-5"
    >
      <div className="mb-4 flex items-start gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ring-1 ring-teal-900/5"
          style={{ background: "var(--teal-100)", color: "var(--teal-900)" }}
          aria-hidden="true"
        >
          {job.organizationLogo || "🏢"}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            {job.featured && (
              <span className="badge-featured rounded-full px-2.5 py-1 text-[10px] font-bold">
                وظيفة مميزة
              </span>
            )}
            {job.jobType && (
              <span className="badge rounded-full px-2.5 py-1 text-[10px] font-medium">
                {job.jobType}
              </span>
            )}
          </div>
          <h3
            className="line-clamp-2 break-words font-display text-base font-extrabold leading-7 transition-colors group-hover:text-teal-800 sm:text-lg"
            style={{ color: "var(--teal-900)" }}
          >
            {job.jobTitle}
          </h3>
          <p className="mt-1 break-words text-sm text-gray-500">
            {job.organizationName}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-xs text-gray-600">
        {job.city && (
          <span className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-2.5 py-1.5">
            <span aria-hidden="true">📍</span>{job.city}
          </span>
        )}
        {job.workMode && (
          <span className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-2.5 py-1.5">
            <span aria-hidden="true">💻</span>{job.workMode}
          </span>
        )}
      </div>

      <div
        className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t pt-3"
        style={{ borderColor: "var(--line)" }}
      >
        <div className="min-w-0">
          {publishedDate && <p className="text-[11px] text-gray-400">تاريخ النشر: {publishedDate}</p>}
          {job.salary ? (
            <p className="mt-1 break-words text-sm font-extrabold" style={{ color: "var(--orange-600)" }}>
              {job.salary}
            </p>
          ) : (
            <p className="mt-1 text-xs text-gray-400">تفاصيل الراتب داخل الإعلان</p>
          )}
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold transition group-hover:gap-2" style={{ color: "var(--teal)" }}>
          التفاصيل <span aria-hidden="true">←</span>
        </span>
      </div>
    </Link>
  );
}
