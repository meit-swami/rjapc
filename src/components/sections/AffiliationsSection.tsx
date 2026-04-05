import Image from "next/image";
import Link from "next/link";
import type { AffiliationItem } from "@/lib/content-types";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";

export function AffiliationsSection({
  title,
  items,
}: {
  title: string;
  items: AffiliationItem[];
}) {
  const list = items.filter((a) => a.name?.trim());
  if (!list.length) return null;

  return (
    <section id="affiliations" className="scroll-mt-24 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle eyebrow="साझेदारी" title={title} subtitle="संस्थागत सहयोग व मान्यता" />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {list.map((a, i) => {
            const inner = (
              <div className="card-hover flex h-full min-h-[120px] flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                {a.logoUrl ? (
                  <div className="relative h-14 w-full max-w-[140px]">
                    <Image
                      src={a.logoUrl}
                      alt={a.name}
                      fill
                      className="object-contain"
                      sizes="140px"
                    />
                  </div>
                ) : null}
                <span className="text-sm font-semibold text-navy font-devanagari">{a.name}</span>
              </div>
            );
            return (
              <Reveal key={`${a.name}-${i}`} delay={i * 60}>
                <li>
                  {a.href ? (
                    <Link
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block outline-none ring-saffron/40 focus-visible:ring-2"
                    >
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
