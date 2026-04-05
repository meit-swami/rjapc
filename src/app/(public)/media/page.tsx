import type { Metadata } from "next";
import { getPublicPageData } from "@/lib/public-data";
import { MediaSection } from "@/components/sections/MediaSection";

export const metadata: Metadata = {
  title: "मीडिया",
  description: "फ़ोटो व वीडियो — समय के अनुसार।",
  openGraph: {
    title: "मीडिया",
    description: "फ़ोटो व वीडियो — समय के अनुसार।",
  },
};

export default async function MediaPage() {
  const data = await getPublicPageData();
  return <MediaSection title={data.mediaTitle} items={data.media.items} showWhenEmpty />;
}
