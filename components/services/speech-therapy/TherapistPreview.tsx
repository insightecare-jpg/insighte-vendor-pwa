import React from "react";
import { Provider } from "@/types";
import { ProviderCard } from "@/components/ui/provider-card";
import Link from "next/link";
import { Users } from "lucide-react";

interface TherapistPreviewProps {
  therapists: any[]; // Using any to match the dynamic data
}

export const TherapistPreview: React.FC<TherapistPreviewProps> = ({ therapists }) => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Available Experts</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
              Meet the specialists
            </h2>
            <p className="text-zinc-400">
              Browse from our pool of 48+ verified experts matched to your child's needs. All our therapists follow neuro-affirmative practices.
            </p>
          </div>
          <Link 
            href="/specialists?category=Speech%20Therapy"
            className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors flex items-center gap-2 group"
          >
            View all 48 experts
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapists.map((therapist) => (
            <ProviderCard key={therapist.id} provider={therapist as any} />
          ))}
        </div>
      </div>
    </section>
  );
};
