import { useState } from "react";
import { useData } from "../../context/DataContext";
import AdFormModal from "../../components/ads-admin/AdFormModal";
import ConfirmDeleteButton from "../../components/common/ConfirmDeleteButton";

export default function AdsAdminAdsPage() {
  const { ads, addAd, updateAd, deleteAd } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display text-xl font-extrabold" style={{ color: "var(--teal-900)" }}>الإعلانات</h2>
          <p className="text-xs text-gray-400 mt-1">إدارة الإعلانات المعروضة على المنصة</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary rounded-lg px-4 py-2 text-sm font-bold">+ إضافة إعلان</button>
      </div>
      <div className="card rounded-2xl overflow-x-auto">
        <table className="w-full admin-table text-sm">
          <thead><tr><th>العنوان</th><th>الفترة</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            {ads.map((a) => (
              <tr key={a.id}>
                <td className="font-semibold text-gray-700">{a.title}</td>
                <td className="text-gray-400 text-xs">{a.startDate} → {a.endDate || "—"}</td>
                <td><div onClick={() => updateAd(a.id, { active: !a.active })} className={"switch " + (a.active ? "on" : "off")}></div></td>
                <td>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => { setEditing(a); setShowForm(true); }} className="btn-outline text-xs font-semibold px-2.5 py-1.5 rounded-lg">تعديل</button>
                    <ConfirmDeleteButton onConfirm={() => deleteAd(a.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {ads.length === 0 && <tr><td colSpan="4" className="text-center text-gray-400 py-10">لا توجد إعلانات بعد</td></tr>}
          </tbody>
        </table>
      </div>
      {showForm && (
        <AdFormModal
          initial={editing}
          onClose={() => setShowForm(false)}
          onSave={(data) => { editing ? updateAd(editing.id, data) : addAd(data); setShowForm(false); }}
        />
      )}
    </div>
  );
}
