"use client";

import { useState } from "react";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-saffron/30 focus:ring-2";

export default function AdminPasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setDone(false);
    if (newPassword !== confirmPassword) {
      setErr("नया पासवर्ड और पुष्टि मेल नहीं खाते");
      return;
    }
    setBusy(true);
    const res = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    }).catch(() => null);
    setBusy(false);
    if (!res || !res.ok) {
      const j = res ? await res.json().catch(() => ({})) : {};
      setErr(typeof j.error === "string" ? j.error : "पासवर्ड नहीं बदला जा सका");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setDone(true);
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold text-navy font-devanagari">पासवर्ड बदलें</h1>
      <p className="mt-1 text-slate-600 font-devanagari">
        कम से कम 10 अक्षरों का मज़बूत पासवर्ड चुनें।
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="text-sm font-medium text-slate-700 font-devanagari">वर्तमान पासवर्ड</label>
          <input
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 font-devanagari">नया पासवर्ड</label>
          <input
            type="password"
            autoComplete="new-password"
            minLength={10}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 font-devanagari">नया पासवर्ड (पुष्टि)</label>
          <input
            type="password"
            autoComplete="new-password"
            minLength={10}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        {err ? <p className="text-sm text-red-600 font-devanagari">{err}</p> : null}
        {done ? <p className="text-sm text-green-700 font-devanagari">पासवर्ड बदल दिया गया।</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-saffron py-3 font-semibold text-white hover:bg-saffron-dark disabled:opacity-60 font-devanagari"
        >
          {busy ? "सहेजा जा रहा है…" : "पासवर्ड बदलें"}
        </button>
      </form>
    </div>
  );
}
