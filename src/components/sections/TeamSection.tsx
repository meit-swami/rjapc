import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";

export type TeamCard = {
  id: string;
  nameHi: string;
  designation: string;
  description: string;
  photoUrl: string | null;
  isFounder: boolean;
};

export function TeamSection({ team }: { team: TeamCard[] }) {
  const uniqueTopTeam = team
    .filter((m) => m.nameHi !== "अन्य सदस्य")
    .filter((m, idx, arr) => arr.findIndex((x) => x.nameHi === m.nameHi) === idx)
    .slice(0, 4);

  return (
    <section id="team" className="scroll-mt-24 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <SectionTitle eyebrow="टीम" title="नेतृत्व" subtitle="अनुभव, प्रतिबद्धता व मार्गदर्शन" />
          <Link
            href="/team"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-fit items-center justify-center self-start rounded-xl border border-navy/20 bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm transition hover:border-saffron hover:text-saffron"
          >
            View All Team members
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {uniqueTopTeam.map((m, i) => (
            <Reveal key={m.id} delay={i * 80}>
              <article className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-navy to-slate-800">
                  {m.photoUrl ? (
                    <Image
                      src={m.photoUrl}
                      alt={m.nameHi}
                      fill
                      className="object-contain object-center"
                      sizes="(max-width:768px) 100vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl font-bold text-white/25 font-devanagari">
                      {m.nameHi.slice(0, 1)}
                    </div>
                  )}
                  {m.isFounder ? (
                    <span className="absolute left-3 top-3 rounded-full bg-saffron px-3 py-1 text-xs font-bold text-white font-devanagari">
                      संस्थापक
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-navy font-devanagari">{m.nameHi}</h3>
                  <p className="mt-1 text-sm font-semibold text-saffron font-devanagari">{m.designation}</p>
                  <p className="mt-3 flex-1 text-slate-600 font-devanagari leading-relaxed">{m.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
