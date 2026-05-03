"use client";

import { buildFeedbackWhatsAppMessage, whatsappMeUrl } from "@/lib/whatsapp-public";

export function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const fields = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? "").trim(),
    };
    if (!fields.name || !fields.email || !fields.message) return;

    const text = buildFeedbackWhatsAppMessage(fields);
    const url = whatsappMeUrl(text);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
      <div>
        <label className="block text-sm font-medium text-slate-700 font-devanagari">नाम</label>
        <input
          name="name"
          required
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-saffron/30 focus:ring-2 font-devanagari"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 font-devanagari">ईमेल</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-saffron/30 focus:ring-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 font-devanagari">फ़ोन</label>
        <input
          name="phone"
          type="tel"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-saffron/30 focus:ring-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 font-devanagari">संदेश</label>
        <textarea
          name="message"
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-saffron/30 focus:ring-2 font-devanagari"
        />
      </div>
      <p className="text-xs leading-relaxed text-slate-500 font-devanagari">
        सबमिट करने पर WhatsApp खुलेगा — वही पाठ भेजने के लिए वहाँ «भेजें» दबाएँ।
      </p>
      <button
        type="submit"
        className="rounded-xl bg-saffron py-3 font-semibold text-white transition hover:bg-saffron-dark font-devanagari"
      >
        WhatsApp पर भेजें
      </button>
    </form>
  );
}
