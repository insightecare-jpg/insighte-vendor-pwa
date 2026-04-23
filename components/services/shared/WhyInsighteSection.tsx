import React from "react";
import { ServiceValueProp } from "@/types/services";

interface WhyInsighteSectionProps {
  valueProps: ServiceValueProp[];
}

export const WhyInsighteSection: React.FC<WhyInsighteSectionProps> = ({ valueProps }) => {
  return (
    <section className="py-24 px-6 bg-indigo-500/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
            Why Insighte?
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            We're building the future of neuro-affirmative care, one child at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:border-indigo-500/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-500/10 transition-all">
                {prop.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {prop.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 text-center">
            <p className="text-indigo-200 text-lg md:text-xl font-medium max-w-3xl mx-auto italic">
                "Our mission is to ensure every child is celebrated for who they are, while giving them the tools to navigate the world with confidence."
            </p>
        </div>
      </div>
    </section>
  );
};
