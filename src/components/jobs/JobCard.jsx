import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <Link
      to={`/jobs/${job.slug}`}
      className="tick-mark card rounded-2xl p-5 text-right w-full hover:shadow-lg transition shadow-sm block"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "var(--teal-100)" }}>
          {job.organizationLogo}
        </div>
        {job.featured && <span className="badge-featured text-[11px] font-bold px-2 py-1 rounded-full">مميزة</span>}
      </div>
      <div className="font-display font-bold text-base mb-1" style={{ color: "var(--teal-900)" }}>{job.jobTitle}</div>
      <div className="text-sm text-gray-500 mb-3">{job.organizationName}</div>
      <div className="flex flex-wrap gap-1.5 text-[11px] text-gray-600 mb-4">
        <span className="badge px-2 py-1 rounded-full">📍 {job.city}</span>
        <span className="badge px-2 py-1 rounded-full">🕘 {job.jobType}</span>
        <span className="badge px-2 py-1 rounded-full">💻 {job.workMode}</span>
      </div>
      <div className="flex items-center justify-between text-xs pt-3 border-t" style={{ borderColor: "var(--line)" }}>
        <span className="text-gray-400">نُشرت {job.publishDate}</span>
        <span className="font-semibold" style={{ color: "var(--orange-600)" }}>{job.salary}</span>
      </div>
    </Link>
  );
}
