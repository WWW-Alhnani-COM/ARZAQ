import { useState } from "react";
import { WORK_MODES, JOB_TYPES, EXP_LEVELS } from "../../utils/constants";

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
      >
        <option value="">الكل</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default function JobFilters({
  filters,
  setFilters,
  categories,
  cities,
  onReset,
  hasActiveFilters,
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeCount = Object.values(filters).filter((value) => Boolean(value)).length;
  const set = (key, value) => setFilters((previous) => ({ ...previous, [key]: value }));

  return (
    <aside className="lg:col-span-1 min-w-0">
      <button
        type="button"
        onClick={() => setIsMobileOpen((open) => !open)}
        aria-expanded={isMobileOpen}
        aria-controls="job-filters-panel"
        className="lg:hidden card w-full rounded-2xl px-4 py-3.5 mb-3 flex items-center justify-between text-right"
        style={{ color: "var(--teal-900)" }}
      >
        <span className="flex items-center gap-2 font-bold text-sm">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10m-7 6h4" />
          </svg>
          تصفية الوظائف
          {activeCount > 0 && (
            <span
              className="min-w-5 h-5 px-1 rounded-full text-[11px] inline-flex items-center justify-center text-white"
              style={{ background: "var(--orange-600)" }}
            >
              {activeCount}
            </span>
          )}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`w-5 h-5 transition-transform ${isMobileOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id="job-filters-panel"
        className={`${isMobileOpen ? "block" : "hidden"} lg:block card rounded-2xl p-4 md:p-5 h-fit space-y-4 lg:sticky lg:top-20`}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-bold text-sm" style={{ color: "var(--teal-900)" }}>
            تصفية النتائج
          </h2>
          {hasActiveFilters && (
            <span className="text-[11px] text-gray-500">
              {activeCount} فلاتر نشطة
            </span>
          )}
        </div>

        <div>
          <label htmlFor="jobs-search-query" className="block text-xs font-semibold text-gray-600 mb-1.5">
            بحث بالكلمات
          </label>
          <input
            id="jobs-search-query"
            type="search"
            value={filters.query}
            onChange={(event) => set("query", event.target.value)}
            placeholder="المسمى الوظيفي أو المهارة"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
          />
        </div>

        <FilterSelect
          label="التصنيف"
          value={filters.category}
          onChange={(value) => set("category", value)}
          options={categories.map((category) => category.name)}
        />
        <FilterSelect
          label="المدينة"
          value={filters.city}
          onChange={(value) => set("city", value)}
          options={cities.map((city) => city.name)}
        />
        <FilterSelect
          label="نظام العمل"
          value={filters.workMode}
          onChange={(value) => set("workMode", value)}
          options={WORK_MODES}
        />
        <FilterSelect
          label="نوع الوظيفة"
          value={filters.jobType}
          onChange={(value) => set("jobType", value)}
          options={JOB_TYPES}
        />
        <FilterSelect
          label="مستوى الخبرة"
          value={filters.expLevel}
          onChange={(value) => set("expLevel", value)}
          options={EXP_LEVELS}
        />

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="w-full rounded-xl border border-orange-200 py-2.5 text-xs font-bold transition hover:bg-orange-50"
            style={{ color: "var(--orange-600)" }}
          >
            مسح جميع الفلاتر
          </button>
        )}
      </div>
    </aside>
  );
}
