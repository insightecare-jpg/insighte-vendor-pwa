import React from "react";
import { AgeGroupPathway } from "@/types/services";
import { Check } from "lucide-react";

interface PathwaysSectionProps {
  ageGroups: AgeGroupPathway[];
}

export const PathwaysSection: React.FC<PathwaysSectionProps> = ({ ageGroups }) => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
            Age-Based Pathways
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Speech milestones change as children grow. We've designed specialized tracks for each developmental stage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ageGroups.map((group) => (
            <div
              key={group.id}
              className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex flex-col h-full"
            >
              <div className="text-5xl mb-6">{group.icon}</div>
              <div className="mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">
                  {group.ageRange}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {group.title}
                </h3>
              </div>
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                {group.description}
              </p>
              
              <div className="space-y-3 mt-auto border-t border-white/5 pt-6">
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Focus Areas
                </div>
                {group.focusPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-indigo-400" />
                    </div>
                    {point}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
