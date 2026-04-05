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

type SocialLinksProps = {
  className?: string;
  /** When false, omit the “Find us on:” label (icons only). */
  showLabel?: boolean;
};

export function SocialLinks({ className = "", showLabel = true }: SocialLinksProps) {
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim();
  const facebook = process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim();
  const x = process.env.NEXT_PUBLIC_X_URL?.trim();

  const items = [
    { href: instagram, label: "Instagram", Icon: IconInstagram },
    { href: facebook, label: "Facebook", Icon: IconFacebook },
    { href: x, label: "Twitter X", Icon: IconX },
  ].filter((item): item is typeof item & { href: string } => Boolean(item.href));

  if (items.length === 0) return null;

  return (
    <div className={className}>
      {showLabel ? (
        <p className="text-sm font-semibold text-slate-700">Find us on:</p>
      ) : null}
      <ul
        className={`flex flex-wrap items-center gap-3 ${showLabel ? "mt-2" : ""}`}
        aria-label="Social media"
      >
        {items.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-saffron/40 hover:text-saffron"
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
