import type { Metadata } from "next";
import { getPublicPageData } from "@/lib/public-data";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { CurriculumSection } from "@/components/sections/CurriculumSection";
import { ActivitiesSection } from "@/components/sections/ActivitiesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { WhyJoinSection } from "@/components/sections/WhyJoinSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPublicPageData();
  const t = data.seo.title;
  const d = data.seo.description;
  return {
    title: t || undefined,
    description: d || undefined,
    openGraph: {
      title: t || undefined,
      description: d || undefined,
    },
  };
}

export default async function HomePage() {
  const data = await getPublicPageData();
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const orgJson = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: data.hero.title,
    description: data.seo.description ?? undefined,
    url: base,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.contact.addressLine,
      addressLocality: "जयपुर",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <JsonLd data={orgJson} />
      <HeroSection hero={data.hero} />
      <AboutSection title={data.aboutTitle} paragraphs={data.about.paragraphs} />
      <MissionSection title={data.missionTitle} points={data.mission.points} />
      <ProgramsSection courses={data.courses} />
      <CurriculumSection subjects={data.curriculum.subjects} />
      <ActivitiesSection items={data.activities.items} />
      <TeamSection team={data.team} />
      <WhyJoinSection items={data.whyJoin.items} />
      <BlogTeaser
        posts={data.blogPosts.map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
        }))}
      />
      <ContactSection addressLine={data.contact.addressLine} phones={data.contact.phones} />
    </>
  );
}
