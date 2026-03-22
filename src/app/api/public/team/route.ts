import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const team = await prisma.teamMember.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(team);
}
