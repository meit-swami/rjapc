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

export function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
