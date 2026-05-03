import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { filterPublicTeamMembers, mapPublicTeamMember } from "@/lib/team-filter";

export async function GET() {
  const team = await prisma.teamMember.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  const rows = filterPublicTeamMembers(team).map((m) => mapPublicTeamMember(m));
  return NextResponse.json(rows);
}
