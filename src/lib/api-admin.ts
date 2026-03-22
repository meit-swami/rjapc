import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export function unauthorized() {
  return NextResponse.json({ error: "अनधिकृत" }, { status: 401 });
}

export async function requireAdmin(): Promise<{ email: string; sub: string } | null> {
  const c = await cookies();
  const t = c.get(ADMIN_COOKIE_NAME)?.value;
  if (!t) return null;
  const p = await verifyAdminToken(t);
  if (!p) return null;
  return { email: p.email, sub: p.sub };
}
