import type { Metadata } from "next";
import { getPublicPageData } from "@/lib/public-data";
import { CoreTeamMembersPage } from "@/components/sections/CoreTeamMembersPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Core Team Members | कोर टीम सदस्य",
  description: "Full directory of core team members — अनुभव, प्रतिबद्धता व मार्गदर्शन।",
  openGraph: {
    title: "Core Team Members | कोर टीम सदस्य",
    description: "Full directory of core team members — अनुभव, प्रतिबद्धता व मार्गदर्शन।",
  },
};

export default async function TeamPage() {
  const data = await getPublicPageData();
  return <CoreTeamMembersPage team={data.team} />;
}
