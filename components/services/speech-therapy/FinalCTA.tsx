import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-indigo-900 via-[#0d0f1a] to-blue-900 border border-indigo-500/20 p-12 md:p-20 text-center">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[#0d0f1a]/80 backdrop-blur-3xl" />
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-indigo-500/20 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-blue-500/20 to-transparent" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Your child deserves <br className="hidden md:block" />
              <span className="text-indigo-400 font-black italic">to be heard.</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 500+ families who chose Insighte for neuro-affirmative communication support. Start with a free screening today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book?service=speech-therapy"
                className="group w-full sm:w-auto px-10 py-5 bg-white text-zinc-950 font-bold rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/20"
              >
                <Calendar className="w-5 h-5" />
                Book Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/specialists"
                className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md"
              >
                See All Specialists
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
