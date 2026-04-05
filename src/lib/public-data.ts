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
} from "@/lib/content-types";
import { parseJson } from "@/lib/content-types";
import { filterPublicTeamMembers } from "@/lib/team-filter";
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
} from "@/lib/contact-defaults";

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
  const phones = Array.isArray(raw.phones)
    ? raw.phones.filter((p) => typeof p === "string" && p.trim())
    : [];

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
    contact: normalizePublicContact(
      upgradeLegacyContactBody(
        parseJson<ContactBody>(contact?.body ?? "{}", {
          phones: [],
          addressBlocks: [],
        })
      )
    ),
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
