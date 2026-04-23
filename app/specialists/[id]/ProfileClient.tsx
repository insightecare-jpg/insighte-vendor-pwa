"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  Quote,
  Sparkles,
  ArrowRight,
  Check,
  CheckCircle2,
  GraduationCap,
  Target,
  Calendar,
  MessageSquare,
  Zap,
  HelpCircle,
  CalendarCheck,
  Globe,
  Fingerprint,
  Users,
  ArrowUpRight,
  ChevronRight,
  Verified
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, getExpertImage, formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ═══ DESIGN TOKENS (MAGAZINE STYLE) ═══
const COLORS = {
  bg: "#0a0b14",
  accent: "#8b7ff0",
  success: "#5dcaa5",
  warning: "#ef9f27",
  textPrimary: "#f0ece4",
  textSecondary: "#8a8591",
  glassBg: "rgba(255,255,255,0.03)",
  glassBorder: "rgba(255,255,255,0.08)"
};

export default function ProfileClient({ provider }: { provider: any }) {
  const shouldReduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Data Normalization
  const services = provider.services || [];
  const reviews = provider.reviews || [];
  const positiveFit = provider.provider_fit_items?.filter((f: any) => f.is_positive) || [];
  const cautiousFit = provider.provider_fit_items?.filter((f: any) => !f.is_positive) || [];
  
  const outcomes = provider.provider_outcomes?.length > 0 ? provider.provider_outcomes : [
    { title: "Building Trust", timeframe: "Phase 1", description: "Establishing a safe, affirming connection through shared interests and sensory respect." },
    { title: "Parent Empowerment", timeframe: "Phase 2", description: "Collaboratively developing support rhythms that work within your family's unique lifestyle." },
    { title: "Sustainable Growth", timeframe: "Long-term", description: "Seeing your child move with confidence and joy in their natural environments." }
  ];
  
  const price = provider.first_session_price || provider.rate || "1500";
  const sessionCount = provider.verified_sessions_count || "120";
  const modes = provider.mode?.split('/') || ['Online', 'Clinic'];
  
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-screen bg-[#0a0b14] text-[#f0ece4] selection:bg-[#8b7ff0]/30 overflow-x-hidden">
      
      {/* ═══ AMBIENT CANVAS ═══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8b7ff0]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#5dcaa5]/5 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* ═══ PERSISTENT DECISION BAR ═══ */}
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[100] h-20 bg-[#0a0b14]/80 backdrop-blur-3xl border-b border-white/5 px-6 flex items-center justify-center"
          >
            <div className="max-w-7xl w-full flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/10 shadow-lg">
                    <Image src={getExpertImage(provider)} fill alt={provider.name} className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base font-black italic tracking-tight font-dm-serif">{provider.name}</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-black text-[#8b7ff0] uppercase tracking-widest">{provider.category || 'Specialist'}</span>
                       <span className="w-1 h-1 rounded-full bg-white/10" />
                       <span className="text-[9px] font-black text-[#8a8591] uppercase tracking-widest">Available</span>
                    </div>
                  </div>
               </div>
               
               <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                     <p className="text-xl font-black italic tracking-tighter text-[#f0ece4]">₹2200 <span className="text-[9px] text-[#8a8591] ml-2 non-italic uppercase tracking-widest font-black">/ SESSION</span></p>
                  </div>
                  <Button 
                    onClick={() => scrollToSection('booking')}
                    className="h-12 px-6 rounded-xl bg-[#8b7ff0] text-[#0a0b14] font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#8b7ff0]/10"
                  >
                    Check Availability
                  </Button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-40">
        
        {/* ═══ 1. HERO SECTION: COMPACT MAGAZINE LAYOUT ═══ */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 items-start">
          
          {/* Portrait Image Block */}
          <div className="md:col-span-4 lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group"
            >
              <Image 
                src={getExpertImage(provider)} 
                fill 
                className="object-cover object-top transition-all duration-1000 group-hover:scale-[1.05]" 
                alt={provider.name} 
                priority 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b14] via-transparent to-transparent opacity-60" />
              
              <div className="absolute top-4 left-4">
                 <div className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-[#0a0b14]/60 backdrop-blur-xl border border-white/5">
                    <ShieldCheck className="w-3 h-3 text-[#5dcaa5]" />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Verified Specialist</span>
                 </div>
              </div>
            </motion.div>
            
            {/* Quick Trust Meta */}
            <div className="mt-6 grid grid-cols-2 gap-4">
               <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl text-center group transition-all hover:bg-white/[0.04]">
                  <p className="text-[8px] font-black text-[#8a8591] uppercase tracking-widest mb-1">Experience</p>
                  <p className="text-lg font-black italic tracking-tight font-dm-serif">{provider.experience_years || '8'}+ Yrs</p>
               </div>
               <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl text-center group transition-all hover:bg-white/[0.04]">
                  <p className="text-[8px] font-black text-[#8a8591] uppercase tracking-widest mb-1">Families</p>
                  <p className="text-lg font-black italic tracking-tight font-dm-serif">{sessionCount}+</p>
               </div>
            </div>
          </div>

          {/* Core Info Block */}
          <div className="md:col-span-8 lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Badge className="bg-[#8b7ff015] text-[#8b7ff0] border-none px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                  {provider.category || 'Specialist Partner'}
                </Badge>
                <div className="flex items-center gap-1 text-[#ef9f27]">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter !leading-[0.9] text-white font-dm-serif">
                {provider.name}
              </h1>
              
              <p className="text-lg md:text-xl text-[#8a8591] italic font-medium leading-relaxed max-w-xl">
                {provider.tagline || provider.bio || "Dedicated to building a world where every child is understood, empowered, and celebrated."}
              </p>
            </div>

            <div className="flex flex-wrap gap-8 py-8 border-y border-white/5">
                <div className="space-y-1">
                   <p className="text-[8px] font-black text-[#8a8591] uppercase tracking-[0.2em]">Clinical Specialty</p>
                   <p className="text-base font-black italic text-white flex items-center gap-2">
                     <Sparkles className="w-4 h-4 text-[#8b7ff0]" />
                     {provider.specializations?.[0] || 'Neuro-Inclusive Care'}
                   </p>
                </div>
                <div className="space-y-1">
                   <p className="text-[8px] font-black text-[#8a8591] uppercase tracking-[0.2em]">Based in</p>
                   <p className="text-base font-black italic text-white flex items-center gap-2">
                     <MapPin className="w-4 h-4 text-[#5dcaa5]" />
                     {provider.city || 'Pan-India Coverage'}
                   </p>
                </div>
                <div className="space-y-1">
                   <p className="text-[8px] font-black text-[#8a8591] uppercase tracking-[0.2em]">Language</p>
                   <p className="text-base font-black italic text-white">English, Hindi</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
               <button 
                 onClick={() => scrollToSection('booking')}
                 className="h-16 rounded-2xl bg-[#8b7ff0] text-[#0a0b14] font-black text-[11px] uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#8b7ff0]/10"
               >
                 Check Slots <CalendarCheck className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* Pricing/Booking Quick Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-3">
             <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl sticky top-32 space-y-8 shadow-2xl">
                <div className="space-y-4" id="booking">
                   <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-[#8a8591]">
                      <span>Consultation</span>
                      <span className="flex items-center gap-1.5 text-[#5dcaa5]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5dcaa5] animate-pulse" />
                        Available
                      </span>
                   </div>
                   <div className="flex items-end gap-2">
                      <p className="text-5xl font-black italic text-white font-dm-serif">₹2200</p>
                      <p className="text-[9px] font-black text-[#8a8591] uppercase tracking-widest mb-2">/ SESSION</p>
                   </div>
                   <p className="text-[10px] text-[#8a8591] italic font-medium">Standard 60-minute therapeutic session or comprehensive intake evaluation.</p>
                </div>

                <div className="space-y-3">
                   <div className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-widest">
                      <div className="p-2 rounded-lg bg-white/5"><Globe className="w-3.5 h-3.5 text-[#8b7ff0]" /></div>
                      {modes.join(' & ')}
                   </div>
                   <div className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-widest">
                      <div className="p-2 rounded-lg bg-white/5"><Zap className="w-3.5 h-3.5 text-[#8b7ff0]" /></div>
                      Express Report (24h)
                   </div>
                </div>

                <Link href={`/booking/checkout?type=expert_session&expertId=${provider.id}`} className="block">
                  <button className="w-full h-16 rounded-2xl bg-white text-[#0a0b14] font-black text-[11px] uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group">
                    Schedule Session <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </Link>
             </div>
          </div>
        </section>

        {/* ─── 2. DECISION GRID: SUITABILITY & TRUST ─── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
          
          {/* Detailed Content Column */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Suitability / Fit Analysis */}
            <div id="suitability">
              <div className="mb-10 space-y-2">
                 <div className="flex items-center gap-3 text-[10px] font-black text-[#8a8591] uppercase tracking-[0.3em]">
                   <Fingerprint className="w-4 h-4" />
                   Suitability Analysis
                 </div>
                 <h2 className="text-4xl font-black italic tracking-tight text-white font-dm-serif">Is this the right expert?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-8 rounded-[2rem] bg-[#5dcaa5]/5 border border-[#5dcaa5]/10 space-y-6">
                    <p className="text-[9px] font-black text-[#5dcaa5] uppercase tracking-widest">A Strong Match For:</p>
                    <ul className="space-y-4">
                      {positiveFit.length > 0 ? positiveFit.map((f: any, i: number) => (
                        <li key={i} className="flex gap-3 text-base font-bold italic leading-snug text-[#f0ece4]">
                           <CheckCircle2 className="w-5 h-5 text-[#5dcaa5] shrink-0 mt-0.5" />
                           {f.content}
                        </li>
                      )) : (
                        ['Sensory-friendly interventions', 'Affirming support for ADHD/Autism', 'Language & communication milestones'].map((text, i) => (
                          <li key={i} className="flex gap-3 text-base font-bold italic leading-snug text-[#f0ece4]">
                             <CheckCircle2 className="w-5 h-5 text-[#5dcaa5] shrink-0 mt-0.5" />
                             {text}
                          </li>
                        ))
                      )}
                    </ul>
                 </div>

                 <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6 opacity-80">
                    <p className="text-[9px] font-black text-[#8a8591] uppercase tracking-widest">Consider Alternatives If:</p>
                    <ul className="space-y-4">
                      {cautiousFit.map((f: any, i: number) => (
                        <li key={i} className="flex gap-3 text-[13px] font-medium italic text-[#8a8591] leading-snug">
                           <HelpCircle className="w-4 h-4 text-white/5 shrink-0 mt-0.5" />
                           {f.content}
                        </li>
                      ))}
                      <li className="flex gap-3 text-[13px] font-medium italic text-[#8a8591] leading-snug">
                         <HelpCircle className="w-4 h-4 text-white/10 shrink-0 mt-0.5" />
                         Looking for purely academic tutoring without developmental support.
                      </li>
                    </ul>
                 </div>
              </div>
            </div>

            {/* Approach / Narrative */}
            <div>
              <div className="mb-10 space-y-2">
                 <div className="flex items-center gap-3 text-[10px] font-black text-[#8a8591] uppercase tracking-[0.3em]">
                   <Users className="w-4 h-4" />
                   The Expert Voice
                 </div>
                 <h2 className="text-4xl font-black italic tracking-tight text-white font-dm-serif">Support Philosophy</h2>
              </div>

              <div className="p-10 md:p-14 rounded-[3rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                 <Quote className="absolute -top-6 -right-6 w-32 h-32 text-white/[0.02] rotate-12" />
                 <p className="text-2xl md:text-3xl font-black italic text-[#f0ece4] leading-relaxed mb-10 font-dm-serif">
                   "{provider.suitability_notes || provider.bio || "We believe in connection before correction. Our goal is not to fix, but to understand and provide the tools for meaningful growth."}"
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/5">
                    <div className="space-y-4">
                       <h4 className="text-[9px] font-black text-[#8b7ff0] uppercase tracking-widest">Core Methodology</h4>
                       <p className="text-sm text-[#8a8591] font-medium italic leading-relaxed">Strength-based and joy-led interventions that prioritize the child's perspective and autonomy.</p>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-[9px] font-black text-[#8a8591] uppercase tracking-widest">Parent Partnership</h4>
                       <p className="text-sm text-[#8a8591] font-medium italic leading-relaxed">Collaborative goal setting and active parent training to ensure progress continues at home.</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Transformation Path */}
            <div id="outcomes">
              <div className="mb-10 space-y-2">
                 <div className="flex items-center gap-3 text-[10px] font-black text-[#8a8591] uppercase tracking-[0.3em]">
                   <Target className="w-4 h-4" />
                   The Transformation Journey
                 </div>
                 <h2 className="text-4xl font-black italic tracking-tight text-white font-dm-serif">What outcomes typical families see</h2>
              </div>

              <div className="space-y-4">
                 {outcomes.map((outcome: any, i: number) => (
                    <div key={i} className="flex gap-6 items-start group">
                       <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-sm font-black text-[#8b7ff0] group-hover:bg-[#8b7ff0] group-hover:text-[#0a0b14] transition-all duration-500">
                             0{i+1}
                          </div>
                          <div className="w-px h-16 bg-white/5 group-last:hidden" />
                       </div>
                       <div className="pt-2 space-y-2">
                          <div className="flex items-center gap-3">
                             <h4 className="text-xl font-black italic text-white">{outcome.title}</h4>
                             <span className="text-[8px] font-black uppercase text-[#8a8591] border border-white/10 px-2 py-0.5 rounded-md">{outcome.timeframe}</span>
                          </div>
                          <p className="text-base text-[#8a8591] font-medium italic leading-relaxed max-w-2xl">{outcome.description}</p>
                       </div>
                    </div>
                 ))}
              </div>
            </div>

            {/* Social Proof / Testimonials */}
            <div>
              <div className="mb-10 space-y-2 text-center md:text-left">
                 <div className="flex items-center justify-center md:justify-start gap-3 text-[10px] font-black text-[#8a8591] uppercase tracking-[0.3em]">
                   <MessageSquare className="w-4 h-4" />
                   Parent Testimonials
                 </div>
                 <h2 className="text-4xl font-black italic tracking-tight text-white font-dm-serif">Reflections from families</h2>
              </div>

              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {reviews.map((rev: any, i: number) => (
                      <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col gap-6 group hover:bg-white/[0.04] transition-all duration-500">
                         <div className="flex gap-1 text-[#ef9f27]">
                            {[...Array(5)].map((_, j) => <Star key={j} className="w-2.5 h-2.5 fill-current" />)}
                         </div>
                         <p className="text-base font-black italic text-[#f0ece4] leading-relaxed flex-1">"{rev.content}"</p>
                         <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-black text-[#8a8591]">{rev.parent_name?.[0] || 'P'}</div>
                            <div>
                               <p className="text-[9px] font-black text-white uppercase tracking-widest">{rev.parent_name || 'Verified Family'}</p>
                               <p className="text-[7px] font-black text-[#8a8591] uppercase tracking-widest">Confirmed Session</p>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
              ) : (
                <div className="p-16 rounded-[3rem] bg-white/[0.01] border border-dashed border-white/10 text-center space-y-4">
                   <p className="text-lg font-black italic text-[#8a8591]">Fresh reflections arriving soon.</p>
                   <p className="text-[10px] uppercase font-black text-[#8a8591]/40 tracking-widest">We verify 100% of parent feedback.</p>
                </div>
              )}
            </div>
          </div>

          {/* Logistics & Trust Column */}
          <div className="lg:col-span-4 space-y-8">
             
             {/* Next Steps / Process */}
             <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl space-y-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b7ff0]">What's Next?</h3>
                <div className="space-y-6">
                   {[
                     { step: "Secure Slot", icon: Calendar, text: "Book your preferred date and time instantly." },
                     { step: "Deep-Dive Session", icon: Sparkles, text: "60-minute connection focused on your child's needs." },
                     { step: "Personalized Roadmap", icon: Target, text: "Receive a clinical report and growth path in 24h." }
                   ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                         <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#8a8591] group-hover:text-white transition-colors">
                            <item.icon className="w-4 h-4" />
                         </div>
                         <div className="space-y-1">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{item.step}</h4>
                            <p className="text-[11px] text-[#8a8591] italic font-medium leading-relaxed">{item.text}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Unsure? CTA */}
             <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#ef9f27]/10 to-transparent border border-[#ef9f27]/20 space-y-6">
                <HelpCircle className="w-8 h-8 text-[#ef9f27]" />
                <div className="space-y-3">
                   <h3 className="text-xl font-black italic text-white tracking-tight">Still unsure?</h3>
                   <p className="text-xs text-[#8a8591] font-medium leading-relaxed italic">Finding the right expert is a journey. Our clinical care team can help you match with the perfect partner for your child's profile.</p>
                   <Link href="/triage" className="inline-flex items-center gap-2 text-[9px] font-black text-[#ef9f27] uppercase tracking-[0.2em] hover:translate-x-1 transition-transform pt-2">
                     Start Matching Flow <ArrowRight className="w-3 h-3" />
                   </Link>
                </div>
             </div>

             {/* Verification Seal */}
             <div className="flex items-center justify-center gap-4 py-8 px-6 border border-white/5 rounded-[2.5rem] bg-white/[0.01]">
                <ShieldCheck className="w-6 h-6 text-[#5dcaa5]" />
                <p className="text-[9px] font-black text-[#8a8591] uppercase tracking-[0.2em] italic">
                   Rigorous 5-step clinical vetting process.
                </p>
             </div>
          </div>
        </section>

      </main>

      {/* ═══ MOBILE BOTTOM BAR: STICKY BOOKING ═══ */}
      <div className="md:hidden fixed bottom-8 left-4 right-4 z-[1000]">
          <div className="bg-[#0a0b14]/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-5 shadow-2xl flex items-center justify-between gap-4 overflow-hidden">
             <div className="relative z-10">
                <p className="text-2xl font-black italic text-white">₹2200</p>
                <p className="text-[8px] font-black text-[#8a8591] uppercase tracking-widest">Next available: Today</p>
             </div>
             <Button 
                onClick={() => scrollToSection('booking')}
                className="relative z-10 h-14 px-8 rounded-xl bg-[#8b7ff0] text-[#0a0b14] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#8b7ff0]/20"
             >
                Book Slot
             </Button>
          </div>
      </div>
    </div>
  );
}
