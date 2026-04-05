import type { Metadata } from "next";
import { getPublicPageData } from "@/lib/public-data";
import { AffiliationsSection } from "@/components/sections/AffiliationsSection";

export const metadata: Metadata = {
  title: "सहयोगी संस्थाएँ",
  description: "संस्थागत सहयोग व मान्यता — साझेदार संगठन।",
  openGraph: {
    title: "सहयोगी संस्थाएँ",
    description: "संस्थागत सहयोग व मान्यता — साझेदार संगठन।",
  },
};

export default async function AffiliationsPage() {
  const data = await getPublicPageData();
  return (
    <AffiliationsSection title={data.affiliationsTitle} items={data.affiliations.items} showWhenEmpty />
  );
}
