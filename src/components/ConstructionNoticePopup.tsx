"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "rjapc-construction-popup-seen-v1";

export function ConstructionNoticePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = window.localStorage.getItem(STORAGE_KEY);
    if (!seen) setOpen(true);
  }, []);

  function closePopup() {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/50 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl md:p-6">
        <h2 className="text-xl font-bold text-navy font-devanagari">महत्वपूर्ण सूचना</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 font-devanagari md:text-base">
          यह वेबसाइट वर्तमान में निर्माणाधीन है। यदि आपको किसी भी पेज या सेक्शन में कोई जानकारी गलत मिले,
          तो कृपया हमें फीडबैक सेक्शन में अवश्य बताएं।
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 font-devanagari md:text-base">
          कृपया फीडबैक में संबंधित पेज/सेक्शन का लिंक भी संलग्न करें, ताकि हम उसे जल्दी सुधार सकें।
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href="/#feedback"
            className="inline-flex items-center justify-center rounded-xl bg-saffron px-4 py-2 text-sm font-semibold text-white transition hover:bg-saffron-dark font-devanagari"
          >
            फीडबैक दें
          </Link>
          <button
            type="button"
            onClick={closePopup}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 font-devanagari"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
}
