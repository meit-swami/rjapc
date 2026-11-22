import { createReadStream } from "fs";
import { stat } from "fs/promises";
import path from "path";
import { Readable } from "stream";

/**
 * `next start` only serves files that were already in /public at build time.
 * Images uploaded from the admin panel (and files copied into public/uploads/*
 * on the server later) land there after the build, so this handler serves them
 * from disk. Files that existed at build time are still served by Next.js directly
 * and never reach this route.
 */
export const dynamic = "force-dynamic";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogv": "video/ogg",
  ".pdf": "application/pdf",
};

type Params = { params: Promise<{ path: string[] }> };

function notFound() {
  return new Response("Not found", { status: 404 });
}

async function resolveFile(segments: string[]) {
  if (!segments.length) return null;
  for (const s of segments) {
    // No traversal, no hidden files (.gitkeep etc.), no smuggled separators.
    if (!s || s.startsWith(".") || s.includes("/") || s.includes("\\") || s.includes("\0")) {
      return null;
    }
  }
  const full = path.resolve(UPLOADS_DIR, ...segments);
  if (!full.startsWith(UPLOADS_DIR + path.sep)) return null;

  const type = CONTENT_TYPES[path.extname(full).toLowerCase()];
  if (!type) return null;

  try {
    const info = await stat(full);
    if (!info.isFile()) return null;
    return { full, type, size: info.size, mtime: info.mtime };
  } catch {
    return null;
  }
}

function baseHeaders(type: string, mtime: Date) {
  const h = new Headers({
    "Content-Type": type,
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=3600",
    "Last-Modified": mtime.toUTCString(),
    "X-Content-Type-Options": "nosniff",
  });
  // An SVG opened directly could run script on this origin; sandbox it.
  if (type === "image/svg+xml") {
    h.set("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox");
  }
  return h;
}

/** Parses a single `bytes=start-end` range; returns null when absent or unusable. */
function parseRange(header: string | null, size: number): { start: number; end: number } | "invalid" | null {
  if (!header) return null;
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m || (m[1] === "" && m[2] === "")) return null;
  let start: number;
  let end: number;
  if (m[1] === "") {
    // suffix range: last N bytes
    const n = Number(m[2]);
    start = Math.max(0, size - n);
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
  }
  if (start > end || start >= size) return "invalid";
  return { start, end };
}

async function serve(req: Request, { params }: Params, withBody: boolean) {
  const file = await resolveFile((await params).path);
  if (!file) return notFound();

  const headers = baseHeaders(file.type, file.mtime);
  const range = parseRange(req.headers.get("range"), file.size);

  if (range === "invalid") {
    headers.set("Content-Range", `bytes */${file.size}`);
    return new Response(null, { status: 416, headers });
  }

  const start = range?.start ?? 0;
  const end = range?.end ?? file.size - 1;
  headers.set("Content-Length", String(file.size === 0 ? 0 : end - start + 1));
  if (range) headers.set("Content-Range", `bytes ${start}-${end}/${file.size}`);
  const status = range ? 206 : 200;

  if (!withBody || file.size === 0) return new Response(null, { status, headers });

  const stream = Readable.toWeb(createReadStream(file.full, { start, end })) as ReadableStream;
  return new Response(stream, { status, headers });
}

export function GET(req: Request, ctx: Params) {
  return serve(req, ctx, true);
}

export function HEAD(req: Request, ctx: Params) {
  return serve(req, ctx, false);
}
