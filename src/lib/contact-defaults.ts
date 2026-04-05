import type { ContactBody } from "@/lib/content-types";

/** Canonical contact shown on site + used when DB still has legacy placeholders. */
export const DEFAULT_CONTACT_BODY: ContactBody = {
  phones: [
    "Sansthapak: +91-8302141401",
    "Lokesh: +91-6350687073",
    "Office: 0141-3286277",
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
};

/** True if stored phones still use seed placeholders like +91-XXXXXXXXXX */
export function contactPhonesLookLikePlaceholders(phones: string[]): boolean {
  return phones.some((p) => /X{5,}/.test(p) || /Y{5,}/.test(p));
}
