import { Reveal } from "@/components/Reveal";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  variant = "light",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  variant?: "light" | "dark";
}) {
  const sub = variant === "dark" ? "text-white/75" : "text-slate-600";
  const h = variant === "dark" ? "text-white" : "text-navy";
  return (
    <Reveal className="mb-10 text-center">
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-saffron">{eyebrow}</p>
      ) : null}
      <h2 className={`font-devanagari text-3xl font-bold md:text-4xl ${h}`}>{title}</h2>
      {subtitle ? (
        <p className={`mx-auto mt-3 max-w-2xl text-balance font-devanagari ${sub}`}>{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
