import { WORK_MODES, JOB_TYPES, EXP_LEVELS } from "../../utils/constants";

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
        <option value="">الكل</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export default function JobFilters({ filters, setFilters, categories, cities, onReset, hasActiveFilters }) {
  const set = (k, v) => setFilters((prev) => ({ ...prev, [k]: v }));
  return (
    <aside className="lg:col-span-1 card rounded-2xl p-5 h-fit space-y-4 sticky top-20">
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">بحث</label>
        <input
          value={filters.query}
          onChange={(e) => set("query", e.target.value)}
          placeholder="المسمى الوظيفي أو المهارة"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />
      </div>
      <FilterSelect label="التصنيف" value={filters.category} onChange={(v) => set("category", v)} options={categories.map((c) => c.name)} />
      <FilterSelect label="المدينة" value={filters.city} onChange={(v) => set("city", v)} options={cities.map((c) => c.name)} />
      <FilterSelect label="نظام العمل" value={filters.workMode} onChange={(v) => set("workMode", v)} options={WORK_MODES} />
      <FilterSelect label="نوع الوظيفة" value={filters.jobType} onChange={(v) => set("jobType", v)} options={JOB_TYPES} />
      <FilterSelect label="مستوى الخبرة" value={filters.expLevel} onChange={(v) => set("expLevel", v)} options={EXP_LEVELS} />
      {hasActiveFilters && (
        <button onClick={onReset} className="text-xs font-semibold w-full text-center py-2" style={{ color: "var(--orange-600)" }}>
          مسح الفلاتر
        </button>
      )}
    </aside>
  );
}
