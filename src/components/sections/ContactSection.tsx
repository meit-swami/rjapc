import Image from "next/image";
import { SectionTitle } from "@/components/SectionTitle";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";
import { phoneLineToTelHref } from "@/lib/contact-display";
import type { ContactAddressBlock } from "@/lib/content-types";
import type { PublicSocialUrls } from "@/lib/public-social";
import { WHATSAPP_GROUP_INVITE_URL, WHATSAPP_GROUP_QR_SRC } from "@/lib/whatsapp-public";

export function ContactSection({
  addressBlocks,
  phones,
  socialUrls,
}: {
  addressBlocks: ContactAddressBlock[];
  phones: string[];
  socialUrls?: PublicSocialUrls | null;
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
              <SocialLinks className="mt-8" urls={socialUrls} />

              <h3 className="mt-8 text-lg font-bold text-navy font-devanagari">WhatsApp समूह</h3>
              <p className="mt-2 text-sm text-slate-600 font-devanagari">
                समूह से जुड़ने के लिए QR स्कैन करें या नीचे दिए लिंक पर क्लिक करें।
              </p>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
                <a
                  href={WHATSAPP_GROUP_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 p-3 shadow-sm transition hover:border-[#25D366]/60"
                >
                  <Image
                    src={WHATSAPP_GROUP_QR_SRC}
                    alt="WhatsApp समूह में शामिल होने हेतु QR कोड"
                    width={168}
                    height={168}
                    className="h-40 w-40 object-contain"
                    unoptimized
                  />
                </a>
                <div className="min-w-0 flex-1">
                  <a
                    href={WHATSAPP_GROUP_INVITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-sm font-semibold text-[#128C7E] underline decoration-[#25D366]/50 underline-offset-2 transition hover:text-saffron"
                  >
                    {WHATSAPP_GROUP_INVITE_URL}
                  </a>
                  <p className="mt-2 text-xs text-slate-500 font-devanagari">
                    लिंक आपको WhatsApp में समूह आमंत्रण खोलेगा।
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div id="feedback" className="scroll-mt-24">
              <p className="mb-3 text-sm font-semibold text-navy font-devanagari">फीडबैक सेक्शन</p>
              <ContactForm />
            </div>
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
