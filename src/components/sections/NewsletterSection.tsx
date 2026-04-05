import { SectionTitle } from "@/components/SectionTitle";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";

export function NewsletterSection({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
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
      </div>
    </section>
  );
}
