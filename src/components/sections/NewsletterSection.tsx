import { SectionTitle } from "@/components/SectionTitle";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import type { NewsletterUpload } from "@/lib/public-uploads";

export function NewsletterSection({
  title,
  subtitle,
  attachments = [],
}: {
  title: string;
  subtitle?: string;
  attachments?: NewsletterUpload[];
}) {
  return (
    <section id="newsletter" className="scroll-mt-24 bg-slate-100 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <SectionTitle eyebrow="अपडेट" title={title} subtitle={subtitle ?? "कार्यक्रम व लेख सीधे आपके इनबॉक्स में।"} />
        <Reveal>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
            <NewsletterForm variant="light" />
          </div>
        </Reveal>

        {attachments.length ? (
          <Reveal delay={100}>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-md md:p-8">
              <h3 className="text-lg font-bold text-navy font-devanagari">आर्काइव (डाउनलोड)</h3>
              <p className="mt-1 text-sm text-slate-600 font-devanagari">
                फ़ाइलें <code className="rounded bg-slate-100 px-1 font-mono text-xs">public/uploads/Newsletter</code> से
              </p>
              <ul className="mt-4 space-y-2">
                {attachments.map((f) => (
                  <li key={f.href}>
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-navy hover:border-saffron/50 hover:bg-saffron/5 font-devanagari"
                    >
                      <span className="rounded bg-navy/10 px-1.5 py-0.5 font-mono text-[10px] uppercase text-navy">
                        {f.kind}
                      </span>
                      {f.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
