import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { phoneLineToTelHref } from "@/lib/contact-display";
import type { ContactAddressBlock, SiteChromeBody } from "@/lib/content-types";
import type { PublicSocialUrls } from "@/lib/public-social";

export function SiteFooter({
  phones = [],
  addressBlocks = [],
  footer,
  socialUrls,
}: {
  phones?: string[];
  addressBlocks?: ContactAddressBlock[];
  footer: SiteChromeBody["footer"];
  socialUrls?: PublicSocialUrls | null;
}) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <p className="font-devanagari text-lg font-bold text-navy">{footer.brandHi}</p>
            <p className="mt-1 text-sm text-slate-600 font-devanagari">{footer.tagHi}</p>
            <SocialLinks className="mt-5" urls={socialUrls} />
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            {footer.links.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-saffron font-devanagari">
                {item.labelHi}
              </Link>
            ))}
          </div>
        </div>

        {(addressBlocks.length > 0 || phones.length > 0) && (
          <div className="mt-8 grid gap-6 border-t border-slate-100 pt-8 text-sm text-slate-600 md:grid-cols-2">
            {addressBlocks.length > 0 ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 font-devanagari">पता</p>
                <div className="mt-2 space-y-3">
                  {addressBlocks.map((b) => (
                    <div key={`${b.label}-${b.line.slice(0, 20)}`}>
                      <p className="font-semibold text-navy font-devanagari">{b.label}</p>
                      <p className="mt-0.5 leading-relaxed font-devanagari">{b.line}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {phones.length > 0 ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 font-devanagari">फ़ोन</p>
                <ul className="mt-2 space-y-1.5">
                  {phones.map((p) => (
                    <li key={p}>
                      <a href={phoneLineToTelHref(p)} className="hover:text-saffron font-devanagari">
                        {p}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}
      </div>
      <div className="border-t border-slate-100 bg-slate-50 py-4 text-center text-xs text-slate-500 font-devanagari">
        © {new Date().getFullYear()} {footer.copyrightRestHi}
      </div>
    </footer>
  );
}
