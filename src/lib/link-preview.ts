import { unstable_cache } from "next/cache";

const FETCH_TIMEOUT_MS = 12_000;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function metaContent(html: string, prop: string): string | null {
  const byPropFirst =
    html.match(
      new RegExp(
        `<meta[^>]+property=["']${prop.replace(/\./g, "\\.")}["'][^>]+content=["']([^"']*)["']`,
        "i"
      )
    ) ??
    html.match(
      new RegExp(
        `<meta[^>]+name=["']${prop.replace(/\./g, "\\.")}["'][^>]+content=["']([^"']*)["']`,
        "i"
      )
    );
  if (byPropFirst?.[1]) return decodeHtmlEntities(byPropFirst[1].trim());

  const byContentFirst =
    html.match(
      new RegExp(
        `<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${prop.replace(/\./g, "\\.")}["']`,
        "i"
      )
    ) ??
    html.match(
      new RegExp(
        `<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${prop.replace(/\./g, "\\.")}["']`,
        "i"
      )
    );
  if (byContentFirst?.[1]) return decodeHtmlEntities(byContentFirst[1].trim());
  return null;
}

function documentTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m?.[1] ? decodeHtmlEntities(m[1].trim()) : null;
}

function absolutize(resource: string | null, pageUrl: string): string | null {
  if (!resource) return null;
  const t = resource.trim();
  if (!t) return null;
  if (t.startsWith("//")) return `https:${t}`;
  if (/^https?:\/\//i.test(t)) return t;
  try {
    return new URL(t, pageUrl).href;
  } catch {
    return null;
  }
}

async function fetchOgForUrl(url: string): Promise<{ title: string | null; image: string | null }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-IN,en;q=0.9,hi;q=0.8",
      },
    });
    clearTimeout(timer);
    if (!res.ok) return { title: null, image: null };
    const html = await res.text();
    const finalUrl = res.url || url;
    const title =
      metaContent(html, "og:title") ??
      metaContent(html, "twitter:title") ??
      documentTitle(html);
    const imageRaw =
      metaContent(html, "og:image") ??
      metaContent(html, "twitter:image") ??
      metaContent(html, "twitter:image:src");
    return {
      title,
      image: absolutize(imageRaw, finalUrl),
    };
  } catch {
    clearTimeout(timer);
    return { title: null, image: null };
  }
}

/** Cached HTML/OG scrape for product pages (Amazon, Flipkart, etc.). May fail if the store blocks server requests — use overrides in affiliate-books config. */
export function getLinkPreview(url: string) {
  return unstable_cache(
    async () => fetchOgForUrl(url),
    ["link-preview", url],
    { revalidate: 86_400 }
  )();
}
