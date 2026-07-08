import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  LineChart,
  Users,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Award,
  Briefcase,
  GraduationCap,
  Star,
  Trophy,
  TrendingUp,
  Quote,
  MessageSquare,
  Send,
  Clock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { CONTACT_INFO, COURSES, FACULTY, TOPPERS, TESTIMONIALS } from "@/lib/site-data";
import DossierDrawer from "@/components/site/DossierDrawer";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('About');
  const [selectedMentor, setSelectedMentor] = useState(null);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'CAT',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          course: 'CAT',
          message: '',
        });
        setIsSubmitted(false);
      }, 4000);
    }
  };

  // Scroll animations observer
  useEffect(() => {
    const animObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.animate-on-scroll');
    revealElements.forEach((el) => {
      animObserver.observe(el);
    });

    return () => animObserver.disconnect();
  }, [activeTab]);

  const tabs = [
    { id: 'About', label: 'About Us' },
    { id: 'Faculty', label: 'Elite Mentors' },
    { id: 'Toppers', label: 'Hall of Fame' },
    { id: 'Reviews', label: 'Reviews' },
    { id: 'Contact', label: 'Contact Us' }
  ];

  // Motion animation parameters
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const pillars = [
    {
      icon: <Users className="w-8 h-8 text-brand-orange" />,
      title: 'Personal Mentorship',
      desc: 'One-on-one strategy sessions and individual doubt-clearing with elite faculty members to resolve concepts and map individual exam plans.',
    },
    {
      icon: <BookOpen className="w-8 h-8 text-brand-orange" />,
      title: 'Hybrid Mode Learning',
      desc: 'Flexible academic delivery combining structured offline physical classroom lectures in Nagpur with the modern convenience of live online backups.',
    },
    {
      icon: <LineChart className="w-8 h-8 text-brand-orange" />,
      title: 'Mock Analytics & Strategy',
      desc: 'In-depth diagnostic analytics of full-length mocks to track individual accuracy, speed variables, sectional benchmarks, and concept weak points.',
    },
  ];

  return (
    <div className="bg-slate-50/50 pt-32 pb-12 font-sans text-slate-800" id="about-tabbed-page-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-6 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-brand-blue hover:text-brand-orange hover:border-brand-orange/30 shadow-sm transition-all hover:scale-101"
            id="about-back-to-home-btn"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Navigation Tabs Bar - Inspired by the original about-us header layout */}
        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mb-12 border-b border-slate-200 pb-4" id="about-page-tab-bar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/15 scale-102'
                    : 'text-brand-blue hover:bg-slate-100 hover:scale-101'
                }`}
                id={`about-tab-${tab.id.toLowerCase()}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="outline-none"
          >
            
            {/* ABOUT US TAB VIEW */}
            {activeTab === 'About' && (
              <div id="tab-pane-about-us">
                {/* About Header Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16" id="about-hero">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-4 py-1.5 rounded-full inline-block mb-4">
                    Our Story & Philosophy
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-display font-bold text-brand-blue tracking-tight mb-6">
                    About <span className="text-brand-orange">KATexpert</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 font-medium italic">
                    "A Place to Learn, A Place to Grow"
                  </p>
                  <div className="w-16 h-1.5 bg-brand-orange rounded-full mx-auto mt-6" />
                </div>

                {/* Vision & Core Concept Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20" id="about-philosophy-grid">
                  <div className="space-y-6 text-left">
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-blue">
                      Our Vision: Nurturing Careers through Excellence
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-base">
                      At <strong className="text-brand-blue">KATexpert</strong>, we operate strictly under
                      the ethos of
                      <strong className="text-brand-orange"> "A Place to Learn, A Place to Grow"</strong>.
                      We are a leading test preparation institute based out of Dharampeth, Nagpur,
                      specializing in guiding aspirants through highly competitive entrance examinations.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-base">
                      We focus on building rock-solid conceptual clarity before subjecting students to
                      high-pressure timed simulators. By offering a hybrid mode of coaching, our students
                      experience physical, face-to-face mentorship alongside online resources, combining
                      stability with flexibility.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                        <span className="text-sm font-bold text-brand-blue">Concept-First Teaching</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                        <span className="text-sm font-bold text-brand-blue">Hybrid Classroom Backup</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                        <span className="text-sm font-bold text-brand-blue">Weekly Sectional Drills</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                        <span className="text-sm font-bold text-brand-blue">One-on-One Mentorship</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 p-8 sm:p-10 rounded-2xl shadow-xl shadow-slate-100/50 relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full -z-1" />
                    <h3 className="text-xl font-bold text-brand-blue mb-4">Why KATexpert?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      Our preparation cycles are structured to transition candidates from general
                      understanding to competitive top-percentile ranks. Every student receives individual
                      focus through personalized scorecard analysis.
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-brand-blue">
                        <h4 className="text-sm font-bold text-brand-blue">Live & Hybrid Flex</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Never miss a lecture. Revise physical classes through our integrated portals
                          anytime.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-brand-orange">
                        <h4 className="text-sm font-bold text-brand-blue">Rigorous Mock Drills</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Practice under real environment simulators with feedback mapping for weakness
                          fixes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pillars Section */}
                <div className="mb-20">
                  <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-blue">
                      Our Three Academic Pillars
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                      The framework that drives student success across Nagpur and beyond
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-slate-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
                      >
                        <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                          {pillar.icon}
                        </div>
                        <h3 className="text-lg font-bold text-brand-blue mb-3">{pillar.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coaching Verticals Portfolio Summary */}
                <div className="bg-brand-blue text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden mb-20 text-left">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl -z-1" />
                  <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl -z-1" />

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                    <div className="lg:col-span-1 space-y-4">
                      <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full inline-block">
                        Coaching Verticals
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
                        Our Entrance Portfolios
                      </h2>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        We design specialized batches to ensure students learn systematically, keeping focus
                        on core competitive criteria.
                      </p>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {COURSES.map((course) => (
                        <div
                          key={course.id}
                          className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl hover:bg-white/15 transition-colors"
                        >
                          <div className="text-brand-orange font-bold text-base mb-1">{course.title}</div>
                          <div className="text-xs text-white/90 font-bold">{course.category} Category</div>
                          <div className="text-[10px] text-slate-300 mt-2 font-medium">
                            {course.duration} Batch
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FACULTY TAB VIEW */}
            {activeTab === 'Faculty' && (
              <div id="tab-pane-faculty">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full inline-block mb-3">
                    Elite Mentors
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-blue tracking-tight mb-4">
                    Learn from the <span className="text-brand-orange">experts</span>
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
                    Our directors and faculty members hold deep expertise in entrance preparations, helping
                    you build core concepts and advanced shortcuts.
                  </p>
                </div>

                {/* Faculty cards grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-100px' }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mb-12"
                >
                  {FACULTY.map((member, idx) => (
                    <motion.div
                      variants={itemVariants}
                      key={idx}
                      className="bg-white border border-slate-100 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
                    >
                      <div className="space-y-6">
                        {/* Simulated Avatar Placeholder matching Theme */}
                        <div className="w-20 h-20 bg-brand-blue rounded-2xl flex items-center justify-center text-white relative shadow-md shadow-brand-blue/15">
                          <GraduationCap className="w-10 h-10 text-white" />
                          <div className="absolute -bottom-1.5 -right-1.5 bg-brand-orange text-white p-1 rounded-lg shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-white" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-brand-blue">{member.name}</h3>
                          <div className="text-xs font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/5 py-1 px-3.5 rounded-full inline-block">
                            {member.role}
                          </div>
                        </div>

                        {/* Faculty Attributes */}
                        <div className="space-y-3.5 border-t border-slate-50 pt-4">
                          <div className="flex items-start space-x-3 text-xs text-gray-500 leading-normal font-medium">
                            <Award className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                            <span>
                              Credentials: <strong>{member.credentials || "Expert Trainer"}</strong>
                            </span>
                          </div>
                          <div className="flex items-start space-x-3 text-xs text-gray-500 leading-relaxed font-medium">
                            <Briefcase className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                            <span>
                              Focus: <strong>{member.experience || member.expertise.join(", ")}</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card actions */}
                      <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>Nagpur Center Faculty</span>
                        {member.name === "Dr Arumita Pawa" || member.name === "Prof. Krish Vyas" ? (
                          <button
                            onClick={() => setSelectedMentor(member.name)}
                            className="text-brand-orange font-extrabold hover:text-brand-orange-light flex items-center gap-1 cursor-pointer"
                          >
                            <span>Dossier</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-green-500 flex items-center space-x-1">
                            <span>● Active Mentor</span>
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* TOPPERS TAB VIEW */}
            {activeTab === 'Toppers' && (
              <div id="tab-pane-toppers">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full inline-block mb-3">
                    Hall of Fame
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-blue tracking-tight mb-4">
                    Our rank story starts <span className="text-brand-orange">here</span>
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
                    Discover how systematic coaching, consistent practice, and personal faculty feedback
                    translates into top percentiles and premium admits.
                  </p>
                </div>

                {/* Toppers grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-100px' }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
                >
                  {TOPPERS.map((topper, idx) => (
                    <motion.div
                      variants={itemVariants}
                      key={idx}
                      className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between overflow-hidden text-left"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-brand-orange/5 rounded-bl-full flex items-center justify-center -z-1">
                        <Trophy className="w-5 h-5 text-brand-orange absolute top-3.5 right-3.5" />
                      </div>

                      <div className="space-y-5">
                        <div className="space-y-1">
                          <div className="text-xl sm:text-2xl font-display font-black text-brand-orange tracking-tight">
                            {topper.achievement.split(' ')[0]}{' '}
                            <span className="text-lg font-bold">
                              {topper.achievement.split(' ').slice(1).join(' ')}
                            </span>
                          </div>
                          <div className="text-[10px] font-bold text-brand-blue uppercase bg-brand-blue/5 py-1 px-3 rounded-full inline-block">
                            {topper.percentileOrRank}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-lg font-bold text-brand-blue">{topper.name}</h3>
                          <div className="text-xs text-gray-400 font-bold">{topper.course}</div>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>Batch: {topper.year}</span>
                        <span className="flex items-center space-x-1 text-brand-orange">
                          <Award className="w-3.5 h-3.5" />
                          <span>Success Admit</span>
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Callout */}
                <div className="bg-brand-blue text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-brand-orange shrink-0">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Write Your Own Success Admit Story</h4>
                        <p className="text-xs text-slate-300 font-semibold mt-0.5">
                          Let KATexpert help structure your path toward the nation's premier campuses.
                        </p>
                      </div>
                    </div>
                    <a href="#contact" className="text-xs font-bold uppercase bg-brand-orange text-white px-5 py-3 rounded-full tracking-wider shadow-md hover:bg-brand-orange-light transition-all text-center">
                      Nagpur Campus Enrolments Open
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* REVIEWS TAB VIEW */}
            {activeTab === 'Reviews' && (
              <div id="tab-pane-reviews">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full inline-block mb-3">
                    Testimonials
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-blue tracking-tight mb-4">
                    Candidate <span className="text-brand-orange">reviews</span> & feedback
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
                    Hear directly from our successful alumni about how the personal mentorship, hybrid
                    portal support, and rigorous mock test series shaped their careers.
                  </p>
                </div>

                {/* Reviews grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-100px' }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                >
                  {TESTIMONIALS.map((review, idx) => (
                    <motion.div
                      variants={itemVariants}
                      key={idx}
                      className="bg-white border border-slate-100 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between text-left"
                    >
                      <div className="absolute top-6 right-8 text-slate-100/80 shrink-0">
                        <Quote className="w-10 h-10 transform rotate-180 text-brand-orange/5" />
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-brand-orange fill-brand-orange shrink-0" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed italic font-medium relative z-10">
                          "{review.text}"
                        </p>
                      </div>

                      <div className="mt-8 pt-5 border-t border-slate-50 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-brand-blue leading-normal">{review.name}</h4>
                          <p className="text-[10px] text-gray-400 font-bold">{review.course || "CAT Alumnus"}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="text-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                  ✔ Verified KATexpert Student Testimonials
                </div>
              </div>
            )}

            {/* CONTACT COORD TAB VIEW */}
            {activeTab === 'Contact' && (
              <div id="tab-pane-contact">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full inline-block mb-3">
                    Inquiries
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-blue tracking-tight mb-4">
                    Connect with our <span className="text-brand-orange">advisors</span>
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
                    Have questions about batches, duration, hybrid mode resources, or want to schedule a
                    counselling session? Reach out directly or visit our Dharampeth campus.
                  </p>
                </div>

                {/* Contact layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
                  <div className="lg:col-span-5 space-y-8">
                    <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-6">
                      <h3 className="text-xl font-bold text-brand-blue">Nagpur Center Details</h3>
                      <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                        Our advisors are active daily from 10:00 AM to 7:00 PM (IST) to handle admission
                        inquiries and mock counselling.
                      </p>

                      <div className="space-y-6 pt-2">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                            <MapPin className="w-5 h-5 text-brand-orange" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-brand-blue">Campus Address</h4>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed font-medium">
                              {CONTACT_INFO.address}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                            <Phone className="w-5 h-5 text-brand-orange" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-brand-blue">Phone Numbers</h4>
                            <p className="text-xs text-gray-500 mt-1 font-semibold">{CONTACT_INFO.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                            <Mail className="w-5 h-5 text-brand-orange" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-brand-blue">Email Channel</h4>
                            <p className="text-xs text-gray-500 mt-1 font-semibold">{CONTACT_INFO.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                            <Clock className="w-5 h-5 text-brand-orange" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-brand-blue">Enquiry Timings</h4>
                            <p className="text-xs text-gray-500 mt-1 font-medium">
                              Monday – Sunday (10:00 AM – 7:30 PM)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dark map */}
                    <div className="h-64 rounded-3xl overflow-hidden relative border border-slate-100 shadow-md">
                      <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-center p-6">
                        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                        <MapPin className="w-7 h-7 text-brand-orange mb-2 animate-bounce" />
                        <h4 className="text-sm font-bold text-white">KATexpert Dharampeth Campus</h4>
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal max-w-xs font-medium">
                          Located behind Batukbhai Jewellers in Khare Town, Nagpur.
                        </p>
                        <div className="mt-4 px-3 py-1 bg-white/10 backdrop-blur text-[9px] text-slate-300 rounded font-semibold uppercase tracking-wider">
                          Nagpur Hub - Maharashtra
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="lg:col-span-7">
                    <div className="bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#ea580c]" />

                      <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                          <motion.form
                            key="query-contact-form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleContactSubmit}
                            className="space-y-6"
                          >
                            <div className="space-y-1.5">
                              <h3 className="text-2xl font-bold text-brand-blue tracking-tight">Send An Inquiry Message</h3>
                              <p className="text-xs text-gray-400 font-semibold">Fill out the details below. Our admissions desk will get in touch with you.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Full Name *</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Enter your name"
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-medium rounded-xl px-4 py-3 focus:outline-none bg-white text-[#1e293b]"
                                />
                              </div>

                              <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Contact Number *</label>
                                <input
                                  type="tel"
                                  required
                                  placeholder="Enter mobile number"
                                  value={formData.phone}
                                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                  className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-medium rounded-xl px-4 py-3 focus:outline-none bg-white text-[#1e293b]"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Email Address</label>
                                <input
                                  type="email"
                                  placeholder="Enter email address"
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-medium rounded-xl px-4 py-3 focus:outline-none bg-white text-[#1e293b]"
                                />
                              </div>

                              <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Select Target Course</label>
                                <select
                                  value={formData.course}
                                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                  className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-bold text-brand-blue rounded-xl px-4 py-3 focus:outline-none bg-white"
                                >
                                  {['CAT', 'CLAT', 'IPMAT', 'MBA CET', 'MCA CET', 'CRT'].map((course) => (
                                    <option key={course} value={course}>{course} Entrance Batch</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                              <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Your Message / Query Notes</label>
                              <textarea
                                rows={4}
                                placeholder="Write down any questions about batch timings, fee structures, offline classes, demo schedule, etc."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-medium rounded-xl px-4 py-3 focus:outline-none resize-none bg-white text-[#1e293b]"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-[#ea580c] hover:bg-[#f97316] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                            >
                              <span>Submit Query to Advisors</span>
                              <Send className="w-4 h-4 text-white" />
                            </button>
                          </motion.form>
                        ) : (
                          <motion.div
                            key="query-success-screen"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-12 text-center flex flex-col items-center justify-center space-y-4"
                          >
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 border border-green-200 shadow-md animate-bounce">
                              <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <div className="space-y-1.5">
                              <h4 className="text-2xl font-bold text-brand-blue">Message Dispatched!</h4>
                              <p className="text-sm text-gray-500 max-w-sm mx-auto font-semibold leading-relaxed">
                                Thank you. Your inquiry regarding <strong className="text-brand-orange">{formData.course}</strong> has been received successfully.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
          </motion.div>
        </AnimatePresence>
        
        {/* Floating Dossier drawer support for the Faculty tab */}
        <DossierDrawer mentorName={selectedMentor} onClose={() => setSelectedMentor(null)} />
      </div>
    </div>
  );
}
