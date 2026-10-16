import { useState } from "react";
import { Baby, Clock, MapPin, Leaf, Sprout, Heart, ChevronDown, Star, User, FileText, ExternalLink } from "lucide-react";
import { school, images, themes, environment, educators, reviewsPlaceholder, admissionsSteps, faqs } from "@/data/school";

function Tulip({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 60 90" className={className} fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M30 88V40" /><path d="M30 70c-8-2-14-10-15-20 8 2 14 9 15 20Z" /><path d="M30 62c7-2 12-9 13-17-7 2-12 8-13 17Z" />
      <path d="M30 40c-10 0-15-10-14-24l7 6 7-14 7 14 7-6c1 14-4 24-14 24Z" />
    </svg>
  );
}

function SectionHead({ eyebrow, title, intro, center }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div data-reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-[2rem] md:text-[2.75rem]">{title}</h2>
      {intro && <p className="mt-4 text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function Hero() {
  const facts = [
    { icon: Baby, label: school.ages },
    { icon: Clock, label: `${school.session} · ${school.contact.hours}` },
    { icon: MapPin, label: school.location },
  ];
  return (
    <section id="top" className="relative overflow-hidden bg-ivory">
      <div className="container-site grid items-center gap-10 pb-12 pt-10 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p data-reveal className="eyebrow flex items-center gap-2"><Tulip className="h-5 w-4 text-sage" />{school.tagline}</p>
          <h1 data-reveal className="mt-5 text-[2.5rem] sm:text-5xl lg:text-[4rem]">A nurturing space for little minds to grow.</h1>
          <p data-reveal className="mt-6 max-w-xl text-lg text-muted-foreground">A Montessori preschool in Surrey Estate, Cape Town, supporting independence, confidence and a love of learning within a caring Islamic environment.</p>
          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <a href="#enquire" className="btn-primary">Arrange a Visit</a>
            <a href="#prospectus" className="btn-secondary">View Prospectus</a>
          </div>
        </div>
        <figure data-reveal className="relative">
          <img src={images.hero.src} width={images.hero.w} height={images.hero.h} alt={images.hero.alt} fetchPriority="high" className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-soft" />
        </figure>
      </div>
      <div className="container-site pb-14">
        <ul data-reveal="group" className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {facts.map(({ icon: I, label }) => (
            <li key={label} className="flex items-center gap-3 bg-card px-6 py-5"><I size={20} className="text-primary" aria-hidden /><span className="font-medium">{label}</span></li>
          ))}
        </ul>
        
      </div>
    </section>
  );
}

export function AboutApproach() {
  const icons = [Sprout, Leaf, Heart];
  const img = images.about;
  return (
    <section id="about" className="section-pad bg-card">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHead eyebrow="About the school" title="Small beginnings. Meaningful growth." intro="Tulips Montessori is a half-day preschool for young children, rooted in the Montessori method and an Islamic ethos. We care for the whole child — their independence, character, curiosity and sense of belonging." />
          <p data-reveal className="mt-4 text-muted-foreground">In a Montessori classroom, children learn by doing. Instead of everyone working on the same thing at once, each child chooses from carefully designed materials, and the teacher observes and guides. It is calm, purposeful and built around how young children naturally learn.</p>
          <ul className="mt-10 space-y-6">
            {themes.map((t, i) => { const I = icons[i]!; return (
              <li data-reveal key={t.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-beige text-primary"><I size={20} aria-hidden /></span>
                <div><h3 className="text-2xl">{t.title}</h3><p className="mt-1 text-muted-foreground">{t.body}</p></div>
              </li>); })}
          </ul>
        </div>
        <figure data-reveal className="self-center">
          <img src={img.src} width={img.w} height={img.h} alt={img.alt} loading="lazy" className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
        </figure>
      </div>
    </section>
  );
}

export function LearningEnvironment() {
  return (
    <section id="learning" className="section-pad bg-beige">
      <div className="container-site">
        <SectionHead eyebrow="Learning environment" title="A space to explore, discover and grow." intro="Every corner of a Montessori classroom is prepared with purpose. Here are some of the areas children explore each day." />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {environment.map((e) => (
            <li data-reveal key={e.title} className="overflow-hidden rounded-2xl bg-card">
              <img src={e.src} width={e.w} height={e.h} alt={e.alt} loading="lazy" className="aspect-[3/2] w-full object-cover" />
              <div className="p-6"><h3 className="text-2xl">{e.title}</h3><p className="mt-2 text-muted-foreground">{e.caption}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Educators() {
  return (
    <section className="section-pad bg-ivory" aria-labelledby="edu-h">
      <div className="container-site">
        <div data-reveal className="mx-auto max-w-2xl text-center"><p className="eyebrow">Our team</p><h2 id="edu-h" className="mt-3 text-[2rem] md:text-[2.75rem]">The people guiding their first steps.</h2><p className="mt-3 text-sm text-muted-foreground">This is an optional section.</p></div>
        <ul className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {educators.map((e) => (
            <li data-reveal key={e.role} className="rounded-2xl border border-dashed border-input bg-card p-8 text-center">
              <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-beige text-taupe"><User size={36} aria-hidden /></span>
              <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">Educator placeholder</p>
              <h3 className="mt-1 text-2xl">{e.role}</h3>
              <p className="mt-2 text-muted-foreground">{e.intro}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ParentReviews() {
  const r = reviewsPlaceholder;
  return (
    <section id="reviews" className="section-pad bg-card">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Parent reviews" title="Hear from our parent community." />
          <div data-reveal className="rounded-2xl border border-border bg-ivory px-6 py-4">
            <div className="flex items-center gap-1 text-taupe" aria-hidden>{[0,1,2,3,4].map((i) => <Star key={i} size={18} />)}</div>
            <p className="mt-1 text-sm text-muted-foreground">Overall rating: <strong>{r.rating ?? "to be added"}</strong> · Reviews: <strong>{r.total ?? "to be verified"}</strong></p>
          </div>
        </div>
        <p data-reveal className="mt-6 inline-block rounded-full bg-beige px-4 py-1.5 text-sm text-muted-foreground">This section will showcase your Google reviews, helping prospective parents hear from families who know your school.</p>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {r.items.map((_, i) => (
            <li data-reveal key={i} className="flex flex-col rounded-2xl border border-border bg-ivory p-6">
              <div className="flex gap-1 text-border" aria-hidden>{[0,1,2,3,4].map((s) => <Star key={s} size={16} />)}</div>
              <div className="mt-4 space-y-2" aria-hidden><div className="h-3 rounded bg-beige" /><div className="h-3 rounded bg-beige" /><div className="h-3 w-2/3 rounded bg-beige" /></div>
              <p className="mt-4 text-sm text-muted-foreground">Verified parent review {i + 1} will appear here.</p>
              <p className="mt-auto pt-6 text-sm"><span className="font-medium">Reviewer name</span> · <span className="text-muted-foreground">Date · Source</span></p>
            </li>
          ))}
        </ul>
        <p data-reveal className="mt-8">
          {school.googleProfileUrl
            ? <a href={school.googleProfileUrl} target="_blank" rel="noreferrer" className="btn-secondary">Read more reviews on Google <ExternalLink size={16} aria-hidden /></a>
            : <span className="btn-secondary cursor-not-allowed opacity-60" aria-disabled="true">Read more reviews on Google (link to be added)</span>}
        </p>
      </div>
    </section>
  );
}

export function Admissions() {
  return (
    <section id="admissions" className="section-pad bg-beige">
      <div className="container-site">
        <SectionHead center eyebrow="Admissions" title="Your next step starts with a visit." intro="A simple draft process — the school will confirm its actual admissions steps." />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {admissionsSteps.map((s, i) => (
            <li data-reveal key={s.title} className="rounded-2xl bg-card p-8">
              <span className="font-serif text-5xl text-taupe">0{i + 1}</span>
              <h3 className="mt-3 text-2xl">{s.title}</h3><p className="mt-2 text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
        <div data-reveal className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a href="#enquire" className="btn-primary">Arrange a Visit</a>
          {school.prospectusUrl
            ? <a href={school.prospectusUrl} className="btn-secondary"><FileText size={18} aria-hidden />View Prospectus</a>
            : <a href="#prospectus" className="btn-secondary"><FileText size={18} aria-hidden />View Prospectus</a>}
        </div>
        <p data-reveal className="mt-2 text-center text-sm text-muted-foreground">Sending an enquiry does not reserve a place.</p>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen((current) => current === i ? null : i);
  return (
    <section id="faqs" className="section-pad bg-ivory">
      <div className="container-site max-w-3xl">
        <SectionHead center eyebrow="FAQs" title="Questions parents often ask." />
        <ul className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li data-reveal key={f.q}>
                <h3 className="font-sans text-base font-medium">
                  <button type="button" id={`faq-b-${i}`} aria-expanded={isOpen} aria-controls={`faq-p-${i}`} onClick={() => toggle(i)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg">
                    {f.q}<ChevronDown aria-hidden size={20} className={`shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </h3>
                <div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} hidden={!isOpen} className="pb-6 text-muted-foreground">{f.a}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
