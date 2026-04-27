"use client";

import { useEffect, useRef, useState } from "react";

const MIN_MS = 2000;
const FADE_MS = 500;

export function SplashIntro() {
  const [phase, setPhase] = useState<"hidden" | "show" | "fade">("show");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (phase !== "show") return;
    const el = videoRef.current;
    if (!el) return;

    const applyPlaybackRate = () => {
      try {
        el.playbackRate = 1.25;
      } catch {
        /* ignore */
      }
    };

    applyPlaybackRate();
    el.addEventListener("loadedmetadata", applyPlaybackRate);

    // Autoplay can fail if the browser blocks it; we keep the overlay regardless.
    el.play().catch(() => {});

    return () => {
      el.removeEventListener("loadedmetadata", applyPlaybackRate);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "show") return;
    let cancelled = false;
    const t0 = performance.now();

    const scheduleEnd = () => {
      if (cancelled) return;
      const elapsed = performance.now() - t0;
      const rest = Math.max(0, MIN_MS - elapsed);
      window.setTimeout(() => {
        if (cancelled) return;
        setPhase("fade");
        window.setTimeout(() => {
          if (!cancelled) setPhase("hidden");
        }, FADE_MS);
      }, rest);
    };

    if (document.readyState === "complete") {
      scheduleEnd();
    } else {
      window.addEventListener("load", scheduleEnd, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleEnd);
    };
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black transition-opacity duration-500 ease-out ${
        phase === "fade" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={phase === "fade"}
    >
      <video
        ref={videoRef}
        className="h-[92vh] w-[92vw] max-w-6xl rounded-xl object-contain"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        aria-label="Intro video"
      >
        <source src="/uploads/Videos/Chanakya.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
