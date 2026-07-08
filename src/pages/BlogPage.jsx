import { motion } from "motion/react";
import { BookOpen, Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";

const BLOGS = [
  {
    id: "cat-roadmap",
    title: "How to Crack CAT 2026: A Step-by-Step Preparation Roadmap",
    excerpt: "Dismantle formula dependency and reconstruct core mathematical logic. Discover the exact verbal reading patterns that lead to top business schools.",
    date: "July 5, 2026",
    author: "Prof. Aashish Kate",
    category: "MBA Entrance",
    readTime: "6 min read"
  },
  {
    id: "ipmat-math",
    title: "Understanding the IPMAT Higher Math Syllabus: Essential Chapters",
    excerpt: "IPMAT requires a different mathematical approach than standard board exams. We break down the syllabus weightage and key topics you need to prioritize.",
    date: "June 28, 2026",
    author: "Prof. Nishant Deshmukh",
    category: "Undergrad",
    readTime: "5 min read"
  },
  {
    id: "speed-math",
    title: "Formula-Free Reasoning: Speed Math Workflows for Competitive Exams",
    excerpt: "Learn how visual logic, pattern recognition, and geometric symmetry help you solve complex algebra problems in under 30 seconds without memorizing equations.",
    date: "June 15, 2026",
    author: "Prof. Krish Vyas",
    category: "Quantitative",
    readTime: "8 min read"
  },
  {
    id: "clat-verbal",
    title: "Retraining Your Brain: Cognitive Verbal Reading for CLAT & CAT",
    excerpt: "Move away from standard word-by-word reading. Dr. Arumita Pawa explains semantic mapping and structural logic comprehension techniques to ace the verbal section.",
    date: "May 30, 2026",
    author: "Dr. Arumita Pawa",
    category: "Verbal Ability",
    readTime: "7 min read"
  }
];

export default function BlogPage() {
  return (
    <main className="bg-slate-50/50 min-h-screen pb-20 font-sans text-slate-800">
      <PageHero title="Blogs & Articles" breadcrumb={["Student Resources", "Blogs"]} />

      <div className="container-x max-w-6xl mx-auto mt-12 px-4">
        {/* Featured blog post banner */}
        <div className="bg-[#1e293b] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden mb-16" id="blog-featured-banner">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl -z-1" />
          
          <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
            <div className="flex-1 space-y-4 text-left">
              <div className="inline-flex items-center space-x-2 bg-brand-orange/20 border border-brand-orange/30 px-3 py-1 rounded-full text-xs font-bold text-brand-orange-light uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange-light animate-pulse" />
                <span>Featured Post</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight leading-tight">
                The Architecture of Test-Taking Mentality
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Why do high-performing students sometimes choke under pressure? We analyze the cognitive behavioral science of mock diagnostic testing and how to build mental stamina for exam day.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold pt-2">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-brand-orange" />
                  Dr. Arumita Pawa
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  July 7, 2026
                </span>
                <span>•</span>
                <span>10 min read</span>
              </div>
              <div className="pt-4">
                <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-[#ea580c] hover:bg-[#f97316] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-brand-orange/15">
                  Read Article
                  <ArrowRight className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="blogs-grid">
          {BLOGS.map((blog, idx) => (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={blog.id}
              className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4 text-left">
                <span className="text-[10px] font-bold text-brand-orange uppercase bg-brand-orange/10 px-3 py-1 rounded-full inline-block">
                  {blog.category}
                </span>
                <h3 className="text-xl font-bold text-brand-blue font-display hover:text-[#ea580c] transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {blog.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-gray-400 font-semibold">
                <div className="flex items-center gap-3">
                  <span>By {blog.author}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                <a href="#contact" className="text-brand-blue hover:text-brand-orange flex items-center gap-1 font-bold">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
