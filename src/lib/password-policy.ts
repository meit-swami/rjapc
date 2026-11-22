/** Shared by the admin API and the CLI scripts in prisma/ (no Next.js imports here). */

export const MIN_ADMIN_PASSWORD_LENGTH = 10;

const KNOWN_WEAK_PASSWORDS = new Set([
  "admin123",
  "admin12345",
  "password",
  "password123",
  "12345678",
  "1234567890",
  "rjapc12345",
]);

/** Returns a Hindi error message, or null when the password is acceptable. */
export function adminPasswordProblem(plain: string): string | null {
  if (plain.length < MIN_ADMIN_PASSWORD_LENGTH) {
    return `पासवर्ड कम से कम ${MIN_ADMIN_PASSWORD_LENGTH} अक्षरों का होना चाहिए`;
  }
  if (KNOWN_WEAK_PASSWORDS.has(plain.toLowerCase())) {
    return "यह पासवर्ड बहुत आम है, कोई दूसरा चुनें";
  }
  return null;
}
