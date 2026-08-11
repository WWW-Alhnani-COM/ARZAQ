import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

const NAV_LINKS = [
  { to: "/", label: "الرئيسية", end: true },
  { to: "/jobs", label: "الوظائف" },
  { to: "/categories", label: "التصنيفات" },
  { to: "/cities", label: "المدن" },
  { to: "/remote-jobs", label: "وظائف عن بُعد" },
  { to: "/about", label: "من نحن" },
  { to: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    "px-3 py-2 rounded-lg text-sm font-medium transition " +
    (isActive ? "text-white" : "text-gray-600 hover:bg-gray-100");

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/90 border-b" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} style={({ isActive }) => (isActive ? { background: "var(--teal)" } : {})}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/jobs" className="hidden md:inline-flex btn-primary rounded-lg px-4 py-2 text-sm font-semibold">
          تصفّح الوظائف
        </Link>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="القائمة">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#16262A" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t bg-white px-4 py-3 flex flex-col gap-1" style={{ borderColor: "var(--line)" }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-right py-2 text-sm font-medium text-gray-700">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
