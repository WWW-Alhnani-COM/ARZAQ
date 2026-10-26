import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <Link
      to={`/jobs/${job.slug}`}
      aria-label={`عرض تفاصيل وظيفة ${job.jobTitle} لدى ${job.organizationName}`}
      className="tick-mark card group flex h-full min-w-0 flex-col rounded-2xl border border-transparent p-4 sm:p-5 text-right shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal-700/15 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: "var(--teal-100)", color: "var(--teal-900)" }}
          aria-hidden="true"
        >
          {job.organizationLogo || "🏢"}
        </div>
        {job.featured && (
          <span className="badge-featured shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full">
            مميزة
          </span>
        )}
      </div>

      <div
        className="font-display font-bold text-base leading-7 mb-1 break-words transition-colors group-hover:text-teal-800"
        style={{ color: "var(--teal-900)" }}
      >
        {job.jobTitle}
      </div>
      <div className="text-sm text-gray-500 mb-4 break-words">
        {job.organizationName}
      </div>

      <div className="flex flex-wrap gap-1.5 text-[11px] text-gray-600 mb-4">
        {job.city && <span className="badge px-2.5 py-1 rounded-full">📍 {job.city}</span>}
        {job.jobType && <span className="badge px-2.5 py-1 rounded-full">🕘 {job.jobType}</span>}
        {job.workMode && <span className="badge px-2.5 py-1 rounded-full">💻 {job.workMode}</span>}
      </div>

      <div
        className="mt-auto flex flex-wrap items-end justify-between gap-2 text-xs pt-3 border-t"
        style={{ borderColor: "var(--line)" }}
      >
        <span className="text-gray-400">نُشرت {job.publishDate}</span>
        {job.salary && (
          <span className="font-bold text-sm" style={{ color: "var(--orange-600)" }}>
            {job.salary}
          </span>
        )}
      </div>
    </Link>
  );
}
