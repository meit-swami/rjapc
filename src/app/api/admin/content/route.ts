import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-admin";

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  const rows = await prisma.contentSection.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json(rows);
}
