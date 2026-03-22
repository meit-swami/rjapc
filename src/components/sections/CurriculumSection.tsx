import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";

export function CurriculumSection({ subjects }: { subjects: string[] }) {
  return (
    <section id="curriculum" className="scroll-mt-24 bg-navy py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          variant="dark"
          eyebrow="अध्ययन"
          title="पाठ्यक्रम विषय"
          subtitle="संवैधानिक, ऐतिहासिक व व्यावहारिक आयामों का समन्वित अध्ययन"
        />
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {subjects.map((s, i) => (
            <Reveal key={s} delay={i * 60}>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-4 backdrop-blur font-devanagari">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-lg font-medium">{s}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
