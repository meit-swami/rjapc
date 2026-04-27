import type { DonationsBody, ProgramsSectionBody, SiteChromeBody } from "@/lib/content-types";

export const DEFAULT_PROGRAMS_SECTION: ProgramsSectionBody = {
  eyebrow: "मॉड्यूल",
  title: "कार्यक्रम",
  subtitle: "संरचित मॉड्यूल — उद्देश्य, विषय व गतिविधियाँ",
};

export const DEFAULT_DONATIONS_BODY: DonationsBody = {
  eyebrow: "दान",
  title: "संस्था को सहयोग करें",
  subtitle: "आपका सहयोग संस्थान की शैक्षणिक और सामाजिक पहलों को आगे बढ़ाने में सहायक है।",
  bankCardTitle: "बैंक खाता विवरण",
  bankCardNote: "ऑनलाइन ट्रांसफर से पहले विवरण की पुष्टि अवश्य करें।",
  bankRows: [
    { dt: "लाभार्थी / खाता नाम", dd: "Rashtriya Janadesh Promotion Council" },
    { dt: "बैंक का नाम", dd: "CUB | City Union Bank Ltd." },
    { dt: "खाता संख्या", dd: "SB 500101014516790" },
    { dt: "IFSC कोड", dd: "CIUB0000822" },
    {
      dt: "शाखा का पता",
      dd: "Pratap Nagar, 111/131, 111/132, Pratap Nagar, Sanganer, Jaipur - 302020",
    },
    { dt: "UPI आईडी", dd: "जल्द अपडेट किया जाएगा" },
  ],
  qrCardTitle: "UPI / QR भुगतान",
  qrNote: "दान करते समय भुगतान का स्क्रीनशॉट सुरक्षित रखें।",
  usePlaceholderQr: true,
  qrImageUrl: null,
};

export const DEFAULT_SITE_CHROME: SiteChromeBody = {
  branding: {
    nameHi: "राष्ट्रीय जनादेश प्रमोशनल काउंसिल",
    nameEn: "Rashtriya Janadesh Promotional Council",
    taglineHi: "राजनीतिक करियर संस्थान",
    taglineEn: "Political career institute",
  },
  mainNav: [
    { href: "/#about", labelHi: "परिचय", labelEn: "About" },
    { href: "/#mission", labelHi: "मिशन", labelEn: "Mission" },
    { href: "/#programs", labelHi: "कार्यक्रम", labelEn: "Programs" },
    { href: "/courses", labelHi: "कोर्स", labelEn: "Courses" },
    { href: "/#donations", labelHi: "दान", labelEn: "Donations" },
    { href: "/#contact", labelHi: "संपर्क", labelEn: "Contact" },
    { href: "/blog", labelHi: "ब्लॉग", labelEn: "Blog" },
  ],
  knowMoreNav: [
    { href: "/curriculum", labelHi: "पाठ्यक्रम", labelEn: "Curriculum" },
    { href: "/activities", labelHi: "गतिविधियाँ", labelEn: "Activities" },
    { href: "/team", labelHi: "कोर टीम सदस्य", labelEn: "Core Team Members" },
    { href: "/why", labelHi: "क्यों हम", labelEn: "Why us" },
    { href: "/affiliations", labelHi: "सहयोगी", labelEn: "Partners" },
    { href: "/newsletter", labelHi: "न्यूज़लेटर", labelEn: "Newsletter" },
    { href: "/media", labelHi: "मीडिया", labelEn: "Media" },
  ],
  knowMoreTriggerHi: "और जानें",
  knowMoreTriggerEn: "Know More",
  footer: {
    brandHi: "राष्ट्रीय जनादेश प्रमोशनल काउंसिल",
    tagHi: "राजनीतिक शिक्षा का उच्च शिक्षण संस्थान",
    copyrightRestHi: "राष्ट्रीय जनादेश प्रमोशनल काउंसिल. सर्वाधिकार सुरक्षित.",
    links: [
      { href: "/blog", labelHi: "ब्लॉग" },
      { href: "/affiliations", labelHi: "सहयोगी" },
      { href: "/newsletter", labelHi: "न्यूज़लेटर" },
      { href: "/media", labelHi: "मीडिया" },
      { href: "/admin/login", labelHi: "प्रशासन" },
    ],
  },
};

export function mergeProgramsSection(partial: Partial<ProgramsSectionBody> | null | undefined): ProgramsSectionBody {
  if (!partial) return DEFAULT_PROGRAMS_SECTION;
  return {
    ...DEFAULT_PROGRAMS_SECTION,
    ...partial,
  };
}

export function mergeDonationsBody(partial: Partial<DonationsBody> | null | undefined): DonationsBody {
  if (!partial) return DEFAULT_DONATIONS_BODY;
  return {
    ...DEFAULT_DONATIONS_BODY,
    ...partial,
    bankRows:
      Array.isArray(partial.bankRows) && partial.bankRows.length > 0
        ? partial.bankRows
        : DEFAULT_DONATIONS_BODY.bankRows,
  };
}

export function mergeSiteChrome(partial: Partial<SiteChromeBody> | null | undefined): SiteChromeBody {
  const d = DEFAULT_SITE_CHROME;
  if (!partial) return d;
  return {
    branding: { ...d.branding, ...partial.branding },
    mainNav:
      Array.isArray(partial.mainNav) && partial.mainNav.length > 0 ? partial.mainNav : d.mainNav,
    knowMoreNav:
      Array.isArray(partial.knowMoreNav) && partial.knowMoreNav.length > 0
        ? partial.knowMoreNav
        : d.knowMoreNav,
    knowMoreTriggerHi: partial.knowMoreTriggerHi ?? d.knowMoreTriggerHi,
    knowMoreTriggerEn: partial.knowMoreTriggerEn ?? d.knowMoreTriggerEn,
    footer: {
      ...d.footer,
      ...partial.footer,
      links:
        Array.isArray(partial.footer?.links) && partial.footer!.links.length > 0
          ? partial.footer!.links
          : d.footer.links,
    },
  };
}
