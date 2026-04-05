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
  contact:
    '{"phones":[],"addressBlocks":[{"label":"","line":""}],"addressLine":"","instagramUrl":"","facebookUrl":"","xUrl":"","youtubeUrl":"","linkedinUrl":"","whatsappUrl":""}',
  seo: '{"title":"","description":""}',
  affiliations: '{"items":[{"name":"","logoUrl":null,"href":null}]}',
  newsletter: '{"subtitle":""}',
  media: '{"items":[{"kind":"photo","title":"","url":"","date":"2024-01-15"}]}',
  programs: '{"eyebrow":"","title":"","subtitle":""} — होमपेज कार्यक्रम शीर्षक',
  donations:
    '{"eyebrow","title","subtitle","bankCardTitle","bankCardNote","bankRows":[{"dt":"","dd":""}],"qrCardTitle","qrNote","usePlaceholderQr":true,"qrImageUrl":null}',
  affiliate_books:
    '{"course-slug":[{"href":"https://...","titleFallback":"","authorDisplay":"","priceDisplay":"","mrpDisplay":"","savingsDisplay":"","imageOverride":""}]} — प्रत्येक कोर्स स्लग (जैसे foundation-module) की कुंजी',
  site_chrome:
    '{"branding":{"nameHi","nameEn","taglineHi","taglineEn"},"mainNav":[{"href","labelHi","labelEn"}],"knowMoreNav":[...],"knowMoreTriggerHi","knowMoreTriggerEn","footer":{"brandHi","tagHi","copyrightRestHi","links":[{"href","labelHi"}]}}',
};

export function ContentAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [selKey, setSelKey] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("{}");

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

  async function removeCurrent() {
    if (!sel) return;
    if (!confirm(`खंड "${sel.key}" हटाएँ? सार्वजनिक साइट पर डिफ़ॉल्ट मान लागू होंगे जहाँ लागू हो।`)) return;
    setMsg("");
    const res = await fetch(`/api/admin/content/${encodeURIComponent(sel.key)}`, { method: "DELETE" });
    if (res.ok) {
      setMsg("हटा दिया गया।");
      const res2 = await fetch("/api/admin/content");
      if (res2.ok) {
        const data: Row[] = await res2.json();
        setRows(data);
        if (data.length > 0) {
          const r = data[0]!;
          setSelKey(r.key);
          setTitle(r.title ?? "");
          setBody(r.body);
        } else {
          setSelKey(null);
          setTitle("");
          setBody("");
        }
      } else await load();
    } else setMsg("हटाने में त्रुटि।");
  }

  async function createSection() {
    const k = newKey.trim();
    if (!k) {
      setMsg("नई कुंजी दर्ज करें।");
      return;
    }
    setMsg("");
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: k, title: newTitle.trim() || null, body: newBody }),
    });
    if (res.ok) {
      const row: Row = await res.json();
      setNewKey("");
      setNewTitle("");
      setNewBody("{}");
      setMsg("नया खंड बनाया गया।");
      await load();
      pick(row);
    } else {
      const j = await res.json().catch(() => ({}));
      setMsg((j as { error?: string }).error ?? "बनाने में त्रुटि।");
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-navy font-devanagari">नया सामग्री खंड (कुंजी)</h2>
        <p className="mt-1 text-xs text-slate-600 font-devanagari">
          कुंजी: छोटे अक्षर, अंक, अंडरस्कोर; पहला वर्ण अक्षर हो।
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <input
            placeholder="कुंजी (जैसे custom_block)"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="rounded border px-2 py-1 font-mono text-sm"
          />
          <input
            placeholder="शीर्षक (वैकल्पिक)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="rounded border px-2 py-1 text-sm font-devanagari sm:col-span-2"
          />
        </div>
        <label className="mt-2 block text-xs text-slate-500">प्रारंभिक body (JSON)</label>
        <textarea
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded border px-2 py-1 font-mono text-sm"
        />
        <button
          type="button"
          onClick={createSection}
          className="mt-2 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white font-devanagari"
        >
          खंड बनाएँ
        </button>
      </div>

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
                सहायता: {KEYS_HELP[sel.key] ?? "मान्य JSON — साइट कोड में इस कुंजी का उपयोग हो तो ही प्रभाव दिखेगा।"}
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
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={save}
                  className="rounded-xl bg-saffron px-6 py-2 font-semibold text-white font-devanagari"
                >
                  सहेजें
                </button>
                <button
                  type="button"
                  onClick={removeCurrent}
                  className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 font-devanagari"
                >
                  खंड हटाएँ
                </button>
              </div>
              {msg ? <p className="mt-2 text-sm font-devanagari">{msg}</p> : null}
            </>
          ) : (
            <p className="font-devanagari">कोई खंड नहीं — ऊपर से नया बनाएँ या सीड चलाएँ।</p>
          )}
        </div>
      </div>
    </div>
  );
}
