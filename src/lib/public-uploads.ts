import fs from "fs/promises";
import path from "path";
import type { AffiliationItem, MediaItem } from "@/lib/content-types";

const PUBLIC = path.join(process.cwd(), "public");
const UPLOADS = path.join(PUBLIC, "uploads");

export type NewsletterUpload = {
  name: string;
  href: string;
  kind: "pdf" | "image" | "video";
  /** Original filename on disk (for stable natural sort). */
  fileName: string;
};

const IMG_EXT = /\.(jpe?g|png|webp|gif|svg)$/i;
const VID_EXT = /\.(mp4|webm|ogv)$/i;
const PDF_EXT = /\.pdf$/i;

async function pathExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function toPublicUrl(absFilePath: string): string {
  const rel = path.relative(PUBLIC, absFilePath).split(path.sep).join("/");
  return `/${rel}`;
}

function humanizeStem(name: string): string {
  const stem = path.parse(name).name;
  return stem.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim() || stem;
}

function dedupeByUrl<T extends { url?: string | null }>(rows: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const r of rows) {
    const u = (r.url ?? "").trim();
    if (!u || seen.has(u)) continue;
    seen.add(u);
    out.push(r);
  }
  return out;
}

/** Logos in public/uploads/Affiliations or public/uploads/Afilliations (filename → title). */
export async function scanAffiliationLogos(): Promise<AffiliationItem[]> {
  const dirs = ["Affiliations", "Afilliations"];
  const seenUrl = new Set<string>();
  const out: AffiliationItem[] = [];
  for (const d of dirs) {
    const dir = path.join(UPLOADS, d);
    if (!(await pathExists(dir))) continue;
    let entries: import("fs").Dirent[];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const ent of entries) {
      if (!ent.isFile() || !IMG_EXT.test(ent.name)) continue;
      const full = path.join(dir, ent.name);
      const logoUrl = toPublicUrl(full);
      if (seenUrl.has(logoUrl)) continue;
      seenUrl.add(logoUrl);
      out.push({
        name: humanizeStem(ent.name),
        logoUrl,
        href: null,
      });
    }
  }
  out.sort((a, b) => a.name.localeCompare(b.name, "hi"));
  return out;
}

/**
 * Media under public/uploads/Media:
 * - Optional root-level image/video files (no date).
 * - Dated: Media/YYYY/MM/*.{images,videos}
 */
export async function scanMediaFolder(): Promise<MediaItem[]> {
  const root = path.join(UPLOADS, "Media");
  if (!(await pathExists(root))) return [];
  const out: MediaItem[] = [];

  let top: import("fs").Dirent[];
  try {
    top = await fs.readdir(root, { withFileTypes: true });
  } catch {
    return [];
  }

  for (const ent of top) {
    if (!ent.isFile()) continue;
    const full = path.join(root, ent.name);
    if (IMG_EXT.test(ent.name)) {
      out.push({
        kind: "photo",
        title: humanizeStem(ent.name),
        url: toPublicUrl(full),
        date: null,
      });
    } else if (VID_EXT.test(ent.name)) {
      out.push({
        kind: "video",
        title: humanizeStem(ent.name),
        url: toPublicUrl(full),
        date: null,
      });
    }
  }

  for (const yEnt of top) {
    if (!yEnt.isDirectory()) continue;
    const y = parseInt(yEnt.name, 10);
    if (!Number.isFinite(y) || y < 1990 || y > 2100) continue;
    const yPath = path.join(root, yEnt.name);
    let months: import("fs").Dirent[];
    try {
      months = await fs.readdir(yPath, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const mEnt of months) {
      if (!mEnt.isDirectory()) continue;
      const m = parseInt(mEnt.name, 10);
      if (!Number.isFinite(m) || m < 1 || m > 12) continue;
      const dir = path.join(yPath, mEnt.name);
      const date = `${y}-${String(m).padStart(2, "0")}-15`;
      let files: import("fs").Dirent[];
      try {
        files = await fs.readdir(dir, { withFileTypes: true });
      } catch {
        continue;
      }
      for (const fEnt of files) {
        if (!fEnt.isFile()) continue;
        const full = path.join(dir, fEnt.name);
        if (IMG_EXT.test(fEnt.name)) {
          out.push({
            kind: "photo",
            title: humanizeStem(fEnt.name),
            url: toPublicUrl(full),
            date,
          });
        } else if (VID_EXT.test(fEnt.name)) {
          out.push({
            kind: "video",
            title: humanizeStem(fEnt.name),
            url: toPublicUrl(full),
            date,
          });
        }
      }
    }
  }

  return dedupeByUrl(out);
}

/** PDFs, images, and videos in public/uploads/Newsletter */
export async function scanNewsletterFolder(): Promise<NewsletterUpload[]> {
  const dir = path.join(UPLOADS, "Newsletter");
  if (!(await pathExists(dir))) return [];
  let entries: import("fs").Dirent[];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const out: NewsletterUpload[] = [];
  for (const ent of entries) {
    if (!ent.isFile()) continue;
    const full = path.join(dir, ent.name);
    const href = toPublicUrl(full);
    const base = { name: humanizeStem(ent.name), href, fileName: ent.name };
    if (PDF_EXT.test(ent.name)) {
      out.push({ ...base, kind: "pdf" });
    } else if (IMG_EXT.test(ent.name)) {
      out.push({ ...base, kind: "image" });
    } else if (VID_EXT.test(ent.name)) {
      out.push({ ...base, kind: "video" });
    }
  }
  out.sort((a, b) =>
    a.fileName.localeCompare(b.fileName, undefined, { numeric: true, sensitivity: "base" }),
  );
  return out;
}

export function mergeAffiliations(cms: AffiliationItem[], disk: AffiliationItem[]): AffiliationItem[] {
  const key = (a: AffiliationItem) => (a.logoUrl || a.name).toLowerCase();
  const seen = new Set<string>();
  const out: AffiliationItem[] = [];
  for (const it of disk) {
    const k = key(it);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(it);
  }
  for (const it of cms) {
    const k = key(it);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(it);
  }
  return out;
}

/** Disk files first, then CMS-only rows (e.g. YouTube) without duplicate URLs. */
export function mergeMediaItems(disk: MediaItem[], cms: MediaItem[]): MediaItem[] {
  return dedupeByUrl([...disk, ...cms]);
}
