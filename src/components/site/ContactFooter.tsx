import { useEffect, useRef } from "react";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { school, nav } from "@/data/school";
import { EnquiryForm } from "./EnquiryForm";
import { Logo } from "./Logo";

const Pending = ({ children }: { children: string }) => <span className="italic text-muted-foreground">{children}</span>;

export function ContactSection() {
  const c = school.contact;
  const rows = [
    { icon: MapPin, label: "Location", value: c.address ?? school.location },
    { icon: Phone, label: "Phone", value: c.phone, pending: "Verified number to be added" },
    { icon: Mail, label: "Email", value: c.email, pending: "Verified email to be added" },
    { icon: Clock, label: "School hours", value: c.hours },
  ];
  return (
    <section id="contact" className="section-pad bg-card">
      <div className="container-site grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p data-reveal className="eyebrow">Contact</p>
          <h2 data-reveal className="mt-3 text-[2rem] md:text-[2.75rem]">Let's talk about your little one's next chapter.</h2>
          <p data-reveal className="mt-4 text-muted-foreground">Whether you have a question or would like to see the classroom, we'd love to hear from you.</p>
          <dl className="mt-10 space-y-5">
            {rows.map(({ icon: I, label, value, pending }) => (
              <div data-reveal key={label} className="flex gap-4">
                <I size={20} className="mt-1 shrink-0 text-primary" aria-hidden />
                <div><dt className="text-sm font-medium">{label}</dt><dd>{value ?? <Pending>{pending!}</Pending>}</dd></div>
              </div>
            ))}
          </dl>
          <div data-reveal className="mt-10 rounded-2xl border border-dashed border-input bg-ivory p-6">
            <p className="flex items-center gap-2 font-medium"><Navigation size={18} aria-hidden className="text-primary" />Directions</p>
            <iframe
              title="Directions to Tulips Montessori Preschool"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d827.1401846478026!2d18.543110328495022!3d-33.97812809831702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc45e8fabc46e1%3A0xf0d26b5c18e7868d!2sTulips%20Montessori%20Preschool!5e0!3m2!1sen!2sza!4v1792160160314!5m2!1sen!2sza"
              width="600"
              height="450"
              className="mt-4 aspect-[4/3] h-auto w-full rounded-xl border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}

export function Footer() {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const d = ref.current; return () => { if (d?.open) d.close(); }; }, []);
  return (
    <footer className="bg-foreground text-ivory">
      <div className="container-site grid gap-10 py-16 md:grid-cols-3">
        <div data-reveal>
          <div className="inline-block rounded-2xl bg-ivory p-3 text-foreground"><Logo size={67} /></div>
          <p className="mt-4 font-serif text-xl italic">{school.tagline}.</p>
          <p className="mt-2 text-sm opacity-80">A Montessori preschool with an Islamic ethos for children aged 3–6.</p>
        </div>
        <nav data-reveal aria-label="Footer">
          <p className="text-xs uppercase tracking-[0.2em] opacity-70">Explore</p>
          <ul className="mt-4 space-y-2">{nav.map((n) => <li key={n.href}><a href={n.href} className="opacity-90 hover:opacity-100 hover:underline">{n.label}</a></li>)}</ul>
        </nav>
        <div data-reveal>
          <p className="text-xs uppercase tracking-[0.2em] opacity-70">Contact</p>
          <dl className="mt-4 space-y-4 text-sm">
            <div className="flex gap-3">
              <MapPin size={18} className="mt-1 shrink-0 opacity-80" aria-hidden />
              <div><dt className="opacity-70">Location</dt><dd className="mt-1">{school.contact.address}</dd></div>
            </div>
            <div className="flex gap-3">
              <Phone size={18} className="mt-1 shrink-0 opacity-80" aria-hidden />
              <div><dt className="opacity-70">Phone</dt><dd className="mt-1"><a href={`tel:${school.contact.phone}`} className="hover:underline underline-offset-4">{school.contact.phone}</a></dd></div>
            </div>
            <div className="flex gap-3">
              <Mail size={18} className="mt-1 shrink-0 opacity-80" aria-hidden />
              <div className="min-w-0"><dt className="opacity-70">Email</dt><dd className="mt-1 break-words"><a href={`mailto:${school.contact.email}`} className="hover:underline underline-offset-4">{school.contact.email}</a></dd></div>
            </div>
            <div className="flex gap-3">
              <Clock size={18} className="mt-1 shrink-0 opacity-80" aria-hidden />
              <div><dt className="opacity-70">School hours</dt><dd className="mt-1">{school.contact.hours}</dd></div>
            </div>
          </dl>
          <button type="button" onClick={() => ref.current?.showModal()} className="mt-6 text-sm underline underline-offset-4">Privacy information</button>
        </div>
      </div>
      <div className="border-t border-ivory/15"><p data-reveal className="container-site py-5 text-xs opacity-70">© {new Date().getFullYear()} {school.name} · {school.notice}</p></div>
      <dialog ref={ref} aria-labelledby="priv-h" className="m-auto max-w-lg rounded-2xl bg-card p-8 text-foreground backdrop:bg-foreground/50">
        <h2 id="priv-h" className="text-3xl">Privacy (draft)</h2>
        <p className="mt-4 text-muted-foreground">This is a design concept. The enquiry form is simulated: nothing you type is sent, saved, stored in your browser or tracked. The school's own privacy notice will replace this text on the live site.</p>
        <form method="dialog"><button className="btn-primary mt-6">Close</button></form>
      </dialog>
    </footer>
  );
}
