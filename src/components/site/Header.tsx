import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/school";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-ivory/95 backdrop-blur-sm">
      <div className="container-site flex h-20 items-center justify-between gap-4">
        <a href="#top" aria-label="Tulips Montessori — back to top"><Logo size={52} /></a>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.95rem]">
            {nav.map((n) => <li key={n.href}><a className="text-muted-foreground transition-colors hover:text-foreground" href={n.href}>{n.label}</a></li>)}
          </ul>
        </nav>
        <a href="#enquire" className="btn-primary hidden lg:inline-flex">Arrange a Visit</a>
        <button ref={btnRef} type="button" className="grid h-12 w-12 place-items-center rounded-full border border-border lg:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-ivory lg:hidden">
          <ul className="container-site flex flex-col py-4">
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} onClick={() => setOpen(false)} className="block py-3 text-lg">{n.label}</a></li>
            ))}
            <li className="pt-3"><a href="#enquire" onClick={() => setOpen(false)} className="btn-primary w-full">Arrange a Visit</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
