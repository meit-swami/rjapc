"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { SiteChromeBody, SiteNavItem } from "@/lib/content-types";

type Language = "hi" | "en";

function label(item: SiteNavItem, lang: Language) {
  return lang === "en" ? item.labelEn : item.labelHi;
}

function navLinkClass(lang: Language) {
  return `rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-saffron/10 hover:text-saffron ${
    lang === "en" ? "font-sans" : "font-devanagari"
  }`;
}

export function SiteHeader({ chrome }: { chrome: SiteChromeBody }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [knowMoreOpen, setKnowMoreOpen] = useState(false);
  const [mobileKnowMoreOpen, setMobileKnowMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguage();

  const { branding, mainNav, knowMoreNav } = chrome;
  const knowMoreTrigger =
    language === "en" ? chrome.knowMoreTriggerEn : chrome.knowMoreTriggerHi;

  useEffect(() => {
    if (!knowMoreOpen) return;
    function onPointerDown(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setKnowMoreOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setKnowMoreOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [knowMoreOpen]);

  return (
    <header className="notranslate sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 md:px-6">
        <Link href="/" className="group flex min-w-0 shrink items-center gap-2.5 leading-tight">
          <Image
            src="/uploads/logo.png"
            alt="RJAPC Logo"
            width={34}
            height={42}
            className="h-10 w-auto shrink-0 object-contain md:h-11"
            priority
          />
          <span className="flex min-w-0 flex-col">
            <span
              className={`text-base font-bold leading-tight text-navy transition-colors group-hover:text-saffron md:text-lg ${
                language === "en" ? "font-sans tracking-tight" : "font-devanagari md:text-[1.35rem]"
              }`}
            >
              {language === "en" ? branding.nameEn : branding.nameHi}
            </span>
            <span
              className={`text-[12px] leading-tight text-slate-500 md:text-[13px] ${
                language === "en" ? "font-sans" : "font-devanagari"
              }`}
            >
              {language === "en" ? branding.taglineEn : branding.taglineHi}
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(language)}>
              {label(item, language)}
            </Link>
          ))}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className={`flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-saffron/10 hover:text-saffron ${
                language === "en" ? "font-sans" : "font-devanagari"
              }`}
              aria-expanded={knowMoreOpen}
              aria-haspopup="menu"
              onClick={() => setKnowMoreOpen((v) => !v)}
            >
              {knowMoreTrigger}
              <span className="text-xs opacity-70" aria-hidden>
                {knowMoreOpen ? "▴" : "▾"}
              </span>
            </button>
            {knowMoreOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-slate-200 bg-white py-2 shadow-lg ring-1 ring-black/5"
              >
                {knowMoreNav.map((item) => (
                  <Link
                    key={item.href}
                    role="menuitem"
                    href={item.href}
                    className={`block px-4 py-2.5 text-sm text-slate-800 hover:bg-saffron/10 hover:text-saffron ${
                      language === "en" ? "font-sans" : "font-devanagari"
                    }`}
                    onClick={() => setKnowMoreOpen(false)}
                  >
                    {label(item, language)}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
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
            className="rounded-lg border border-slate-200 p-2 xl:hidden"
            aria-label={language === "hi" ? "मेनू" : "Menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-navy" />
            <span className="mt-1.5 block h-0.5 w-6 bg-navy" />
            <span className="mt-1.5 block h-0.5 w-6 bg-navy" />
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div className="border-t border-slate-100 bg-white px-4 py-3 xl:hidden">
          <div className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-slate-800 hover:bg-saffron/10 ${
                  language === "en" ? "font-sans" : "font-devanagari"
                }`}
              >
                {label(item, language)}
              </Link>
            ))}
            <button
              type="button"
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-slate-800 hover:bg-saffron/10 ${
                language === "en" ? "font-sans" : "font-devanagari"
              }`}
              aria-expanded={mobileKnowMoreOpen}
              onClick={() => setMobileKnowMoreOpen((v) => !v)}
            >
              {knowMoreTrigger}
              <span className="text-xs opacity-70">{mobileKnowMoreOpen ? "▴" : "▾"}</span>
            </button>
            {mobileKnowMoreOpen ? (
              <div className="ml-2 flex flex-col border-l-2 border-saffron/30 pl-3">
                {knowMoreNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileKnowMoreOpen(false);
                    }}
                    className={`rounded-lg px-3 py-2 text-slate-700 hover:bg-saffron/10 ${
                      language === "en" ? "font-sans text-sm" : "font-devanagari text-sm"
                    }`}
                  >
                    {label(item, language)}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
