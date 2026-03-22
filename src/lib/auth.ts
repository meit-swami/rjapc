import { cookies } from "next/headers";
import * as jose from "jose";
import bcrypt from "bcryptjs";

const COOKIE = "rjapc_admin";
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-only-secret-change-me";

export type AdminJwtPayload = { sub: string; email: string };

function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET);
}

export async function signAdminToken(payload: AdminJwtPayload): Promise<string> {
  return new jose.SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifyAdminToken(token: string): Promise<AdminJwtPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, getSecretKey());
    const sub = typeof payload.sub === "string" ? payload.sub : "";
    const email = typeof payload.email === "string" ? payload.email : "";
    if (!sub || !email) return null;
    return { sub, email };
  } catch {
    return null;
  }
}

export async function getAdminFromCookies(): Promise<AdminJwtPayload | null> {
  const c = await cookies();
  const t = c.get(COOKIE)?.value;
  if (!t) return null;
  return verifyAdminToken(t);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export const ADMIN_COOKIE_NAME = COOKIE;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
