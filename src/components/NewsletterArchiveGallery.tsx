"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { NewsletterUpload } from "@/lib/public-uploads";

function isPreviewable(kind: NewsletterUpload["kind"]): boolean {
  return kind === "image" || kind === "video";
}

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.25;

export function NewsletterArchiveGallery({ items }: { items: NewsletterUpload[] }) {
  const previewable = useMemo(() => items.filter((i) => isPreviewable(i.kind)), [items]);
  const previewIndexByHref = useMemo(() => {
    const m = new Map<string, number>();
    let i = 0;
    for (const it of items) {
      if (isPreviewable(it.kind)) {
        m.set(it.href, i++);
      }
    }
    return m;
  }, [items]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const current = previewable[index] ?? null;

  const openAt = useCallback(
    (previewIndex: number) => {
      setIndex(previewIndex);
      setZoom(1);
      setOpen(true);
    },
    [],
  );

  const close = useCallback(() => {
    setOpen(false);
    setZoom(1);
  }, []);

  const go = useCallback(
    (delta: number) => {
      if (previewable.length === 0) return;
      setIndex((i) => (i + delta + previewable.length) % previewable.length);
      setZoom(1);
    },
    [previewable.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (current?.kind === "image") {
        if (e.key === "+" || e.key === "=") {
          e.preventDefault();
          setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP));
        }
        if (e.key === "-" || e.key === "_") {
          e.preventDefault();
          setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP));
        }
        if (e.key === "0") {
          e.preventDefault();
          setZoom(1);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, close, current?.kind]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!items.length) return null;

  return (
    <>
      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-md md:p-8">
        <h3 className="text-lg font-bold text-navy font-devanagari">आर्काइव (डाउनलोड)</h3>
        <p className="mt-1 text-sm text-slate-600 font-devanagari">
          फ़ोटो व वीडियो पर क्लिक करके बड़ा देखें — बाएँ/दाएँ घुमाएँ, छवि ज़ूम करें। PDF सीधे खुलेंगे।
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((f) => {
            if (f.kind === "pdf") {
              return (
                <li key={f.href}>
                  <a
                    href={f.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-hover flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center outline-none ring-saffron/30 focus-visible:ring-2"
                  >
                    <PdfGlyph className="h-12 w-12 text-red-600" />
                    <span className="line-clamp-2 text-xs font-semibold text-navy font-devanagari">{f.name}</span>
                    <span className="text-[10px] font-medium uppercase text-slate-500">PDF</span>
                  </a>
                </li>
              );
            }

            const pIndex = previewIndexByHref.get(f.href) ?? 0;

            return (
              <li key={f.href}>
                <button
                  type="button"
                  onClick={() => openAt(pIndex)}
                  className="card-hover group relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/5 outline-none ring-saffron/30 focus-visible:ring-2"
                >
                  {f.kind === "image" ? (
                    <Image
                      src={f.href}
                      alt={f.name}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                    />
                  ) : (
                    <video
                      src={f.href}
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover"
                      aria-hidden
                    />
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2 py-2 pt-8 text-left text-[11px] font-semibold text-white font-devanagari line-clamp-2">
                    {f.name}
                  </span>
                  {f.kind === "video" ? (
                    <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                      वीडियो
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {open && current ? (
        <div
          className="fixed inset-0 z-[300] flex flex-col bg-black/92"
          role="dialog"
          aria-modal="true"
          aria-label={current.name}
        >
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 px-3 py-2 md:px-4">
            <p className="min-w-0 truncate text-sm font-medium text-white font-devanagari">{current.name}</p>
            <div className="flex shrink-0 items-center gap-1">
              {current.kind === "image" ? (
                <>
                  <IconButton label="छोटा करें" onClick={() => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))}>
                    −
                  </IconButton>
                  <IconButton label="सामान्य आकार" onClick={() => setZoom(1)}>
                    1∶1
                  </IconButton>
                  <IconButton label="बड़ा करें" onClick={() => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))}>
                    +
                  </IconButton>
                </>
              ) : null}
              <IconButton label="बंद करें" onClick={close}>
                ✕
              </IconButton>
            </div>
          </div>

          <div className="relative min-h-0 flex-1">
            {previewable.length > 1 ? (
              <>
                <NavArrow dir="prev" onClick={() => go(-1)} />
                <NavArrow dir="next" onClick={() => go(1)} />
              </>
            ) : null}

            <div className="flex h-full w-full items-center justify-center overflow-auto p-4 md:p-8">
              {current.kind === "image" ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element -- zoom uses CSS transform on native img */}
                  <img
                    src={current.href}
                    alt={current.name}
                    style={{ transform: `scale(${zoom})` }}
                    className="max-h-[min(85vh,100%)] max-w-full origin-center object-contain shadow-2xl transition-transform duration-150 ease-out"
                    draggable={false}
                  />
                </>
              ) : (
                <video
                  key={current.href}
                  src={current.href}
                  controls
                  playsInline
                  className="max-h-[85vh] max-w-full rounded-lg"
                  autoPlay
                />
              )}
            </div>

            {previewable.length > 1 ? (
              <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-white/70 font-devanagari">
                {index + 1} / {previewable.length} · तीर कुंजी से अगला/पिछला
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

function IconButton({
  children,
  onClick,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
    >
      {children}
    </button>
  );
}

function NavArrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const isPrev = dir === "prev";
  return (
    <button
      type="button"
      aria-label={isPrev ? "पिछला" : "अगला"}
      onClick={onClick}
      className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-black/50 p-2.5 text-white shadow-lg backdrop-blur-sm hover:bg-black/70 md:p-3 ${
        isPrev ? "left-2 md:left-4" : "right-2 md:right-4"
      }`}
    >
      <svg className="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {isPrev ? (
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

function PdfGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v2H8v-2zm0-4h8v2H8v-2zm0-4h5v2H8V7z" />
    </svg>
  );
}
