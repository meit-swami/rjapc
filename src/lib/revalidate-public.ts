import { revalidatePath } from "next/cache";

/**
 * Public pages (home, blog, courses, sitemap, shared header/footer) are rendered once
 * and cached by Next.js. Call this after any successful admin write so the next visitor
 * gets freshly rendered pages instead of the copy baked in at build time.
 */
export function revalidatePublicSite() {
  revalidatePath("/", "layout");
}
