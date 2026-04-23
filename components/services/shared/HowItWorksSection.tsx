import React from "react";
import { ServiceStep } from "@/types/services";

interface HowItWorksSectionProps {
  steps: ServiceStep[];
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ steps }) => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent hidden lg:block" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            How it works
          </h2>
          <p className="text-zinc-400">
            Three simple steps to starting your child's communication journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-black text-indigo-400">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-[280px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
