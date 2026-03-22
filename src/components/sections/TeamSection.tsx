import Image from "next/image";
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
  return (
    <section id="team" className="scroll-mt-24 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle eyebrow="टीम" title="नेतृत्व" subtitle="अनुभव, प्रतिबद्धता व मार्गदर्शन" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.id} delay={i * 80}>
              <article className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-navy to-slate-800">
                  {m.photoUrl ? (
                    <Image src={m.photoUrl} alt={m.nameHi} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
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
