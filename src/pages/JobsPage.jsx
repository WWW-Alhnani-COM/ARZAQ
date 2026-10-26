import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import JobCard from "../components/jobs/JobCard";
import JobFilters from "../components/jobs/JobFilters";

const EMPTY_FILTERS = {
  query: "",
  category: "",
  city: "",
  workMode: "",
  jobType: "",
  expLevel: "",
};

// تُقرأ فلاتر البحث من الرابط عند فتح الصفحة أو عند التنقل إلى رابط بحث آخر.
// تغيير الفلاتر داخل الواجهة لا يغيّر عنوان الصفحة.
function readFiltersFromUrl(searchParams) {
  return {
    ...EMPTY_FILTERS,
    query: searchParams.get("q") || "",
    category: searchParams.get("category") || "",
    city: searchParams.get("city") || "",
  };
}

export default function JobsPage() {
  const { jobs = [], categories = [], cities = [], loading } = useData();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => readFiltersFromUrl(searchParams));

  // حافظ على توافق الفلاتر مع روابط البحث عند التنقل داخل التطبيق،
  // من دون كتابة تغييرات الفلاتر اليومية إلى الرابط.
  useEffect(() => {
    setFilters(readFiltersFromUrl(searchParams));
  }, [searchParams]);

  const results = useMemo(() => {
    return jobs.filter((j) => {
      if (j.status !== "published") return false;
      const q = filters.query.trim().toLowerCase();
      const haystack = [j.jobTitle, j.organizationName, j.description, ...(j.skills || [])]
        .join(" ")
        .toLowerCase();
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

  const hasActiveFilters = Object.values(filters).some((value) => Boolean(value));
  const resetFilters = () => setFilters({ ...EMPTY_FILTERS });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
      <div className="mb-6 md:mb-8">
        <h1
          className="font-display text-2xl font-extrabold mb-1"
          style={{ color: "var(--teal-900)" }}
        >
          كل الوظائف
        </h1>
        <p className="text-sm text-gray-500" aria-live="polite">
          {results.length} وظيفة متاحة حاليًا
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-5 lg:gap-8">
        <JobFilters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          cities={cities}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <section className="lg:col-span-3" aria-label="نتائج الوظائف">
          {results.length === 0 ? (
            <div className="card rounded-2xl p-8 md:p-14 text-center">
              <p className="font-bold mb-2" style={{ color: "var(--teal-900)" }}>
                لا توجد وظائف مطابقة
              </p>
              <p className="text-sm text-gray-500 mb-4">
                جرّب تغيير كلمات البحث أو تعديل الفلاتر لعرض نتائج أخرى.
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-semibold underline underline-offset-4"
                  style={{ color: "var(--orange-600)" }}
                >
                  مسح جميع الفلاتر
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm">
              {results.map((job) => <JobCard key={job.id} job={job} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
