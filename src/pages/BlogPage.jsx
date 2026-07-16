import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { BLOGS_CONTENT } from "@/lib/blogs-data";

const FEATURED_POST = {
  id: "featured-set-exam",
  title: "SET Exam Coaching in Nagpur: Smart Preparation Strategies for Students",
  excerpt: "The State Eligibility Test (SET) is one of the major examinations that candidates need to crack to qualify for lectureship posts. Discover smart prep strategies, syllabus weightage, and execution tips.",
  date: "July 11, 2026",
  author: "KATexpert Research",
  category: "SET Entrance",
  readTime: "6 min read",
  url: "https://katexperts.com/set-exam-coaching-in-nagpur-smart-preparation-strategies-for-students/",
  img: "https://katexperts.com/wp-content/uploads/2026/07/KAT-Experts-1-1.jpeg"
};

const BLOGS = [
  {
    id: "blog-post-2",
    title: "Complete Guide to CLAT and Law CET Coaching in Nagpur",
    excerpt: "A profession in law is not only exciting but offers you the chance to make a real difference in society. Here is our comprehensive CLAT and Law CET guide.",
    date: "July 4, 2026",
    author: "KATexpert Research",
    category: "LAW / CLAT",
    readTime: "6 min read",
    url: "https://katexperts.com/complete-guide-to-clat-and-law-cet-coaching-in-nagpur/",
    img: "https://katexperts.com/wp-content/uploads/2026/07/KAT-Experts-.jpeg"
  },
  {
    id: "blog-post-3",
    title: "Crack CLAT with Confidence: Top CLAT Coaching in Nagpur Revealed",
    excerpt: "Preparing for the Common Law Admission Test (CLAT) is a significant move if you want to enter the legal profession. Discover top coaching tips.",
    date: "June 27, 2026",
    author: "KATexpert Research",
    category: "LAW / CLAT",
    readTime: "5 min read",
    url: "https://katexperts.com/crack-clat-with-confidence-top-clat-coachhing-in-nagpur-revealed/",
    img: "https://katexperts.com/wp-content/uploads/2026/06/Kat-Experts-1-2.jpeg"
  },
  {
    id: "blog-post-4",
    title: "How to Choose the Best CLAT Classes in Nagpur for 2026 Exams",
    excerpt: "Strategizing your preparation for the Common Law Admission Test (CLAT) with regular practice is essential to get top scores. Learn how to choose the right class.",
    date: "June 20, 2026",
    author: "KATexpert Research",
    category: "LAW / CLAT",
    readTime: "5 min read",
    url: "https://katexperts.com/how-to-choose-the-best-clat-classes-in-nagpur-for-2026-exams/",
    img: "https://katexperts.com/wp-content/uploads/2026/06/Kat-Experts-1-1.jpeg"
  },
  {
    id: "blog-post-5",
    title: "Best Coaching Institute in Nagpur for AIR Rank 1 Preparation",
    excerpt: "Looking for the Best Coaching Institute in Nagpur for AIR Rank 1 preparation? Let's check how KATexpert prepares you to be a top ranker.",
    date: "June 16, 2026",
    author: "KATexpert Research",
    category: "General Prep",
    readTime: "4 min read",
    url: "https://katexperts.com/best-coaching-institute-in-nagpur-for-air-rank-1-preparation/",
    img: "https://katexperts.com/wp-content/uploads/2026/06/Kat-Experts-Air-I-.jpeg"
  },
  {
    id: "blog-post-6",
    title: "Best Coaching Institute for LAW in Nagpur: Expert Tips & Insights",
    excerpt: "The legal profession remains to be one of the most prestigious and financially rewarding fields. Learn how to crack it with top tips and expert insights.",
    date: "June 13, 2026",
    author: "KATexpert Research",
    category: "LAW / CLAT",
    readTime: "5 min read",
    url: "https://katexperts.com/best-coaching-institute-for-law-in-nagpur-expert-tips-insights/",
    img: "https://katexperts.com/wp-content/uploads/2026/06/Kat-Experts-.jpeg"
  },
  {
    id: "blog-post-7",
    title: "Law Entrance Coaching in Nagpur: CAT, CLAT & SET Made Easy",
    excerpt: "Success in competitive examinations is highly dependent on the right direction, well-planned studies, and mock practice.",
    date: "June 6, 2026",
    author: "KATexpert Research",
    category: "Entrance Exams",
    readTime: "5 min read",
    url: "https://katexperts.com/law-entrance-coaching-in-nagpur-cat-clat-set-made-easy/",
    img: "https://katexperts.com/wp-content/uploads/2026/06/Kat-Expert-.jpeg"
  }
];

export default function BlogPage() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const renderBlogBody = (blogId) => {
    const content = BLOGS_CONTENT[blogId];
    if (!content) {
      return (
        <p className="text-sm text-slate-500 italic">
          Content loading...
        </p>
      );
    }

    let elements = [];
    let listBuffer = [];

    const flushList = (key) => {
      if (listBuffer.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-5 space-y-1.5 my-4 text-slate-700 text-sm leading-relaxed font-medium">
            {listBuffer.map((li, idx) => (
              <li key={`li-${key}-${idx}`}>{li}</li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    content.forEach((item, idx) => {
      if (item.type === "list-item") {
        listBuffer.push(item.text);
      } else {
        flushList(idx);
        if (item.type === "heading") {
          elements.push(
            <h3 key={idx} className="font-display text-lg sm:text-xl font-bold text-navy mt-6 mb-3">
              {item.text}
            </h3>
          );
        } else if (item.type === "paragraph") {
          elements.push(
            <p key={idx} className="text-sm sm:text-base text-slate-650 leading-relaxed font-medium mb-4">
              {item.text}
            </p>
          );
        }
      }
    });

    flushList(content.length);
    return elements;
  };

  return (
    <main className="bg-slate-50/50 min-h-screen pb-20 font-sans text-slate-800">
      <PageHero title="Blogs & Articles" breadcrumb={["Student Resources", "Blogs"]} />

      <div className="container-x max-w-6xl mx-auto mt-12 px-4">
        {/* Featured blog post banner */}
        <div className="bg-[#1e293b] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden mb-16" id="blog-featured-banner">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ea580c]/15 rounded-full blur-3xl -z-1" />
          
          <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
            <div className="flex-1 space-y-4 text-left">
              <div className="inline-flex items-center space-x-2 bg-[#ea580c]/20 border border-[#ea580c]/30 px-3 py-1 rounded-full text-xs font-bold text-brand-orange-light uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange-light animate-pulse" />
                <span>Featured Post</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight leading-tight">
                {FEATURED_POST.title}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {FEATURED_POST.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold pt-2">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#ea580c]" />
                  {FEATURED_POST.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {FEATURED_POST.date}
                </span>
                <span>•</span>
                <span>{FEATURED_POST.readTime}</span>
              </div>
              <div className="pt-4">
                <button 
                  onClick={() => setSelectedBlog(FEATURED_POST)}
                  className="inline-flex items-center justify-center gap-2 bg-[#ea580c] hover:bg-[#f97316] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-brand-orange/15 cursor-pointer"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            {FEATURED_POST.img && (
              <div className="w-full lg:w-96 shrink-0 aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg animate-pulse" style={{ animationDuration: '3s' }}>
                <img 
                  src={FEATURED_POST.img} 
                  alt={FEATURED_POST.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blogs-grid">
          {BLOGS.map((blog, idx) => (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={blog.id}
              className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4 text-left">
                {blog.img && (
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 cursor-pointer block text-left p-0"
                  >
                    <img 
                      src={blog.img} 
                      alt={blog.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                )}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-brand-orange uppercase bg-brand-orange/10 px-3 py-1 rounded-full inline-block">
                    {blog.category}
                  </span>
                  <h3 className="text-base font-bold text-brand-blue font-display hover:text-[#ea580c] transition-colors leading-snug">
                    <button 
                      onClick={() => setSelectedBlog(blog)}
                      className="text-left font-bold text-brand-blue font-display hover:text-[#ea580c] transition-colors leading-snug cursor-pointer p-0 bg-transparent border-0"
                    >
                      {blog.title}
                    </button>
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-gray-400 font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">{blog.date}</span>
                </div>
                <button 
                  onClick={() => setSelectedBlog(blog)}
                  className="text-brand-blue hover:text-brand-orange flex items-center gap-1 font-bold text-xs cursor-pointer p-0 bg-transparent border-0"
                >
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Blog Preview Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl flex flex-col h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="text-left pr-4">
                <span className="text-[9px] font-bold text-brand-orange uppercase bg-brand-orange/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  {selectedBlog.category}
                </span>
                <h3 className="font-display text-base sm:text-lg font-extrabold text-navy leading-snug">{selectedBlog.title}</h3>
                <div className="flex items-center gap-3 text-[10px] text-slate-500 font-semibold mt-1">
                  <span>{selectedBlog.date}</span>
                  <span>•</span>
                  <span>{selectedBlog.readTime || "5 min read"}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                className="rounded-full bg-slate-100 hover:bg-slate-200 p-2 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer font-bold text-xs shrink-0"
              >
                ✕
              </button>
            </div>
            
            {/* Scrollable Blog Content */}
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin text-left">
              <div className="max-w-3xl mx-auto">
                {selectedBlog.img && (
                  <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-slate-100 shadow-sm">
                    <img 
                      src={selectedBlog.img} 
                      alt={selectedBlog.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div className="space-y-1">
                  {renderBlogBody(selectedBlog.id)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
