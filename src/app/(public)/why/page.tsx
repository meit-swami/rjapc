import type { Metadata } from "next";
import { getPublicPageData } from "@/lib/public-data";
import { WhyJoinSection } from "@/components/sections/WhyJoinSection";

export const metadata: Metadata = {
  title: "क्यों जुड़ें",
  description: "राष्ट्रीय जनादेश प्रमोशनल काउंसिल से जुड़ने के कारण व अवसर।",
  openGraph: {
    title: "क्यों जुड़ें",
    description: "राष्ट्रीय जनादेश प्रमोशनल काउंसिल से जुड़ने के कारण व अवसर।",
  },
};

export default async function WhyPage() {
  const data = await getPublicPageData();
  return <WhyJoinSection items={data.whyJoin.items} />;
}
