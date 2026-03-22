import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-admin";

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  const rows = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return NextResponse.json(rows);
}
