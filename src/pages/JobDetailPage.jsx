import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import ApplyModal from "../components/jobs/ApplyModal";
import { InfoRow, InfoList } from "../components/common/InfoDisplay";
import { logJobView } from "../firebase/analyticsService";

// المسار: /jobs/:slug — يطابق متطلب "/jobs/[slug]" بالضبط عبر React Router.
export default function JobDetailPage() {
  const { slug } = useParams();
  const { jobs } = useData();
  const job = jobs.find((j) => j.slug === slug);
  const [showApply, setShowApply] = useState(false);

  useEffect(() => {
    if (job) logJobView(job.id);
  }, [job]);

  useEffect(() => {
    if (job) document.title = `${job.jobTitle} — ${job.organizationName} | أرزاق`;
  }, [job]);

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center text-gray-400">
        تعذر العثور على هذه الوظيفة. <Link className="underline" to="/jobs">عودة لكل الوظائف</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <Link to="/jobs" className="text-sm text-gray-500 hover:text-gray-800 mb-6 inline-flex items-center gap-1">→ عودة لكل الوظائف</Link>

      <div className="card rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: "var(--teal-100)" }}>{job.organizationLogo}</div>
            <div>
              {job.featured && <span className="badge-featured text-[11px] font-bold px-2 py-1 rounded-full mb-1 inline-block">وظيفة مميزة</span>}
              <h1 className="font-display text-2xl font-extrabold" style={{ color: "var(--teal-900)" }}>{job.jobTitle}</h1>
              <p className="text-gray-500 text-sm mt-1">{job.organizationName}</p>
            </div>
          </div>
          <button onClick={() => setShowApply(true)} className="btn-primary rounded-xl px-8 py-3.5 font-bold text-sm whitespace-nowrap">
            تقديم الآن
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t" style={{ borderColor: "var(--line)" }}>
          <InfoRow label="📍" value={job.city} />
          <InfoRow label="🕘" value={job.jobType} />
          <InfoRow label="💻" value={job.workMode} />
          <InfoRow label="📈" value={job.experienceLevel} />
          <InfoRow label="💰" value={job.salary} />
          <InfoRow label="🗓️ نُشرت" value={job.publishDate} />
          <InfoRow label="⏳ آخر موعد" value={job.expiryDate} />
          <InfoRow label="🏷️" value={job.category} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-8">
            <h3 className="font-display font-bold text-lg mb-3" style={{ color: "var(--teal-900)" }}>وصف الوظيفة</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
          </div>
          <InfoList title="المسؤوليات" items={job.responsibilities} />
          <InfoList title="المؤهلات المطلوبة" items={job.requirements} />
          <InfoList title="المميزات" items={job.benefits} />
          <div className="mb-8">
            <h3 className="font-display font-bold text-lg mb-3" style={{ color: "var(--teal-900)" }}>طريقة التقديم</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              اضغط زر "تقديم الآن"، أدخل اسمك ورقم هاتفك، وسيتم فتح واتساب برسالة جاهزة لإرسالها مباشرة لفريق التوظيف — دون الحاجة لإنشاء أي حساب.
            </p>
          </div>
        </div>
        <aside className="space-y-6">
          <div className="card rounded-2xl p-5">
            <h4 className="font-bold text-sm mb-3 text-gray-700">المهارات المطلوبة</h4>
            <div className="flex flex-wrap gap-1.5">{job.skills.map((s) => <span key={s} className="badge text-xs px-2.5 py-1 rounded-full">{s}</span>)}</div>
          </div>
          <div className="card rounded-2xl p-5">
            <h4 className="font-bold text-sm mb-3 text-gray-700">اللغات</h4>
            <div className="flex flex-wrap gap-1.5">{job.languages.map((s) => <span key={s} className="badge text-xs px-2.5 py-1 rounded-full">{s}</span>)}</div>
          </div>
          <button onClick={() => setShowApply(true)} className="btn-primary w-full rounded-xl py-3.5 font-bold text-sm">تقديم الآن عبر واتساب</button>
        </aside>
      </div>

      {showApply && <ApplyModal job={job} onClose={() => setShowApply(false)} />}
    </div>
  );
}
