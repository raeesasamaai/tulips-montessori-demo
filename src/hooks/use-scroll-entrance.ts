import { useEffect } from "react";

const entranceSelector = [
  "header > div > *",
  "header nav li",
  "main h1", "main h2", "main h3", "main p",
  "main figure", "main li", "main dl > div",
  "main form > *", "main a.btn-primary", "main a.btn-secondary",
  "main button.btn-primary", "main button.btn-secondary",
  "footer .container-site > div", "footer .container-site > nav",
  "footer .container-site > p", "dialog > *",
].join(",");

/** One-time entrances; content remains visible without JavaScript. */
export function useScrollEntrance() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!window.IntersectionObserver) return;
    const seen = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      const entering = entries.filter((entry) => entry.isIntersecting);
      entering.forEach(({ target }, index) => {
        observer.unobserve(target);
        if (motion.matches || !(target instanceof HTMLElement)) return;
        const animation = target.animate([
          { opacity: 0, transform: "translateY(28px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], {
          duration: 750,
          delay: Math.min(index * 60, 240),
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0.04 });

    const register = () => {
      document.querySelectorAll(entranceSelector).forEach((element) => {
        // Animate cards and grouped controls together, never twice through a parent.
        if (seen.has(element) || element.parentElement?.closest(entranceSelector)) return;
        seen.add(element);
        observer.observe(element);
      });
    };
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(document.body, { childList: true, subtree: true });
    const stopMotion = () => {
      if (motion.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    };
    motion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      motion.removeEventListener("change", stopMotion);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);
}