// كل منطق بناء رسالة وتقديم واتساب يعيش هنا فقط — مصدر واحد للحقيقة
// حتى يسهل تعديل نص الرسالة أو الرقم دون البحث في كل الملفات.

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "967774218060";

export function buildWhatsappMessage(job, applicant) {
  return `السلام عليكم،

أرغب في التقديم على الوظيفة التالية:

اسم الوظيفة:
${job.jobTitle}

الجهة:
${job.organizationName}

الموقع:
${job.city}

نوع الوظيفة:
${job.jobType}

وصف الوظيفة:
${job.description}

اسم المتقدم:
${applicant.name}

رقم المتقدم:
${applicant.phone}

أرغب في التقديم على هذه الوظيفة، وشكرًا لكم.`;
}

export function buildWhatsappLink(job, applicant) {
  const text = encodeURIComponent(buildWhatsappMessage(job, applicant));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
