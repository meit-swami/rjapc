import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-admin";
import { z } from "zod";

const patchSchema = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/).optional(),
  nameHi: z.string().min(1).max(255).optional(),
  duration: z.string().min(1).max(120).optional(),
  objective: z.string().min(1).optional(),
  topics: z.array(z.string()).optional(),
  activities: z.array(z.string()).optional(),
  sortOrder: z.number().int().optional(),
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
  const d = parsed.data;
  const update: {
    slug?: string;
    nameHi?: string;
    duration?: string;
    objective?: string;
    topics?: string;
    activities?: string;
    sortOrder?: number;
    published?: boolean;
  } = {};
  if (d.slug !== undefined) update.slug = d.slug;
  if (d.nameHi !== undefined) update.nameHi = d.nameHi;
  if (d.duration !== undefined) update.duration = d.duration;
  if (d.objective !== undefined) update.objective = d.objective;
  if (d.topics !== undefined) update.topics = JSON.stringify(d.topics);
  if (d.activities !== undefined) update.activities = JSON.stringify(d.activities);
  if (d.sortOrder !== undefined) update.sortOrder = d.sortOrder;
  if (d.published !== undefined) update.published = d.published;

  const c = await prisma.course.update({
    where: { id },
    data: update,
  });
  return NextResponse.json(c);
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await requireAdmin())) return unauthorized();
  const { id } = await params;
  await prisma.course.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
