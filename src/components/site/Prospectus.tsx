import { CircleDot, Clock, Footprints, Hand, Monitor, PersonStanding, Waves } from "lucide-react";
import kidsImg from "@/assets/Kids-1.jpg";
import classroomImg from "@/assets/hero-classroom.jpg";
import { school } from "@/data/school";

const activities = [
  { name: "Ballet", icon: Footprints },
  { name: "Swimming", icon: Waves },
  { name: "Monkeynastix", icon: PersonStanding },
  { name: "Soccerstars", icon: CircleDot },
  { name: "Computers", icon: Monitor },
  { name: "Pottery", icon: Hand },
];

export function Prospectus() {
  return (
    <section id="prospectus" className="section-pad bg-card" aria-labelledby="prospectus-h">
      <div className="container-site">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Prospectus</p>
          <h2 id="prospectus-h" className="mt-3 text-[2rem] md:text-[2.75rem]">
            Our prospectus.
          </h2>
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <img
            data-reveal
            src={kidsImg}
            width={1200}
            height={1600}
            alt="Children playing together in an outdoor sandpit"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover"
          />
          <div data-reveal>
            <p className="eyebrow">What we offer</p>
            <h3 className="mt-3 text-3xl md:text-4xl">Room to grow, at their own pace.</h3>
            <p className="mt-5 text-muted-foreground">
              We cater for children between the ages of 3 – 6 years old and we may accept children 
              from 2 and half years if they are emotionally ready and independent to fit into the environment.
            </p>
          </div>
        </div>

        <div className="mt-12 grid items-center gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="order-2 lg:order-1">
            <p className="eyebrow">Our classroom setting</p>
            <h3 className="mt-3 text-3xl md:text-4xl">Learning alongside one another.</h3>
            <p className="mt-5 text-muted-foreground">
              At Tulips Montessori we have one big classroom with mixed age groups of 3-6 year 
              olds as Maria Montessori believes in vertical age group setting where learners 
              can learn together because each child follows an individualized path of learning.
            </p>
          </div>
          <img
            data-reveal
            src={classroomImg}
            width={1024}
            height={768}
            alt="The Tulips Montessori classroom with child-sized tables, chairs and shelves of learning materials"
            loading="lazy"
            className="order-1 aspect-[4/3] w-full rounded-[2rem] object-cover lg:order-2"
          />
        </div>

        <div className="mt-16 rounded-[2rem] bg-ivory p-6 md:p-10">
          <h3 data-reveal className="text-center text-3xl md:text-4xl">Extra murals</h3>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map(({ name, icon: Icon }) => (
              <li
                data-reveal
                key={name}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-beige text-primary">
                  <Icon size={20} aria-hidden />
                </span>
                <span className="font-medium">{name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid gap-8 rounded-[2rem] bg-beige p-8 md:p-10 lg:grid-cols-2 lg:items-center">
          <div data-reveal>
            <p className="eyebrow">Our monthly fees</p>
            <p className="mt-3 font-serif text-5xl text-foreground">
              R1 900 <span className="text-2xl">× 12 months</span>
            </p>
          </div>
          <div data-reveal className="flex items-center gap-4 lg:justify-end">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card text-primary">
              <Clock size={22} aria-hidden />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">School hours</p>
              <p className="mt-1 text-xl font-medium">{school.contact.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
