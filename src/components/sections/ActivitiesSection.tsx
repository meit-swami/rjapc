import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { getActivityDescription } from "@/lib/activity-descriptions";

export function ActivitiesSection({ items }: { items: string[] }) {
  return (
    <section id="activities" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle eyebrow="अनुभव" title="गतिविधियाँ" subtitle="व्यावहारिक अध्ययन के विविध रूप" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
            <Reveal key={`${a}-${i}`} delay={i * 70}>
              <div className="group relative overflow-hidden rounded-2xl border-l-4 border-saffron bg-[#f8f9fa] px-5 py-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
                <p className="font-devanagari text-lg font-semibold text-navy">{a}</p>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                  <div className="min-h-0 overflow-hidden">
                    <p className="pt-3 font-devanagari text-sm leading-relaxed text-slate-600 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                      {getActivityDescription(a)}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
