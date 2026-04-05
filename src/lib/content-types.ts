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

export type ContactAddressBlock = {
  label: string;
  line: string;
};

export type ContactBody = {
  phones: string[];
  /** Legacy single address; used if addressBlocks is empty */
  addressLine?: string;
  /** Two (or more) labelled addresses, e.g. पंजीकृत कार्यालय + Office */
  addressBlocks?: ContactAddressBlock[];
  /** Profile or page URLs — footer & contact (overrides NEXT_PUBLIC_* when set) */
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  xUrl?: string | null;
  youtubeUrl?: string | null;
  linkedinUrl?: string | null;
  /** Full https://wa.me/... or override; else derived from NEXT_PUBLIC_WHATSAPP_NUMBER */
  whatsappUrl?: string | null;
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

/** Homepage programs block heading (cards still come from Course model). */
export type ProgramsSectionBody = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type DonationBankRow = {
  dt: string;
  dd: string;
};

/** Donations / bank + QR block on homepage. */
export type DonationsBody = {
  eyebrow: string;
  title: string;
  subtitle: string;
  bankCardTitle: string;
  bankCardNote: string;
  bankRows: DonationBankRow[];
  qrCardTitle: string;
  qrNote: string;
  usePlaceholderQr: boolean;
  qrImageUrl: string | null;
};

export type SiteNavItem = {
  href: string;
  labelHi: string;
  labelEn: string;
};

export type SiteChromeBody = {
  branding: {
    nameHi: string;
    nameEn: string;
    taglineHi: string;
    taglineEn: string;
  };
  mainNav: SiteNavItem[];
  knowMoreNav: SiteNavItem[];
  knowMoreTriggerHi: string;
  knowMoreTriggerEn: string;
  footer: {
    brandHi: string;
    tagHi: string;
    /** Text after the © year, e.g. organisation name and rights line */
    copyrightRestHi: string;
    links: { href: string; labelHi: string }[];
  };
};

export function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
