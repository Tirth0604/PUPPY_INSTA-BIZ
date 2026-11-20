import type { Puppy } from "@/types";
export function buildWhatsAppURL(phone: string, message: string) {
  const number = phone.replace(/\D/g, "");
  if (!/^[1-9]\d{7,14}$/.test(number))
    throw new Error("Invalid WhatsApp destination");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
export function whatsappMessage(p?: Puppy, context?: string) {
  if (p)
    return p.status === "adopted"
      ? `Hi! This is an assessment demo enquiry. I'd love to find a puppy similar to ${p.name} (${p.breed}).`
      : `Hi! This is an assessment demo enquiry. I'd love to know more about ${p.name} (${p.breed}).`;
  return `Hi! This is an assessment demo enquiry. ${context || "I'd love to know more about your puppies."}`;
}
export const whatsappPhone =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919898124987";
export function whatsapp(p?: Puppy, context?: string) {
  return buildWhatsAppURL(whatsappPhone, whatsappMessage(p, context));
}
