"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Quote, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  type: "text" | "video";
  author: string;
  role: string;
  org: string;
  content: string;
  thumbnail?: string;
  videoUrl?: string;
  accentColor?: string;
  accentBg?: string;
  initials?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    type: "text",
    author: "Deepak Sharma",
    role: "Parent",
    org: "Indiranagar, Bangalore",
    content:
      "We were overwhelmed and didn't know where to start. Insighte helped us find the right therapist in one day. Our son's speech has improved dramatically in just 3 months.",
    accentColor: "#c5b8f8",
    accentBg: "rgba(139,127,240,0.12)",
    initials: "DS",
  },
  {
    id: "t2",
    type: "video",
    author: "Anjali Rao",
    role: "Mother of Two",
    org: "The Valley School",
    content: "Hear how Anjali found the right support for her child's learning journey.",
    thumbnail:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    accentColor: "#85B7EB",
    accentBg: "rgba(24,95,165,0.12)",
    initials: "AR",
  },
  {
    id: "t3",
    type: "text",
    author: "Dr. Kavita Menon",
    role: "Pediatrician",
    org: "Bangalore Children's Clinic",
    content:
      "As a pediatrician, I recommend Insighte to families because every specialist is verified and uses evidence-based methods. It's the platform our city needed.",
    accentColor: "#5DCAA5",
    accentBg: "rgba(29,158,117,0.12)",
    initials: "KM",
  },
  {
    id: "t4",
    type: "video",
    author: "Rohan Varma",
    role: "Father",
    org: "Inventure Academy",
    content: "Rohan shares how easy it was to book the right therapist and the impact on his family.",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    accentColor: "#F0997B",
    accentBg: "rgba(216,90,48,0.12)",
    initials: "RV",
  },
  {
    id: "t5",
    type: "text",
    author: "Priyanka Nair",
    role: "Parent",
    org: "HSR Layout, Bangalore",
    content:
      "I was scared about starting therapy for my daughter. Insighte matched us with a specialist who understood her exactly. She now looks forward to every session.",
    accentColor: "#EF9F27",
    accentBg: "rgba(239,159,39,0.12)",
    initials: "PN",
  },
];

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="relative px-6 py-20 bg-[#0d0f1a] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[700px] h-[500px] bg-[#8b7ff0]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-8 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#8a8591]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8a8591]" aria-hidden="true" />
              Real Stories
            </div>
            <h2 className="font-dm-serif text-3xl md:text-5xl text-[#f0ece4] leading-tight">
              Parents like you found<br />the right support
            </h2>
            <p className="text-sm md:text-base text-[#8a8591] max-w-md leading-relaxed font-manrope">
              Real families. Real impact. Not marketing copy.
            </p>
          </div>

          {/* Scroll buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8a8591] hover:bg-white/10 hover:text-white transition-all active:scale-90"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8a8591] hover:bg-white/10 hover:text-white transition-all active:scale-90"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 no-scrollbar scroll-smooth"
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="min-w-[320px] md:min-w-[400px] flex-shrink-0 snap-start bg-white/[0.04] border border-white/[0.08] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-1 flex flex-col"
            >
              {t.type === "text" ? (
                <div className="p-10 flex flex-col h-full min-h-[320px]">
                  <Quote className="w-8 h-8 text-[#8b7ff0] opacity-40 mb-8" />
                  <p className="text-base md:text-lg text-[#f0ece4] leading-relaxed italic font-manrope flex-1">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-dm-serif text-lg font-black italic text-[#8b7ff0]">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-base font-bold text-[#f0ece4] leading-none mb-1">{t.author}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#8a8591]">{t.role} · {t.org}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative min-h-[320px] flex flex-col">
                  <div className="absolute inset-0">
                    <img
                      src={t.thumbnail}
                      alt={t.author}
                      className="w-full h-full object-cover opacity-40 grayscale-[0.3]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-[#0d0f1a]/40 to-transparent" />
                  </div>

                  <div className="relative z-10 p-10 flex flex-col justify-between h-full min-h-[320px]">
                    <div className="self-start px-3 py-1.5 rounded-full bg-[#e8e2d8] text-[#0d0f1a] text-[9px] font-black uppercase tracking-widest">
                      Video Story
                    </div>

                    <div className="flex items-center justify-center flex-1">
                      <button
                        onClick={() => setActiveVideo(t.videoUrl || null)}
                        className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-xl flex items-center justify-center text-[#0d0f1a] shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
                        aria-label="Play video"
                      >
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </button>
                    </div>

                    <div>
                      <div className="text-lg font-bold text-[#f0ece4] mb-1 font-manrope">Watch {t.author.split(" ")[0]}&rsquo;s story</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#8a8591]">{t.role} · {t.org}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0d0f1a]/95 backdrop-blur-3xl"
          >
            <button
              className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-5xl aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
              <iframe
                src={activeVideo}
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
