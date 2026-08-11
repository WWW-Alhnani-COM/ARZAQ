import { useData } from "../../context/DataContext";
import SimpleListManager from "../../components/admin/SimpleListManager";

export default function AdminCategoriesPage() {
  const { categories, addCategory, deleteCategory } = useData();
  return <SimpleListManager title="التصنيفات" items={categories} onAdd={addCategory} onDelete={deleteCategory} placeholder="اسم تصنيف جديد" />;
}

