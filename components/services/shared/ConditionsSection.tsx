import React from "react";
import { ServiceCondition } from "@/types/services";

interface ConditionsSectionProps {
  conditions: ServiceCondition[];
}

export const ConditionsSection: React.FC<ConditionsSectionProps> = ({ conditions }) => {
  return (
    <section className="py-20 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              Conditions We Support
            </h2>
            <p className="text-zinc-400">
              Our specialists are trained in evidence-based protocols for various communication and feeding disorders.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">
              Verified Expertise
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {conditions.map((condition) => (
            <div
              key={condition.id}
              className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-900/80 transition-all flex gap-6"
            >
              <div className="text-4xl flex-shrink-0 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center">
                {condition.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {condition.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {condition.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
