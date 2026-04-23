"use client";

import React from "react";
import { Sparkles, Calendar, PlusCircle, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface DashboardHeroProps {
  userName: string;
  hasBooking: boolean;
  onAddChild: () => void;
  onFindSpecialist: () => void;
}

export function DashboardHero({ userName, hasBooking, onAddChild, onFindSpecialist }: DashboardHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0d1117] to-[#1a2234] border border-white/5 p-8 md:p-12 mb-8">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-[#2de0c4]/10 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2de0c4]/10 text-[#2de0c4] text-xs font-bold uppercase tracking-widest mb-6 border border-[#2de0c4]/20 animate-pulse">
            <Sparkles className="w-3 h-3" />
            Sanctuary Hub
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-white mb-6 leading-tight">
            Greetings, {userName.split(' ')[0]}.
            <br />
            {hasBooking ? (
              <span className="text-zinc-400">Your care journey is in motion.</span>
            ) : (
              <span className="text-zinc-400">Let's find the right care for your child.</span>
            )}
          </h1>
          
          <p className="text-lg text-zinc-400 mb-8 max-w-xl">
            {hasBooking 
              ? "Track sessions, manage progress, and coordinate with your specialists all in one place."
              : "Book sessions, track progress, and manage care in one place. Complete your child's profile for better matching."
            }
          </p>
          
          <div className="flex flex-wrap gap-4">
            {!hasBooking ? (
              <>
                <Button 
                  onClick={onFindSpecialist}
                  className="h-14 px-8 rounded-2xl bg-[#2de0c4] text-black font-black hover:scale-105 transition-all text-base group"
                >
                  <Search className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Find Specialists
                </Button>
                <Button 
                  variant="outline"
                  onClick={onAddChild}
                  className="h-14 px-8 rounded-2xl border-white/10 hover:bg-white/5 text-white font-bold"
                >
                  <PlusCircle className="mr-2 w-5 h-5" />
                  Add Child Profile
                </Button>
              </>
            ) : (
              <Button 
                className="h-14 px-8 rounded-2xl bg-white text-black font-black hover:scale-105 transition-all text-base group"
              >
                <Calendar className="mr-2 w-5 h-5" />
                View Upcoming Sessions
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Floating Insight Card for Mobile/Side */}
      <div className="hidden lg:block absolute bottom-12 right-12 w-64 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#2de0c4]/30 transition-all">
        <p className="text-xs text-zinc-500 uppercase tracking-widest font-black mb-2 italic">Parent Tip</p>
        <p className="text-sm text-zinc-300 leading-relaxed">
          "Consistency is the heartbeat of growth. Synchronize your home routines with therapy goals for 2x impact."
        </p>
      </div>
    </div>
  );
}
