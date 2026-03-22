"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setErr(typeof j.error === "string" ? j.error : "लॉगिन विफल");
      return;
    }
    const to = search.get("from") || "/admin";
    router.replace(to);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h1 className="text-center text-2xl font-bold text-navy font-devanagari">प्रशासक लॉगिन</h1>
      <p className="mt-1 text-center text-sm text-slate-500 font-devanagari">राष्ट्रीय जनादेश प्रमोशनल काउंसिल</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">ईमेल</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-saffron/30 focus:ring-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">पासवर्ड</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-saffron/30 focus:ring-2"
          />
        </div>
        {err ? <p className="text-sm text-red-600 font-devanagari">{err}</p> : null}
        <button
          type="submit"
          className="w-full rounded-xl bg-saffron py-3 font-semibold text-white hover:bg-saffron-dark font-devanagari"
        >
          प्रवेश
        </button>
      </form>
    </div>
  );
}
