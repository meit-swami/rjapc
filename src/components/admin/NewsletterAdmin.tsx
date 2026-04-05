"use client";

import { useEffect, useState } from "react";

type Row = { id: string; email: string; createdAt: string };

export function NewsletterAdmin() {
  const [rows, setRows] = useState<Row[]>([]);

  async function load() {
    const res = await fetch("/api/admin/newsletter");
    if (res.ok) setRows(await res.json());
  }

  useEffect(() => {
    void load();
  }, []);

  async function remove(id: string, email: string) {
    if (!confirm(`${email} हटाएँ?`)) return;
    await fetch(`/api/admin/newsletter/${encodeURIComponent(id)}`, { method: "DELETE" });
    await load();
  }

  return (
    <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {rows.map((r) => (
        <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
          <span>{r.email}</span>
          <div className="flex items-center gap-3">
            <span className="text-slate-400">{new Date(r.createdAt).toLocaleString("hi-IN")}</span>
            <button
              type="button"
              onClick={() => remove(r.id, r.email)}
              className="text-xs font-semibold text-red-600 font-devanagari"
            >
              हटाएँ
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
