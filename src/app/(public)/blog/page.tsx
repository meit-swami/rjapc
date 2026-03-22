import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "ब्लॉग",
  description: "राजनीति, लोकतंत्र व शिक्षा पर लेख।",
};

export default async function BlogIndexPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true, excerpt: true, publishedAt: true },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="font-devanagari text-3xl font-bold text-navy md:text-4xl">ब्लॉग</h1>
      <p className="mt-2 text-slate-600 font-devanagari">प्रकाशित लेख व विचार</p>
      <ul className="mt-10 space-y-6">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-saffron/40 hover:shadow-md"
            >
              <h2 className="text-xl font-bold text-navy group-hover:text-saffron font-devanagari">{p.title}</h2>
              {p.excerpt ? <p className="mt-2 text-slate-600 font-devanagari">{p.excerpt}</p> : null}
              {p.publishedAt ? (
                <p className="mt-3 text-xs text-slate-400">
                  {new Date(p.publishedAt).toLocaleDateString("hi-IN")}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
      {posts.length === 0 ? (
        <p className="mt-8 text-slate-500 font-devanagari">अभी कोई लेख प्रकाशित नहीं है।</p>
      ) : null}
    </div>
  );
}
