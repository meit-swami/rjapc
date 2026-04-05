import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type {
  AboutBody,
  AffiliationsBody,
  ContactAddressBlock,
  ContactBody,
  CurriculumBody,
  HeroBody,
  ListBody,
  MediaBody,
  MissionBody,
  NewsletterBlockBody,
  DonationsBody,
  ProgramsSectionBody,
  SiteChromeBody,
} from "@/lib/content-types";
import { parseJson } from "@/lib/content-types";
import { AFFILIATE_BOOKS_BY_COURSE_SLUG, type AffiliateBookLink } from "@/lib/affiliate-books";
import { filterPublicTeamMembers } from "@/lib/team-filter";
import {
  mergeDonationsBody,
  mergeProgramsSection,
  mergeSiteChrome,
} from "@/lib/site-defaults";
import {
  mergeAffiliations,
  mergeMediaItems,
  scanAffiliationLogos,
  scanMediaFolder,
  scanNewsletterFolder,
} from "@/lib/public-uploads";
import {
  contactPhonesLookLikePlaceholders,
  DEFAULT_CONTACT_BODY,
  normalizeContactPhoneLabels,
} from "@/lib/contact-defaults";
import { mergePublicSocialUrls } from "@/lib/public-social";

/** Replace legacy seed / placeholder contact JSON with current addresses & numbers. */
function upgradeLegacyContactBody(raw: ContactBody): ContactBody {
  const phones = Array.isArray(raw.phones) ? raw.phones : [];
  const hasBlocks =
    Array.isArray(raw.addressBlocks) && raw.addressBlocks.some((b) => b?.line && String(b.line).trim());

  if (contactPhonesLookLikePlaceholders(phones) && !hasBlocks) {
    return { ...DEFAULT_CONTACT_BODY };
  }
  return raw;
}

function normalizePublicContact(raw: ContactBody): {
  phones: string[];
  addressBlocks: ContactAddressBlock[];
  streetAddressForSchema: string;
} {
  const phones = normalizeContactPhoneLabels(
    Array.isArray(raw.phones) ? raw.phones.filter((p) => typeof p === "string" && p.trim()) : []
  );

  let addressBlocks: ContactAddressBlock[] = [];
  if (Array.isArray(raw.addressBlocks)) {
    addressBlocks = raw.addressBlocks
      .filter((b) => b && typeof b.line === "string" && b.line.trim())
      .map((b) => ({
        label: String(b.label ?? "पता").trim(),
        line: b.line.trim(),
      }));
  }
  if (addressBlocks.length === 0 && typeof raw.addressLine === "string" && raw.addressLine.trim()) {
    addressBlocks = [{ label: "पता", line: raw.addressLine.trim() }];
  }

  const officeBlock = addressBlocks.find((b) => /office|कार्यालय/i.test(b.label));
  const streetAddressForSchema =
    officeBlock?.line ??
    (addressBlocks.length >= 2 ? addressBlocks[1]?.line : undefined) ??
    addressBlocks[0]?.line ??
    "";

  return { phones, addressBlocks, streetAddressForSchema };
}

function mergeAffiliateBooksFromDb(bodyStr: string): Record<string, AffiliateBookLink[]> {
  const parsed = parseJson<Record<string, unknown>>(bodyStr, {});
  const fromDb: Record<string, AffiliateBookLink[]> = {};
  for (const [slug, v] of Object.entries(parsed)) {
    if (!Array.isArray(v)) continue;
    const list: AffiliateBookLink[] = [];
    for (const item of v) {
      if (!item || typeof item !== "object") continue;
      const href = (item as { href?: unknown }).href;
      if (typeof href !== "string" || !href.trim()) continue;
      list.push(item as AffiliateBookLink);
    }
    fromDb[slug] = list;
  }
  const slugs = new Set([
    ...Object.keys(AFFILIATE_BOOKS_BY_COURSE_SLUG),
    ...Object.keys(fromDb),
  ]);
  const out: Record<string, AffiliateBookLink[]> = {};
  for (const slug of slugs) {
    out[slug] = Object.prototype.hasOwnProperty.call(fromDb, slug)
      ? fromDb[slug]!
      : (AFFILIATE_BOOKS_BY_COURSE_SLUG[slug] ?? []);
  }
  return out;
}

export const getPublicPageData = cache(async function getPublicPageData() {
  const sections = await prisma.contentSection.findMany();
  const map = Object.fromEntries(sections.map((s) => [s.key, s]));

  const hero = map.hero;
  const about = map.about;
  const mission = map.mission;
  const curriculum = map.curriculum;
  const activities = map.activities;
  const whyJoin = map.why_join;
  const contact = map.contact;
  const seo = map.seo;
  const affiliationsSec = map.affiliations;
  const newsletterSec = map.newsletter;
  const mediaSec = map.media;
  const programsSec = map.programs;
  const donationsSec = map.donations;
  const siteChromeSec = map.site_chrome;
  const affiliateBooksSec = map.affiliate_books;

  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  const team = await prisma.teamMember.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  const [affiliationFiles, mediaFiles, newsletterFiles] = await Promise.all([
    scanAffiliationLogos(),
    scanMediaFolder(),
    scanNewsletterFolder(),
  ]);

  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 6,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
    },
  });

  return {
    aboutTitle: map.about?.title ?? "हमारे बारे में",
    missionTitle: map.mission?.title ?? "हमारा मिशन",
    hero: {
      title: hero?.title ?? "",
      ...parseJson<HeroBody>(hero?.body ?? "{}", {
        subtitle: "",
        tagline: "",
        backgroundImageUrl: null,
      }),
    },
    about: parseJson<AboutBody>(about?.body ?? "{}", { paragraphs: [] }),
    mission: parseJson<MissionBody>(mission?.body ?? "{}", { points: [] }),
    curriculum: parseJson<CurriculumBody>(curriculum?.body ?? "{}", { subjects: [] }),
    activities: parseJson<ListBody>(activities?.body ?? "{}", { items: [] }),
    whyJoin: parseJson<ListBody>(whyJoin?.body ?? "{}", { items: [] }),
    contact: (() => {
      const contactBody = upgradeLegacyContactBody(
        parseJson<ContactBody>(contact?.body ?? "{}", {
          phones: [],
          addressBlocks: [],
        })
      );
      return {
        ...normalizePublicContact(contactBody),
        socialUrls: mergePublicSocialUrls(contactBody),
      };
    })(),
    seo: parseJson<{ title?: string; description?: string }>(seo?.body ?? "{}", {}),
    affiliationsTitle: affiliationsSec?.title ?? "सहयोगी संस्थाएँ",
    affiliations: {
      items: mergeAffiliations(
        parseJson<AffiliationsBody>(affiliationsSec?.body ?? "{}", { items: [] }).items,
        affiliationFiles
      ),
    },
    newsletterTitle: newsletterSec?.title ?? "न्यूज़लेटर",
    newsletter: parseJson<NewsletterBlockBody>(newsletterSec?.body ?? "{}", {}),
    newsletterAttachments: newsletterFiles,
    mediaTitle: mediaSec?.title ?? "Media",
    media: {
      items: mergeMediaItems(
        mediaFiles,
        parseJson<MediaBody>(mediaSec?.body ?? "{}", { items: [] }).items
      ),
    },
    courses: courses.map((c) => ({
      id: c.id,
      slug: c.slug,
      nameHi: c.nameHi,
      duration: c.duration,
      objective: c.objective,
      topics: safeStringArray(c.topics),
      activities: safeStringArray(c.activities),
    })),
    team: filterPublicTeamMembers(team).map((m) => ({
      id: m.id,
      nameHi: m.nameHi,
      designation: m.designation,
      description: m.description,
      photoUrl: m.photoUrl,
      isFounder: m.isFounder,
    })),
    blogPosts: posts,
    programsSection: mergeProgramsSection(
      parseJson<Partial<ProgramsSectionBody>>(programsSec?.body ?? "{}", {})
    ),
    donations: mergeDonationsBody(parseJson<Partial<DonationsBody>>(donationsSec?.body ?? "{}", {})),
    siteChrome: mergeSiteChrome(parseJson<Partial<SiteChromeBody>>(siteChromeSec?.body ?? "{}", {})),
    affiliateBooksBySlug: mergeAffiliateBooksFromDb(affiliateBooksSec?.body ?? "{}"),
  };
});

function safeStringArray(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}
