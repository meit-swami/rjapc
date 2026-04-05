/** Team members hidden from the public site (by `nameHi` as stored in the database). */
const HIDDEN_TEAM_NAME_HIS = new Set(["Dr. Arun Choudhary", "Shiv Kumar Sharma"]);

export function filterPublicTeamMembers<T extends { nameHi: string }>(members: T[]): T[] {
  return members.filter((m) => !HIDDEN_TEAM_NAME_HIS.has(m.nameHi));
}
