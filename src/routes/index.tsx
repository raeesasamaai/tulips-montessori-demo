import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero, AboutApproach, LearningEnvironment, Educators, ParentReviews, Admissions, FAQ } from "@/components/site/Sections";
import { ContactSection, Footer } from "@/components/site/ContactFooter";
import { useScrollEntrance } from "@/hooks/use-scroll-entrance";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tulips Montessori — Montessori preschool in Surrey Estate, Cape Town (design concept)" },
      { name: "description", content: "Draft website concept for Tulips Montessori, a half-day Montessori preschool with an Islamic ethos for ages 3–6 in Surrey Estate, Cape Town." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Tulips Montessori — Preparing for Life" },
      { property: "og:description", content: "A nurturing Montessori preschool for ages 3–6 in Surrey Estate, Cape Town. Design concept." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useScrollEntrance();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-foreground">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <AboutApproach />
        <LearningEnvironment />
        <Educators />
        <ParentReviews />
        <Admissions />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
