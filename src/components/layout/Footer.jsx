import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="brand-grad mt-24 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row md:px-8">
        <aside className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-right">
          <Logo light />
          <p className="text-xs leading-relaxed text-white/70">
            © {new Date().getFullYear()} أرزاق ARZAQ. جميع الحقوق محفوظة.
          </p>
        </aside>

        <nav aria-label="روابط التذييل" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/75 sm:justify-end sm:text-sm">
          <Link className="transition hover:text-white" to="/jobs">كل الوظائف</Link>
          <Link className="transition hover:text-white" to="/categories">التصنيفات</Link>
          <Link className="transition hover:text-white" to="/cities">المدن</Link>
          <Link className="transition hover:text-white" to="/about">من نحن</Link>
          <Link className="transition hover:text-white" to="/contact">تواصل معنا</Link>
        </nav>
      </div>
      <div className="border-t border-white/10 px-4 py-2 text-center text-[11px] text-white/55">
        فرصتك القادمة تبدأ من هنا — التقديم مباشرة عبر واتساب
      </div>
    </footer>
  );
}
