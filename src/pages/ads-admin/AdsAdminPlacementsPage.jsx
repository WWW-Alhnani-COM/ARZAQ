import { useState } from "react";
import { useData } from "../../context/DataContext";
import PlacementFormModal from "../../components/ads-admin/PlacementFormModal";
import ConfirmDeleteButton from "../../components/common/ConfirmDeleteButton";
import { AD_PAGES_LABELS, AD_POSITIONS_LABELS } from "../../utils/constants";

export default function AdsAdminPlacementsPage() {
  const { ads, placements, addPlacement, deletePlacement } = useData();
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display text-xl font-extrabold" style={{ color: "var(--teal-900)" }}>مواضع الإعلانات</h2>
          <p className="text-xs text-gray-400 mt-1">تحديد أين وبأي أولوية يظهر كل إعلان</p>
        </div>
        <button 
          disabled={ads.length === 0} 
          onClick={() => setShowForm(true)} 
          className="btn-primary rounded-lg px-4 py-2 text-sm font-bold disabled:opacity-40"
        >
          + إضافة موضع
        </button>
      </div>
      
      <div className="card rounded-2xl overflow-x-auto">
        <table className="w-full admin-table text-sm">
          <thead>
            <tr>
              <th>الإعلان</th>
              <th>الصفحة</th>
              <th>الموضع</th>
              <th>الأولوية</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {placements.map((p) => {
              const ad = ads.find((a) => a.id === p.adId);
              return (
                <tr key={p.id}>
                  <td className="font-semibold text-gray-700">{ad ? ad.title : "—"}</td>
                  <td className="text-gray-500">{AD_PAGES_LABELS[p.page] || p.page}</td>
                  <td className="text-gray-500">{AD_POSITIONS_LABELS[p.position] || p.position}</td>
                  <td className="text-gray-400">{p.priority}</td>
                  <td><ConfirmDeleteButton onConfirm={() => deletePlacement(p.id)} /></td>
                </tr>
              );
            })}
            {placements.length === 0 && (
              <tr><td colSpan="5" className="text-center text-gray-400 py-10">لا توجد مواضع إعلانية بعد</td></tr>
            )}
          </tbody>
        </table>
      </div>
      
      {showForm && (
        <PlacementFormModal 
          ads={ads} 
          onClose={() => setShowForm(false)} 
          onSave={(data) => { 
            addPlacement(data); 
            setShowForm(false); 
          }} 
        />
      )}
    </div>
  );
}
