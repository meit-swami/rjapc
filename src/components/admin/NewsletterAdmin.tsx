"use client";

import { useEffect, useState } from "react";

type Row = { email: string; createdAt: string };

export function NewsletterAdmin() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    fetch("/api/admin/newsletter")
      .then((r) => r.json())
      .then(setRows);
  }, []);

  return (
    <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {rows.map((r) => (
        <li key={r.email} className="flex justify-between px-4 py-3 text-sm">
          <span>{r.email}</span>
          <span className="text-slate-400">{new Date(r.createdAt).toLocaleString("hi-IN")}</span>
        </li>
      ))}
    </ul>
  );
}
