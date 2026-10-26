import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-24 border-t-4 border-[#1D5761] bg-white text-[#122E33]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row md:px-8">
        <aside className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-right">
          <Logo />
          <p className="text-xs leading-relaxed text-[#1D5761]/75">
            © {new Date().getFullYear()} أرزاق ARZAQ. جميع الحقوق محفوظة.
          </p>
        </aside>

        <nav aria-label="روابط التذييل" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#1D5761] sm:justify-end sm:text-sm">
          <Link className="transition hover:text-[#2C929E]" to="/jobs">كل الوظائف</Link>
          <Link className="transition hover:text-[#2C929E]" to="/categories">التصنيفات</Link>
          <Link className="transition hover:text-[#2C929E]" to="/cities">المدن</Link>
          <Link className="transition hover:text-[#2C929E]" to="/about">من نحن</Link>
          <Link className="transition hover:text-[#2C929E]" to="/contact">تواصل معنا</Link>
        </nav>
      </div>
      <div className="border-t border-[#1D5761]/15 px-4 py-2 text-center text-[11px] text-[#1D5761]/75">
        فرصتك القادمة تبدأ من هنا — التقديم مباشرة عبر واتساب
      </div>
    </footer>
  );
}
