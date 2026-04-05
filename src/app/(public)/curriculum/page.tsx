import type { Metadata } from "next";
import { getPublicPageData } from "@/lib/public-data";
import { CurriculumSection } from "@/components/sections/CurriculumSection";

export const metadata: Metadata = {
  title: "पाठ्यक्रम",
  description: "संवैधानिक, ऐतिहासिक व व्यावहारिक आयामों का समन्वित अध्ययन — पाठ्यक्रम विषय।",
  openGraph: {
    title: "पाठ्यक्रम",
    description: "संवैधानिक, ऐतिहासिक व व्यावहारिक आयामों का समन्वित अध्ययन — पाठ्यक्रम विषय।",
  },
};

export default async function CurriculumPage() {
  const data = await getPublicPageData();
  return <CurriculumSection subjects={data.curriculum.subjects} />;
}
