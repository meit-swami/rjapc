export type HeroBody = {
  subtitle: string;
  tagline: string;
  backgroundImageUrl?: string | null;
};

export type AboutBody = {
  paragraphs: string[];
};

export type MissionBody = {
  points: { title: string; description: string }[];
};

export type ListBody = {
  items: string[];
};

export type CurriculumBody = {
  subjects: string[];
};

export type ContactBody = {
  phones: string[];
  addressLine: string;
};

export type AffiliationItem = {
  name: string;
  logoUrl?: string | null;
  href?: string | null;
};

export type AffiliationsBody = {
  items: AffiliationItem[];
};

/** Section copy for the homepage newsletter block (signup uses shared API). */
export type NewsletterBlockBody = {
  subtitle?: string;
};

export type MediaItem = {
  kind: "photo" | "video";
  title: string;
  /** Image URL, video page URL (YouTube), or embed URL */
  url: string;
  /** ISO date YYYY-MM-DD — used for year / month timeline grouping */
  date?: string | null;
};

export type MediaBody = {
  items: MediaItem[];
};

export function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
