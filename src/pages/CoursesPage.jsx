import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Star, ArrowRight, Check, X, Calendar, Send, CheckCircle2 } from 'lucide-react';
import { COURSES, CONTACT_INFO } from "@/lib/site-data";
import { PageHero } from "@/components/site/page-hero";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    phone: '',
    course: 'CAT',
    slot: 'Morning (10:00 AM - 1:00 PM)',
  });

  const categories = ['All', 'MBA', 'Law', 'UG', 'Skills'];

  const filteredCourses =
    selectedCategory === 'All'
      ? COURSES
      : COURSES.filter((c) => c.category === selectedCategory);

  const handleOpenCounsellingModal = () => {
    setIsModalOpen(true);
    setModalSubmitted(false);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (modalForm.name && modalForm.phone) {
      setModalSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setModalForm({
          name: '',
          phone: '',
          course: 'CAT',
          slot: 'Morning (10:00 AM - 1:00 PM)',
        });
      }, 4000);
    }
  };

  return (
    <main className="bg-slate-50/50 min-h-screen pb-20 font-sans text-slate-800" id="courses-view-root">
      <PageHero title="Our Entrance Programs" breadcrumb={["Courses"]} />
      
      <div className="container-x max-w-6xl mx-auto mt-12 px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12" id="courses-header-section">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full inline-block mb-3">
            Our Programs
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-blue tracking-tight mb-4">
            Courses built to deliver <span className="text-brand-orange">results</span>
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
                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/10 scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-brand-blue hover:scale-102'
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
                key={course.id}
                className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                id={`course-card-${course.id}`}
              >
                {/* Featured Badge */}
                {course.featured && (
                  <div
                    className="absolute top-4 right-4 bg-brand-orange/10 text-brand-orange text-[10px] font-bold px-3 py-1 rounded-full flex items-center space-x-1 uppercase tracking-wider"
                    id={`featured-badge-${course.id}`}
                  >
                    <Star className="w-3 h-3 fill-brand-orange text-brand-orange" />
                    <span>Featured</span>
                  </div>
                )}

                <div id={`course-card-body-${course.id}`}>
                  {/* Category Pill */}
                  <span className="text-[10px] font-bold text-brand-blue uppercase bg-slate-100 px-3 py-1 rounded-full inline-block mb-4">
                    {course.category} Exam Track
                  </span>

                  {/* Course Title */}
                  <h3 className="text-2xl font-bold text-brand-blue mb-3">{course.title}</h3>

                  {/* Course Description */}
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">
                    {course.description}
                  </p>

                  {/* Course Details Block */}
                  <div className="flex flex-wrap gap-4 mb-6 text-xs text-gray-500 font-bold" id={`course-meta-${course.id}`}>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange inline-block" />
                      <span>{course.mode} Mode</span>
                    </div>
                  </div>

                  {/* Features Bullet List */}
                  <ul className="space-y-3 mb-8 border-t border-slate-50 pt-4" id={`course-features-${course.id}`}>
                    {course.features.map((feat, index) => (
                      <li key={index} className="flex items-start space-x-2 text-xs text-slate-600 font-semibold leading-normal">
                        <Check className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="flex flex-col space-y-2 border-t border-slate-50 pt-4" id={`course-card-actions-${course.id}`}>
                  <button
                    onClick={handleOpenCounsellingModal}
                    className="w-full bg-[#1e293b] hover:bg-[#334155] text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer text-center"
                    id={`btn-counsel-${course.id}`}
                  >
                    Book Free Counselling
                  </button>
                  {course.id === "mba-cet" || course.id === "mca-cet" ? (
                    <Link
                      to={`/${course.id}`}
                      className="w-full border border-slate-200 hover:border-brand-orange text-brand-blue hover:text-brand-orange font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer"
                      id={`btn-details-${course.id}`}
                    >
                      <span>Explore Program</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : course.id === "cat" || course.id === "clat" || course.id === "ipmat" || course.id === "crt" || course.id === "cuet" || course.id === "set" ? (
                    <Link
                      to="/curriculum"
                      className="w-full border border-slate-200 hover:border-brand-orange text-brand-blue hover:text-brand-orange font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer"
                      id={`btn-details-${course.id}`}
                    >
                      <span>Explore Curriculum</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href="#contact"
                      className="w-full border border-slate-200 hover:border-brand-orange text-brand-blue hover:text-brand-orange font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center space-x-1.5"
                      id={`btn-details-${course.id}`}
                    >
                      <span>Request Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Free Counselling Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="counselling-modal-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              id="modal-backdrop"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border border-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative z-10 overflow-hidden"
              id="counselling-modal-card"
            >
              {/* Top border decor */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#ea580c]" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#1e293b] hover:bg-slate-50 rounded-full transition-colors"
                aria-label="Close modal"
                id="modal-close-btn"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {!modalSubmitted ? (
                  <motion.form
                    key="modal-enquiry"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleModalSubmit}
                    className="space-y-5 text-left"
                    id="modal-booking-form"
                  >
                    <div className="space-y-1" id="modal-heading-block">
                      <div className="flex items-center space-x-2 text-[#ea580c] font-bold text-xs uppercase tracking-wider">
                        <Calendar className="w-4 h-4" />
                        <span>Instant Admission Slot</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
                        Book Free Counselling
                      </h3>
                      <p className="text-xs text-gray-500 font-semibold">
                        Reserve a call slot directly with our academic directors.
                      </p>
                    </div>

                    {/* Candidate Name */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-bold text-[#1e293b] uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter candidate name"
                        value={modalForm.name}
                        onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                        className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-medium rounded-xl px-4 py-3 focus:outline-none transition-all bg-white text-[#1e293b]"
                      />
                    </div>

                    {/* Contact Number */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-bold text-[#1e293b] uppercase tracking-wider">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter 10-digit mobile number"
                        value={modalForm.phone}
                        onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                        className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-medium rounded-xl px-4 py-3 focus:outline-none transition-all bg-white text-[#1e293b]"
                      />
                    </div>

                    {/* Program Selection */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-bold text-[#1e293b] uppercase tracking-wider">
                        Target Entrance Exam
                      </label>
                      <select
                        value={modalForm.course}
                        onChange={(e) => setModalForm({ ...modalForm, course: e.target.value })}
                        className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-bold text-[#1e293b] rounded-xl px-4 py-3 focus:outline-none bg-white"
                      >
                        <option value="CAT">CAT Entrance Preparation</option>
                        <option value="CLAT">CLAT Entrance Preparation</option>
                        <option value="IPMAT">IPMAT Undergrad Management</option>
                        <option value="MBA CET">Maharashtra MBA CET</option>
                        <option value="MCA CET">MCA CET Computer Prep</option>
                        <option value="CRT">Campus Placement Training</option>
                      </select>
                    </div>

                    {/* Preferred Slot */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-bold text-[#1e293b] uppercase tracking-wider">
                        Preferred Call Slot
                      </label>
                      <select
                        value={modalForm.slot}
                        onChange={(e) => setModalForm({ ...modalForm, slot: e.target.value })}
                        className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-bold text-[#1e293b] rounded-xl px-4 py-3 focus:outline-none bg-white"
                      >
                        <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                        <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                        <option value="Evening (4:00 PM - 7:30 PM)">Evening (4:00 PM - 7:30 PM)</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#ea580c] hover:bg-[#f97316] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md shadow-brand-orange/15 hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                      id="modal-submit-btn"
                    >
                      <span>Book Slot & Call Coordinator</span>
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="modal-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-8 text-center flex flex-col items-center justify-center space-y-4"
                    id="modal-success-screen"
                  >
                    <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-500 border border-green-200 shadow-md animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-xl font-bold text-[#1e293b]">Booking Reserved!</h4>
                      <p className="text-xs text-gray-500 max-w-xs mx-auto font-semibold leading-relaxed">
                        Counselling slot successfully reserved for{' '}
                        <strong className="text-[#ea580c]">{modalForm.name}</strong>. An
                        admissions advisor will contact you on{' '}
                        <strong className="text-[#1e293b]">{modalForm.phone}</strong> during the
                        selected slot.
                      </p>
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2">
                      Admissions Desk - Dharampeth
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
