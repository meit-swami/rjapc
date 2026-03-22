import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

type Hero = {
  title: string;
  subtitle: string;
  tagline: string;
  backgroundImageUrl?: string | null;
};

export function HeroSection({ hero }: { hero: Hero }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="hero-map-bg relative min-h-[78vh] md:min-h-[85vh]"
        style={
          hero.backgroundImageUrl
            ? {
                backgroundImage: `linear-gradient(120deg,rgba(11,60,93,.88),rgba(255,107,0,.35)), url(${hero.backgroundImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          aria-hidden
        >
          <svg className="h-full w-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-4 py-20 md:px-6 md:py-28">
          <Reveal>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white/90 ring-1 ring-white/20 backdrop-blur font-devanagari">
              <span className="h-2 w-2 animate-pulse rounded-full bg-saffron" />
              राजनीतिक करियर संस्थान
            </p>
            <h1 className="font-devanagari text-4xl font-extrabold leading-tight text-white text-balance md:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90 md:text-xl font-devanagari">{hero.subtitle}</p>
            <p className="mt-3 max-w-2xl text-base text-white/80 md:text-lg font-devanagari">{hero.tagline}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#programs"
                className="inline-flex items-center justify-center rounded-xl bg-saffron px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-saffron-dark font-devanagari"
              >
                कार्यक्रम देखें
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 font-devanagari"
              >
                संपर्क करें
              </Link>
            </div>
          </Reveal>
          <div className="mt-14 hidden justify-end md:flex">
            <div className="relative h-40 w-64 animate-float opacity-90 lg:h-48 lg:w-80">
              <Image
                src="/india-outline.svg"
                alt=""
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
