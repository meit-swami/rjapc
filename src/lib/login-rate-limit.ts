/**
 * Small in-memory limiter for admin password attempts. It lives in the server process,
 * which is enough for a single `next start` server; on serverless hosts each instance
 * keeps its own count, so it slows guessing down rather than stopping it outright.
 *
 * Login counts failures per IP (tight) and per account (looser, so one person
 * hammering the form cannot easily lock the real admin out).
 */

const WINDOW_MS = 15 * 60 * 1000;

export type LimitKey = { key: string; max: number };

type Entry = { failures: number; resetAt: number };
const failuresByKey = new Map<string, Entry>();

function sweep(now: number) {
  if (failuresByKey.size < 500) return;
  for (const [k, e] of failuresByKey) if (e.resetAt <= now) failuresByKey.delete(k);
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export function loginIpKey(ip: string): LimitKey {
  return { key: `login-ip:${ip}`, max: 8 };
}

/** Not cleared by a successful login, so spread-out guessing keeps counting. */
export function loginAccountKey(email: string): LimitKey {
  return { key: `login-account:${email.toLowerCase()}`, max: 25 };
}

export function passwordChangeKeys(adminId: string): LimitKey[] {
  return [{ key: `pw-change:${adminId}`, max: 5 }];
}

/** Seconds until another attempt is allowed, or 0 when it is allowed now. */
export function retryAfter(keys: LimitKey[], now = Date.now()): number {
  let wait = 0;
  for (const { key, max } of keys) {
    const e = failuresByKey.get(key);
    if (e && e.resetAt > now && e.failures >= max) {
      wait = Math.max(wait, Math.ceil((e.resetAt - now) / 1000));
    }
  }
  return wait;
}

export function recordFailure(keys: LimitKey[], now = Date.now()) {
  sweep(now);
  for (const { key } of keys) {
    const e = failuresByKey.get(key);
    if (!e || e.resetAt <= now) failuresByKey.set(key, { failures: 1, resetAt: now + WINDOW_MS });
    else e.failures += 1;
  }
}

export function clearFailures(keys: LimitKey[]) {
  for (const { key } of keys) failuresByKey.delete(key);
}
