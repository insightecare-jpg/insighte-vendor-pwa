"use client";

import React from "react";
import { MessageSquare, Phone, Mail, HelpCircle, ChevronRight, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6 md:p-12 pb-32">
      <header className="max-w-4xl mx-auto mb-16 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2de0c4]/10 border border-[#2de0c4]/20 text-[#2de0c4] text-[8px] font-black uppercase tracking-widest mb-6 italic"
        >
          <Sparkles className="w-3 h-3" /> Dedicated Concierge
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-serif italic mb-6">How can we help you?</h1>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
          Our team is here to support your care journey. Whether it's a technical issue, billing query, or clinical guidance, we've got you covered.
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Support Channels */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif italic mb-4">Direct Channels</h2>
          
          <button className="w-full p-8 rounded-[2rem] bg-[#2de0c4] text-black hover:scale-[1.02] transition-all flex items-center justify-between group shadow-xl shadow-[#2de0c4]/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-lg font-black italic">WhatsApp Support</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">Response time: &lt; 10 mins</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="w-full p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-lg font-black italic">Email Us</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">For formal requests & documentation</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* FAQs / Self-Support */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10">
          <h2 className="text-xl font-serif italic mb-8 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-[#2de0c4]" />
            Quick FAQ
          </h2>
          <div className="space-y-8">
            {[
              "How do I reschedule a session?",
              "Where can I find my child's reports?",
              "How does the package sharing work?",
              "Updating my billing information"
            ].map((q) => (
              <button key={q} className="w-full text-left group">
                <p className="text-sm font-bold text-zinc-400 group-hover:text-[#2de0c4] transition-colors mb-2 italic">{q}</p>
                <div className="h-px w-full bg-white/5 group-hover:bg-[#2de0c4]/20 transition-all" />
              </button>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-12 h-14 rounded-2xl bg-white/5 text-white font-bold text-xs uppercase tracking-widest italic">
            Visit Knowledge Base
          </Button>
        </div>
      </div>
    </div>
  );
}
