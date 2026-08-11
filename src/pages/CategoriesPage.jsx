import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function CategoriesPage() {
  const { jobs, categories } = useData();
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-14">
      <h1 className="font-display text-2xl font-extrabold mb-8" style={{ color: "var(--teal-900)" }}>التصنيفات</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((c) => {
          const count = jobs.filter((j) => j.category === c.name && j.status === "published").length;
          return (
            <Link key={c.id} to={`/jobs?category=${encodeURIComponent(c.name)}`} className="tick-mark card rounded-2xl p-5 text-right hover:shadow-md transition block">
              <div className="font-bold mb-1" style={{ color: "var(--teal-900)" }}>{c.name}</div>
              <div className="text-xs text-gray-400">{count} وظيفة متاحة</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
