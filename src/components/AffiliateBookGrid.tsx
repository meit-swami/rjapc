import Image from "next/image";
import type { ResolvedAffiliateBook } from "@/lib/affiliate-books";

export function AffiliateBookGrid({
  books,
  emptyMessage,
}: {
  books: ResolvedAffiliateBook[];
  emptyMessage: string;
}) {
  if (books.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-slate-600 font-devanagari">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {books.map((book, index) => {
        const offsite = /^https?:\/\//i.test(book.href);
        return (
        <li key={`${book.href}-${book.title}-${index}`}>
          <a
            href={book.href}
            target={offsite ? "_blank" : undefined}
            rel={offsite ? "nofollow sponsored noopener noreferrer" : undefined}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition hover:-translate-y-0.5 hover:border-saffron/40 hover:shadow-lg"
          >
            <div className="relative aspect-[3/4] w-full bg-slate-100">
              {book.imageUrl ? (
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  fill
                  className="object-contain p-3 transition group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center px-4 text-center text-sm text-slate-500 font-devanagari">
                  कवर लोड नहीं हुआ — लिंक पर देखें
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-4">
              <h3 className="line-clamp-3 text-sm font-semibold leading-snug text-navy group-hover:text-saffron">
                {book.title}
              </h3>
              {book.authorDisplay ? (
                <p className="text-xs text-slate-600 font-devanagari">{book.authorDisplay}</p>
              ) : null}
              {book.priceDisplay ? (
                <p className="text-base font-bold text-saffron">{book.priceDisplay}</p>
              ) : null}
              {book.mrpDisplay ? (
                <p className="text-xs text-slate-500 line-through">{book.mrpDisplay}</p>
              ) : null}
              {book.savingsDisplay ? (
                <p className="text-xs font-medium text-emerald-700">{book.savingsDisplay}</p>
              ) : null}
              <span className="mt-auto inline-flex items-center pt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                खरीदें / विवरण
                <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </span>
            </div>
          </a>
        </li>
        );
      })}
    </ul>
  );
}
