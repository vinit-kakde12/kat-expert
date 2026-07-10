import { useState } from 'react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Clock, 
  MapPin, 
  Check, 
  ArrowRight,
  BookOpen,
  Scale,
  GraduationCap,
  Trophy,
  Terminal,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { courses } from "@/data/courses";
import { Reveal, SectionHeading } from "./section";

const getCourseIcon = (slug) => {
  switch (slug) {
    case 'cat':
      return BookOpen;
    case 'clat':
      return Scale;
    case 'ipmat':
      return GraduationCap;
    case 'mba-cet':
      return Trophy;
    case 'mca-cet':
      return Terminal;
    case 'crt':
      return Briefcase;
    case 'cuet':
      return BookOpen;
    case 'set':
      return Sparkles;
    default:
      return BookOpen;
  }
};

export function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'MBA', 'Law', 'UG', 'PG', 'Skills'];

  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter((c) => {
          if (c.slug === "cat" || c.slug === "mba-cet") return selectedCategory === "MBA";
          if (c.slug === "clat") return selectedCategory === "Law";
          if (c.slug === "ipmat" || c.slug === "cuet" || c.slug === "set") return selectedCategory === "UG";
          if (c.slug === "mca-cet") return selectedCategory === "PG";
          if (c.slug === "crt") return selectedCategory === "Skills";
          return false;
        });

  return (
    <section id="courses" className="section-y bg-cream-mesh overflow-hidden">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Our Programs"
            title={
              <>
                Courses built to deliver <span className="text-gradient-accent">results</span>
              </>
            }
            sub="Choose your exam track. Every program runs in offline mode with classes, mocks and personal mentorship."
            align="center"
          />
        </Reveal>

        {/* Categories Tab Bar */}
        <Reveal>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-navy text-white shadow-md scale-105'
                      : 'bg-white hover:bg-slate-100 text-navy hover:scale-102 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Courses Cards Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, i) => {
              const IconComponent = getCourseIcon(course.slug);
              const isFeatured = course.slug === "cat" || course.slug === "mba-cet";
              
              // Extract duration & mode dynamically
              const durationObj = course.overview?.find(o => o.label === "Duration");
              const duration = durationObj ? durationObj.value : "4 Months";
              const mode = "Offline";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                  key={course.slug}
                  className="h-full"
                >
                  <Link
                    to={`/courses/${course.slug}`}
                    className="group card-premium p-6 flex flex-col h-full relative overflow-hidden bg-white border border-slate-150 hover:border-orange/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-3xl"
                  >
                    {/* Featured Badge */}
                    {isFeatured && (
                      <div className="absolute top-5 right-5 bg-[#ea580c] text-white text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 uppercase tracking-wider">
                        <Star className="w-2.5 h-2.5 fill-white text-white" />
                        <span>Featured</span>
                      </div>
                    )}

                    {/* Icon Header */}
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center shrink-0 transition-colors group-hover:bg-navy group-hover:text-white">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-4 font-display text-xl font-extrabold text-navy group-hover:text-orange transition-colors">
                      {course.code}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500 font-medium min-h-[50px]">
                      {course.tagline}
                    </p>

                    {/* Meta Row: Duration & Mode */}
                    <div className="mt-4 flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50 rounded-xl p-2.5 border border-slate-100">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-orange" />
                        {duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-orange" />
                        {mode}
                      </span>
                    </div>

                    {/* Highlights List */}
                    <ul className="mt-5 space-y-2 flex-1">
                      {course.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <Check className="h-4 w-4 shrink-0 text-orange bg-orange/10 rounded-full p-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Enquire Now Button */}
                    <div className="mt-6 w-full text-center rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 shadow-sm transition-all duration-300 group-hover:border-[#ea580c] group-hover:text-[#ea580c] cursor-pointer flex items-center justify-center gap-1.5">
                      <span>Enquire Now</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}