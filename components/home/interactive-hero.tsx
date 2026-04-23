"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { UnifiedSearchBar } from "@/components/shared/UnifiedSearchBar";
import { Zone } from "@/lib/geo";
import { TopExperts } from "@/components/home/top-experts";

// ─── DATA DELEGATES ───────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "All Support", color: "#8b7ff0" },
  { id: "Therapy", label: "Therapy", color: "#5DCAA5" },
  { id: "Education", label: "Education", color: "#85B7EB" },
  { id: "Clinical", label: "Clinical", color: "#EF9F27" },
  { id: "Academic", label: "Academic & Hobbies", color: "#F0997B" },
];

const SERVICES = [
  {
    icon: "🗣️", name: "Speech Therapy", slug: "speech-therapy", count: "45+ specialists",
    category: "Therapy", color: "rgba(139,127,240,0.12)",
    desc: "Support for language, articulation, and communication milestones."
  },
  {
    icon: "🎓", name: "Shadow Teaching", slug: "shadow-teaching", count: "60+ specialists",
    category: "Education", color: "rgba(59,109,17,0.12)",
    desc: "1:1 classroom assistance for neurodiverse learners."
  },
  {
    icon: "🧠", name: "Special Educator", slug: "special-educator", count: "32+ specialists",
    category: "Education", color: "rgba(29,158,117,0.12)",
    desc: "Personalized remedial teaching and learning support."
  },
  {
    icon: "📐", name: "Developmental Support", slug: "developmental-support", count: "58+ specialists",
    category: "Therapy", color: "rgba(24,95,165,0.12)",
    desc: "Holistic care for neurodiverse growth and milestones."
  },
  {
    icon: "🧩", name: "Occupational Therapy", slug: "occupational-therapy", count: "28+ specialists",
    category: "Therapy", color: "rgba(139,127,240,0.12)",
    desc: "Building motor skills, sensory regulation, and independence."
  },
  {
    icon: "💬", name: "Child Counselling", slug: "child-counselling", count: "40+ specialists",
    category: "Clinical", color: "rgba(216,90,48,0.12)",
    desc: "Emotional support for anxiety, trauma, and social growth."
  },
  {
    icon: "📐", name: "Mathematics & Science", slug: "math-science", count: "120+ tutors",
    category: "Academic", color: "rgba(240,153,123,0.12)",
    desc: "Foundational conceptual clarity for K-12 students."
  },
  {
    icon: "🎹", name: "Music & Arts", slug: "music-arts", count: "85+ instructors",
    category: "Academic", color: "rgba(133,183,235,0.12)",
    desc: "Piano, guitar, vocals, and creative arts for expression."
  },
  {
    icon: "💻", name: "Coding & STEM", slug: "coding-stem", count: "50+ mentors",
    category: "Academic", color: "rgba(93,202,165,0.12)",
    desc: "Logic-building, programming, and robotics for young minds."
  },
  {
    icon: "♟️", name: "Chess & Strategy", slug: "chess-strategy", count: "30+ masters",
    category: "Academic", color: "rgba(239,159,39,0.12)",
    desc: "Critical thinking and cognitive development through play."
  }
];

const TRUST_ITEMS = [
  "100% Verified Partners", "500+ Happy Families", "Neuro-Affirmative Care", "Seamless Booking"
];

// suggestions logic moved to lib/services/search-utils.ts

interface InteractiveHeroProps {
  initialExperts?: any[];
}

export function InteractiveHero({ initialExperts = [] }: InteractiveHeroProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => { setMounted(true); }, []);

  const handleSearch = useCallback((q: string, zone: Zone | null) => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (zone && zone.id !== "online") params.set("city", zone.city);
    router.push(`/specialists?${params.toString()}`);
  }, [router]);

  const filteredServices = activeCategory === "all" ? SERVICES : SERVICES.filter((s) => s.category === activeCategory);

  if (!mounted) return null;

  return (
    <>
      <section className="relative text-center px-6 pt-14 pb-16">
        {/* Ambient glow */}
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#8b7ff0]/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] text-[10px] font-black uppercase tracking-[0.15em] text-[#c5b8f8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b7ff0] shadow-[0_0_8px_#8b7ff0]" aria-hidden="true" />
          Verified specialists · Bangalore, Delhi & Online
        </div>

        {/* Headline */}
        <h1 className="mx-auto mb-6 max-w-2xl font-dm-serif text-4xl md:text-6xl lg:text-7xl text-[#f0ece4] leading-[1.1]">
          Find the right expert<br />
          for your child — and{" "}
          <span className="italic text-[#c5b8f8]">yourself</span>
        </h1>

        <p className="mx-auto mb-10 max-w-lg text-sm md:text-base text-[#8a8591] leading-relaxed font-manrope">
          Direct access to the best therapists, special educators, and mentors. 
          Standardized care, human-first approach.
        </p>

        <div className="flex justify-center mb-12">
          <div className="w-full max-w-2xl">
            <UnifiedSearchBar onSearch={handleSearch} />
          </div>
        </div>

        <div className="flex justify-center">
            <button 
                onClick={() => router.push("/triage")}
                className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#ef9f27]/5 border border-[#ef9f27]/20 text-[#ef9f27] text-xs font-black uppercase tracking-widest hover:bg-[#ef9f27]/10 transition-all active:scale-95"
            >
                <Sparkles className="w-4 h-4 text-[#ef9f27]" />
                Not sure what your child needs? Answer 3 questions — we'll guide you →
            </button>
        </div>

      </section>

        {/* ─── TRUST STRIP ─── */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-16 px-6">
          {TRUST_ITEMS.map((item, i) => (
            <React.Fragment key={i}>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#8a8591] flex items-center gap-2">{item}</span>
              {i < TRUST_ITEMS.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-white/10" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>


      {/* ═══ CATEGORY PILLS ══════════════════════════════════════════════════ */}
      <div className="flex items-center justify-center gap-3 flex-wrap px-6 mb-20">
        {CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-3 px-5 py-3 rounded-full border text-[11px] font-black uppercase tracking-widest transition-all duration-300",
              activeCategory === cat.id 
                ? "bg-[#8b7ff0]/10 border-[#8b7ff0]/40 text-[#c5b8f8] shadow-lg shadow-[#8b7ff0]/5" 
                : "bg-white/[0.03] border-white/10 text-[#8a8591] hover:bg-white/[0.06] hover:border-white/20"
            )}
            aria-pressed={activeCategory === cat.id}
          >
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} aria-hidden="true" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* ═══ SERVICES SECTION ════════════════════════════════════════════════ */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#8a8591]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b7ff0]" aria-hidden="true" />
              What can we help with
            </div>
            <h2 className="font-dm-serif text-3xl md:text-5xl text-[#f0ece4] leading-tight mb-4">
              Every kind of support,<br />in one place
            </h2>
            <p className="text-sm text-[#8a8591] max-w-md leading-relaxed font-manrope">
              From speech delays to exam prep — find the right expert for where your child is right now.
            </p>
          </div>
          <Link href="/services" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#8b7ff0] hover:text-white transition-colors group">
            View all services <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {filteredServices.map((svc) => (
            <Link key={svc.slug} href={`/services/${svc.slug}`} className="group relative overflow-hidden bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex flex-col gap-6 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: svc.color }} aria-hidden="true">
                {svc.icon}
              </div>
              <div className="flex-1 space-y-2">
                <div className="text-sm font-black text-[#f0ece4] leading-tight font-manrope">{svc.name}</div>
                <div className="text-[10px] font-black text-[#8b7ff0] uppercase tracking-widest opacity-60">{svc.count}</div>
                <p className="text-[11px] text-[#8a8591] leading-relaxed line-clamp-3 font-manrope group-hover:text-white/60 transition-colors">{svc.desc}</p>
              </div>
              <div className="mt-auto self-end opacity-0 group-hover:opacity-100 transition-all text-[#8b7ff0]">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ TOP EXPERTS ════════════════════════════════════════════════════ */}
      <TopExperts zone={activeZone} initialExperts={initialExperts} />
    </>
  );
}
