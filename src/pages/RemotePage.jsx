import { useData } from "../context/DataContext";
import JobCard from "../components/jobs/JobCard";

export default function RemotePage() {
  const { jobs } = useData();
  const list = jobs.filter((j) => j.workMode === "عن بُعد" && j.status === "published");
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-14">
      <h1 className="font-display text-2xl font-extrabold mb-2" style={{ color: "var(--teal-900)" }}>وظائف عن بُعد</h1>
      <p className="text-sm text-gray-500 mb-8">{list.length} وظيفة يمكن العمل بها من أي مكان</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((j) => <JobCard key={j.id} job={j} />)}
      </div>
    </div>
  );
}
