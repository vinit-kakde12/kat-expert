import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { courses } from "@/data/courses";
import { PageHero } from "@/components/site/page-hero";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'MBA', 'Law', 'UG', 'Skills'];

  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter((c) => {
          // Map Course.slug to category if needed, or check course properties.
          // Let's map manually based on slug:
          // cat, mba-cet -> MBA
          // clat -> Law
          // ipmat -> UG
          // crt -> Skills
          if (c.slug === "cat" || c.slug === "mba-cet") return selectedCategory === "MBA";
          if (c.slug === "clat") return selectedCategory === "Law";
          if (c.slug === "ipmat") return selectedCategory === "UG";
          if (c.slug === "crt") return selectedCategory === "Skills";
          return false;
        });

  return (
    <main className="bg-slate-50/50 min-h-screen pb-20 font-sans text-slate-800" id="courses-view-root">
      <PageHero title="Our Entrance Programs" breadcrumb={["Courses"]} />
      
      <div className="container-x max-w-6xl mx-auto mt-12 px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12" id="courses-header-section">
          <span className="text-xs font-bold text-[#ea580c] uppercase tracking-widest bg-[#ea580c]/10 px-3 py-1 rounded-full inline-block mb-3">
            Our Programs
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy tracking-tight mb-4">
            Courses built to deliver <span className="text-[#ea580c]">results</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
            Choose your exam track. Every program runs with physical classes, mocks, and personal mentorship.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12" id="courses-filter-tabs">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all cursor-pointer ${
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="courses-grid-container">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
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
                  className="group card-premium p-6 flex flex-col h-full relative overflow-hidden"
                  id={`course-card-${course.slug}`}
                >
                  {/* Featured Badge */}
                  {course.slug === "cat" && (
                    <div
                      className="absolute top-4 right-4 bg-[#ea580c]/10 text-[#ea580c] text-[10px] font-bold px-3 py-1 rounded-full flex items-center space-x-1 uppercase tracking-wider"
                      id={`featured-badge-${course.slug}`}
                    >
                      <Star className="w-3 h-3 fill-[#ea580c] text-[#ea580c]" />
                      <span>Featured</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-xl bg-[#ea580c]/10 text-[#ea580c] flex items-center justify-center font-bold font-display text-base select-none shrink-0">
                      {course.code}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-navy">{course.code}</h3>
                      <p className="text-xs text-muted-foreground">{course.name}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-navy-soft flex-1 leading-relaxed">{course.tagline}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#ea580c] group-hover:gap-2 transition-all">
                    Explore program
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.21 4.79a.75.75 0 011.06 0l4.7 4.68a.75.75 0 010 1.06l-4.7 4.68a.75.75 0 11-1.06-1.06L11.38 10 7.21 5.85a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
