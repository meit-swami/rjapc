import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";

export function MissionSection({
  title,
  points,
}: {
  title: string;
  points: { title: string; description: string }[];
}) {
  return (
    <section id="mission" className="scroll-mt-24 bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle eyebrow="दृष्टि" title={title} />
        <div className="grid gap-6 md:grid-cols-3">
          {points.map((m, i) => (
            <Reveal key={m.title} delay={i * 100}>
              <article className="card-hover h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-saffron/15 text-lg font-bold text-saffron">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-navy font-devanagari">{m.title}</h3>
                <p className="mt-3 text-slate-600 font-devanagari leading-relaxed">{m.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
