import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock, Monitor, Check, Star } from "lucide-react";
import { COURSES } from "@/lib/site-data";
import { Reveal, SectionHeading } from "./section";
import { Button } from "@/components/ui/button";

const FILTERS = ["All", "MBA", "Law", "UG","PG", "Skills"];

export function Courses() {
  const [filter, setFilter] = useState("All");

 
  const uniqueCourses = Array.from(new Map(COURSES.map(item => [item.title, item])).values());


  const list = uniqueCourses.filter(
    (c) => filter === "All" || c.category === filter
  );

  return (
    <section id="courses" className="bg-background py-16 sm:py-20">
      
      <div className="container-x max-w-6xl mx-auto">
        
        
        <Reveal>
          <SectionHeading
            eyebrow="Our Programs"
            title={
              <>
                Courses built to deliver{" "}
                <span className="text-gradient-accent">results</span>
              </>
            }
            subtitle="Choose your exam track. Every program runs in offline mode with classes, mocks and personal mentorship."
          />
        </Reveal>

       
        <div className="mt-6 flex flex-wrap justify-center gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                filter === f
                  ? "bg-navy text-navy-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

       
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <motion.article
              key={c.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              
              className="group relative flex flex-col rounded-xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
             
              {c.featured && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-accent to-[oklch(0.62_0.18_38)] px-2 py-0.5 text-[9px] font-bold uppercase text-accent-foreground">
                  <Star className="h-2.5 w-2.5" />
                  Featured
                </span>
              )}

              
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy/5 text-navy transition-colors group-hover:bg-navy group-hover:text-navy-foreground">
                <c.icon className="h-5 w-5" />
              </span>

             
              <h3 className="mt-3 font-display text-lg font-bold text-navy">
                {c.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {c.description}
              </p>

              
              <div className="mt-3 flex flex-wrap gap-2.5 text-[11px] font-medium text-foreground/70">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3 text-accent" />
                  {c.duration}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Monitor className="h-3 w-3 text-accent" />
                  {c.mode}
                </span>
              </div>

             
              <ul className="mt-3.5 space-y-1.5 flex-1">
                {c.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-foreground/80">
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              
              <Button
                asChild
                variant="outline"
                className="mt-5 h-9 text-xs w-full group-hover:border-accent group-hover:text-accent"
              >
                <a href="#contact">
                  Enquire Now <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </Button>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}