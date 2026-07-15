import { PageHero } from "@/components/site/page-hero";
import newsCricket1 from "@/assets/news-cricket-1.png";
import newsCricket2 from "@/assets/news-cricket-2.png";

const EVENTS = [
  {
    id: 1,
    type: "Seminar",
    title: "National B-School Selection Seminar 2026",
    date: "July 25, 2026",
    time: "4:00 PM - 7:00 PM",
    venue: "Dharampeth Centre, Nagpur",
    desc: "A comprehensive guide on shortlisting colleges, CAT cutoffs, and preparing for WAT/GD/PI rounds led by our lead director."
  },
  {
    id: 2,
    type: "Workshop",
    title: "MBA CET Speed Building Mock Bootcamp",
    date: "August 02, 2026",
    time: "10:00 AM - 2:00 PM",
    venue: "Online via Zoom & Centre offline",
    desc: "Interactive strategy session mapping out 150 shortcut tricks for QA, DI, and Logical Reasoning questions."
  },
  {
    id: 3,
    type: "News",
    title: "KAT Expert Nagpur Students Shine in MCA CET Results",
    date: "Published June 14, 2026",
    time: "Nagpur Times",
    venue: "Press Release",
    desc: "Over 20 students score above 99.5 percentile in the Maharashtra MCA CET exam, securing seats in VJTI, SPIT, and COEP."
  },
  {
    id: 4,
    type: "Workshop",
    title: "CLAT Legal Reasoning Mastery workshop",
    date: "August 18, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Dharampeth Centre, Nagpur",
    desc: "Analyze core legal concepts, constitution principles, and speed analysis of comprehension passages."
  },
  {
    id: 5,
    type: "News",
    title: "Sigmas Clinch KATexpert Box Cricket League Trophy",
    date: "Published July 12, 2026",
    time: "9:00 AM - 5:00 PM",
    venue: "Wings Turf, Bishop School, Civil Lines",
    desc: "Four teams competed fiercely in the annual KATexpert Box Cricket League. In a thrilling final, the 'Sigmas' captained by Hiten Khatod defeated the 'Vibers' by 8 runs, scoring 63 runs in 8 overs and defending it by restricting the opponents to 55 runs. Individual accolades went to Aniket Matte & Shravani Raut (Best Bowlers) and Vishal Sakharwade & Sanjana Manekar (Best Batsmen). The event was graced by directors Dr. Arumita Pawa, Krish Vyas, along with Manoj Pawa and Amit Gandhare.",
    images: [newsCricket1, newsCricket2]
  }
];

export default function NewsEventsPage() {
  return (
    <main className="bg-slate-50/50 min-h-screen pb-20 font-sans text-slate-800 animate-fade-in">
      <PageHero title="News & Events" subtitle="Workshops, Bootcamps, and Press Releases" breadcrumb={["Gallery", "News & Events"]} />

      <div className="container-x max-w-4xl mx-auto mt-12 px-4">
        <div className="flex flex-col gap-8">
          {EVENTS.map((event) => (
            <div key={event.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition-shadow relative flex flex-col md:flex-row gap-6">
              
              {/* Type Badge */}
              <div className="md:w-36 shrink-0 flex flex-col items-start gap-1">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  event.type === "News"
                    ? "bg-blue-100 text-blue-600"
                    : event.type === "Workshop"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-emerald-100 text-emerald-600"
                }`}>
                  {event.type}
                </span>
                <span className="mt-2 text-xs text-muted-foreground font-semibold">{event.date}</span>
                <span className="text-[11px] text-muted-foreground">{event.time}</span>
              </div>
              
              {/* Event Content */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-display text-base font-bold text-navy leading-normal">{event.title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{event.desc}</p>
                {event.images && event.images.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {event.images.map((img, index) => (
                      <a 
                        key={index}
                        href={img}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block h-24 w-32 overflow-hidden rounded-xl border border-slate-200 shadow-sm hover:scale-105 transition-transform"
                      >
                        <img 
                          src={img} 
                          alt={`Press coverage ${index + 1}`} 
                          className="h-full w-full object-cover" 
                        />
                      </a>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#ea580c] font-semibold">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.venue}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
