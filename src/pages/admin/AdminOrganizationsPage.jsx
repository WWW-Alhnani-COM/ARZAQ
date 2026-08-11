import { useState } from "react";
import { useData } from "../../context/DataContext";
import OrgFormModal from "../../components/admin/OrgFormModal";
import ConfirmDeleteButton from "../../components/common/ConfirmDeleteButton";

export default function AdminOrganizationsPage() {
  const { organizations, addOrganization, updateOrganization, deleteOrganization } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-xl font-extrabold" style={{ color: "var(--teal-900)" }}>الجهات والشركات</h2>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary rounded-lg px-4 py-2 text-sm font-bold">+ إضافة جهة</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizations.map((o) => (
          <div key={o.id} className="card rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background: "var(--teal-100)" }}>{o.logo}</div>
              <div className="font-bold text-sm" style={{ color: "var(--teal-900)" }}>{o.name}</div>
            </div>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-3">{o.description}</p>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(o); setShowForm(true); }} className="btn-outline text-xs font-semibold px-3 py-1.5 rounded-lg">تعديل</button>
              <ConfirmDeleteButton onConfirm={() => deleteOrganization(o.id)} />
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <OrgFormModal
          initial={editing}
          onClose={() => setShowForm(false)}
          onSave={(data) => { editing ? updateOrganization(editing.id, data) : addOrganization(data); setShowForm(false); }}
        />
      )}
    </div>
  );
}
