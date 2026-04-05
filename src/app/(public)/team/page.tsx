import type { Metadata } from "next";
import { getPublicPageData } from "@/lib/public-data";
import { TeamSection } from "@/components/sections/TeamSection";

export const metadata: Metadata = {
  title: "नेतृत्व",
  description: "अनुभव, प्रतिबद्धता व मार्गदर्शन — नेतृत्व टीम।",
  openGraph: {
    title: "नेतृत्व",
    description: "अनुभव, प्रतिबद्धता व मार्गदर्शन — नेतृत्व टीम।",
  },
};

export default async function TeamPage() {
  const data = await getPublicPageData();
  return <TeamSection team={data.team} />;
}
