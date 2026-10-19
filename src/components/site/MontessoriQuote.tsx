import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const quote =
  "There is no punishment or reward in our schools to interfere with the joy in the work itself. The only reward is in the completion of the work – it is at this time that internal discipline establishes itself, and the foundations of character are laid.";

export function MontessoriQuote() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const text = textRef.current;
      if (!text) return;

      SplitText.create(text, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(split) {
          return gsap.fromTo(
            split.lines,
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.25,
              ease: "power2.out",
              scrollTrigger: {
                trigger: text,
                start: "top 88%",
                end: "bottom 55%",
                scrub: 0.7,
              },
            },
          );
        },
      });
    });

    return () => media.revert();
  }, []);

  return (
    <section className="section-pad bg-beige" aria-label="A quote from Maria Montessori">
      <div className="container-site">
        <figure className="mx-auto max-w-5xl text-center">
          <span
            aria-hidden="true"
            className="block h-14 font-serif text-8xl leading-none text-sage"
          >
            “
          </span>
          <blockquote className="mt-6 font-serif text-2xl leading-relaxed text-foreground sm:text-3xl md:text-[2.25rem] md:leading-[1.45]">
            <p ref={textRef}>{quote}</p>
          </blockquote>
          <span aria-hidden="true" className="mx-auto mt-8 block h-px w-12 bg-sage/50" />
          <figcaption className="mt-5 text-xs font-medium uppercase tracking-[0.22em] text-primary sm:text-sm">
            — Maria Montessori —
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
