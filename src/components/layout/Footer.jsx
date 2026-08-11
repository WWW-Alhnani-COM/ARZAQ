import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="brand-grad text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <Logo light />
          <p className="text-sm text-white/70 mt-4 leading-relaxed">
            منصة وظائف عامة تربط الباحثين عن عمل بالفرص المناسبة، بلا تسجيل وبلا تعقيد — التقديم مباشرة عبر واتساب.
          </p>
        </div>
        <div>
          <div className="font-display font-bold mb-3">روابط سريعة</div>
          <div className="flex flex-col gap-2 text-sm text-white/75">
            <Link className="hover:text-white" to="/jobs">كل الوظائف</Link>
            <Link className="hover:text-white" to="/categories">التصنيفات</Link>
            <Link className="hover:text-white" to="/cities">المدن</Link>
            <Link className="hover:text-white" to="/remote-jobs">وظائف عن بُعد</Link>
          </div>
        </div>
        <div>
          <div className="font-display font-bold mb-3">المنصة</div>
          <div className="flex flex-col gap-2 text-sm text-white/75">
            <Link className="hover:text-white" to="/about">من نحن</Link>
            <Link className="hover:text-white" to="/contact">تواصل معنا</Link>
            <Link className="hover:text-white" to="/admin/login">لوحة الإدارة</Link>
          </div>
        </div>
        <div>
          <div className="font-display font-bold mb-3">التقديم عبر واتساب</div>
          <p className="text-sm text-white/75">كل التقديمات تتم مباشرة عبر واتساب دون إنشاء أي حساب على المنصة.</p>
          <div className="mt-3 inline-flex items-center gap-2 text-sm bg-white/10 rounded-lg px-3 py-2">📞 774218060</div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs text-white/50 py-5">© 2026 أرزاق ARZAQ. جميع الحقوق محفوظة.</div>
    </footer>
  );
}
