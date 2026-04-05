import { SectionTitle } from "@/components/SectionTitle";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

export function ContactSection({
  addressLine,
  phones,
}: {
  addressLine: string;
  phones: string[];
}) {
  return (
    <section id="contact" className="scroll-mt-24 bg-slate-100 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle eyebrow="संपर्क" title="हमसे जुड़ें" subtitle="पता, फ़ोन व ऑनलाइन फ़ॉर्म" />
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
              <h3 className="text-lg font-bold text-navy font-devanagari">पता</h3>
              <p className="mt-2 text-slate-700 font-devanagari leading-relaxed">{addressLine}</p>
              <h3 className="mt-8 text-lg font-bold text-navy font-devanagari">फ़ोन</h3>
              <ul className="mt-2 space-y-1 text-slate-700">
                {phones.map((p) => (
                  <li key={p}>
                    <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-saffron">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
        <p className="mt-10 text-center text-sm text-slate-600 font-devanagari">
          <a href="#newsletter" className="font-semibold text-saffron hover:underline">
            न्यूज़लेटर सदस्यता
          </a>{" "}
          — कार्यक्रम अपडेट ईमेल पर पाएँ।
        </p>
      </div>
    </section>
  );
}
