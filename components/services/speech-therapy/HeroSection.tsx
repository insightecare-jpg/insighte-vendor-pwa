import React from "react";
import Link from "next/link";
import { ServiceHero } from "@/types/services";
import { MessageSquare, Calendar, Shield } from "lucide-react";

interface HeroSectionProps {
  data: ServiceHero;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <Shield className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200/80">
            {data.trustBadge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
          {data.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          {data.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={data.primaryCTA.href}
            className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 font-bold rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5"
          >
            <Calendar className="w-5 h-5" />
            {data.primaryCTA.text}
          </Link>
          <Link
            href={data.secondaryCTA.href}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <MessageSquare className="w-5 h-5 text-green-400" />
            {data.secondaryCTA.text}
          </Link>
        </div>

        {/* Floating Indicator for continuity */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-bounce opacity-40">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-indigo-500 to-transparent" />
        </div>
      </div>
    </section>
  );
};
