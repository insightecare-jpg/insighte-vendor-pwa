"use client";

import React from "react";
import { Calendar, Clock, Video, MapPin, MoreVertical, ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface UpcomingCareCardProps {
  booking: any;
}

export function UpcomingCareCard({ booking }: UpcomingCareCardProps) {
  const startTime = new Date(booking.start_time);
  const isOnline = booking.mode === 'ONLINE' || booking.partners?.mode === 'Online' || booking.partners?.mode === 'Hybrid';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#2de0c4] rounded-[2.5rem] p-8 text-black relative shadow-2xl shadow-[#2de0c4]/20 overflow-hidden"
    >
      {/* Decorative Wave */}
      <div className="absolute bottom-0 right-0 p-8 opacity-10">
        <Calendar className="w-48 h-48 -rotate-12" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 text-[10px] font-black uppercase tracking-widest italic mb-4 border border-black/10">
              <Calendar className="w-3 h-3" />
              Upcoming Session
            </span>
            <h2 className="text-3xl font-serif italic font-black leading-tight">
              {booking.services?.title || "Therapy Session"}
              <br />
              with {booking.partners?.name}
            </h2>
          </div>
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/50 italic">Date</p>
            <div className="flex items-center gap-2 font-bold">
              <Calendar className="w-4 h-4" />
              {format(startTime, "eee, MMM do")}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/50 italic">Time</p>
            <div className="flex items-center gap-2 font-bold">
              <Clock className="w-4 h-4" />
              {format(startTime, "h:mm a")}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/50 italic">Mode</p>
            <div className="flex items-center gap-2 font-bold">
              {isOnline ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
              {booking.mode || "Online"}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-black/50 italic">Balance</p>
            <div className="flex items-center gap-2 font-bold">
              <Activity className="w-4 h-4" />
              3 Sessions left
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {isOnline ? (
            <Button className="h-14 px-8 rounded-2xl bg-black text-[#2de0c4] font-black hover:scale-105 transition-all text-base group">
              <Video className="mr-2 w-5 h-5 group-hover:animate-pulse" />
              Join Session
            </Button>
          ) : (
            <Button className="h-14 px-8 rounded-2xl bg-black text-[#2de0c4] font-black hover:scale-105 transition-all text-base group">
              <MapPin className="mr-2 w-5 h-5" />
              Get Directions
            </Button>
          )}
          <Button variant="ghost" className="h-14 px-8 rounded-2xl bg-black/5 hover:bg-black/10 text-black font-bold">
            Reschedule
          </Button>
          <Button variant="ghost" className="h-14 px-8 rounded-2xl bg-black/5 hover:bg-black/10 text-black font-bold">
            <MessageCircle className="mr-2 w-5 h-5" />
            Support
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Inline Activity component since it's not imported
function Activity({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );
}
