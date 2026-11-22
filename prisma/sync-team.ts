import { PrismaClient } from "@prisma/client";
import { syncTeamMembers } from "./team-data";

/**
 * Adds team members listed in prisma/team-data.ts that are missing from the database.
 * Nothing else is touched. Pass --update to also overwrite existing listed members.
 *
 *   npm run db:sync-team
 *   npm run db:sync-team -- --update
 */
const prisma = new PrismaClient();

async function main() {
  const updateExisting = process.argv.includes("--update");
  const r = await syncTeamMembers(prisma, { updateExisting });
  console.log(`Added: ${r.created.length ? r.created.join(", ") : "none"}`);
  if (updateExisting) console.log(`Updated: ${r.updated.length ? r.updated.join(", ") : "none"}`);
  else console.log(`Already present (left as is): ${r.unchanged.length}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
