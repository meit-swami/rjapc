import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-admin";
import { z } from "zod";

const patchSchema = z.object({
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/).optional(),
  title: z.string().min(1).max(500).optional(),
  excerpt: z.string().optional().nullable(),
  body: z.string().min(1).optional(),
  coverImage: z.string().max(1024).optional().nullable(),
  published: z.boolean().optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  if (!(await requireAdmin())) return unauthorized();
  const { id } = await params;
  const json = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "अमान्य डेटा" }, { status: 400 });
  }
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "नहीं मिला" }, { status: 404 });

  const d = parsed.data;
  let publishedAt = existing.publishedAt;
  if (d.published === true) publishedAt = publishedAt ?? new Date();
  if (d.published === false) publishedAt = null;

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...d,
      publishedAt,
    },
  });
  return NextResponse.json(post);
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await requireAdmin())) return unauthorized();
  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
