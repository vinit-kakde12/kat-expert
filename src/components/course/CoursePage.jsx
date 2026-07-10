import { useEffect, useRef, useState } from "react";
import { galleryPool, testimonials } from "@/data/courses";

/* ------------------------------------------------------------------ */
/* Small local helpers                                                 */
/* ------------------------------------------------------------------ */

function useCounter(target, active, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(target * (0.2 + 0.8 * p * (2 - p))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return n;
}

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function extractNumber(value) {
  const m = value.match(/(\d+(?:\.\d+)?)/);
  return m ? Math.round(parseFloat(m[1])) : 0;
}

function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  invert = false,
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${
            invert ? "bg-white/10 text-[#ea580c]" : "bg-[#ea580c]/10 text-[#ea580c]"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#ea580c]" /> {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-balance ${
          invert ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 text-base sm:text-lg text-pretty ${invert ? "text-white/75" : "text-muted-foreground"}`}>{sub}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                             */
/* ------------------------------------------------------------------ */

function Hero({ c }) {
  return (
    <section className="relative bg-hero-radial pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden">
      <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
        <div className="text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#ea580c]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ea580c]" /> {c.code} Program
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold text-balance leading-[1.05]">
            {c.name}
          </h1>
          <p className="mt-5 text-lg text-white/80 text-pretty max-w-xl">{c.tagline}</p>

          <ul className="mt-8 grid gap-2 sm:grid-cols-2 max-w-xl">
            {c.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-white/90 text-sm">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#ea580c]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
                </svg>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#enquire" className="btn-primary">Enquire Now</a>
            {c.brochureUrl && (
              <a href={c.brochureUrl} target="_blank" rel="noreferrer" className="btn-outline-light">Download Brochure</a>
            )}
            <a href="tel:+919552388015" className="btn-outline-light">Call Now</a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#ea580c]/40 via-[#ea580c]/10 to-transparent blur-2xl" aria-hidden />
          <div className="relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-3 shadow-soft">
            <img
              src={c.heroImage}
              alt={`${c.code} — ${c.name}`}
              className="w-full aspect-[4/3] rounded-2xl object-cover"
              loading="eager"
            />
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white text-navy shadow-soft px-5 py-4 hidden sm:block">
              <p className="text-xs uppercase tracking-widest text-[#ea580c] font-semibold">Since 2015</p>
              <p className="font-display font-bold text-lg leading-tight">Trusted by 5,000+<br/>students</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickOverview({ c }) {
  return (
    <section className="section-y bg-cream-mesh">
      <div className="container-x">
        <SectionHeading eyebrow="Quick Overview" title="Everything you need to know at a glance" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.overview.map((o, i) => (
            <div
              key={o.label}
              className="card-premium p-6 reveal"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#ea580c]">{o.label}</p>
              <p className="mt-2 text-xl font-display font-bold text-navy">{o.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ c }) {
  return (
    <section className="section-y">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr] items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHeading eyebrow="About the Course" title={`Why ${c.code} at KATexpert?`} />
        </div>
        <div className="prose max-w-none text-lg text-navy-soft leading-relaxed">
          <p>{c.description}</p>
        </div>
      </div>
    </section>
  );
}

function WhyChoose({ c }) {
  return (
    <section className="section-y bg-navy text-white relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#ea580c]/20 blur-3xl" aria-hidden />
      <div className="container-x relative">
        <SectionHeading eyebrow="Why Choose This Course" title={`The KATexpert ${c.code} Advantage`} invert
          sub={`Only the features and strengths that apply to the ${c.code} program.`} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.whyChoose.map((f, i) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm hover:border-[#ea580c]/60 hover:-translate-y-1 transition-all duration-300 reveal"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#ea580c] to-[#ea580c] text-white font-bold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
              {f.description && <p className="mt-2 text-sm text-white/70">{f.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey({ c }) {
  return (
    <section className="section-y bg-cream-mesh">
      <div className="container-x">
        <SectionHeading eyebrow="Course Journey" title="Your learning path, step by step"
          sub="A structured pathway from first concept to final selection." />
        <div className="mt-14 relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ea580c] via-[#ea580c]/40 to-transparent -translate-x-1/2" aria-hidden />
          <ol className="grid gap-6 md:gap-10">
            {c.journey.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={s.title}
                  className={`relative md:grid md:grid-cols-2 md:gap-10 items-center reveal`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className={`md:${left ? "pr-12 md:text-right" : "col-start-2 md:pl-12"} ${left ? "md:text-right" : ""}`}>
                    <div className={`card-premium p-6 ${left ? "md:ml-auto md:max-w-md" : "md:mr-auto md:max-w-md"}`}>
                      <span className="text-xs font-bold tracking-widest uppercase text-[#ea580c]">Step {String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-1 font-display text-xl font-bold text-navy">{s.title}</h3>
                      {s.description && <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>}
                    </div>
                  </div>
                  <span className="hidden md:grid absolute left-1/2 -translate-x-1/2 h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#ea580c] to-[#ea580c] text-white font-bold shadow-soft">
                    {i + 1}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Curriculum({ c }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading eyebrow="Detailed Curriculum" title="Modules built for real exam performance"
          sub="Expand each module to see everything covered inside the classroom." />
        <div className="mt-10 grid gap-3 max-w-4xl mx-auto">
          {c.curriculum.map((m, i) => {
            const isOpen = open === i;
            return (
              <div
                key={m.title}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? "border-[#ea580c]/50 shadow-soft bg-white" : "border-border bg-white hover:border-[#ea580c]/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#ea580c]/10 text-[#ea580c] font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-bold text-navy">{m.title}</span>
                    <span className="block text-xs text-muted-foreground">{m.items.length} topics</span>
                  </span>
                  <svg className={`h-5 w-5 shrink-0 text-navy transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                  </svg>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <ul className="px-5 sm:px-6 pb-6 pt-1 grid gap-2 sm:grid-cols-2">
                      {m.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-sm text-navy-soft">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ea580c]" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Resources({ c }) {
  const icons = ["📚","📝","🎯","📊","💡","🎓","🧠","⚡","🏆","📖","🎥","✅"];
  return (
    <section className="section-y bg-cream-mesh">
      <div className="container-x">
        <SectionHeading eyebrow="Learning Resources" title="Everything included in your program"
          sub={`Only what's actually available in the ${c.code} program is shown below.`} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.resources.map((r, i) => (
            <div key={r.title} className="card-premium p-6 flex items-start gap-4 reveal" style={{ animationDelay: `${i * 50}ms` }}>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy text-white text-xl">
                {icons[i % icons.length]}
              </span>
              <div className="min-w-0">
                <h3 className="font-display font-bold text-navy">{r.title}</h3>
                {r.description && <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExtraSections({ c }) {
  if (!c.extraSections?.length) return null;
  return (
    <section className="section-y">
      <div className="container-x grid gap-10">
        {c.extraSections.map((s, i) => (
          <div key={s.heading} className={`grid gap-8 lg:grid-cols-[1fr_1.6fr] items-start ${i % 2 ? "lg:flex-row-reverse" : ""}`}>
            <SectionHeading eyebrow={`Detail ${String(i + 1).padStart(2, "0")}`} title={s.heading} />
            <div className="grid gap-3">
              {s.body.map((line) => (
                <div key={line} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 hover:border-[#ea580c]/40 transition-colors">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ea580c]" />
                  <p className="text-navy-soft">{line}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Results({ c }) {
  const { ref, inView } = useInView();
  if (!c.results?.length) return null;
  return (
    <section className="section-y bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" aria-hidden style={{
        background: "radial-gradient(600px 300px at 20% 20%, color-mix(in oklab, var(--accent) 40%, transparent), transparent 60%)",
      }} />
      <div className="container-x relative">
        <SectionHeading eyebrow="Student Results" title="Numbers that speak for themselves" invert />
        <div ref={ref} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.results.map((r, i) => {
            const target = extractNumber(r.value);
            const n = useCounter(target, inView);
            return (
              <div key={r.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm reveal" style={{ animationDelay: `${i * 80}ms` }}>
                <p className="text-3xl sm:text-4xl font-display font-bold text-[#ea580c]">
                  {r.value.includes("₹") ? r.value : n > 0 ? r.value.replace(/\d+/, String(n)) : r.value}
                </p>
                <p className="mt-2 text-sm text-white/80">{r.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const perView = 1;
  const max = testimonials.length - perView;
  const go = (dir) => setIdx((v) => Math.max(0, Math.min(max, v + dir)));

  return (
    <section className="section-y bg-cream-mesh">
      <div className="container-x">
        <SectionHeading eyebrow="Student Voices" title="What our students say" align="center" />
        <div className="mt-10 relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${idx * 100}%)` }}>
              {testimonials.map((t) => (
                <div key={t.name} className="w-full shrink-0 px-1">
                  <figure className="card-premium p-8 sm:p-10 text-center">
                    <div className="flex justify-center">
                      <img src={t.image} alt={t.name} className="h-20 w-20 rounded-full object-cover ring-4 ring-[#ea580c]/10" loading="lazy" />
                    </div>
                    <div className="mt-4 flex justify-center gap-0.5 text-[#ea580c]">
                      {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                    </div>
                    <blockquote className="mt-5 text-lg text-navy-soft leading-relaxed">"{t.quote}"</blockquote>
                    <figcaption className="mt-5 font-display font-bold text-navy">{t.name}</figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button type="button" onClick={() => go(-1)} disabled={idx === 0} className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-navy hover:border-[#ea580c] disabled:opacity-40" aria-label="Previous testimonial">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.79 4.79a.75.75 0 010 1.06L8.62 10l4.17 4.15a.75.75 0 11-1.06 1.06l-4.7-4.68a.75.75 0 010-1.06l4.7-4.68a.75.75 0 011.06 0z" clipRule="evenodd"/></svg>
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-[#ea580c]" : "w-2 bg-navy/20 hover:bg-navy/40"}`} aria-label={`Go to slide ${i + 1}`} />
              ))}
            </div>
            <button type="button" onClick={() => go(1)} disabled={idx >= max} className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-navy hover:border-[#ea580c] disabled:opacity-40" aria-label="Next testimonial">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.21 4.79a.75.75 0 011.06 0l4.7 4.68a.75.75 0 010 1.06l-4.7 4.68a.75.75 0 11-1.06-1.06L11.38 10 7.21 5.85a.75.75 0 010-1.06z" clipRule="evenodd"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = galleryPool;
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading eyebrow="Life at KATexpert" title="Moments from our classrooms and events" />
        <div className="mt-10 grid gap-3 grid-cols-2 md:grid-cols-4">
          {imgs.map((src, i) => (
            <div key={src} className={`group relative overflow-hidden rounded-2xl bg-muted ${i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}>
              <img src={src} alt="KATexpert classroom" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQs({ c }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section-y bg-cream-mesh" id="faqs">
      <div className="container-x">
        <SectionHeading eyebrow="FAQs" title="Frequently asked questions" align="center" />
        <div className="mt-10 max-w-3xl mx-auto grid gap-3">
          {c.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`rounded-2xl border bg-white transition-all ${isOpen ? "border-[#ea580c]/50 shadow-soft" : "border-border hover:border-[#ea580c]/40"}`}>
                <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center gap-4 px-5 sm:px-6 py-4 text-left" aria-expanded={isOpen}>
                  <span className="min-w-0 flex-1 font-display font-semibold text-navy">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all ${isOpen ? "bg-[#ea580c] text-white rotate-45" : "bg-[#ea580c]/10 text-[#ea580c]"}`}>
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor"><path d="M5.25 1.5v3H2.25v3H5.25v3h1.5v-3H9.75v-3H6.75v-3z"/></svg>
                  </span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-navy-soft leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTA({ c }) {
  return (
    <section id="enquire" className="section-y" >
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-hero-radial p-8 sm:p-14 text-white shadow-soft">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#ea580c]/30 blur-3xl" aria-hidden />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#ea580c]">
                Start today
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-balance">{c.cta.heading}</h2>
              {c.cta.sub && <p className="mt-4 text-white/80 text-lg text-pretty">{c.cta.sub}</p>}
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="tel:+919552388015" className="btn-primary">Call Now</a>
                <a href="https://api.whatsapp.com/send/?phone=919552388015" target="_blank" rel="noreferrer" className="btn-outline-light">WhatsApp</a>
                {c.brochureUrl && <a href={c.brochureUrl} target="_blank" rel="noreferrer" className="btn-outline-light">Download Brochure</a>}
              </div>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Thank you — our team will get in touch."); }}
              className="rounded-2xl bg-white text-navy p-6 shadow-soft"
            >
              <h3 className="font-display text-lg font-bold">Enquire about {c.code}</h3>
              <div className="mt-4 grid gap-3">
                <input required placeholder="Full Name" className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-[#ea580c]" />
                <input required placeholder="Phone" className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-[#ea580c]" />
                <input type="email" required placeholder="Email" className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-[#ea580c]" />
                <input placeholder="City" className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-[#ea580c]" />
                <button type="submit" className="btn-primary mt-2 w-full">Submit Enquiry</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyMobileCTA({ c }) {
  return (
    <div className="fixed bottom-3 inset-x-3 z-40 sm:hidden">
      <div className="rounded-2xl bg-navy text-white shadow-soft flex items-center gap-2 p-2">
        <a href="tel:+919552388015" className="flex-1 grid place-items-center rounded-xl bg-[#ea580c] text-white font-semibold py-3 text-sm">Call {c.code}</a>
        <a href="https://api.whatsapp.com/send/?phone=919552388015" target="_blank" rel="noreferrer" className="flex-1 grid place-items-center rounded-xl bg-white/10 text-white font-semibold py-3 text-sm">WhatsApp</a>
        <a href="#enquire" className="flex-1 grid place-items-center rounded-xl bg-white text-navy font-semibold py-3 text-sm">Enquire</a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function CoursePage({ course }) {
  return (
    <main className="bg-background">
      <Hero c={course} />
      <QuickOverview c={course} />
      <About c={course} />
      <WhyChoose c={course} />
      <Journey c={course} />
      <Curriculum c={course} />
      <Resources c={course} />
      <ExtraSections c={course} />
      <Results c={course} />
      <TestimonialsSection />
      <Gallery />
      <FAQs c={course} />
      <CTA c={course} />
      <StickyMobileCTA c={course} />
    </main>
  );
}
