import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-admin";
import { z } from "zod";

const createSchema = z.object({
  nameHi: z.string().min(1).max(255),
  designation: z.string().min(1).max(255),
  description: z.string().min(1),
  photoUrl: z.string().max(1024).optional().nullable(),
  sortOrder: z.number().int().optional(),
  published: z.boolean().optional(),
  isFounder: z.boolean().optional(),
});

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  const team = await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(team);
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const json = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "अमान्य डेटा" }, { status: 400 });
  }
  const m = await prisma.teamMember.create({
    data: {
      nameHi: parsed.data.nameHi,
      designation: parsed.data.designation,
      description: parsed.data.description,
      photoUrl: parsed.data.photoUrl ?? null,
      sortOrder: parsed.data.sortOrder ?? 0,
      published: parsed.data.published ?? true,
      isFounder: parsed.data.isFounder ?? false,
    },
  });
  return NextResponse.json(m);
}
