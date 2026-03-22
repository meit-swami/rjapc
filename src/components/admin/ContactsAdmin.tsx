"use client";

import { useEffect, useState } from "react";

type Row = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

export function ContactsAdmin() {
  const [rows, setRows] = useState<Row[]>([]);

  async function load() {
    const res = await fetch("/api/admin/contacts");
    if (res.ok) setRows(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function mark(id: string, read: boolean) {
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    await load();
  }

  return (
    <div className="space-y-4">
      {rows.map((r) => (
        <div
          key={r.id}
          className={`rounded-xl border p-4 ${r.read ? "border-slate-200 bg-white" : "border-saffron/40 bg-amber-50/50"}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold font-devanagari">{r.name}</p>
            <span className="text-xs text-slate-400">{new Date(r.createdAt).toLocaleString("hi-IN")}</span>
          </div>
          <p className="text-sm text-slate-600">{r.email}</p>
          {r.phone ? <p className="text-sm">{r.phone}</p> : null}
          <p className="mt-2 whitespace-pre-wrap text-slate-800 font-devanagari">{r.message}</p>
          <button
            type="button"
            onClick={() => mark(r.id, !r.read)}
            className="mt-2 text-sm text-saffron font-devanagari"
          >
            {r.read ? "अपठित चिह्नित करें" : "पढ़ा चिह्नित करें"}
          </button>
        </div>
      ))}
      {rows.length === 0 ? <p className="font-devanagari text-slate-500">कोई संदेश नहीं।</p> : null}
    </div>
  );
}
