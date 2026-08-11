export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
      <h1 className="font-display text-3xl font-extrabold mb-6" style={{ color: "var(--teal-900)" }}>تواصل معنا</h1>
      <div className="card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3"><span className="text-xl">💬</span><span className="text-gray-700">واتساب: 774218060</span></div>
        <div className="flex items-center gap-3"><span className="text-xl">📧</span><span className="text-gray-700">info@arzaq-jobs.com</span></div>
        <div className="flex items-center gap-3"><span className="text-xl">📍</span><span className="text-gray-700">اليمن</span></div>
      </div>
      <p className="text-sm text-gray-400 mt-6">
        لأصحاب الشركات الراغبين بنشر وظيفة على المنصة: يُرجى التواصل معنا مباشرة، حيث تُضاف الوظائف حصريًا من قِبل فريق الإدارة.
      </p>
    </div>
  );
}
