import React from "react";
import { Provider } from "@/types";
import { ProviderCard } from "@/components/ui/provider-card";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";

interface TherapistPreviewProps {
  therapists: any[]; 
  viewAllHref?: string;
  categoryName?: string;
  serviceId?: string;
  poolCount?: number;
  availableCount?: number;
}

export const TherapistPreview: React.FC<TherapistPreviewProps> = ({ 
  therapists, 
  viewAllHref = "/specialists",
  categoryName = "experts",
  serviceId,
  poolCount = 48,
  availableCount = 46
}) => {
  // Derive category for filter from serviceId or categoryName
  const filterCategory = serviceId ? serviceId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : categoryName;

  return (
    <section id="specialists" className="py-24 px-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Strictly Verified Specialists</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
              Meet your specialized care team
            </h2>
            <p className="text-zinc-400">
              Browse from our pool of {poolCount}+ verified specialists matched to your child's needs. Every expert is screened for neuro-affirmative excellence.
            </p>
          </div>
          
          <div className="hidden md:flex flex-col items-end gap-2">
             <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-zinc-300">{availableCount} specialists available today</span>
             </div>
          </div>
        </div>

        {/* New Refined Filter & Action Bar */}
        <div className="mb-12 space-y-6">
          {/* Availability Ticker Line */}
          <div className="flex items-center gap-4 py-3 px-1 border-y border-white/5 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{availableCount} Specialists Available Today</span>
            </div>
            <div className="flex-1 overflow-hidden">
               <div className="flex gap-8 animate-marquee whitespace-nowrap">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
                      Instant Assessment Slots • Verified Professionals • Neuro-Affirmative Care • Home & Online
                    </span>
                  ))}
               </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-6 px-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0d0f1a] bg-zinc-800 overflow-hidden">
                    <img src={`/images/experts/expert_${i === 4 ? 5 : i}.png`} alt="Expert" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-[#0d0f1a] bg-indigo-600 flex items-center justify-center text-[8px] font-bold text-white">
                  +{poolCount - 4}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-white">Neuro-Inclusive Matching</p>
                <p className="text-[10px] text-zinc-500">Filter specialists by communication style, language, and clinical focus.</p>
              </div>
            </div>
            
            <Link 
              href={`/specialists?category=${encodeURIComponent(filterCategory)}`}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-500 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-600 hover:scale-[1.02] active:scale-[0.95] shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-4 group"
            >
              Check Availability
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>


        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapists.map((therapist) => (
            <ProviderCard 
              key={therapist.id} 
              provider={therapist as any} 
              hrefOverride={serviceId ? `/booking/checkout?type=expert_session&expertId=${therapist.id}&service=${serviceId}` : undefined}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
            <Link 
                href={viewAllHref}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all group"
            >
                View all consultation options
                <span className="group-hover:translate-x-1 transition-transform text-indigo-400">→</span>
            </Link>
        </div>
      </div>
    </section>
  );
};
