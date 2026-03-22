"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "#about", label: "परिचय" },
  { href: "#mission", label: "मिशन" },
  { href: "#programs", label: "कार्यक्रम" },
  { href: "#curriculum", label: "पाठ्यक्रम" },
  { href: "#activities", label: "गतिविधियाँ" },
  { href: "#team", label: "नेतृत्व" },
  { href: "#why", label: "क्यों हम" },
  { href: "#contact", label: "संपर्क" },
  { href: "/blog", label: "ब्लॉग" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="group flex flex-col leading-tight">
          <span className="font-devanagari text-lg font-bold text-navy transition-colors group-hover:text-saffron md:text-xl">
            राष्ट्रीय जनादेश प्रमोशनल काउंसिल
          </span>
          <span className="text-xs text-slate-500 font-devanagari">राजनीतिक करियर संस्थान</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-saffron/10 hover:text-saffron font-devanagari"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="rounded-lg border border-slate-200 p-2 lg:hidden"
          aria-label="मेनू"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-navy" />
          <span className="mt-1.5 block h-0.5 w-6 bg-navy" />
          <span className="mt-1.5 block h-0.5 w-6 bg-navy" />
        </button>
      </div>
      {open ? (
        <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 font-devanagari text-slate-800 hover:bg-saffron/10"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
