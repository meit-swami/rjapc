import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SplashIntro } from "@/components/SplashIntro";
import { getPublicPageData } from "@/lib/public-data";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const data = await getPublicPageData();
  return (
    <LanguageProvider>
      <SplashIntro />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter phones={data.contact.phones} addressBlocks={data.contact.addressBlocks} />
      <WhatsAppFloat />
    </LanguageProvider>
  );
}
