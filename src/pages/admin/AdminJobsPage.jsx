import { useState } from "react";
import { useData } from "../../context/DataContext";
import { STATUS_LABEL } from "../../utils/constants";
import JobFormModal from "../../components/admin/JobFormModal";
import ConfirmDeleteButton from "../../components/common/ConfirmDeleteButton";

// إدارة الوظائف: إضافة/تعديل/حذف/نشر/إيقاف/أرشفة/تمييز — الوظائف تُدخل
// حصريًا من هنا (Main Admin)؛ لا يوجد أي مسار آخر لإنشاء وظيفة في المنصة.
export default function AdminJobsPage() {
  const { jobs, addJob, updateJob, deleteJob } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");

  const filtered = jobs.filter((j) => !q.trim() || (j.jobTitle + j.organizationName).toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="font-display text-xl font-extrabold" style={{ color: "var(--teal-900)" }}>إدارة الوظائف</h2>
          <p className="text-xs text-gray-400 mt-1">إضافة، تعديل، حذف، نشر، إيقاف، أرشفة، وتمييز الوظائف</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث..." className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full sm:w-40" />
          <div className="flex gap-2">
            <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary rounded-lg px-4 py-2 text-sm font-bold">+ إضافة وظيفة</button>
          </div>
        </div>
      </div>

      {/* Desktop table (md and up) */}
      <div className="card rounded-2xl overflow-x-auto hidden md:block">
        <table className="w-full admin-table text-sm">
          <thead>
            <tr>
              <th>الوظيفة</th>
              <th>الجهة</th>
              <th>المدينة</th>
              <th>الحالة</th>
              <th>مميزة</th>
              <th>نُشرت</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((j) => (
              <tr key={j.id}>
                <td className="font-semibold text-gray-700">{j.jobTitle}</td>
                <td className="text-gray-500">{j.organizationName}</td>
                <td className="text-gray-500">{j.city}</td>
                <td>
                  <span className={"text-[11px] font-bold px-2 py-1 rounded-full status-" + j.status}>{STATUS_LABEL[j.status]}</span>
                </td>
                <td>
                  <div onClick={() => updateJob(j.id, { featured: !j.featured })} className={"switch " + (j.featured ? "on" : "off")}></div>
                </td>
                <td className="text-gray-400 text-xs">{j.publishDate}</td>
                <td>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button onClick={() => { setEditing(j); setShowForm(true); }} className="btn-outline text-xs font-semibold px-2.5 py-1.5 rounded-lg">تعديل</button>
                    {j.status !== "published" && <button onClick={() => updateJob(j.id, { status: "published" })} className="text-xs font-semibold px-2.5 py-1.5 rounded-lg status-published">نشر</button>}
                    {j.status === "published" && <button onClick={() => updateJob(j.id, { status: "paused" })} className="text-xs font-semibold px-2.5 py-1.5 rounded-lg status-paused">إيقاف</button>}
                    {j.status !== "archived" && <button onClick={() => updateJob(j.id, { status: "archived" })} className="text-xs font-semibold px-2.5 py-1.5 rounded-lg status-archived">أرشفة</button>}
                    <ConfirmDeleteButton onConfirm={() => deleteJob(j.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="7" className="text-center text-gray-400 py-10">لا توجد نتائج</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Mobile cards (visible on small screens) */}
      <div className="space-y-3 md:hidden">
        {filtered.map((j) => (
          <div key={j.id} className="card rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-gray-800">{j.jobTitle}</div>
                    <div className="text-sm text-gray-500">{j.organizationName} • {j.city}</div>
                  </div>
                  <div className="text-xs text-gray-400">{j.publishDate}</div>
                </div>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className={"text-[11px] font-bold px-2 py-1 rounded-full status-" + j.status}>{STATUS_LABEL[j.status]}</span>
                  <div onClick={() => updateJob(j.id, { featured: !j.featured })} className={"switch " + (j.featured ? "on" : "off")}></div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button onClick={() => { setEditing(j); setShowForm(true); }} className="btn-outline text-xs font-semibold px-3 py-1.5 rounded-lg">تعديل</button>
              {j.status !== "published" && <button onClick={() => updateJob(j.id, { status: "published" })} className="text-xs font-semibold px-3 py-1.5 rounded-lg status-published">نشر</button>}
              {j.status === "published" && <button onClick={() => updateJob(j.id, { status: "paused" })} className="text-xs font-semibold px-3 py-1.5 rounded-lg status-paused">إيقاف</button>}
              {j.status !== "archived" && <button onClick={() => updateJob(j.id, { status: "archived" })} className="text-xs font-semibold px-3 py-1.5 rounded-lg status-archived">أرشفة</button>}
              <ConfirmDeleteButton onConfirm={() => deleteJob(j.id)} />
            </div>
          </div>
        ))}

        {filtered.length === 0 && <div className="text-center text-gray-400 py-10">لا توجد نتائج</div>}
      </div>

      {showForm && (
        <JobFormModal
          initial={editing}
          onClose={() => setShowForm(false)}
          onSave={(data) => { editing ? updateJob(editing.id, data) : addJob(data); setShowForm(false); }}
        />
      )}
    </div>
  );
}
