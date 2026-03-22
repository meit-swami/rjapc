import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-admin";
import { z } from "zod";

const patchSchema = z.object({
  nameHi: z.string().min(1).max(255).optional(),
  designation: z.string().min(1).max(255).optional(),
  description: z.string().min(1).optional(),
  photoUrl: z.string().max(1024).optional().nullable(),
  sortOrder: z.number().int().optional(),
  published: z.boolean().optional(),
  isFounder: z.boolean().optional(),
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
  const m = await prisma.teamMember.update({
    where: { id },
    data: parsed.data,
  });
  return NextResponse.json(m);
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await requireAdmin())) return unauthorized();
  const { id } = await params;
  await prisma.teamMember.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
