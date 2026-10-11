// Editable school content. Everything marked "placeholder" must be confirmed by the school.
import heroImg from "@/assets/hero-classroom.jpg";
import practicalImg from "@/assets/practical-life.jpg";
import languageImg from "@/assets/language.jpg";
import numbersImg from "@/assets/numbers.jpg";

export const school = {
  name: "Tulips Montessori",
  tagline: "Preparing for Life",
  location: "Surrey Estate, Cape Town",
  ages: "Ages 3–6",
  session: "Half-day preschool",
  /** Set to an image URL / import once the approved logo file is supplied. */
  logoSrc: null as string | null,
  /** Set to a PDF URL once the prospectus is supplied. */
  prospectusUrl: null as string | null,
  /** Set to the verified Google Business Profile URL. */
  googleProfileUrl: null as string | null,
  contact: {
    phone: null as string | null,
    email: null as string | null,
    address: null as string | null,
    hours: null as string | null,
  },
  notice: "Design concept — school information subject to confirmation.",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Learning", href: "#learning" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export const images = {
  hero: { src: heroImg, w: 1280, h: 1024, alt: "A calm Montessori classroom with low wooden shelves and child-sized furniture" },
};

export const environment = [
  { src: practicalImg, w: 896, h: 1088, title: "Practical life", alt: "A tray with a small glass jug, bowl and sponge for a pouring activity", caption: "Pouring, sweeping and caring for the classroom build concentration, coordination and a quiet pride in doing things for oneself." },
  { src: languageImg, w: 1024, h: 768, title: "Language & early literacy", alt: "Sandpaper letters beside a wooden moveable alphabet box", caption: "Children trace letters with their fingertips, linking sound and shape long before they pick up a pencil." },
  { src: numbersImg, w: 1024, h: 768, title: "Number exploration", alt: "Golden bead material and red and blue number rods on a mat", caption: "Hands-on materials make quantity visible, so early maths feels concrete, logical and enjoyable." },
  { src: heroImg, w: 1280, h: 1024, title: "A prepared environment", alt: "Ordered shelves of wooden materials in a sunlit classroom", caption: "Everything has a place and sits within reach, inviting children to choose work and return it with care." },
];

export const themes = [
  { title: "Independence & confidence", body: "Children are trusted to choose, try and complete tasks themselves, growing in confidence with every small success." },
  { title: "Learning through exploration", body: "Beautiful hands-on materials let children discover ideas at their own pace, guided by a teacher rather than led by a timetable." },
  { title: "Respect, kindness & Islamic values", body: "Good character, gentle manners and a love for Allah's creation are woven into daily life in the classroom." },
];

export const educators = [
  { role: "Principal / Lead educator", intro: "An introduction from the school's principal will appear here once approved." },
  { role: "Montessori educator", intro: "A short welcome from the classroom educator will appear here once approved." },
];

export type Review = { author: string; date: string; text: string; rating: number | null; sourceUrl: string | null };
/** Placeholder review data — replace with a server-side Google reviews fetch later. */
export const reviewsPlaceholder: { status: "placeholder" | "loading" | "ready" | "error"; rating: number | null; total: number | null; items: (Review | null)[] } = {
  status: "placeholder",
  rating: null,
  total: null,
  items: [null, null, null],
};

export const admissionsSteps = [
  { title: "Send an enquiry", body: "Tell us a little about your family and what you're looking for." },
  { title: "Arrange a school visit", body: "Come and see the classroom, meet the team and ask your questions." },
  { title: "Discuss the application", body: "The school will talk you through its application process and next steps." },
];

const TBC = "The school will confirm this information.";
export const faqs = [
  { q: "What ages do you accept?", a: "Tulips Montessori primarily welcomes children aged 3 to 6. The school will confirm entry ages and timing." },
  { q: "What are the school hours, and is aftercare available?", a: `Tulips Montessori offers a half-day programme. Exact hours and aftercare: ${TBC}` },
  { q: "Does my child need to be toilet trained?", a: TBC },
  { q: "What does a typical day look like?", a: `A Montessori morning usually centres on an uninterrupted work period, with time for group gatherings, outdoor play and snack. The school's own daily rhythm: ${TBC}` },
  { q: "How is Islamic learning incorporated?", a: `The school has an Islamic ethos, with values such as kindness, respect and gratitude part of everyday life. Specific Islamic learning content: ${TBC}` },
  { q: "What are the fees, and what is included?", a: `Please enquire for current fees. ${TBC}` },
  { q: "How do applications and school visits work?", a: "Start by sending an enquiry or requesting a visit using the form below. The school will then explain its application process. An enquiry does not reserve a place." },
  { q: "How do you help new children settle in?", a: TBC },
];
