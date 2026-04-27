import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SplashIntro } from "@/components/SplashIntro";
import { ConstructionNoticePopup } from "@/components/ConstructionNoticePopup";
import { getPublicPageData } from "@/lib/public-data";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const data = await getPublicPageData();
  return (
    <LanguageProvider>
      <SplashIntro />
      <ConstructionNoticePopup />
      <SiteHeader chrome={data.siteChrome} />
      <main>{children}</main>
      <SiteFooter
        phones={data.contact.phones}
        addressBlocks={data.contact.addressBlocks}
        footer={data.siteChrome.footer}
        socialUrls={data.contact.socialUrls}
      />
      <WhatsAppFloat />
    </LanguageProvider>
  );
}
