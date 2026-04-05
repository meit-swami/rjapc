"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Photo = { url: string; title: string };

export function MediaLightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setScale(1);
  }, [index]);

  const goPrev = useCallback(() => {
    if (photos.length === 0) return;
    onIndexChange((index - 1 + photos.length) % photos.length);
  }, [index, onIndexChange, photos.length]);

  const goNext = useCallback(() => {
    if (photos.length === 0) return;
    onIndexChange((index + 1) % photos.length);
  }, [index, onIndexChange, photos.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setScale((s) => Math.min(4, Math.round((s + 0.25) * 100) / 100));
      }
      if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        setScale((s) => Math.max(0.5, Math.round((s - 0.25) * 100) / 100));
      }
      if (e.key === "0") setScale(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const cur = photos[index];
  if (!mounted || !cur) return null;

  const ui = (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/92"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <div
        className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 px-3 py-2 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="min-w-0 truncate text-sm font-medium font-devanagari md:text-base">{cur.title}</p>
        <div className="flex shrink-0 items-center gap-1">
          <span className="hidden text-xs text-white/60 sm:inline">
            {index + 1} / {photos.length}
          </span>
          <button
            type="button"
            className="rounded-lg px-2 py-1.5 text-sm font-semibold hover:bg-white/10"
            onClick={() => setScale((s) => Math.min(4, Math.round((s + 0.25) * 100) / 100))}
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            className="rounded-lg px-2 py-1.5 text-sm font-semibold hover:bg-white/10"
            onClick={() => setScale((s) => Math.max(0.5, Math.round((s - 0.25) * 100) / 100))}
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            className="rounded-lg px-2 py-1.5 text-xs text-white/80 hover:bg-white/10"
            onClick={() => setScale(1)}
          >
            100%
          </button>
          <button
            type="button"
            className="ml-1 rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-white/15"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        {photos.length > 1 ? (
          <button
            type="button"
            className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-2xl text-white hover:bg-black/70 md:left-3"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
        ) : null}
        {photos.length > 1 ? (
          <button
            type="button"
            className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-2xl text-white hover:bg-black/70 md:right-3"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        ) : null}

        <div className="flex h-full min-h-0 items-center justify-center overflow-auto p-4 md:p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cur.url}
            alt={cur.title}
            className="max-h-[min(85vh,100%)] max-w-full origin-center object-contain shadow-2xl transition-transform duration-200 ease-out"
            style={{ transform: `scale(${scale})` }}
            draggable={false}
            onDoubleClick={() => setScale(1)}
          />
        </div>
      </div>

      <p
        className="shrink-0 border-t border-white/10 py-2 text-center text-xs text-white/50 font-devanagari"
        onClick={(e) => e.stopPropagation()}
      >
        ← → नेविगेट · +/- ज़ूम · Esc बंद · डबल-क्लिक 100%
      </p>
    </div>
  );

  return createPortal(ui, document.body);
}
