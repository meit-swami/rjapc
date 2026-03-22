"use client";

import { useEffect, useState } from "react";

type Row = { key: string; title: string | null; body: string };

const KEYS_HELP: Record<string, string> = {
  hero: '{"subtitle":"","tagline":"","backgroundImageUrl":null}',
  about: '{"paragraphs":["..."]}',
  mission: '{"points":[{"title":"","description":""}]}',
  curriculum: '{"subjects":[]}',
  activities: '{"items":[]}',
  why_join: '{"items":[]}',
  contact: '{"phones":[],"addressLine":""}',
  seo: '{"title":"","description":""}',
};

export function ContentAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [selKey, setSelKey] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");

  const sel = rows.find((r) => r.key === selKey) ?? null;

  async function load() {
    const res = await fetch("/api/admin/content");
    if (!res.ok) return;
    const data: Row[] = await res.json();
    setRows(data);
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (rows.length === 0 || selKey !== null) return;
    const r = rows[0];
    setSelKey(r.key);
    setTitle(r.title ?? "");
    setBody(r.body);
  }, [rows, selKey]);

  function pick(r: Row) {
    setSelKey(r.key);
    setTitle(r.title ?? "");
    setBody(r.body);
    setMsg("");
  }

  async function save() {
    if (!sel) return;
    setMsg("");
    const res = await fetch(`/api/admin/content/${encodeURIComponent(sel.key)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title || null, body }),
    });
    if (res.ok) {
      const row: Row = await res.json();
      setMsg("सहेजा गया।");
      await load();
      pick(row);
    } else setMsg("त्रुटि। JSON जाँचें।");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <ul className="space-y-1 lg:col-span-1">
        {rows.map((r) => (
          <li key={r.key}>
            <button
              type="button"
              onClick={() => pick(r)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-mono ${
                selKey === r.key ? "bg-navy text-white" : "bg-white border border-slate-200"
              }`}
            >
              {r.key}
            </button>
          </li>
        ))}
      </ul>
      <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {sel ? (
          <>
            <p className="text-xs text-slate-500">
              सहायता: {KEYS_HELP[sel.key] ?? "JSON"}
            </p>
            <label className="mt-2 block text-sm font-devanagari">शीर्षक (वैकल्पिक)</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded border px-2 py-1 text-sm font-devanagari"
            />
            <label className="mt-3 block text-sm">body (JSON)</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={18}
              className="mt-1 w-full rounded border px-2 py-1 font-mono text-sm"
            />
            <button
              type="button"
              onClick={save}
              className="mt-3 rounded-xl bg-saffron px-6 py-2 font-semibold text-white font-devanagari"
            >
              सहेजें
            </button>
            {msg ? <p className="mt-2 text-sm font-devanagari">{msg}</p> : null}
          </>
        ) : (
          <p className="font-devanagari">कोई खंड नहीं — पहले सीड चलाएँ।</p>
        )}
      </div>
    </div>
  );
}
