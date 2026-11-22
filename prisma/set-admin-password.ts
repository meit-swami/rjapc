import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { adminPasswordProblem } from "../src/lib/password-policy";

/**
 * Sets (or resets) the admin password without touching any other data.
 *
 *   ADMIN_PASSWORD='a-long-new-password' npm run admin:password
 *   ADMIN_EMAIL=someone@example.org ADMIN_PASSWORD='...' npm run admin:password
 */
const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim() || "admin@rjapc.org";
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("Set ADMIN_PASSWORD, e.g. ADMIN_PASSWORD='a-long-new-password' npm run admin:password");
  }
  const problem = adminPasswordProblem(password);
  if (problem) throw new Error(`Password rejected: ${problem}`);

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
  console.log(`Password updated for ${email}.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e instanceof Error ? e.message : e);
    await prisma.$disconnect();
    process.exit(1);
  });
