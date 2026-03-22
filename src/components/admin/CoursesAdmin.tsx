"use client";

import { useEffect, useState } from "react";

type Course = {
  id: string;
  slug: string;
  nameHi: string;
  duration: string;
  objective: string;
  topics: string;
  activities: string;
  sortOrder: number;
  published: boolean;
};

function parseList(s: string): string[] {
  return s
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}

export function CoursesAdmin() {
  const [list, setList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState({
    slug: "",
    nameHi: "",
    duration: "",
    objective: "",
    topicsText: "",
    activitiesText: "",
    sortOrder: 0,
    published: true,
  });

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/courses");
    if (res.ok) setList(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setEditing(null);
    setForm({
      slug: "",
      nameHi: "",
      duration: "",
      objective: "",
      topicsText: "",
      activitiesText: "",
      sortOrder: 0,
      published: true,
    });
  }

  function startEdit(c: Course) {
    setEditing(c);
    let topics: string[] = [];
    let activities: string[] = [];
    try {
      topics = JSON.parse(c.topics);
    } catch {
      topics = [];
    }
    try {
      activities = JSON.parse(c.activities);
    } catch {
      activities = [];
    }
    setForm({
      slug: c.slug,
      nameHi: c.nameHi,
      duration: c.duration,
      objective: c.objective,
      topicsText: topics.join("\n"),
      activitiesText: activities.join("\n"),
      sortOrder: c.sortOrder,
      published: c.published,
    });
  }

  async function save() {
    const topics = parseList(form.topicsText);
    const activities = parseList(form.activitiesText);
    const payload = {
      slug: form.slug,
      nameHi: form.nameHi,
      duration: form.duration,
      objective: form.objective,
      topics,
      activities,
      sortOrder: form.sortOrder,
      published: form.published,
    };
    if (editing) {
      await fetch(`/api/admin/courses/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/admin/courses", {
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
    await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <p className="font-devanagari">लोड हो रहा है…</p>;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-3">
        <div className="flex justify-between gap-2">
          <h2 className="font-semibold text-navy font-devanagari">सूची</h2>
          <button type="button" onClick={startNew} className="text-sm text-saffron font-devanagari">
            + नया
          </button>
        </div>
        <ul className="space-y-2">
          {list.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3"
            >
              <button type="button" onClick={() => startEdit(c)} className="text-left font-devanagari">
                <span className="font-medium">{c.nameHi}</span>
                <span className="ml-2 text-xs text-slate-500">{c.duration}</span>
              </button>
              <button type="button" onClick={() => remove(c.id)} className="text-red-600 text-sm">
                हटाएँ
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="font-semibold text-navy font-devanagari">{editing ? "संपादन" : "नया पाठ्यक्रम"}</h2>
        <div className="mt-4 grid gap-3">
          <input
            placeholder="slug (अंग्रेज़ी, kebab-case)"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="rounded border px-2 py-1 text-sm"
            disabled={!!editing}
          />
          <input
            placeholder="नाम (हिंदी)"
            value={form.nameHi}
            onChange={(e) => setForm((f) => ({ ...f, nameHi: e.target.value }))}
            className="rounded border px-2 py-1 text-sm font-devanagari"
          />
          <input
            placeholder="अवधि"
            value={form.duration}
            onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
            className="rounded border px-2 py-1 text-sm font-devanagari"
          />
          <textarea
            placeholder="उद्देश्य"
            value={form.objective}
            onChange={(e) => setForm((f) => ({ ...f, objective: e.target.value }))}
            rows={3}
            className="rounded border px-2 py-1 text-sm font-devanagari"
          />
          <label className="text-xs text-slate-500 font-devanagari">विषय (प्रति पंक्ति एक)</label>
          <textarea
            value={form.topicsText}
            onChange={(e) => setForm((f) => ({ ...f, topicsText: e.target.value }))}
            rows={4}
            className="rounded border px-2 py-1 text-sm font-devanagari"
          />
          <label className="text-xs text-slate-500 font-devanagari">गतिविधियाँ (प्रति पंक्ति एक)</label>
          <textarea
            value={form.activitiesText}
            onChange={(e) => setForm((f) => ({ ...f, activitiesText: e.target.value }))}
            rows={4}
            className="rounded border px-2 py-1 text-sm font-devanagari"
          />
          <input
            type="number"
            placeholder="क्रम"
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
          <button type="button" onClick={save} className="rounded-xl bg-saffron py-2 font-semibold text-white font-devanagari">
            सहेजें
          </button>
        </div>
      </div>
    </div>
  );
}
