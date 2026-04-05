import { SectionTitle } from "@/components/SectionTitle";
import { NewsletterForm } from "@/components/NewsletterForm";
import { NewsletterArchiveGallery } from "@/components/NewsletterArchiveGallery";
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
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle eyebrow="अपडेट" title={title} subtitle={subtitle ?? "कार्यक्रम व लेख सीधे आपके इनबॉक्स में।"} />
          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
              <NewsletterForm variant="light" />
            </div>
          </Reveal>
        </div>

        {attachments.length ? (
          <Reveal delay={100}>
            <NewsletterArchiveGallery items={attachments} />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
