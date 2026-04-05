import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { phoneLineToTelHref } from "@/lib/contact-display";
import type { ContactAddressBlock } from "@/lib/content-types";

export function SiteFooter({
  phones = [],
  addressBlocks = [],
}: {
  phones?: string[];
  addressBlocks?: ContactAddressBlock[];
}) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <p className="font-devanagari text-lg font-bold text-navy">राष्ट्रीय जनादेश प्रमोशनल काउंसिल</p>
            <p className="mt-1 text-sm text-slate-600 font-devanagari">राजनीतिक शिक्षा का उच्च शिक्षण संस्थान</p>
            <SocialLinks className="mt-5" />
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <Link href="/blog" className="hover:text-saffron font-devanagari">
              ब्लॉग
            </Link>
            <Link href="/affiliations" className="hover:text-saffron font-devanagari">
              सहयोगी
            </Link>
            <Link href="/newsletter" className="hover:text-saffron font-devanagari">
              न्यूज़लेटर
            </Link>
            <Link href="/media" className="hover:text-saffron font-devanagari">
              मीडिया
            </Link>
            <Link href="/admin/login" className="hover:text-saffron">
              प्रशासन
            </Link>
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
        © {new Date().getFullYear()} राष्ट्रीय जनादेश प्रमोशनल काउंसिल. सर्वाधिकार सुरक्षित.
      </div>
    </footer>
  );
}
