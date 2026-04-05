import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateBookGrid } from "@/components/AffiliateBookGrid";
import { resolveAffiliateBooksForSlug } from "@/lib/affiliate-books";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

function safeStringArray(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findFirst({
    where: { slug, published: true },
    select: { nameHi: true, objective: true },
  });
  if (!course) return { title: "कोर्स" };
  return {
    title: `${course.nameHi} — पुस्तकें`,
    description: course.objective.slice(0, 160),
    openGraph: {
      title: `${course.nameHi} — अनुशंसित पुस्तकें`,
      description: course.objective.slice(0, 160),
    },
  };
}

export default async function CourseBooksPage({ params }: Props) {
  const { slug } = await params;
  const course = await prisma.course.findFirst({
    where: { slug, published: true },
  });
  if (!course) notFound();

  const topics = safeStringArray(course.topics);
  const activities = safeStringArray(course.activities);
  const books = await resolveAffiliateBooksForSlug(slug);

  return (
    <div className="bg-slate-50 pb-20 pt-10 md:pt-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <nav className="mb-6 text-sm">
          <Link href="/courses" className="font-medium text-saffron hover:underline font-devanagari">
            ← सभी कोर्स
          </Link>
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-2xl font-bold text-navy font-devanagari md:text-3xl">{course.nameHi}</h1>
            <span className="rounded-full bg-navy px-3 py-1 text-sm font-semibold text-white font-devanagari">
              {course.duration}
            </span>
          </div>
          <p className="mt-4 text-slate-700 font-devanagari leading-relaxed">{course.objective}</p>
          {topics.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-saffron">विषय</h2>
              <ul className="mt-2 list-inside list-disc space-y-1 text-slate-700 font-devanagari">
                {topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {activities.length > 0 ? (
            <div className="mt-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-navy">गतिविधियाँ</h2>
              <ul className="mt-2 list-inside list-disc space-y-1 text-slate-700 font-devanagari">
                {activities.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </header>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-navy font-devanagari md:text-2xl">अनुशंसित पुस्तकें</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 font-devanagari">
            ये लिंक सहबद्ध कार्यक्रमों के अंतर्गत हो सकते हैं। कवर व शीर्षक स्वचालित रूप से दुकान के पृष्ठ से लिए जाते
            हैं जहाँ संभव हो।
          </p>
          <div className="mt-8">
            <AffiliateBookGrid
              books={books}
              emptyMessage="इस मॉड्यूल के लिए अभी कोई पुस्तक लिंक नहीं है। `src/lib/affiliate-books.ts` में इस स्लग हेतु लिंक जोड़ें।"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
