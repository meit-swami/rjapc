"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const body = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || undefined,
      message: String(fd.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setMsg("धन्यवाद! आपका संदेश प्राप्त हो गया।");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setMsg("त्रुटि हुई। कृपया पुनः प्रयास करें।");
    }
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
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-saffron py-3 font-semibold text-white transition hover:bg-saffron-dark disabled:opacity-60 font-devanagari"
      >
        {status === "loading" ? "भेजा जा रहा है…" : "संदेश भेजें"}
      </button>
      {msg ? <p className="text-center text-sm text-slate-600 font-devanagari">{msg}</p> : null}
    </form>
  );
}
