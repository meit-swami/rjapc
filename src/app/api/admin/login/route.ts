import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  adminCookieOptions,
  ADMIN_COOKIE_NAME,
  MissingJwtSecretError,
  signAdminToken,
  verifyPassword,
} from "@/lib/auth";
import {
  clearFailures,
  clientIp,
  loginAccountKey,
  loginIpKey,
  recordFailure,
  retryAfter,
} from "@/lib/login-rate-limit";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(200),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "अमान्य विवरण" }, { status: 400 });
  }
  const { email, password } = parsed.data;
  const ipKey = loginIpKey(clientIp(req));
  const limitKeys = [ipKey, loginAccountKey(email)];

  const wait = retryAfter(limitKeys);
  if (wait > 0) {
    return NextResponse.json(
      { error: `बहुत अधिक गलत प्रयास। ${Math.ceil(wait / 60)} मिनट बाद पुनः प्रयास करें।` },
      { status: 429, headers: { "Retry-After": String(wait) } }
    );
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    recordFailure(limitKeys);
    return NextResponse.json({ error: "ईमेल या पासवर्ड गलत" }, { status: 401 });
  }

  let token: string;
  try {
    token = await signAdminToken({ sub: user.id, email: user.email });
  } catch (e) {
    if (e instanceof MissingJwtSecretError) {
      console.error(e.message);
      return NextResponse.json(
        { error: "सर्वर पर JWT_SECRET सेट नहीं है (कम से कम 32 अक्षर)। व्यवस्थापक से संपर्क करें।" },
        { status: 500 }
      );
    }
    throw e;
  }

  clearFailures([ipKey]);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, adminCookieOptions());
  return res;
}
