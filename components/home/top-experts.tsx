"use client";

import React, { useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Award, ArrowRight, Sparkles } from "lucide-react";
import { Zone } from "@/lib/geo";
import { ProviderCard } from "@/components/ui/provider-card";

import { FEATURED_EXPERTS } from "@/lib/constants";

interface TopExpertsProps {
  zone?: Zone | null;
  initialExperts?: any[];
}

export function TopExperts({ zone, initialExperts = [] }: TopExpertsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const baseExperts = useMemo(() => {
    return initialExperts.length > 0 ? initialExperts : FEATURED_EXPERTS;
  }, [initialExperts]);

  const filteredExperts = useMemo(() => {
    if (!zone || !zone.city || zone.city === "Global") return baseExperts;
    
    // Exact city match
    const local = baseExperts.filter(e => 
      e.city?.toLowerCase() === zone.city.toLowerCase()
    );

    // If no local, show online/featured but add a label
    return local.length > 0 ? local : baseExperts;
  }, [zone, baseExperts]);

  const isShowingFallback = useMemo(() => {
    if (!zone || !zone.city || zone.city === "Global") return false;
    return !baseExperts.some(e => e.city?.toLowerCase() === zone.city.toLowerCase());
  }, [zone, baseExperts]);

  useEffect(() => {
    let ctx: any;
    const initGsap = async () => {
      try {
        const { default: gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current || !cardsRef.current) return;
        const cards = Array.from(cardsRef.current.children) as HTMLElement[];

        ctx = gsap.context(() => {
          gsap.fromTo(
            cards,
            { y: 40, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              stagger: 0.1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }, sectionRef);
      } catch (e) {
        // Fail silently
      }
    };

    initGsap();
    return () => { if (ctx) ctx.revert(); };
  }, [filteredExperts]);

  return (
    <section ref={sectionRef} className="py-20 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b7ff015] border border-[#8b7ff030] text-[10px] font-black text-[#8b7ff0] uppercase tracking-[0.2em] mb-4">
            <Award className="w-3.5 h-3.5" aria-hidden="true" />
            Vetted Professionals
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.05] tracking-tighter mb-6 font-serif">
            Experts your family<br />
            can <span className="italic text-[#c5b8f8]">truly</span> trust
          </h2>
          <p className="text-lg text-[#8a8591] font-medium leading-relaxed">
            {isShowingFallback 
              ? `We're expanding into ${zone?.city}! While our local team is growing, these top-rated experts are available online right now.`
              : "Hand-vetted for clinical excellence, teaching quality, and real-world outcomes by child psychologists."
            }
          </p>
        </div>

        <Link 
          href="/specialists" 
          aria-label="Explore All Specialists"
          className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#1a1c2e] border border-white/5 text-xs font-black text-white uppercase tracking-[0.15em] hover:bg-[#23263b] hover:border-[#8b7ff040] transition-all transform active:scale-[0.98]"
        >
          Explore All Specialists 
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
        </Link>
      </div>

      {/* ── EXPERTS ROW (HIGH-DENSITY GRID) ── */}
      {isShowingFallback && (
        <div className="flex items-center gap-3 mb-8 px-5 py-4 rounded-2xl bg-[#1d9e7510] border border-[#1d9e7530]" role="alert">
          <Sparkles className="w-5 h-5 text-[#5dcaa5]" aria-hidden="true" />
          <span className="text-sm font-bold text-[#5dcaa5]">Showing top available experts who provide online sessions</span>
        </div>
      )}

      {/* ── EXPERTS GRID ── */}
      <div className="relative">
        <div 
          ref={cardsRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-6 pb-12 pt-10"
        >
          {filteredExperts.map((expert) => (
            <div 
              key={expert.id} 
              className="w-full flex"
            >
              <ProviderCard 
                provider={expert as any} 
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>


    </section>
  );
}
