import type { ContactBody } from "@/lib/content-types";
import { whatsappMeUrl } from "@/lib/whatsapp-public";

export type PublicSocialUrls = {
  instagram?: string;
  facebook?: string;
  x?: string;
  youtube?: string;
  linkedin?: string;
  whatsapp?: string;
};

function trimUrl(u: unknown): string | undefined {
  if (typeof u !== "string") return undefined;
  const t = u.trim();
  return t ? t : undefined;
}

/** Env-only fallback when SocialLinks is used without CMS merge (e.g. tests). */
export function socialUrlsFromEnv(): PublicSocialUrls {
  const whatsappFromEnv = whatsappMeUrl();

  return {
    instagram: trimUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    facebook: trimUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    x: trimUrl(process.env.NEXT_PUBLIC_X_URL),
    youtube: trimUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL),
    linkedin: trimUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    whatsapp: whatsappFromEnv,
  };
}

/** Prefer CMS contact JSON, then public env vars. */
export function mergePublicSocialUrls(body: ContactBody): PublicSocialUrls {
  const whatsappFromEnv = whatsappMeUrl();

  return {
    instagram:
      trimUrl(body.instagramUrl) ?? trimUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    facebook: trimUrl(body.facebookUrl) ?? trimUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    x: trimUrl(body.xUrl) ?? trimUrl(process.env.NEXT_PUBLIC_X_URL),
    youtube: trimUrl(body.youtubeUrl) ?? trimUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL),
    linkedin: trimUrl(body.linkedinUrl) ?? trimUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    whatsapp: trimUrl(body.whatsappUrl) ?? whatsappFromEnv,
  };
}
