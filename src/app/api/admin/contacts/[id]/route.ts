import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-admin";
import { z } from "zod";

const patchSchema = z.object({
  read: z.boolean(),
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
  const row = await prisma.contactSubmission.update({
    where: { id },
    data: { read: parsed.data.read },
  });
  return NextResponse.json(row);
}
