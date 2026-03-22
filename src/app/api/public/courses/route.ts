import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function safeStringArray(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export async function GET() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(
    courses.map((c) => ({
      id: c.id,
      slug: c.slug,
      nameHi: c.nameHi,
      duration: c.duration,
      objective: c.objective,
      topics: safeStringArray(c.topics),
      activities: safeStringArray(c.activities),
    })),
  );
}
