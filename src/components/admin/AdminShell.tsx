"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "डैशबोर्ड" },
  { href: "/admin/content", label: "सामग्री खंड" },
  { href: "/admin/courses", label: "पाठ्यक्रम" },
  { href: "/admin/team", label: "टीम" },
  { href: "/admin/blog", label: "ब्लॉग" },
  { href: "/admin/contacts", label: "संपर्क संदेश" },
  { href: "/admin/newsletter", label: "न्यूज़लेटर" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <aside className="border-b border-slate-200 bg-navy text-white lg:w-56 lg:border-b-0 lg:border-r">
        <div className="p-4">
          <p className="text-sm font-bold font-devanagari">प्रशासन पैनल</p>
          <p className="text-xs text-white/60">RJAPC</p>
        </div>
        <nav className="flex flex-wrap gap-1 px-2 pb-4 lg:flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium font-devanagari ${
                pathname === l.href ? "bg-saffron text-white" : "text-white/85 hover:bg-white/10"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden p-2 lg:block">
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-lg border border-white/20 py-2 text-sm font-devanagari hover:bg-white/10"
          >
            लॉग आउट
          </button>
        </div>
      </aside>
      <div className="flex-1 p-4 md:p-8">
        <div className="mb-4 flex justify-end lg:hidden">
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-slate-300 px-3 py-1 text-sm font-devanagari"
          >
            लॉग आउट
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
