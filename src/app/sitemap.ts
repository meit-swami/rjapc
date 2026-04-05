import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  const blogUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/affiliations`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/newsletter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/media`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.75 },
    ...blogUrls,
  ];
}
