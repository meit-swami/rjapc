"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import type { TeamCard } from "@/components/sections/TeamSection";

type TeamCardReadMoreProps = {
  member: TeamCard;
  /** Classes for the preview paragraph (include line-clamp-*) */
  previewTextClassName: string;
  nameHeadingClassName: string;
  designationClassName: string;
  contentWrapperClassName?: string;
  /** Card heading level for listings (modal title stays `h2`). */
  nameHeadingTag?: "h2" | "h3";
};

export function TeamCardReadMore({
  member,
  previewTextClassName,
  nameHeadingClassName,
  designationClassName,
  contentWrapperClassName = "flex flex-1 flex-col",
  nameHeadingTag = "h3",
}: TeamCardReadMoreProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const descId = useId();
  const NameHeading = nameHeadingTag;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className={contentWrapperClassName}>
      <NameHeading className={nameHeadingClassName}>{member.nameHi}</NameHeading>
      <p className={designationClassName}>{member.designation}</p>
      <p className={previewTextClassName}>{member.description}</p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 w-fit text-left text-sm font-semibold text-saffron underline decoration-saffron/30 underline-offset-2 transition hover:text-saffron-dark hover:decoration-saffron"
      >
        Read More →
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-navy/50 backdrop-blur-[2px]"
            aria-label="बंद करें"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative z-[101] max-h-[min(90vh,720px)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-slate-100 bg-white px-5 py-4">
              <div>
                <h2 id={titleId} className="text-xl font-bold text-navy font-devanagari">
                  {member.nameHi}
                </h2>
                <p className="mt-1 text-sm font-semibold text-saffron font-devanagari">{member.designation}</p>
              </div>
              <button
                type="button"
                onClick={close}
                className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600 transition hover:border-saffron hover:text-saffron"
              >
                बंद करें
              </button>
            </div>

            <div className="flex flex-col gap-4 px-5 pb-6 pt-4 sm:flex-row sm:items-start">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[220px] shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-navy to-slate-800 sm:mx-0">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.nameHi}
                    fill
                    className="object-contain object-center"
                    sizes="220px"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full min-h-[140px] items-center justify-center text-4xl font-bold text-white/30 font-devanagari">
                    {member.nameHi.slice(0, 1)}
                  </div>
                )}
              </div>
              <p id={descId} className="min-w-0 flex-1 whitespace-pre-wrap text-slate-700 font-devanagari leading-relaxed">
                {member.description}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
