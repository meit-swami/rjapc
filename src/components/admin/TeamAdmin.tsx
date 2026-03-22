"use client";

import { useEffect, useState } from "react";

type Member = {
  id: string;
  nameHi: string;
  designation: string;
  description: string;
  photoUrl: string | null;
  sortOrder: number;
  published: boolean;
  isFounder: boolean;
};

export function TeamAdmin() {
  const [list, setList] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Member | null>(null);
  const [form, setForm] = useState({
    nameHi: "",
    designation: "",
    description: "",
    photoUrl: "",
    sortOrder: 0,
    published: true,
    isFounder: false,
  });

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/team");
    if (res.ok) setList(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setEditing(null);
    setForm({
      nameHi: "",
      designation: "",
      description: "",
      photoUrl: "",
      sortOrder: 0,
      published: true,
      isFounder: false,
    });
  }

  function startEdit(m: Member) {
    setEditing(m);
    setForm({
      nameHi: m.nameHi,
      designation: m.designation,
      description: m.description,
      photoUrl: m.photoUrl ?? "",
      sortOrder: m.sortOrder,
      published: m.published,
      isFounder: m.isFounder,
    });
  }

  async function uploadFile(f: File) {
    const fd = new FormData();
    fd.set("file", f);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) return;
    const j = await res.json();
    if (j.url) setForm((x) => ({ ...x, photoUrl: j.url as string }));
  }

  async function save() {
    const payload = {
      nameHi: form.nameHi,
      designation: form.designation,
      description: form.description,
      photoUrl: form.photoUrl || null,
      sortOrder: form.sortOrder,
      published: form.published,
      isFounder: form.isFounder,
    };
    if (editing) {
      await fetch(`/api/admin/team/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    await load();
    startNew();
  }

  async function remove(id: string) {
    if (!confirm("हटाएँ?")) return;
    await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <p className="font-devanagari">लोड हो रहा है…</p>;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-3">
        <div className="flex justify-between">
          <h2 className="font-semibold text-navy font-devanagari">सूची</h2>
          <button type="button" onClick={startNew} className="text-sm text-saffron font-devanagari">
            + नया
          </button>
        </div>
        <ul className="space-y-2">
          {list.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3"
            >
              <button type="button" onClick={() => startEdit(m)} className="text-left font-devanagari">
                {m.nameHi}
              </button>
              <button type="button" onClick={() => remove(m.id)} className="text-red-600 text-sm">
                हटाएँ
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="font-semibold text-navy font-devanagari">{editing ? "संपादन" : "नया सदस्य"}</h2>
        <div className="mt-4 grid gap-3">
          <input
            placeholder="नाम"
            value={form.nameHi}
            onChange={(e) => setForm((f) => ({ ...f, nameHi: e.target.value }))}
            className="rounded border px-2 py-1 text-sm font-devanagari"
          />
          <input
            placeholder="पद"
            value={form.designation}
            onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
            className="rounded border px-2 py-1 text-sm font-devanagari"
          />
          <textarea
            placeholder="विवरण"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={3}
            className="rounded border px-2 py-1 text-sm font-devanagari"
          />
          <input
            placeholder="फ़ोटो URL (/uploads/...)"
            value={form.photoUrl}
            onChange={(e) => setForm((f) => ({ ...f, photoUrl: e.target.value }))}
            className="rounded border px-2 py-1 text-sm"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadFile(f);
            }}
            className="text-sm"
          />
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
            className="rounded border px-2 py-1 text-sm"
          />
          <label className="flex items-center gap-2 text-sm font-devanagari">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            />
            प्रकाशित
          </label>
          <label className="flex items-center gap-2 text-sm font-devanagari">
            <input
              type="checkbox"
              checked={form.isFounder}
              onChange={(e) => setForm((f) => ({ ...f, isFounder: e.target.checked }))}
            />
            संस्थापक
          </label>
          <button type="button" onClick={save} className="rounded-xl bg-saffron py-2 font-semibold text-white font-devanagari">
            सहेजें
          </button>
        </div>
      </div>
    </div>
  );
}
