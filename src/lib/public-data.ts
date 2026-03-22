import { prisma } from "@/lib/prisma";
import type {
  AboutBody,
  ContactBody,
  CurriculumBody,
  HeroBody,
  ListBody,
  MissionBody,
} from "@/lib/content-types";
import { parseJson } from "@/lib/content-types";

export async function getPublicPageData() {
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

  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  const team = await prisma.teamMember.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

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
    contact: parseJson<ContactBody>(contact?.body ?? "{}", {
      phones: [],
      addressLine: "",
    }),
    seo: parseJson<{ title?: string; description?: string }>(seo?.body ?? "{}", {}),
    courses: courses.map((c) => ({
      id: c.id,
      slug: c.slug,
      nameHi: c.nameHi,
      duration: c.duration,
      objective: c.objective,
      topics: safeStringArray(c.topics),
      activities: safeStringArray(c.activities),
    })),
    team: team.map((m) => ({
      id: m.id,
      nameHi: m.nameHi,
      designation: m.designation,
      description: m.description,
      photoUrl: m.photoUrl,
      isFounder: m.isFounder,
    })),
    blogPosts: posts,
  };
}

function safeStringArray(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}
