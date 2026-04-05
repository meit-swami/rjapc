"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";

const STORAGE_KEY = "rjapc-splash-seen";
const MIN_MS = 2000;
const FADE_MS = 500;

export function SplashIntro() {
  const [phase, setPhase] = useState<"hidden" | "show" | "fade">("show");

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        setPhase("hidden");
      }
    } catch {
      /* private mode / blocked storage */
    }
  }, []);

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
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
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
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-slate-50 via-white to-slate-100 transition-opacity duration-500 ease-out ${
        phase === "fade" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={phase === "fade"}
    >
      <div className="relative mx-6 w-full max-w-md animate-splash-in">
        <Image
          src="/uploads/logo.png"
          alt=""
          width={640}
          height={640}
          className="h-auto w-full object-contain drop-shadow-sm"
          priority
        />
      </div>
      <div
        className="h-1 w-32 overflow-hidden rounded-full bg-slate-200"
        aria-hidden
      >
        <div className="h-full w-1/3 animate-splash-bar rounded-full bg-saffron" />
      </div>
    </div>
  );
}
