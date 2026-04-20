import React from "react";
import { ServiceFAQ } from "@/types/services";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FAQSectionProps {
  faqs: ServiceFAQ[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-white/[0.02]">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-white/5 mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <HelpCircle className="w-3 h-3" />
            Support
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
            Common Questions
          </h2>
          <p className="text-zinc-500">
            Everything you need to know about starting speech therapy with Insighte.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden"
            >
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                <span className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors pr-6">
                  {faq.question}
                </span>
                <ChevronDown className="w-5 h-5 text-zinc-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-8 pb-8">
                <div className="h-px bg-white/5 mb-6" />
                <p className="text-zinc-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-[2rem] border border-dashed border-white/10 text-center">
            <p className="text-sm text-zinc-500">
                Still have questions? <Link href="/contact" className="text-indigo-400 hover:underline">Speak with our care team</Link> or <Link href="https://wa.me/91XXXXXXXXXX" className="text-green-400 hover:underline">WhatsApp us</Link>.
            </p>
        </div>
      </div>

      {/* Decorative background blur */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

// Help for Link component
import Link from "next/link";
