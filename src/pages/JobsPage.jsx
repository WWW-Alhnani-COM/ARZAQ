import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import JobCard from "../components/jobs/JobCard";
import JobFilters from "../components/jobs/JobFilters";

// تُقرأ فلاتر البحث من رابط URL (query params) — بحيث تكون صفحة /jobs
// قابلة للمشاركة والفهرسة مباشرة بنتائج بحث محددة (مفيد لـ SEO أيضًا).
export default function JobsPage() {
  const { jobs, categories, cities } = useData();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    query: searchParams.get("q") || "",
    category: searchParams.get("category") || "",
    city: searchParams.get("city") || "",
    workMode: "",
    jobType: "",
    expLevel: "",
  });

  const results = useMemo(() => {
    return jobs.filter((j) => {
      if (j.status !== "published") return false;
      const q = filters.query.trim().toLowerCase();
      const haystack = [j.jobTitle, j.organizationName, j.description, ...(j.skills || [])].join(" ").toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      return (
        matchesQuery &&
        (!filters.category || j.category === filters.category) &&
        (!filters.city || j.city === filters.city) &&
        (!filters.workMode || j.workMode === filters.workMode) &&
        (!filters.jobType || j.jobType === filters.jobType) &&
        (!filters.expLevel || j.experienceLevel === filters.expLevel)
      );
    });
  }, [jobs, filters]);

  const hasActiveFilters = Object.values(filters).some(Boolean);
  const resetFilters = () => setFilters({ query: "", category: "", city: "", workMode: "", jobType: "", expLevel: "" });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-extrabold mb-1" style={{ color: "var(--teal-900)" }}>كل الوظائف</h1>
        <p className="text-sm text-gray-500">{results.length} وظيفة متاحة حاليًا</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <JobFilters filters={filters} setFilters={setFilters} categories={categories} cities={cities} onReset={resetFilters} hasActiveFilters={hasActiveFilters} />
        <div className="lg:col-span-3">
          {results.length === 0 ? (
            <div className="card rounded-2xl p-14 text-center text-gray-400">لا توجد وظائف مطابقة لبحثك حاليًا. جرّب تعديل الفلاتر.</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {results.map((j) => <JobCard key={j.id} job={j} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
