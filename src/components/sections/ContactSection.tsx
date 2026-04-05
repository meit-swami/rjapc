import { SectionTitle } from "@/components/SectionTitle";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";
import { phoneLineToTelHref } from "@/lib/contact-display";
import type { ContactAddressBlock } from "@/lib/content-types";

export function ContactSection({
  addressBlocks,
  phones,
}: {
  addressBlocks: ContactAddressBlock[];
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
              <div className="mt-3 space-y-5 text-slate-700">
                {addressBlocks.length ? (
                  addressBlocks.map((b) => (
                    <div key={`${b.label}-${b.line.slice(0, 24)}`}>
                      <p className="text-sm font-semibold text-navy font-devanagari">{b.label}</p>
                      <p className="mt-1 leading-relaxed font-devanagari">{b.line}</p>
                    </div>
                  ))
                ) : (
                  <p className="leading-relaxed font-devanagari text-slate-500">पता जल्द अपडेट किया जाएगा।</p>
                )}
              </div>
              <h3 className="mt-8 text-lg font-bold text-navy font-devanagari">फ़ोन</h3>
              <ul className="mt-2 space-y-2 text-slate-700">
                {phones.map((p) => (
                  <li key={p}>
                    <a href={phoneLineToTelHref(p)} className="hover:text-saffron font-devanagari">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
              <SocialLinks className="mt-8" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
        <p className="mt-10 text-center text-sm text-slate-600 font-devanagari">
          <a href="/newsletter" className="font-semibold text-saffron hover:underline">
            न्यूज़लेटर सदस्यता
          </a>{" "}
          — कार्यक्रम अपडेट ईमेल पर पाएँ।
        </p>
      </div>
    </section>
  );
}
