import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";

export function ActivitiesSection({ items }: { items: string[] }) {
  return (
    <section id="activities" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle eyebrow="अनुभव" title="गतिविधियाँ" subtitle="व्यावहारिक अध्ययन के विविध रूप" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
            <Reveal key={a} delay={i * 70}>
              <div className="rounded-2xl border-l-4 border-saffron bg-slate-50 px-5 py-4 shadow-sm font-devanagari text-lg font-medium text-slate-800">
                {a}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
