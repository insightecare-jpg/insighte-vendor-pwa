import React from "react";
import { ServiceSign } from "@/types/services";

interface SignsSectionProps {
  signs: ServiceSign[];
}

export const SignsSection: React.FC<SignsSectionProps> = ({ signs }) => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Is this your child?
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Communication challenges look different for every child. Select the one that resonates most with your situation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {signs.map((sign) => (
            <button
              key={sign.id}
              className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl group-hover:bg-indigo-500/10 transition-all" />
              
              <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">
                {sign.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {sign.text}
              </h3>
              <div className="text-xs text-indigo-400 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                Explore pathways <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
