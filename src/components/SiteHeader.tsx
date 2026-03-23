"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

type Language = "hi" | "en";

const links: Array<{ href: string; label: string }> = [
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
  const { language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 md:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5 leading-tight">
          <Image
            src="/uploads/logo.png"
            alt="RJAPC Logo"
            width={34}
            height={42}
            className="h-10 w-auto object-contain md:h-11"
            priority
          />
          <span className="flex flex-col">
            <span className="font-devanagari text-lg font-bold leading-tight text-navy transition-colors group-hover:text-saffron md:text-[1.75rem]">
              राष्ट्रीय जनादेश प्रमोशनल काउंसिल
            </span>
            <span className="font-devanagari text-[13px] leading-tight text-slate-500">राजनीतिक करियर संस्थान</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-0.5 xl:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-saffron/10 hover:text-saffron font-devanagari"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div
            className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm"
            role="tablist"
            aria-label="Language switcher"
          >
            <button
              type="button"
              role="tab"
              aria-selected={language === "en"}
              onClick={() => setLanguage("en" as Language)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                language === "en" ? "bg-navy text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={language === "hi"}
              onClick={() => setLanguage("hi" as Language)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                language === "hi" ? "bg-saffron text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              HIN
            </button>
          </div>
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 lg:hidden"
            aria-label={language === "hi" ? "मेनू" : "Menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-navy" />
            <span className="mt-1.5 block h-0.5 w-6 bg-navy" />
            <span className="mt-1.5 block h-0.5 w-6 bg-navy" />
          </button>
        </div>
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
