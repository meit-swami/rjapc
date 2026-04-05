import Image from "next/image";
import type { TeamCard } from "./TeamSection";

export function CoreTeamMembersPage({ team }: { team: TeamCard[] }) {
  return (
    <main className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <header className="mb-10 text-center md:mb-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-saffron font-devanagari">टीम</p>
          <h1 className="mt-2 font-devanagari text-3xl font-bold text-navy md:text-4xl">कोर टीम सदस्य</h1>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-slate-600 font-devanagari md:text-lg">
            अनुभव, प्रतिबद्धता व मार्गदर्शन — संस्था के सभी सार्वजनिक सदस्य
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-500 font-sans md:text-base">
            Core team members — full directory
          </p>
        </header>

        {team.length === 0 ? (
          <p className="py-16 text-center text-slate-500 font-devanagari">कोई सदस्य सूचीबद्ध नहीं है।</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {team.map((m) => (
              <article
                key={m.id}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-navy to-slate-800">
                  {m.photoUrl ? (
                    <Image
                      src={m.photoUrl}
                      alt={m.nameHi}
                      fill
                      className="object-contain object-center"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, (max-width:1280px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl font-bold text-white/25 font-devanagari md:text-5xl">
                      {m.nameHi.slice(0, 1)}
                    </div>
                  )}
                  {m.isFounder ? (
                    <span className="absolute left-2 top-2 rounded-full bg-saffron px-2 py-0.5 text-[10px] font-bold text-white font-devanagari md:left-3 md:top-3 md:px-2.5 md:text-xs">
                      संस्थापक
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <h2 className="text-base font-bold text-navy font-devanagari md:text-lg">{m.nameHi}</h2>
                  <p className="mt-1 text-xs font-semibold text-saffron font-devanagari md:text-sm">{m.designation}</p>
                  <p className="mt-2 line-clamp-4 flex-1 text-xs text-slate-600 font-devanagari leading-relaxed md:text-sm md:line-clamp-5">
                    {m.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
