"use client";

import React, { useState } from "react";
import { Search, MapPin, BrainCircuit, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface SpecialistMatcherProps {
  children?: any[];
  onSearch: (filters: any) => void;
}

export function SpecialistMatcher({ children = [], onSearch }: SpecialistMatcherProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    childId: "",
    service: "",
    location: "",
    mode: "ONLINE"
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="bg-[#111224] rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2de0c4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-serif italic text-white mb-8 flex items-center gap-3">
          <BrainCircuit className="w-6 h-6 text-[#2de0c4]" />
          Match Specialist
        </h2>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 italic">Select Child</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => {
                        setFormData({ ...formData, childId: child.id });
                        nextStep();
                      }}
                      className={`p-4 rounded-2xl border transition-all text-sm font-bold ${
                        formData.childId === child.id 
                        ? "bg-[#2de0c4] border-[#2de0c4] text-black" 
                        : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20"
                      }`}
                    >
                      {child.name}
                    </button>
                  ))}
                  <button className="p-4 rounded-2xl bg-dashed border-2 border-dashed border-white/10 hover:border-[#2de0c4]/50 text-zinc-500 hover:text-[#2de0c4] transition-all flex items-center justify-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    New
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4 text-white">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 italic">What kind of support are you looking for?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["Speech Therapy", "Occupational Therapy", "Remedial Education", "Psychology"].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setFormData({ ...formData, service: s });
                        nextStep();
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all group ${
                        formData.service === s 
                        ? "bg-[#2de0c4] border-[#2de0c4] text-black" 
                        : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20"
                      }`}
                    >
                      <span className="block text-sm font-black">{s}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={prevStep} className="text-zinc-500 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">Back</button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 italic">Preferred Mode & Location</label>
                <div className="flex gap-2 mb-4">
                  {['ONLINE', 'HOME', 'CLINIC'].map(m => (
                    <button 
                      key={m}
                      onClick={() => setFormData({...formData, mode: m})}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                        formData.mode === m 
                        ? "bg-[#2de0c4] border-[#2de0c4] text-black" 
                        : "bg-white/5 border-white/10 text-zinc-500"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Enter your area (e.g. Indiranagar)" 
                    className="h-14 pl-11 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-[#2de0c4]/50 focus:ring-0"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={prevStep} variant="ghost" className="text-zinc-500 font-bold">Back</Button>
                <Button 
                  onClick={() => onSearch(formData)}
                  className="flex-1 h-14 rounded-2xl bg-[#2de0c4] text-black font-black hover:scale-105 transition-all"
                >
                  Find Top Matches
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? "w-8 bg-[#2de0c4]" : "w-1.5 bg-white/10"}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
