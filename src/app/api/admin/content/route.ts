import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-admin";
import { z } from "zod";

const createSchema = z.object({
  key: z.string().min(1).max(64).regex(/^[a-z][a-z0-9_]*$/),
  title: z.string().max(500).optional().nullable(),
  body: z.string().min(1),
});

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  const rows = await prisma.contentSection.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const json = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "अमान्य डेटा" }, { status: 400 });
  }
  try {
    const row = await prisma.contentSection.create({
      data: {
        key: parsed.data.key,
        title: parsed.data.title ?? null,
        body: parsed.data.body,
      },
    });
    return NextResponse.json(row);
  } catch {
    return NextResponse.json({ error: "यह कुंजी पहले से मौजूद है" }, { status: 409 });
  }
}
