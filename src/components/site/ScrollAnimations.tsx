import { useEffect } from "react";

/** Progressively enhance marked content; it stays visible without JavaScript. */
export function ScrollAnimations() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = new Set<HTMLElement>();
    const reveal = (element: HTMLElement) => {
      element.dataset["revealState"] = "visible";
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );

    const register = (element: HTMLElement) => {
      if (elements.has(element)) return;
      elements.add(element);
      if (motion.matches) {
        reveal(element);
        return;
      }
      const siblings = Array.from(element.parentElement?.children ?? []).filter((sibling) =>
        sibling.hasAttribute("data-reveal"),
      );
      const delay = Math.min(Math.max(siblings.indexOf(element), 0), 3) * 70;
      element.style.setProperty("--reveal-delay", `${delay}ms`);
      element.dataset["revealState"] = "pending";
      observer.observe(element);
    };

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(register);

    // Include content added by the mobile menu, form and other interactions.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches("[data-reveal]")) register(node);
          node.querySelectorAll<HTMLElement>("[data-reveal]").forEach(register);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    const onMotionChange = () => {
      if (motion.matches) elements.forEach(reveal);
    };
    motion.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      motion.removeEventListener("change", onMotionChange);
      elements.forEach((element) => {
        delete element.dataset["revealState"];
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return null;
}
