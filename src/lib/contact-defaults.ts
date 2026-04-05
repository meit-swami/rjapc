import type { ContactBody } from "@/lib/content-types";

/** Canonical contact shown on site + used when DB still has legacy placeholders. */
export const DEFAULT_CONTACT_BODY: ContactBody = {
  phones: [
    "Sansthapak: +91-8302141401",
    "Secretary: +91-6350687073",
    "Office No.: 0141-3286277",
  ],
  addressBlocks: [
    {
      label: "Panjikrit karyala",
      line: "192/96, सेक्टर-19, प्रताप नगर, जयपुर",
    },
    {
      label: "Office पता",
      line: "193/2/01 Keshav Market, Janki Devi Road, Sector 1, Pratap Nagar, Jaipur, 302033",
    },
  ],
  instagramUrl: "https://www.instagram.com/your-org",
  facebookUrl: "https://www.facebook.com/your-page",
  xUrl: "https://x.com/your-handle",
  youtubeUrl: "https://www.youtube.com/@your-channel",
  linkedinUrl: "https://www.linkedin.com/company/your-org",
};

/** True if stored phones still use seed placeholders like +91-XXXXXXXXXX */
export function contactPhonesLookLikePlaceholders(phones: string[]): boolean {
  return phones.some((p) => /X{5,}/.test(p) || /Y{5,}/.test(p));
}

/** Map older CMS labels to current wording (Lokesh → Secretary, Office → Office No.). */
export function normalizeContactPhoneLabels(phones: string[]): string[] {
  return phones.map((line) => {
    let s = line.replace(/^Lokesh\s*:/i, "Secretary:");
    if (/^Office\s*:/i.test(s) && !/^Office\s+No\.?\s*:/i.test(s)) {
      s = s.replace(/^Office\s*:/i, "Office No.:");
    }
    return s;
  });
}
