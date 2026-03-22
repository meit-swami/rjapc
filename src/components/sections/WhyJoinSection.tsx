import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";

export function WhyJoinSection({ items }: { items: string[] }) {
  return (
    <section id="why" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle eyebrow="अवसर" title="क्यों जुड़ें" />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-saffron/10 to-white p-6 text-center shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-xl font-bold text-white">
                  ✓
                </div>
                <p className="text-lg font-medium text-slate-800 font-devanagari leading-relaxed">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
