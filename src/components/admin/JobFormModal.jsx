import { useState } from "react";
import { useData } from "../../context/DataContext";
import { WORK_MODES, JOB_TYPES, EXP_LEVELS, JOB_STATUSES, STATUS_LABEL } from "../../utils/constants";
import { todayISO } from "../../utils/ids";

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
    {children}
  </div>
);
const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm";

export default function JobFormModal({ initial, onClose, onSave }) {
  const { categories, cities, organizations } = useData();
  const blank = {
    jobTitle: "", organizationName: "", organizationLogo: "🏢",
    category: categories[0]?.name || "", city: cities[0]?.name || "",
    workMode: WORK_MODES[0], jobType: JOB_TYPES[0], experienceLevel: EXP_LEVELS[0],
    salary: "", description: "", responsibilities: "", requirements: "", skills: "",
    languages: "", benefits: "", publishDate: todayISO(), expiryDate: "", featured: false, status: "published",
  };
  const toForm = (j) => j ? {
    ...j,
    responsibilities: (j.responsibilities || []).join("\n"),
    requirements: (j.requirements || []).join("\n"),
    skills: (j.skills || []).join(", "),
    languages: (j.languages || []).join(", "),
    benefits: (j.benefits || []).join("\n"),
  } : blank;

  const [form, setForm] = useState(toForm(initial));
  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  function submit(e) {
    e.preventDefault();
    if (!form.jobTitle.trim() || !form.organizationName.trim()) return;
    const org = organizations.find((o) => o.name === form.organizationName);
    const payload = {
      ...form,
      organizationLogo: org ? org.logo : form.organizationLogo,
      responsibilities: form.responsibilities.split("\n").map((s) => s.trim()).filter(Boolean),
      requirements: form.requirements.split("\n").map((s) => s.trim()).filter(Boolean),
      benefits: form.benefits.split("\n").map((s) => s.trim()).filter(Boolean),
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      languages: form.languages.split(",").map((s) => s.trim()).filter(Boolean),
    };
    onSave(payload);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg" style={{ color: "var(--teal-900)" }}>{initial ? "تعديل الوظيفة" : "إضافة وظيفة جديدة"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl leading-none">×</button>
        </div>
        <form onSubmit={submit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="اسم الوظيفة"><input required value={form.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} className={inputCls} /></Field>
            <Field label="الجهة">
              <select required value={form.organizationName} onChange={(e) => set("organizationName", e.target.value)} className={inputCls}>
                <option value="">اختر الجهة</option>
                {organizations.map((o) => <option key={o.id} value={o.name}>{o.name}</option>)}
              </select>
            </Field>
            <Field label="التصنيف"><select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>{categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}</select></Field>
            <Field label="المدينة"><select value={form.city} onChange={(e) => set("city", e.target.value)} className={inputCls}>{cities.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}</select></Field>
            <Field label="نظام العمل"><select value={form.workMode} onChange={(e) => set("workMode", e.target.value)} className={inputCls}>{WORK_MODES.map((o) => <option key={o}>{o}</option>)}</select></Field>
            <Field label="نوع الوظيفة"><select value={form.jobType} onChange={(e) => set("jobType", e.target.value)} className={inputCls}>{JOB_TYPES.map((o) => <option key={o}>{o}</option>)}</select></Field>
            <Field label="مستوى الخبرة"><select value={form.experienceLevel} onChange={(e) => set("experienceLevel", e.target.value)} className={inputCls}>{EXP_LEVELS.map((o) => <option key={o}>{o}</option>)}</select></Field>
            <Field label="الراتب (اختياري)"><input value={form.salary} onChange={(e) => set("salary", e.target.value)} className={inputCls} /></Field>
            <Field label="تاريخ النشر"><input type="date" value={form.publishDate} onChange={(e) => set("publishDate", e.target.value)} className={inputCls} /></Field>
            <Field label="آخر موعد للتقديم"><input type="date" value={form.expiryDate} onChange={(e) => set("expiryDate", e.target.value)} className={inputCls} /></Field>
          </div>
          <Field label="وصف الوظيفة"><textarea required rows="3" value={form.description} onChange={(e) => set("description", e.target.value)} className={inputCls}></textarea></Field>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="المسؤوليات (سطر لكل عنصر)"><textarea rows="3" value={form.responsibilities} onChange={(e) => set("responsibilities", e.target.value)} className={inputCls}></textarea></Field>
            <Field label="المؤهلات (سطر لكل عنصر)"><textarea rows="3" value={form.requirements} onChange={(e) => set("requirements", e.target.value)} className={inputCls}></textarea></Field>
            <Field label="المميزات (سطر لكل عنصر)"><textarea rows="3" value={form.benefits} onChange={(e) => set("benefits", e.target.value)} className={inputCls}></textarea></Field>
            <div className="space-y-4">
              <Field label="المهارات (مفصولة بفاصلة)"><input value={form.skills} onChange={(e) => set("skills", e.target.value)} className={inputCls} /></Field>
              <Field label="اللغات (مفصولة بفاصلة)"><input value={form.languages} onChange={(e) => set("languages", e.target.value)} className={inputCls} /></Field>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} /> وظيفة مميزة</label>
            <div className="flex items-center gap-2 text-sm font-medium">
              الحالة:
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm">
                {JOB_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary rounded-xl px-6 py-2.5 font-bold text-sm">{initial ? "حفظ التعديلات" : "إضافة الوظيفة"}</button>
            <button type="button" onClick={onClose} className="btn-outline rounded-xl px-6 py-2.5 font-bold text-sm">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
}
