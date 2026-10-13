import { useEffect } from "react";

const SELECTOR = "main section :is(h1, h2, h3, p, figure, form, li, dl > div), footer .container-site > *";

/** Fades elements up from below as they scroll into view. Skipped for reduced-motion users. */
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) => !el.parentElement?.closest(".reveal") && !el.closest("form li, form p"),
    );
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("reveal-in"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    els.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      el.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(el), 5) * 80}ms`);
      el.classList.add("reveal");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}
