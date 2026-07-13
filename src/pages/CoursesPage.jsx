import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
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
import { PageHero } from "@/components/site/page-hero";

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

export default function CoursesPage() {
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
    <main className="bg-slate-50/50 min-h-screen pb-20 font-sans text-slate-800" id="courses-view-root">
      <PageHero title="Our Entrance Programs" breadcrumb={["Courses"]} />
      
      <div className="container-x max-w-6xl mx-auto mt-12 px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8" id="courses-header-section">
          <span className="text-[10px] font-bold text-[#ea580c] uppercase tracking-widest bg-[#ea580c]/10 px-2.5 py-0.5 rounded-full inline-block mb-2">
            Our Programs
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-navy tracking-tight mb-3">
            Courses built to deliver <span className="text-[#ea580c]">results</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
            Choose your exam track. Every program runs in offline mode with classes, mocks and personal mentorship.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mb-8" id="courses-filter-tabs">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-navy text-white shadow-md scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-navy hover:scale-102'
                }`}
                id={`filter-tab-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Courses Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="courses-grid-container">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => {
              const IconComponent = getCourseIcon(course.slug);
              const isFeatured = course.slug === "cat" || course.slug === "mba-cet";
              
              // Extract duration & mode dynamically
              const durationObj = course.overview?.find(o => o.label === "Duration");
              const duration = durationObj ? durationObj.value : "4 Months";
              const mode = "Offline";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={course.slug}
                >
                  <Link
                    to={`/courses/${course.slug}`}
                    className="group card-premium p-4 flex flex-col h-full relative overflow-hidden bg-white border border-slate-100 hover:border-orange/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-3xl"
                    id={`course-card-${course.slug}`}
                  >
                    {/* Featured Badge */}
                    {isFeatured && (
                      <div
                        className="absolute top-3.5 right-3.5 bg-[#ea580c] text-white text-[7.5px] font-bold px-1.5 py-0.5 rounded-full flex items-center space-x-0.5 uppercase tracking-wider"
                        id={`featured-badge-${course.slug}`}
                      >
                        <Star className="w-2 h-2 fill-white text-white" />
                        <span>Featured</span>
                      </div>
                    )}

                    {/* Icon Header */}
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-md bg-navy/5 text-navy flex items-center justify-center shrink-0 transition-colors group-hover:bg-navy group-hover:text-white">
                        <IconComponent className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-2.5 font-display text-base font-extrabold text-navy group-hover:text-orange transition-colors">
                      {course.code}
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-500 font-medium min-h-[34px]">
                      {course.tagline}
                    </p>

                    {/* Meta Row: Duration & Mode */}
                    <div className="mt-2.5 flex items-center gap-3 text-[8.5px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50 rounded-lg py-1.5 px-2.5 border border-slate-100">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-orange" />
                        {duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-orange" />
                        {mode}
                      </span>
                    </div>

                    {/* Highlights List */}
                    <ul className="mt-3 space-y-1 flex-1">
                      {course.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-700">
                          <Check className="h-3 w-3 shrink-0 text-orange bg-orange/10 rounded-full p-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Enquire Now Button */}
                    <div className="mt-3.5 w-full text-center rounded-lg border border-slate-250 bg-white py-1.5 text-[11px] font-bold text-slate-700 shadow-sm transition-all duration-300 group-hover:border-[#ea580c] group-hover:text-[#ea580c] cursor-pointer flex items-center justify-center gap-1">
                      <span>Explore Program</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
