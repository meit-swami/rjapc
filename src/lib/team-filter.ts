/** Team members hidden from the public site (by `nameHi` as stored in the database). */
const HIDDEN_TEAM_NAME_HIS = new Set(["अन्य सदस्य"]);

/** Shown on /team but omitted from the home page “top 4” leadership strip. */
export function isExcludedFromHomepageTeam(nameHi: string): boolean {
  return nameHi.toLowerCase().includes("arun choudhary");
}

function isVandanaBohra(nameHi: string): boolean {
  return (/वंदना|vandana/i.test(nameHi) && /बोहरा|bohra/i.test(nameHi));
}

/** Canonical display title updates (source of truth may still be the admin DB). */
export function mapPublicTeamMember<T extends { nameHi: string; designation: string }>(m: T): T {
  if (isVandanaBohra(m.nameHi)) {
    return { ...m, designation: "राष्ट्रीय संयोजजक (महिला) प्रकोष्ट" };
  }
  return m;
}

export function filterPublicTeamMembers<T extends { nameHi: string }>(members: T[]): T[] {
  return members.filter((m) => !HIDDEN_TEAM_NAME_HIS.has(m.nameHi));
}
