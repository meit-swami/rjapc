"use client";

import { useEffect, useState } from "react";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  coverImage: string | null;
  published: boolean;
};

export function BlogAdmin() {
  const [list, setList] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    excerpt: "",
    body: "",
    coverImage: "",
    published: false,
  });

  async function load() {
    const res = await fetch("/api/admin/blog");
    if (res.ok) setList(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setEditing(null);
    setForm({ slug: "", title: "", excerpt: "", body: "", coverImage: "", published: false });
  }

  function startEdit(p: Post) {
    setEditing(p);
    setForm({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? "",
      body: p.body,
      coverImage: p.coverImage ?? "",
      published: p.published,
    });
  }

  async function save() {
    const payload = {
      slug: form.slug,
      title: form.title,
      excerpt: form.excerpt || null,
      body: form.body,
      coverImage: form.coverImage || null,
      published: form.published,
    };
    if (editing) {
      await fetch(`/api/admin/blog/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/admin/blog", {
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
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <div className="mb-2 flex justify-between">
          <h2 className="font-semibold font-devanagari">पोस्ट</h2>
          <button type="button" onClick={startNew} className="text-sm text-saffron font-devanagari">
            + नया
          </button>
        </div>
        <ul className="space-y-2">
          {list.map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2">
              <button type="button" onClick={() => startEdit(p)} className="text-left text-sm font-devanagari">
                {p.title}
              </button>
              <button type="button" onClick={() => remove(p.id)} className="text-red-600 text-xs">
                हटाएँ
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="font-semibold font-devanagari">{editing ? "संपादन" : "नया लेख"}</h2>
        <div className="mt-3 grid gap-2">
          <input
            placeholder="slug"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            disabled={!!editing}
            className="rounded border px-2 py-1 text-sm"
          />
          <input
            placeholder="शीर्षक"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="rounded border px-2 py-1 text-sm font-devanagari"
          />
          <textarea
            placeholder="अंश"
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            rows={2}
            className="rounded border px-2 py-1 text-sm font-devanagari"
          />
          <textarea
            placeholder="मुख्य पाठ"
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            rows={10}
            className="rounded border px-2 py-1 text-sm font-devanagari"
          />
          <input
            placeholder="कवर छवि URL"
            value={form.coverImage}
            onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
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
          <button type="button" onClick={save} className="rounded-xl bg-saffron py-2 text-white font-devanagari">
            सहेजें
          </button>
        </div>
      </div>
    </div>
  );
}
