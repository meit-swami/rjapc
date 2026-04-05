import type { DonationsBody, ProgramsSectionBody, SiteChromeBody } from "@/lib/content-types";

export const DEFAULT_PROGRAMS_SECTION: ProgramsSectionBody = {
  eyebrow: "मॉड्यूल",
  title: "कार्यक्रम",
  subtitle: "संरचित मॉड्यूल — उद्देश्य, विषय व गतिविधियाँ",
};

export const DEFAULT_DONATIONS_BODY: DonationsBody = {
  eyebrow: "दान",
  title: "संस्था को सहयोग करें",
  subtitle: "नमूना बैंक विवरण व QR — वास्तविक जानकारी जल्द अपडेट की जाएगी",
  bankCardTitle: "बैंक विवरण (नमूना)",
  bankCardNote: "Dummy bank details — replace before going live",
  bankRows: [
    { dt: "लाभार्थी / खाता नाम", dd: "राष्ट्रीय जनादेश प्रमोशनल काउंसिल (नमूना)" },
    { dt: "Bank name", dd: "State Bank of India (Sample)" },
    { dt: "Account number", dd: "12345678901234" },
    { dt: "IFSC code", dd: "SBIN0001234" },
    { dt: "Branch", dd: "C-Scheme, Jaipur, Rajasthan (Sample)" },
    { dt: "UPI (sample)", dd: "rjapc.donate@samplebank" },
  ],
  qrCardTitle: "UPI / QR (नमूना)",
  qrNote: "यह एक नमूना QR पैटर्न है; वास्तविक भुगतान के लिए अपना QR यहाँ लगाएँ।",
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
