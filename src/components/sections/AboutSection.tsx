import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";

export function AboutSection({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle eyebrow="परिचय" title={title} />
        <div className="mx-auto grid max-w-4xl gap-6">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 shadow-sm md:p-8">
                <p className="text-lg leading-relaxed text-slate-700 font-devanagari">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
