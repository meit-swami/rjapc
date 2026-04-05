import Image from "next/image";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import type { DonationsBody } from "@/lib/content-types";

const MODULES = 29;

function DonationQRPlaceholder({ pixelSize = 200 }: { pixelSize?: number }) {
  const cell = pixelSize / MODULES;
  const cells: { x: number; y: number; on: boolean }[] = [];
  for (let y = 0; y < MODULES; y++) {
    for (let x = 0; x < MODULES; x++) {
      const on = ((x * 11 + y * 17 + x * y * 3) % 5) < 2;
      if (on) cells.push({ x, y, on });
    }
  }

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox={`0 0 ${pixelSize} ${pixelSize}`}
      className="mx-auto h-auto w-full max-w-[200px] rounded-xl border border-slate-200 bg-white p-2 shadow-inner md:max-w-[240px]"
      role="img"
      aria-label="Sample QR code placeholder for donations (not scannable)"
    >
      <rect width={pixelSize} height={pixelSize} fill="#ffffff" rx={4} />
      {cells.map(({ x, y }) => (
        <rect
          key={`${x}-${y}`}
          x={x * cell + cell * 0.05}
          y={y * cell + cell * 0.05}
          width={cell * 0.9}
          height={cell * 0.9}
          fill="#0f172a"
        />
      ))}
    </svg>
  );
}

export function DonationsSection({ data }: { data: DonationsBody }) {
  const showQrImage = !data.usePlaceholderQr && data.qrImageUrl?.trim();

  return (
    <section id="donations" className="scroll-mt-24 bg-white py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
          <Reveal>
            <div className="h-full rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm md:p-8">
              <h3 className="text-lg font-bold text-navy font-devanagari md:text-xl">{data.bankCardTitle}</h3>
              {data.bankCardNote ? (
                <p className="mt-1 text-xs text-slate-500 font-sans md:text-sm">{data.bankCardNote}</p>
              ) : null}
              <dl className="mt-6 space-y-4 text-sm md:text-base">
                {data.bankRows.map((row) => (
                  <div key={`${row.dt}-${row.dd.slice(0, 24)}`}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 font-devanagari">
                      {row.dt}
                    </dt>
                    <dd className="mt-1 font-medium text-slate-800 font-devanagari whitespace-pre-wrap">{row.dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6 shadow-sm md:p-8">
              <h3 className="text-center text-lg font-bold text-navy font-devanagari md:text-xl">{data.qrCardTitle}</h3>
              {data.qrNote ? (
                <p className="mt-2 max-w-sm text-center text-xs text-slate-500 md:text-sm font-devanagari">{data.qrNote}</p>
              ) : null}
              <div className="mt-8 flex w-full justify-center">
                {showQrImage ? (
                  <Image
                    src={data.qrImageUrl!.trim()}
                    alt={data.qrCardTitle}
                    width={220}
                    height={220}
                    className="h-auto w-full max-w-[220px] rounded-xl border border-slate-200 bg-white p-2 shadow-inner object-contain"
                    unoptimized
                  />
                ) : (
                  <DonationQRPlaceholder pixelSize={220} />
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
