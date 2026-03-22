import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-admin";
import { z } from "zod";

const bodySchema = z.object({
  title: z.string().max(500).optional().nullable(),
  body: z.string().min(1),
});

type Params = { params: Promise<{ key: string }> };

export async function PUT(req: Request, { params }: Params) {
  if (!(await requireAdmin())) return unauthorized();
  const { key } = await params;
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "अमान्य डेटा" }, { status: 400 });
  }
  const row = await prisma.contentSection.upsert({
    where: { key },
    create: {
      key,
      title: parsed.data.title ?? null,
      body: parsed.data.body,
    },
    update: {
      title: parsed.data.title ?? undefined,
      body: parsed.data.body,
    },
  });
  return NextResponse.json(row);
}
