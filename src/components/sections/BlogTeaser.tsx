import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";

export type BlogTeaserPost = {
  slug: string;
  title: string;
  excerpt: string | null;
};

export function BlogTeaser({ posts }: { posts: BlogTeaserPost[] }) {
  if (!posts.length) return null;
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle eyebrow="लेख" title="ब्लॉग" subtitle="राजनीति, लोकतंत्र व शिक्षा पर चर्चा" />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link
                href={`/blog/${p.slug}`}
                className="card-hover block h-full rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-lg font-bold text-navy font-devanagari">{p.title}</h3>
                {p.excerpt ? (
                  <p className="mt-2 line-clamp-3 text-slate-600 font-devanagari">{p.excerpt}</p>
                ) : null}
                <span className="mt-4 inline-block text-sm font-semibold text-saffron">और पढ़ें →</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex rounded-xl border border-navy px-6 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-white font-devanagari"
          >
            सभी लेख
          </Link>
        </div>
      </div>
    </section>
  );
}
