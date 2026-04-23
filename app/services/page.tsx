"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  HelpCircle,
  Stethoscope,
  Users,
  GraduationCap,
  Music,
  Code,
  UserPlus,
} from "lucide-react";
import { UnifiedSearchBar } from "@/components/shared/UnifiedSearchBar";
import { SERVICE_GROUPS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SERVICE_REGISTRY } from "@/lib/services/registry";
import { getProviderCounts } from "@/lib/actions/stats";

// Map group names to extra descriptors and icons for a premium feel
const GROUP_DETAILS: Record<string, { icon: any, desc: string, accent: string, delay: number }> = {
  "Therapy": { 
    icon: Stethoscope, 
    desc: "Clinical excellence for neurological milestones and developmental clinical support.",
    accent: "from-amber-200/20 to-orange-500/5",
    delay: 0.1
  },
  "Counselling": { 
    icon: Users, 
    desc: "Emotional wellbeing, behavioral health, and resilient family guidance.",
    accent: "from-blue-200/20 to-indigo-500/5",
    delay: 0.2
  },
  "Tutoring": { 
    icon: GraduationCap, 
    desc: "Neuro-inclusive academic excellence for diverse learning styles.",
    accent: "from-emerald-200/20 to-teal-500/5",
    delay: 0.3
  },
  "Extra Curricular": { 
    icon: Music, 
    desc: "Creative expression, movement, and sensory-friendly physical play.",
    accent: "from-rose-200/20 to-pink-500/5",
    delay: 0.4
  },
  "Modern Skills": { 
    icon: Code, 
    desc: "Digital literacy and cognitive tools for the neuro-diverse future.",
    accent: "from-cyan-200/20 to-sky-500/5",
    delay: 0.5
  },
  "Specialist Roles": { 
    icon: UserPlus, 
    desc: "Dedicated school shadows and home support professionals.",
    accent: "from-purple-200/20 to-violet-500/5",
    delay: 0.6
  }
};

export default function ServicesPage() {
  const router = useRouter();
  const [stats, setStats] = useState<{ total: number, byService: Record<string, number>, byGroup: Record<string, number> }>({ 
    total: 0, 
    byService: {}, 
    byGroup: {} 
  });

  useEffect(() => {
    getProviderCounts().then(setStats);
  }, []);

  const handleSearch = (q: string) => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    router.push(`/specialists?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      <main className="pt-32 pb-20 overflow-x-hidden">
        
        {/* ── HERO SECTION ── */}
        <section className="max-w-7xl mx-auto px-6 mb-24 relative">
          {/* Background Nebula */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 animate-nebula" />
          
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mb-6 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-300"
            >
              <Sparkles className="w-3 h-3" />
              The Care Spectrum
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-dm-serif text-5xl md:text-8xl mb-8 leading-[1]"
            >
              Support that <br />
              <span className="text-indigo-400 italic">evolves with them.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Explore our unified categories of specialized support. From clinical therapy to academic guidance, find the perfect match for your child&apos;s specific journey.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-[720px] mx-auto shadow-2xl shadow-indigo-500/10"
            >
              <UnifiedSearchBar 
                onSearch={handleSearch}
                onQueryChange={() => {}} 
                placeholder="Search by diagnosis, support need, or service..."
              />
            </motion.div>
          </div>
        </section>

        {/* ── SERVICE CATEGORIES ── */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_GROUPS.map((group) => {
              const details = GROUP_DETAILS[group.name] || { icon: Stethoscope, desc: "", accent: "", delay: 0.1 };
              const Icon = details.icon;
              
              return (
                <motion.div
                  key={group.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: details.delay }}
                  className="group relative flex flex-col bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-10 transition-all duration-700 hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Subtle Gradient Backdrop */}
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10", details.accent)} />
                  
                  <div className="mb-10 flex items-start justify-between">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                    >
                      <Icon className="w-8 h-8 text-indigo-400" />
                    </div>
                    {stats.byGroup[group.name] > 0 && (
                      <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black uppercase tracking-widest text-indigo-300 rounded-full">
                        {stats.byGroup[group.name]} EXPERTS
                      </span>
                    )}
                  </div>

                  <h2 className="font-dm-serif text-3xl md:text-4xl text-white mb-4 leading-tight group-hover:text-indigo-300 transition-colors">
                    {group.name}
                  </h2>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                    {details.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {group.services.map((service) => {
                      const slug = service.toLowerCase().replace(/\s+/g, '-');
                      const hasPage = !!SERVICE_REGISTRY[slug];
                      
                      const content = (
                        <span 
                          key={service}
                          className={cn(
                            "px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-medium transition-colors",
                            hasPage ? "text-indigo-300 border-indigo-500/20 hover:bg-indigo-500/10 hover:border-indigo-500/40" : "text-slate-400"
                          )}
                        >
                          {service}
                        </span>
                      );

                      if (hasPage) {
                        return (
                          <Link key={service} href={`/services/${slug}`}>
                            {content}
                          </Link>
                        );
                      }

                      return content;
                    })}
                  </div>

                  <button 
                    onClick={() => router.push(`/specialists?category=${encodeURIComponent(group.name)}`)}
                    className="flex items-center gap-3 text-xs font-black tracking-[0.15em] uppercase text-indigo-400 hover:text-indigo-300 group/link transition-all cursor-pointer"
                  >
                    View Specialists
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── LIVE DATA TICKER ── */}
        <section className="bg-white/[0.01] border-y border-white/[0.05] py-12 relative overflow-hidden mb-32">
          <div className="flex items-center gap-12 animate-marquee">
             {[...Array(10)].map((_, i) => (
               <div key={i} className="flex items-center gap-8 text-sm font-bold uppercase tracking-[0.25em] text-slate-500 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {stats.total} Experts Available Platform-wide
                  {Object.entries(stats.byService)
                    .filter(([name]) => ["Shadow Teacher", "Speech Therapy", "Occupational Therapy", "Special Educator"].includes(name))
                    .map(([name, count]) => (
                      <React.Fragment key={name}>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {count} {name}s Available
                      </React.Fragment>
                    ))}
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Average Response Time: 45m
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  Verified Neuro-Inclusive care
               </div>
             ))}
          </div>
        </section>

        {/* ── GUIDED INTAKE CTA ── */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative overflow-hidden bg-gradient-to-br from-indigo-500/10 via-indigo-500/[0.02] to-transparent border border-indigo-500/20 rounded-[4rem] p-16 md:p-24 text-center"
           >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/30 blur-[150px] -z-10 rounded-full" />
              
              <HelpCircle className="w-16 h-16 text-indigo-500 mx-auto mb-8 animate-bounce-slow" />
              <h3 className="font-dm-serif text-4xl md:text-6xl text-white mb-6">
                Still unsure on the <br />
                <span className="italic text-indigo-300">right path?</span>
              </h3>
              <p className="text-slate-400 text-lg max-w-xl mx-auto mb-12 leading-relaxed font-['DM_Sans']">
                Take our clinical intake guide. We&apos;ll analyze your child&apos;s support needs and hand-pick the most compatible specialists for you.
              </p>
              
              <button 
                onClick={() => router.push("/book?service=general-consultation")}
                className="inline-flex h-16 items-center justify-center px-12 rounded-full bg-[#EF9F27] text-black font-black uppercase tracking-[0.1em] text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-orange-500/20 cursor-pointer"
              >
                Launch Care Guide
              </button>
           </motion.div>
        </section>

      </main>
    </div>
  );
}
