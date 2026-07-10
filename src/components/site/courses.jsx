import { Link } from "react-router-dom";
import { courses } from "@/data/courses";
import { Reveal, SectionHeading } from "./section";

export function Courses() {
  return (
    <section id="courses" className="section-y bg-cream-mesh">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Our Courses"
            title="Choose your competitive exam program"
            sub="Every course has a dedicated premium detail page with its full curriculum, resources and FAQs."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <Link
              key={c.slug}
              to={`/courses/${c.slug}`}
              className="group card-premium p-6 flex flex-col reveal"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3">
                <img src={c.logo} alt="" className="h-14 w-14 rounded-xl object-contain bg-[#ea580c]/10 p-2" />
                <div>
                  <h3 className="font-display text-xl font-bold text-navy">{c.code}</h3>
                  <p className="text-xs text-muted-foreground">{c.name}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-navy-soft flex-1">{c.tagline}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#ea580c] group-hover:gap-2 transition-all">
                Explore program
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.21 4.79a.75.75 0 011.06 0l4.7 4.68a.75.75 0 010 1.06l-4.7 4.68a.75.75 0 11-1.06-1.06L11.38 10 7.21 5.85a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}