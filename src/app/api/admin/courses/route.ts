import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-admin";
import { z } from "zod";

const createSchema = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  nameHi: z.string().min(1).max(255),
  duration: z.string().min(1).max(120),
  objective: z.string().min(1),
  topics: z.array(z.string()),
  activities: z.array(z.string()),
  sortOrder: z.number().int().optional(),
  published: z.boolean().optional(),
});

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  const courses = await prisma.course.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const json = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "अमान्य डेटा" }, { status: 400 });
  }
  const c = await prisma.course.create({
    data: {
      slug: parsed.data.slug,
      nameHi: parsed.data.nameHi,
      duration: parsed.data.duration,
      objective: parsed.data.objective,
      topics: JSON.stringify(parsed.data.topics),
      activities: JSON.stringify(parsed.data.activities),
      sortOrder: parsed.data.sortOrder ?? 0,
      published: parsed.data.published ?? true,
    },
  });
  return NextResponse.json(c);
}
