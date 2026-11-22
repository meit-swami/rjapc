import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin, unauthorized } from "@/lib/api-admin";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { adminPasswordProblem } from "@/lib/password-policy";
import { passwordChangeKeys, recordFailure, retryAfter } from "@/lib/login-rate-limit";

const schema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z.string().min(1).max(200),
});

/** Logged-in admin changes their own password (current password required). */
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "अमान्य विवरण" }, { status: 400 });
  }
  const { currentPassword, newPassword } = parsed.data;
  const limitKeys = passwordChangeKeys(admin.sub);
  if (retryAfter(limitKeys) > 0) {
    return NextResponse.json({ error: "बहुत अधिक गलत प्रयास। कुछ देर बाद प्रयास करें।" }, { status: 429 });
  }

  const user = await prisma.adminUser.findUnique({ where: { id: admin.sub } });
  if (!user || !(await verifyPassword(currentPassword, user.passwordHash))) {
    recordFailure(limitKeys);
    return NextResponse.json({ error: "वर्तमान पासवर्ड गलत है" }, { status: 400 });
  }

  const problem = adminPasswordProblem(newPassword);
  if (problem) return NextResponse.json({ error: problem }, { status: 400 });
  if (newPassword === currentPassword) {
    return NextResponse.json({ error: "नया पासवर्ड पुराने से अलग होना चाहिए" }, { status: 400 });
  }

  await prisma.adminUser.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(newPassword) },
  });
  return NextResponse.json({ ok: true });
}
