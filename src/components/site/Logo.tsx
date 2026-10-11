import { school } from "@/data/school";

/** Renders the supplied logo image; shows a labelled text placeholder until it is provided. */
export function Logo({ size = 56 }: { size?: number }) {
  if (school.logoSrc) {
    return <img src={school.logoSrc} alt={`${school.name} — ${school.tagline}`} width={size} height={size} className="rounded-full" style={{ width: size, height: size }} />;
  }
  return (
    <span className="flex items-center gap-3" aria-label={`${school.name} (logo placeholder)`}>
      <span aria-hidden className="grid place-items-center rounded-full border border-dashed border-primary/50 bg-beige text-[0.55rem] uppercase tracking-widest text-muted-foreground" style={{ width: size, height: size }}>Logo</span>
      <span aria-hidden className="leading-tight">
        <span className="block font-serif text-xl tracking-[0.18em] uppercase">Tulips</span>
        <span className="block text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground">Montessori</span>
      </span>
    </span>
  );
}
