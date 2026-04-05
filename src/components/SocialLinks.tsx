import type { PublicSocialUrls } from "@/lib/public-social";
import { socialUrlsFromEnv } from "@/lib/public-social";

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        width="20"
        height="20"
        x="2"
        y="2"
        rx="5"
        ry="5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
      <path d="M16.003 3C9.374 3 4 8.373 4 14.883c0 2.39.698 4.713 2.02 6.705L4 29l8.395-2.204A11.86 11.86 0 0016.004 27C22.629 27 28 21.627 28 15.117 28 8.608 22.629 3 16.003 3zm0 21.598c-2.052 0-4.07-.55-5.824-1.592l-.417-.248-4.862 1.274 1.3-4.735-.274-.44A9.889 9.889 0 016.12 14.883C6.12 9.65 10.652 5.4 16.003 5.4c5.35 0 9.88 4.25 9.88 9.483 0 5.232-4.53 9.715-9.88 9.715zm5.673-6.607c-.31-.155-1.835-.906-2.12-1.01-.284-.103-.49-.155-.696.155-.206.31-.798 1.01-.978 1.217-.18.206-.36.232-.67.077-.31-.155-1.308-.482-2.49-1.537-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.477.135-.632.14-.14.31-.36.465-.54.155-.18.206-.31.31-.516.103-.206.052-.387-.026-.542-.077-.155-.696-1.68-.953-2.3-.25-.6-.5-.52-.696-.53l-.593-.01c-.206 0-.542.077-.825.387-.283.31-1.08 1.056-1.08 2.572 0 1.516 1.11 2.982 1.264 3.187.155.206 2.18 3.33 5.28 4.672.74.32 1.318.51 1.768.653.74.235 1.414.202 1.948.123.594-.088 1.835-.75 2.093-1.474.258-.724.258-1.344.18-1.474-.077-.13-.283-.206-.593-.36z" />
    </svg>
  );
}

type SocialLinksProps = {
  className?: string;
  /** When false, omit the section label (icons only). */
  showLabel?: boolean;
  /** From getPublicPageData — CMS + env. Omit to use env-only (legacy). */
  urls?: PublicSocialUrls | null;
};

export function SocialLinks({ className = "", showLabel = true, urls }: SocialLinksProps) {
  const resolved = urls ?? socialUrlsFromEnv();

  const items = [
    { href: resolved.instagram ?? "", label: "Instagram", Icon: IconInstagram },
    { href: resolved.facebook ?? "", label: "Facebook", Icon: IconFacebook },
    { href: resolved.x ?? "", label: "X (Twitter)", Icon: IconX },
    { href: resolved.youtube ?? "", label: "YouTube", Icon: IconYoutube },
    { href: resolved.linkedin ?? "", label: "LinkedIn", Icon: IconLinkedIn },
    { href: resolved.whatsapp ?? "", label: "WhatsApp", Icon: IconWhatsApp, whatsapp: true },
  ].filter((item) => Boolean(item.href));

  if (items.length === 0) return null;

  return (
    <div className={className}>
      {showLabel ? (
        <p className="text-sm font-semibold text-slate-700 font-devanagari">सोशल मीडिया</p>
      ) : null}
      <ul
        className={`flex flex-wrap items-center gap-3 ${showLabel ? "mt-2" : ""}`}
        aria-label="Social media"
      >
        {items.map(({ href, label, Icon, whatsapp }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition ${
                whatsapp
                  ? "border-[#25D366]/40 bg-[#25D366]/10 text-[#128C7E] hover:border-[#25D366] hover:bg-[#25D366]/15"
                  : "border-slate-200 bg-white text-slate-600 hover:border-saffron/40 hover:text-saffron"
              }`}
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
