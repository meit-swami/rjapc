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
  "core-module": [],
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

export async function resolveAffiliateBooksForSlug(slug: string): Promise<ResolvedAffiliateBook[]> {
  const entries = AFFILIATE_BOOKS_BY_COURSE_SLUG[slug] ?? [];
  return Promise.all(entries.map((e) => resolveOne(e)));
}

export async function resolveAllAffiliateBooks(): Promise<
  Array<ResolvedAffiliateBook & { courseSlug: string }>
> {
  const pairs = Object.entries(AFFILIATE_BOOKS_BY_COURSE_SLUG).flatMap(([courseSlug, list]) =>
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
