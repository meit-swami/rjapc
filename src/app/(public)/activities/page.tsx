import type { Metadata } from "next";
import { getPublicPageData } from "@/lib/public-data";
import { ActivitiesSection } from "@/components/sections/ActivitiesSection";

export const metadata: Metadata = {
  title: "गतिविधियाँ",
  description: "व्यावहारिक अध्ययन के विविध रूप — संस्थान की गतिविधियाँ।",
  openGraph: {
    title: "गतिविधियाँ",
    description: "व्यावहारिक अध्ययन के विविध रूप — संस्थान की गतिविधियाँ।",
  },
};

export default async function ActivitiesPage() {
  const data = await getPublicPageData();
  return <ActivitiesSection items={data.activities.items} />;
}
