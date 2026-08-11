import { useData } from "../../context/DataContext";
import SimpleListManager from "../../components/admin/SimpleListManager";

export default function AdminCitiesPage() {
  const { cities, addCity, deleteCity } = useData();
  return <SimpleListManager title="المدن" items={cities} onAdd={addCity} onDelete={deleteCity} placeholder="اسم مدينة جديدة" />;
}
