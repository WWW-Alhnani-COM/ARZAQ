import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import JobCard from "../components/jobs/JobCard";

export default function RemotePage() {
  const { jobs = [], loading } = useData();
  const list = jobs.filter((job) => job.workMode === "عن بُعد" && job.status === "published");

  return (
    <div className="page-container mx-auto max-w-6xl px-4 py-10 sm:py-12 md:px-8 md:py-14">
      <header className="mb-7 sm:mb-8">
        <p className="mb-2 text-xs font-bold tracking-wide" style={{ color: "var(--teal)" }}>مرونة في مكان العمل</p>
        <h1 className="font-display text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--teal-900)" }}>وظائف عن بُعد</h1>
        <p className="mt-2 text-sm leading-6 text-gray-500" aria-live="polite">{list.length} وظيفة منشورة يمكن العمل بها عن بُعد.</p>
      </header>
      {loading ? (
        <div className="page-state" role="status"><span className="state-spinner" aria-hidden="true" /> جاري تحميل الوظائف...</div>
      ) : list.length ? (
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {list.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      ) : (
        <div className="page-state"><strong>لا توجد وظائف عن بُعد حاليًا</strong><span>يمكنك استعراض جميع الوظائف أو العودة لاحقًا.</span><Link className="btn-primary mt-2 rounded-xl px-5 py-3 text-sm font-bold" to="/jobs">عرض جميع الوظائف</Link></div>
      )}
    </div>
  );
}
