import { school } from "@/data/school";

/** Shared school logo, preserving the circular image and wordmark layout. */
export function Logo({ size = 56, imageSrc = school.logoSrc }: { size?: number; imageSrc?: string }) {
  return (
    <span className="flex items-center gap-3" aria-label={school.name}>
      <img src={imageSrc} alt="" aria-hidden width={size} height={size} className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />
      <span aria-hidden className="leading-tight">
        <span className="block font-serif text-xl tracking-[0.18em] uppercase">Tulips</span>
        <span className="block text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground">Montessori</span>
      </span>
    </span>
  );
}
