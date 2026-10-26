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
      className="group relative flex min-w-0 flex-col gap-4 border-b border-[var(--line)] px-3 py-5 text-right transition-colors duration-200 hover:bg-[var(--teal-100)]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-inset sm:flex-row sm:items-center sm:gap-5 sm:px-5"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ring-1 ring-teal-900/10"
          style={{ background: "var(--teal-100)", color: "var(--teal-900)" }}
          aria-hidden="true"
        >
          {job.organizationLogo || "🏢"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
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
            className="break-words font-display text-base font-extrabold leading-7 transition-colors group-hover:text-teal-800 sm:text-lg"
            style={{ color: "var(--teal-900)" }}
          >
            {job.jobTitle}
          </h3>
          <p className="mt-0.5 break-words text-sm text-gray-500">{job.organizationName}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pr-[60px] text-xs text-gray-600 sm:pr-0 sm:gap-x-5 sm:text-sm">
        {job.city && <span className="inline-flex items-center gap-1.5"><span aria-hidden="true">📍</span>{job.city}</span>}
        {job.workMode && <span className="inline-flex items-center gap-1.5"><span aria-hidden="true">💻</span>{job.workMode}</span>}
        {publishedDate && <span className="text-gray-400">نُشرت {publishedDate}</span>}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[var(--line)] pt-3 sm:min-w-[150px] sm:flex-col sm:items-end sm:justify-center sm:border-0 sm:border-r sm:pt-0 sm:pr-5">
        <div className="text-sm font-extrabold" style={{ color: "var(--orange-600)" }}>
          {job.salary || "الراتب حسب الإعلان"}
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold transition-all group-hover:gap-2" style={{ color: "var(--teal)" }}>
          عرض التفاصيل <span aria-hidden="true">←</span>
        </span>
      </div>
    </Link>
  );
}
