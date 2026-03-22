import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, published: true },
    select: { title: true, excerpt: true },
  });
  if (!post) return { title: "लेख" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, published: true },
  });
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <Link href="/blog" className="text-sm font-semibold text-saffron hover:underline font-devanagari">
        ← ब्लॉग सूची
      </Link>
      <h1 className="mt-6 font-devanagari text-3xl font-bold text-navy md:text-4xl">{post.title}</h1>
      {post.publishedAt ? (
        <p className="mt-2 text-sm text-slate-400">
          {new Date(post.publishedAt).toLocaleDateString("hi-IN")}
        </p>
      ) : null}
      <div className="mt-8 whitespace-pre-wrap text-lg text-slate-700 font-devanagari leading-relaxed">
        {post.body}
      </div>
    </article>
  );
}
