// يبني slug صالح للاستخدام في مسار /jobs/[slug] من عنوان الوظيفة العربي + معرّف فريد.
export function slugify(title, id) {
  const base = (title || "وظيفة")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "");
  return `${base}-${id}`;
}
