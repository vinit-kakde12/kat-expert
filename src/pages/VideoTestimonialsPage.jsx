import { useState, useMemo } from "react";
import { PageHero } from "@/components/site/page-hero";

const TESTIMONIALS = [
  {
    id: "abeer",
    youtubeId: "I1Z6BsYjHXk",
    name: "Abeer Bhaiya",
    exam: "CAT",
    college: "IIM Ahmedabad",
    score: "99.8%ile",
    quote: "KATexpert gave me the structure I needed to convert my CAT dream into reality.",
    title: "Hear It From Our Achievers"
  },
  {
    id: "khushi",
    youtubeId: "RUch3M7DeR0",
    name: "Khushi Khandelwal",
    exam: "IPMAT",
    college: "IIM Indore",
    score: "AIR 12",
    quote: "The mentorship here is unmatched — every doubt cleared, every step guided.",
    title: "Why Students Trust KATexpert"
  },
  {
    id: "arpit",
    youtubeId: "QxO2NxT7BxA",
    name: "Arpit",
    exam: "MBA CET",
    college: "JBIMS Mumbai",
    score: "99.94%ile",
    quote: "From average scores to a top JBIMS seat — the KATexpert grind changed everything.",
    title: "Arpit's CET Success Story"
  },
  {
    id: "tanishq",
    youtubeId: "7WWzJHTznMs",
    name: "Tanishq Chhajer",
    exam: "CAT",
    college: "IIM Bangalore",
    score: "99.6%ile",
    quote: "The faculty knows exactly where students struggle and how to fix it fast.",
    title: "Get the Guidance You Deserve"
  },
  {
    id: "atharv",
    youtubeId: "D2MOUroto0k",
    name: "Atharv",
    exam: "MBA CET",
    college: "SIMSREE Mumbai",
    score: "99.87%ile",
    quote: "Consistent mocks and honest feedback — that's the KATexpert formula.",
    title: "Atharv's CET Success Story"
  },
  {
    id: "why-love",
    youtubeId: "yYUONg1f-Sw",
    name: "Priya S.",
    exam: "CAT",
    college: "IIM Lucknow",
    score: "99.5%ile",
    quote: "It stopped feeling like coaching and started feeling like a second home.",
    title: "Why Students Love KATexpert"
  },
  {
    id: "rupali",
    youtubeId: "e_e0P-FHeJ8",
    name: "Rupali",
    exam: "MCA CET",
    college: "VJTI Mumbai",
    score: "99.72%ile",
    quote: "Personal attention that big institutes just can't offer.",
    title: "Rupali's Success Story"
  },
  {
    id: "comfort",
    youtubeId: "5QxsWC1Jkz4",
    name: "Aditya M.",
    exam: "IPMAT",
    college: "IIM Rohtak",
    score: "AIR 47",
    quote: "The environment lets you ask the silliest question without hesitation.",
    title: "Why Students Feel Comfortable Here"
  },
  {
    id: "guidance",
    youtubeId: "Ns_tSPuYHAA",
    name: "Sneha K.",
    exam: "CRT",
    college: "TCS Digital",
    score: "Placed",
    quote: "Cracked my first campus interview thanks to KATexpert's CRT program.",
    title: "Success Starts with the Right Guidance"
  },
  {
    id: "kasak",
    youtubeId: "5-BL0hHz0IQ",
    name: "Kasak",
    exam: "CAT",
    college: "IIM Kozhikode",
    score: "99.3%ile",
    quote: "Went from fearing quant to topping quant sectionals — literally.",
    title: "Kasak's Math Transformation Story"
  },
  {
    id: "yashi",
    youtubeId: "rjA_MCLB2UM",
    name: "Yashi",
    exam: "CAT",
    college: "IIM Calcutta",
    score: "99.91%ile",
    quote: "Strategy sessions with mentors saved months of misdirected effort.",
    title: "Yashi's CAT Preparation Strategy"
  },
  {
    id: "krish",
    youtubeId: "F1B35HJKOpM",
    name: "Krish Sir's Batch",
    exam: "CAT",
    college: "Multiple IIMs",
    score: "99+%ile",
    quote: "Krish Sir breaks down CAT into a plan you can execute.",
    title: "CAT 2025 Exam Pattern & Strategy"
  },
  {
    id: "arumita",
    youtubeId: "4F12hXxDKr4",
    name: "Arumita Ma'am's Batch",
    exam: "IPMAT",
    college: "IIM Indore & Rohtak",
    score: "Top Ranks",
    quote: "Every IPMAT trick condensed into actionable classroom insights.",
    title: "IPMAT Tips You Can't Miss"
  },
  {
    id: "varc",
    youtubeId: "Q-87AntscUw",
    name: "Featured Masterclass",
    exam: "CAT",
    college: "All Programs",
    score: "Featured",
    quote: "A masterclass on VARC strategy and attempt planning that changes how you approach the section.",
    title: "VARC Strategy 2025 — Attempt & Exam Pattern"
  }
];

const CATEGORIES = ["All", "CAT", "IPMAT", "MBA CET", "MCA CET", "CRT"];

export default function VideoTestimonialsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredTestimonials = useMemo(() => {
    return TESTIMONIALS.filter((t) => {
      const matchesCategory = filter === "All" || t.exam === filter;
      const cleanSearch = search.trim().toLowerCase();
      const matchesSearch =
        !cleanSearch ||
        t.name.toLowerCase().includes(cleanSearch) ||
        t.college.toLowerCase().includes(cleanSearch) ||
        t.exam.toLowerCase().includes(cleanSearch) ||
        t.score.toLowerCase().includes(cleanSearch) ||
        t.title.toLowerCase().includes(cleanSearch);
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  return (
    <main className="bg-slate-50/50 min-h-screen pb-20 font-sans text-slate-800 animate-fade-in">
      <PageHero title="Video Testimonials" subtitle="Success Stories in Their Own Words" breadcrumb={["Gallery", "Video Testimonials"]} />

      <div className="container-x max-w-6xl mx-auto mt-12 px-4">
        {/* Search & Filter Header */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#ea580c] text-white shadow-md scale-105"
                      : "bg-slate-100 hover:bg-slate-200 text-navy"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="flex items-center w-full md:w-72 bg-white border border-border px-4 py-2.5 rounded-full shadow-soft">
            <svg className="h-4 w-4 text-slate-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, college, score..."
              className="bg-transparent text-xs w-full outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Video Grid */}
        {filteredTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((video) => (
              <div key={video.id} className="group rounded-2xl border border-border bg-card p-2 shadow-soft overflow-hidden flex flex-col h-full">
                {/* Responsive Video Container */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-[#ea580c]/10 text-[#ea580c] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                      {video.exam}
                    </span>
                    <h3 className="font-display text-sm font-bold text-navy leading-snug">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground italic leading-relaxed">
                      &ldquo;{video.quote}&rdquo;
                    </p>
                  </div>
                  <div className="mt-4 border-t border-border/60 pt-3 flex flex-col">
                    <span className="text-xs font-bold text-navy">{video.name}</span>
                    <span className="text-[10px] text-accent font-semibold">{video.score} · {video.college}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No testimonials match your filters. Try clearing search or selecting another category.
          </div>
        )}
      </div>
    </main>
  );
}
