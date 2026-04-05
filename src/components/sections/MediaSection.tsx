import Image from "next/image";
import type { MediaItem } from "@/lib/content-types";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";

function youtubeEmbedSrc(raw: string): string | null {
  try {
    const u = new URL(raw.trim());
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      const m = u.pathname.match(/\/embed\/([^/?]+)/);
      if (m?.[1]) return `https://www.youtube.com/embed/${m[1]}`;
      const s = u.pathname.match(/\/shorts\/([^/?]+)/);
      if (s?.[1]) return `https://www.youtube.com/embed/${s[1]}`;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function parseItemDate(d: string | null | undefined): { y: number; m: number } | null {
  if (!d || !/^\d{4}-\d{2}-\d{2}/.test(d)) return null;
  const [ys, ms] = d.slice(0, 10).split("-");
  const y = Number(ys);
  const m = Number(ms) - 1;
  if (!Number.isFinite(y) || m < 0 || m > 11) return null;
  return { y, m };
}

function monthLabelHi(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString("hi-IN", { month: "long", year: "numeric" });
}

type Grouped = {
  year: number;
  months: { month: number; items: MediaItem[] }[];
};

function buildTimeline(items: MediaItem[]): { dated: Grouped[]; undated: MediaItem[] } {
  const datedMap = new Map<string, MediaItem[]>();
  const undated: MediaItem[] = [];

  for (const it of items) {
    const p = parseItemDate(it.date);
    if (!p) {
      undated.push(it);
      continue;
    }
    const key = `${p.y}-${p.m}`;
    const arr = datedMap.get(key) ?? [];
    arr.push(it);
    datedMap.set(key, arr);
  }

  const keys = [...datedMap.keys()].sort((a, b) => {
    const [ya, ma] = a.split("-").map(Number);
    const [yb, mb] = b.split("-").map(Number);
    if (ya !== yb) return yb - ya;
    /* Descending calendar order within year (later month first). */
    return mb - ma;
  });

  const byYear = new Map<number, { month: number; items: MediaItem[] }[]>();
  for (const k of keys) {
    const [ys, ms] = k.split("-");
    const y = Number(ys);
    const m = Number(ms);
    const list = byYear.get(y) ?? [];
    list.push({ month: m, items: datedMap.get(k)! });
    byYear.set(y, list);
  }

  const dated: Grouped[] = [...byYear.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, months]) => ({
      year,
      months: months.sort((a, b) => b.month - a.month),
    }));

  return { dated, undated };
}

function MediaCard({ item }: { item: MediaItem }) {
  if (item.kind === "video") {
    const embed = youtubeEmbedSrc(item.url);
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-md">
        {embed ? (
          <div className="relative aspect-video w-full">
            <iframe
              title={item.title}
              src={embed}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center bg-slate-900 p-4 text-center text-sm text-white font-devanagari">
            <a href={item.url} className="underline hover:text-saffron" target="_blank" rel="noopener noreferrer">
              वीडियो देखें (लिंक खोलें)
            </a>
          </div>
        )}
        <p className="border-t border-white/10 px-3 py-2 text-sm font-semibold text-white font-devanagari">
          {item.title}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-md">
      <div className="relative aspect-[4/3] w-full bg-slate-200">
        <Image src={item.url} alt={item.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
      </div>
      <p className="px-3 py-2 text-sm font-semibold text-navy font-devanagari">{item.title}</p>
    </div>
  );
}

export function MediaSection({
  title,
  items,
  showWhenEmpty = false,
}: {
  title: string;
  items: MediaItem[];
  /** When true, render the section shell even if there are no items (standalone page). */
  showWhenEmpty?: boolean;
}) {
  const valid = items.filter((it) => it.url?.trim());
  if (!valid.length && !showWhenEmpty) return null;

  if (!valid.length) {
    return (
      <section id="media" className="scroll-mt-24 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionTitle
            eyebrow="फ़ोटो व वीडियो"
            title={title}
            subtitle="समय के अनुसार — वर्ष व माह"
          />
          <p className="mt-10 text-center text-slate-500 font-devanagari">
            अभी प्रदर्शित करने के लिए कोई फ़ोटो या वीडियो नहीं है।
          </p>
        </div>
      </section>
    );
  }

  const { dated, undated } = buildTimeline(valid);

  return (
    <section id="media" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="फ़ोटो व वीडियो"
          title={title}
          subtitle="समय के अनुसार — वर्ष व माह"
        />

        <div className="relative">
          <div className="absolute bottom-0 left-[11px] top-2 w-px bg-saffron/40 md:left-[15px]" aria-hidden />

          <div className="space-y-14">
            {dated.map((yg) => (
              <div key={yg.year}>
                <div className="relative flex gap-4 md:gap-6">
                  <div className="relative z-10 flex h-8 w-6 shrink-0 items-center justify-center md:w-8">
                    <span className="h-3 w-3 rounded-full border-2 border-saffron bg-white shadow-sm md:h-3.5 md:w-3.5" />
                  </div>
                  <h3 className="font-devanagari text-2xl font-bold text-navy md:text-3xl">{yg.year}</h3>
                </div>

                <div className="mt-6 space-y-10 pl-10 md:pl-14">
                  {yg.months.map(({ month, items: monthItems }) => (
                    <div key={`${yg.year}-${month}`}>
                      <h4 className="border-b border-slate-200 pb-2 font-devanagari text-lg font-semibold text-slate-800 capitalize">
                        {monthLabelHi(yg.year, month)}
                      </h4>
                      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {monthItems.map((it, i) => (
                          <Reveal key={`${it.url}-${i}`} delay={i * 70}>
                            <MediaCard item={it} />
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {undated.length ? (
              <div>
                <div className="relative flex gap-4 md:gap-6">
                  <div className="relative z-10 flex h-8 w-6 shrink-0 items-center justify-center md:w-8">
                    <span className="h-3 w-3 rounded-full border-2 border-slate-300 bg-white shadow-sm md:h-3.5 md:w-3.5" />
                  </div>
                  <h3 className="font-devanagari text-xl font-bold text-slate-700">अन्य</h3>
                </div>
                <div className="mt-4 grid gap-6 pl-10 sm:grid-cols-2 lg:grid-cols-3 md:pl-14">
                  {undated.map((it, i) => (
                    <Reveal key={`undated-${it.url}-${i}`} delay={i * 70}>
                      <MediaCard item={it} />
                    </Reveal>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
