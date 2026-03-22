import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";

export type CourseCard = {
  id: string;
  nameHi: string;
  duration: string;
  objective: string;
  topics: string[];
  activities: string[];
};

export function ProgramsSection({ courses }: { courses: CourseCard[] }) {
  return (
    <section id="programs" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="मॉड्यूल"
          title="कार्यक्रम"
          subtitle="संरचित मॉड्यूल — उद्देश्य, विषय व गतिविधियाँ"
        />
        <div className="grid gap-8 lg:grid-cols-3">
          {courses.map((c, i) => (
            <Reveal key={c.id} delay={i * 90}>
              <article className="card-hover flex h-full flex-col rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-navy font-devanagari">{c.nameHi}</h3>
                  <span className="shrink-0 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white font-devanagari">
                    {c.duration}
                  </span>
                </div>
                <p className="mt-4 text-slate-600 font-devanagari leading-relaxed">{c.objective}</p>
                <div className="mt-6">
                  <h4 className="text-sm font-bold uppercase tracking-wide text-saffron">विषय</h4>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-slate-700 font-devanagari">
                    {c.topics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex-1">
                  <h4 className="text-sm font-bold uppercase tracking-wide text-navy">गतिविधियाँ</h4>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-slate-700 font-devanagari">
                    {c.activities.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
