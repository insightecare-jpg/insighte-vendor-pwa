"use client";

import React from "react";
import { User, MapPin, School, GraduationCap, Target, ChevronRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface ChildProfileCardProps {
  child: any;
  onClick?: () => void;
}

export function ChildProfileCard({ child, onClick }: ChildProfileCardProps) {
  const isComplete = child.school && child.class_grade && child.city;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group relative h-full bg-[#0d1117] rounded-[2rem] border border-white/5 p-6 hover:border-[#2de0c4]/30 transition-all cursor-pointer overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
        <User className="w-24 h-24 text-white" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2de0c4] to-[#1a8e7b] flex items-center justify-center shadow-lg shadow-[#2de0c4]/20 overflow-hidden relative">
              {child.avatar_url ? (
                <img src={child.avatar_url} alt={child.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-serif italic text-black font-black">{child.name[0]}</span>
              )}
            </div>
            <div>
              <h3 className="text-xl font-serif italic text-white">{child.name}</h3>
              <p className="text-xs text-zinc-500 font-black uppercase tracking-widest italic">{child.age} Years • {child.diagnosis || 'Diagnosis Pending'}</p>
            </div>
          </div>
          {!isComplete && (
            <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[8px] font-black uppercase tracking-widest animate-pulse">
              Incomplete Profile
            </div>
          )}
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-zinc-400">
            <School className="w-4 h-4 text-[#2de0c4]" />
            <span className="text-xs font-bold">{child.school || 'School not set'}</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-400">
            <GraduationCap className="w-4 h-4 text-[#2de0c4]" />
            <span className="text-xs font-bold">{child.class_grade || 'Grade not set'}</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-400">
            <MapPin className="w-4 h-4 text-[#2de0c4]" />
            <span className="text-xs font-bold">{child.area ? `${child.area}, ${child.city}` : 'Location not set'}</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="flex items-center justify-between group-hover:text-[#2de0c4] transition-colors">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">View Progress Notes</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
