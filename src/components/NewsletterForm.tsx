"use client";

import { useState } from "react";

export function NewsletterForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [s, setS] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setS("loading");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    try {
      const res = await fetch("/api/public/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setS("ok");
      e.currentTarget.reset();
    } catch {
      setS("err");
    }
  }

  const inputClass =
    variant === "light"
      ? "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-navy placeholder:text-slate-400 outline-none ring-saffron/40 focus:ring-2 font-devanagari"
      : "w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 outline-none ring-saffron/40 focus:ring-2 font-devanagari";
  const okClass = variant === "light" ? "text-sm text-emerald-700 font-devanagari sm:ml-2" : "text-sm text-white font-devanagari sm:ml-2";
  const errClass = variant === "light" ? "text-sm text-red-600 font-devanagari sm:ml-2" : "text-sm text-red-200 font-devanagari sm:ml-2";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
      <div className="min-w-0 flex-1">
        <label htmlFor="nl-email" className="sr-only">
          ईमेल
        </label>
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          placeholder="न्यूज़लेटर हेतु अपना ईमेल"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={s === "loading"}
        className="rounded-xl bg-saffron px-6 py-3 font-semibold text-white hover:bg-saffron-dark disabled:opacity-60 font-devanagari"
      >
        {s === "loading" ? "…" : "जुड़ें"}
      </button>
      {s === "ok" ? <p className={okClass}>सदस्यता सफल।</p> : null}
      {s === "err" ? <p className={errClass}>कृपया वैध ईमेल दर्ज करें।</p> : null}
    </form>
  );
}
