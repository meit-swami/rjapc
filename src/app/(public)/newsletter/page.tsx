import type { Metadata } from "next";
import { getPublicPageData } from "@/lib/public-data";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export const metadata: Metadata = {
  title: "न्यूज़लेटर",
  description: "कार्यक्रम व लेख — ईमेल अपडेट के लिए सदस्यता लें।",
  openGraph: {
    title: "न्यूज़लेटर",
    description: "कार्यक्रम व लेख — ईमेल अपडेट के लिए सदस्यता लें।",
  },
};

export default async function NewsletterPage() {
  const data = await getPublicPageData();
  return (
    <NewsletterSection title={data.newsletterTitle} subtitle={data.newsletter.subtitle} />
  );
}
