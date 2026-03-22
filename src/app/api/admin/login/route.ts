import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  adminCookieOptions,
  ADMIN_COOKIE_NAME,
  signAdminToken,
  verifyPassword,
} from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "अमान्य विवरण" }, { status: 400 });
  }
  const user = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ error: "ईमेल या पासवर्ड गलत" }, { status: 401 });
  }
  const token = await signAdminToken({ sub: user.id, email: user.email });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, adminCookieOptions());
  return res;
}
