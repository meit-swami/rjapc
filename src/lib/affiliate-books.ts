import { getLinkPreview } from "@/lib/link-preview";

/**
 * Affiliate product links per course slug (same slugs as DB `Course.slug`).
 * Add your Amazon / other affiliate URLs here — titles and cover images are
 * filled from Open Graph when the retailer allows it; use overrides if not.
 */
export type AffiliateBookLink = {
  href: string;
  titleFallback?: string;
  /** Author line under title (optional) */
  authorDisplay?: string;
  /** Current / deal price, e.g. "₹360.00 incl. GST" */
  priceDisplay?: string;
  /** Struck-through list price, e.g. "M.R.P.: ₹480.00" */
  mrpDisplay?: string;
  /** Savings line, e.g. "Save: ₹120.00 (25%)" */
  savingsDisplay?: string;
  imageOverride?: string;
};

export const AFFILIATE_BOOKS_BY_COURSE_SLUG: Record<string, AffiliateBookLink[]> = {
  "foundation-module": [
    {
      href: "https://www.amazon.in/Bhartiya-Samvidhan-aur-Shasan-Vyavastha/dp/9364264207",
      titleFallback: "Bhartiya Samvidhan aur Shasan Vyavastha",
      authorDisplay: "रमेश बोहरा",
      priceDisplay: "₹360.00 incl. GST",
      mrpDisplay: "M.R.P.: ₹480.00",
      savingsDisplay: "Save: ₹120.00 (25%)",
      imageOverride: "https://m.media-amazon.com/images/I/81rJJcZ9kGL._SY522_.jpg",
    },
    // Add more foundation-module books below (same shape). Append ?tag=your-affiliate-id to href when ready.
  ],
  /** Covers in `public/uploads/Courses/`. Amazon लिंक जोड़ने पर `href` अपडेट करें। */
  "core-module": [
    {
      href: "/?inquiry=bhartiya-arthvyavastha-aur-vikas-nitiya#contact",
      titleFallback: "भारतीय अर्थव्यवस्था और विकास नीतियां",
      authorDisplay: "रमेश बोहरा",
      priceDisplay: "₹360.00 incl. GST",
      mrpDisplay: "M.R.P.: ₹480.00",
      savingsDisplay: "Save: ₹120.00 (25%)",
      imageOverride: "/uploads/Courses/Bhartiya-Arthvyavastha-aur-Vikas-Nitiya.jpeg",
    },
    {
      href: "/?inquiry=niti-nirman-aur-prashnik-pranali#contact",
      titleFallback: "नीति निर्माण और प्रशासनिक प्रणाली",
      authorDisplay: "रमेश बोहरा",
      priceDisplay: "₹360.00 incl. GST",
      mrpDisplay: "M.R.P.: ₹480.00",
      savingsDisplay: "Save: ₹120.00 (25%)",
      imageOverride: "/uploads/Courses/Niti-Nirman-aur-Prashnik-pranali.jpeg",
    },
  ],
  "skill-module": [],
};

export type ResolvedAffiliateBook = {
  href: string;
  title: string;
  imageUrl: string | null;
  authorDisplay?: string;
  priceDisplay?: string;
  mrpDisplay?: string;
  savingsDisplay?: string;
};

export async function resolveAffiliateBooksForSlug(
  slug: string,
  bySlug?: Record<string, AffiliateBookLink[]>
): Promise<ResolvedAffiliateBook[]> {
  const map = bySlug ?? AFFILIATE_BOOKS_BY_COURSE_SLUG;
  const entries = map[slug] ?? [];
  return Promise.all(entries.map((e) => resolveOne(e)));
}

export async function resolveAllAffiliateBooks(
  bySlug?: Record<string, AffiliateBookLink[]>
): Promise<Array<ResolvedAffiliateBook & { courseSlug: string }>> {
  const map = bySlug ?? AFFILIATE_BOOKS_BY_COURSE_SLUG;
  const pairs = Object.entries(map).flatMap(([courseSlug, list]) =>
    list.map((e) => ({ courseSlug, e }))
  );
  const resolved = await Promise.all(pairs.map(({ e }) => resolveOne(e)));
  return resolved.map((book, i) => ({
    ...book,
    courseSlug: pairs[i]!.courseSlug,
  }));
}

async function resolveOne(entry: AffiliateBookLink): Promise<ResolvedAffiliateBook> {
  let title = entry.titleFallback?.trim() ?? "";
  let imageUrl = entry.imageOverride?.trim() ?? null;

  if (!title || !imageUrl) {
    const og = await getLinkPreview(entry.href);
    if (!title && og.title) title = og.title;
    if (!imageUrl && og.image) imageUrl = og.image;
  }

  if (!title) title = "अनुशंसित पुस्तक";

  return {
    href: entry.href,
    title,
    imageUrl,
    authorDisplay: entry.authorDisplay,
    priceDisplay: entry.priceDisplay,
    mrpDisplay: entry.mrpDisplay,
    savingsDisplay: entry.savingsDisplay,
  };
}
