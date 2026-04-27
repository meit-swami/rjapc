/** Team members hidden from the public site (by `nameHi` as stored in the database). */
const HIDDEN_TEAM_NAME_HIS = new Set(["अन्य सदस्य"]);

export function filterPublicTeamMembers<T extends { nameHi: string }>(members: T[]): T[] {
  return members.filter((m) => !HIDDEN_TEAM_NAME_HIS.has(m.nameHi));
}
