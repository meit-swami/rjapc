import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-admin";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await requireAdmin())) return unauthorized();
  const { id } = await params;
  try {
    await prisma.newsletterSubscriber.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "नहीं मिला" }, { status: 404 });
  }
}
