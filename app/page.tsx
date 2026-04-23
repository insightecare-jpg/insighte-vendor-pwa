


export const revalidate = 3600; // 1-hour static regeneration for the weightless doctrine
import React from "react";
import Link from "next/link";
import {
  Home as HomeIcon,
  LayoutDashboard,
  User,
  CalendarDays,
  ShieldCheck,
  Heart,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { SchoolLogoScroll } from "@/components/ui/school-logo-scroll";
import { InteractiveHero } from "@/components/home/interactive-hero";
import { getFeaturedProviders } from "@/lib/actions/providers";

// ─── DATA DELEGATES ───────────────────────────────────────────────────────────
const HOW_STEPS = [
  { num: "01", title: "Discover", desc: "Browse specialized partners or use our guided triage." },
  { num: "02", title: "Match", desc: "Find the expert who resonates with your child's signature." },
  { num: "03", title: "Connect", desc: "Book a 1:1 session instantly — online or in-person." },
  { num: "04", title: "Grow", desc: "Receive evidence-based support and regular progress logs." },
];

const WHY_ITEMS = [
  {
    icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
    title: "Only Verified Experts",
    desc: "No random listings. Every specialist is screened, trained, and trusted."
  },
  {
    icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
    title: "Neurodiversity-Affirming Design",
    desc: "Every interaction is built around accessibility, emotional safety, and real user behavior."
  },
  {
    icon: <Heart className="w-5 h-5" aria-hidden="true" />,
    title: "Built for Real Children, Not Ideal Ones",
    desc: "We design for different needs, communication styles, and sensitivities."
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default async function InsighteHome() {
  let featuredExperts: any[] = [];
  try {
    featuredExperts = await getFeaturedProviders();
  } catch (err) {
    console.error("Critical Failure in Hero Data Protocol:", err);
  }

  return (
    <main id="main-content" className="relative pt-24 pb-24">
      {/* ═══ HERO SECTION ════════════════════════════════════════════════════ */}
      <InteractiveHero initialExperts={featuredExperts} />

      {/* ═══ HOW IT WORKS ════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-[#8a8591]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b7ff0]" aria-hidden="true" />
            Simple process
          </div>
          <h2 className="font-dm-serif text-3xl md:text-5xl lg:text-6xl text-[#f0ece4] leading-tight">
            From search to session<br />in minutes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOW_STEPS.map((step) => (
            <div 
              key={step.num} 
              className="group relative overflow-hidden bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-10 flex flex-col gap-6 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/10"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity" aria-hidden="true">
                 <div className="font-dm-serif text-8xl leading-none text-white">{step.num}</div>
              </div>
              
              <div className="font-dm-serif text-2xl text-[#c5b8f8] leading-none flex items-center gap-4">
                <span className="text-[10px] font-black text-[#8b7ff0]/40 border border-[#8b7ff0]/20 rounded-lg px-2 py-1 uppercase tracking-widest">{step.num}</span>
                {step.title}
              </div>
              
              <p className="text-sm text-[#8a8591] leading-relaxed relative z-10 font-manrope">
                {step.desc}
              </p>
              
              <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-[#8b7ff0] text-[10px] font-black uppercase tracking-widest">
                 Learn more →
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-white/[0.05] mx-6 mb-20 max-w-7xl md:mx-auto" aria-hidden="true" />

      {/* ═══ WHY INSIGHTE ════════════════════════════════════════════════════ */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-dm-serif text-3xl md:text-5xl text-[#f0ece4] leading-tight mb-4">
            Why Families Pick Insighte
          </h2>
          <p className="text-sm md:text-base text-[#8a8591] max-w-md mx-auto leading-relaxed font-manrope">
            Because support for your child should feel clear, not chaotic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY_ITEMS.map((item, i) => (
            <div key={i} className="group bg-white/[0.03] border border-white/[0.08] rounded-3xl p-10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#8b7ff0]/10 flex items-center justify-center text-[#c5b8f8] mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform" aria-hidden="true">
                {item.icon}
              </div>
              <div className="text-lg font-bold text-[#f0ece4] mb-3 font-manrope">{item.title}</div>
              <div className="text-sm text-[#8a8591] leading-relaxed font-manrope">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SCHOOL LOGOS ════════════════════════════════════════════════════ */}
      <SchoolLogoScroll />

      {/* ═══ TESTIMONIALS ════════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ═══ FINAL CTA ════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08] rounded-[3rem] p-12 md:p-20 text-center">
          <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#8b7ff0]/50 to-transparent" aria-hidden="true" />
          
          <h2 className="font-dm-serif text-3xl md:text-6xl text-[#f0ece4] leading-tight mb-8">
            You don't have to figure this out alone
          </h2>
          <p className="text-base text-[#8a8591] max-w-lg mx-auto mb-12 leading-relaxed font-manrope">
            Join thousands of parents who found the right support for their child through Insighte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/specialists" className="inline-flex items-center gap-3 bg-[#e8e2d8] text-[#0d0f1a] rounded-full px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-black/20">
              Get matched with the right expert <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/triage" className="inline-flex items-center gap-3 bg-transparent border border-[#8b7ff0]/30 text-[#8b7ff0] rounded-full px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-[#8b7ff0]/10 transition-all">
              Not sure? Answer 3 questions <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

