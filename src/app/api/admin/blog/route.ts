import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-admin";
import { z } from "zod";

const createSchema = z.object({
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(500),
  excerpt: z.string().optional().nullable(),
  body: z.string().min(1),
  coverImage: z.string().max(1024).optional().nullable(),
  published: z.boolean().optional(),
});

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const json = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "अमान्य डेटा" }, { status: 400 });
  }
  const published = parsed.data.published ?? false;
  const post = await prisma.blogPost.create({
    data: {
      slug: parsed.data.slug,
      title: parsed.data.title,
      excerpt: parsed.data.excerpt ?? null,
      body: parsed.data.body,
      coverImage: parsed.data.coverImage ?? null,
      published,
      publishedAt: published ? new Date() : null,
    },
  });
  return NextResponse.json(post);
}
