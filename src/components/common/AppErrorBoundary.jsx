import { Component } from "react";
import { Link } from "react-router-dom";

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("ARZAQ page render error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-container mx-auto flex min-h-[55vh] max-w-3xl items-center justify-center px-4 py-16 text-center">
          <section className="w-full rounded-3xl border bg-white p-6 sm:p-10" style={{ borderColor: "var(--line)" }} role="alert">
            <p className="font-display text-2xl font-extrabold" style={{ color: "var(--teal-900)" }}>تعذر عرض هذه الصفحة</p>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-gray-500">حدث خطأ غير متوقع أثناء عرض المحتوى. يمكنك إعادة تحميل الصفحة أو العودة إلى الوظائف.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={() => window.location.reload()} className="btn-primary rounded-xl px-5 py-3 text-sm font-bold">إعادة المحاولة</button>
              <Link to="/jobs" className="btn-outline rounded-xl px-5 py-3 text-sm font-bold">عرض الوظائف</Link>
            </div>
          </section>
        </div>
      );
    }
    return this.props.children;
  }
}
