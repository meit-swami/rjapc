/** Public WhatsApp community invite (`chat.whatsapp.com`). */
export const WHATSAPP_GROUP_INVITE_URL =
  "https://chat.whatsapp.com/LAAhlx8ooxb3AtpbM8MQ8f";

/** QR image under `public/` — scan to join {@link WHATSAPP_GROUP_INVITE_URL}. */
export const WHATSAPP_GROUP_QR_SRC = "/uploads/49eYiP.svg";

/** Default org WhatsApp (international digits, no +). Override with NEXT_PUBLIC_WHATSAPP_NUMBER. */
export const DEFAULT_PUBLIC_WHATSAPP_DIGITS = "918005909134";

export function getPublicWhatsAppDigits(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  return (raw || DEFAULT_PUBLIC_WHATSAPP_DIGITS).replace(/\D/g, "");
}

/** https://wa.me/… optional pre-filled chat text (UTF-8). */
export function whatsappMeUrl(prefilledText?: string): string {
  const n = getPublicWhatsAppDigits();
  const base = `https://wa.me/${n}`;
  if (prefilledText && prefilledText.trim()) {
    return `${base}?text=${encodeURIComponent(prefilledText.trim())}`;
  }
  return base;
}

export type FeedbackWhatsAppFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

/** Human-readable template for feedback → WhatsApp (dynamic fields). */
export function buildFeedbackWhatsAppMessage(fields: FeedbackWhatsAppFields): string {
  const phoneLine = fields.phone.trim() ? fields.phone.trim() : "—";
  return [
    "*फीडबैक — राष्ट्रीय जनादेश प्रमोशनल काउंसिल*",
    "",
    `*नाम:* ${fields.name.trim()}`,
    `*ईमेल:* ${fields.email.trim()}`,
    `*फ़ोन:* ${phoneLine}`,
    "",
    "*संदेश:*",
    fields.message.trim(),
  ].join("\n");
}
