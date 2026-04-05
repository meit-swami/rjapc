import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateBookGrid } from "@/components/AffiliateBookGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { resolveAllAffiliateBooks } from "@/lib/affiliate-books";
import { getPublicPageData } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "कोर्स व अनुशंसित पुस्तकें",
  description:
    "मॉड्यूल अनुसार अनुशंसित पुस्तकें — सहबद्ध लिंक के माध्यम से। संरचित राजनीतिक शिक्षा कार्यक्रम।",
  openGraph: {
    title: "कोर्स व अनुशंसित पुस्तकें",
    description: "मॉड्यूल अनुसार अनुशंसित पुस्तकें — सहबद्ध लिंक के माध्यम से।",
  },
};

export default async function CoursesPage() {
  const [data, allBooks] = await Promise.all([getPublicPageData(), resolveAllAffiliateBooks()]);

  return (
    <div className="bg-slate-50 pb-20 pt-10 md:pt-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="कोर्स"
          title="कार्यक्रम व पुस्तकें"
          subtitle="प्रत्येक मॉड्यूल से जुड़ी अनुशंसित पुस्तकें — नीचे सभी लिंक एक साथ; मॉड्यूल कार्ड से विवरण पृष्ठ पर जाएँ।"
        />

        <div className="mb-14 grid gap-6 lg:grid-cols-3">
          {data.courses.map((c) => (
            <Link
              key={c.id}
              href={`/courses/${c.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:border-saffron/50 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-bold text-navy font-devanagari">{c.nameHi}</h2>
                <span className="shrink-0 rounded-full bg-navy px-2.5 py-0.5 text-xs font-semibold text-white font-devanagari">
                  {c.duration}
                </span>
              </div>
              <p className="mt-3 line-clamp-3 text-sm text-slate-600 font-devanagari">{c.objective}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-saffron">मॉड्यूल पुस्तकें →</span>
            </Link>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-xl font-bold text-navy font-devanagari md:text-2xl">सभी अनुशंसित पुस्तकें</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 font-devanagari">
            नीचे दिए गए कार्ड बाहरी दुकानों के सहबद्ध लिंक खोलते हैं। मूल्य व उपलब्धता विक्रेता पर निर्भर करती है।
          </p>
          <div className="mt-8">
            <AffiliateBookGrid
              books={allBooks}
              emptyMessage="अभी तक कोई पुस्तक लिंक जोड़ा नहीं गया। `src/lib/affiliate-books.ts` में अपने सहबद्ध URL जोड़ें।"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
