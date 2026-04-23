"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Heart,
  ChevronRight,
  Star,
  Quote,
  Clock,
  Layout,
  ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── DATA & TYPES ─────────────────────────────────────────────────────────────

type Audience = "parent" | "educator" | "adult" | "all";

interface Program {
  id: string;
  type: "core" | "course" | "community";
  title: string;
  name: string;
  persona: string[];
  proof: string;
  slot: string;
  price: string;
  cta: string;
  tags: string[];
  image: string;
  outcomes: string[];
  featured?: boolean;
}

const PROGRAMS: Program[] = [
  {
    id: "aba-momentum",
    type: "core",
    title: "Communication breakthroughs for your child.",
    name: "ABA Momentum Therapy",
    persona: ["parent"],
    proof: "1,200+ success stories",
    slot: "Next cohort: 12 May · 4 spots",
    price: "From ₹12,500/mo",
    cta: "Enroll Now",
    tags: ["Home-based", "Evidence-led"],
    image: "/images/programs/aba-momentum.png",
    outcomes: ["Increased verbal imitation", "Functional communication", "Reduced meltdowns"],
    featured: true
  },
  {
    id: "shadow-teaching",
    type: "core",
    title: "Navigate classrooms with absolute confidence.",
    name: "Shadow Teaching Integration",
    persona: ["parent"],
    proof: "500+ schools · 4.8★",
    slot: "Limited spots for June",
    price: "From ₹8,500/mo",
    cta: "Enroll Now",
    tags: ["School-based", "1:1 Support"],
    image: "/images/programs/shadow-teaching.png",
    outcomes: ["Social inclusion", "Academic focus", "Peer interaction"]
  },
  {
    id: "neuro-classroom",
    type: "course",
    title: "Architecture of a neuro-inclusive classroom.",
    name: "Neuro-Inclusive Classroom Design",
    persona: ["educator"],
    proof: "214+ educators certified",
    slot: "Cohort starts 18 May",
    price: "₹4,999",
    cta: "Get Certified",
    tags: ["Hybrid Course", "Professional"],
    image: "/images/programs/neuro-classroom.png",
    outcomes: ["Sensory-friendly layouts", "UDL implementation", "Behavior support"]
  },
  {
    id: "family-advocacy",
    type: "course",
    title: "Become the strongest advocate for your child.",
    name: "Family Advocacy Masterclass",
    persona: ["parent"],
    proof: "Used by 450+ families",
    slot: "Self-paced + weekly sync",
    price: "₹2,499",
    cta: "Start Learning",
    tags: ["Online Course", "Self-paced"],
    image: "/images/programs/family-advocacy.png",
    outcomes: ["IEP negotiation", "Legal rights knowledge", "Community navigation"]
  },
  {
    id: "parent-circle",
    type: "community",
    title: "A safe space to share, heal, and learn.",
    name: "Parent Support Circle",
    persona: ["parent"],
    proof: "85 active members",
    slot: "Every Sat 5:00 PM",
    price: "Free to Join",
    cta: "Join Free",
    tags: ["Community", "Weekly"],
    image: "/images/programs/parent-circle.png",
    outcomes: ["Emotional support", "Resource sharing", "Expert guest chats"]
  },
  {
    id: "adhd-nexus",
    type: "community",
    title: "Navigating adulthood with ADHD, together.",
    name: "Adult ADHD Nexus",
    persona: ["adult"],
    proof: "42 active members",
    slot: "Alt Thursdays 7:30 PM",
    price: "Free to Join",
    cta: "Join Free",
    tags: ["Adult ADHD", "Community"],
    image: "/images/programs/adhd-nexus.png",
    outcomes: ["Executive function hacks", "Body doubling sessions", "Neurodivergent joy"]
  }
];

const TESTIMONIALS = [
  {
    name: "Priya V.",
    age: "Parent of Arjun, 6",
    program: "ABA Momentum",
    quote: "For the first time in years, our home feels calm. The clinical team didn't just 'treat' Arjun, they understood him.",
    avatar: "PV"
  },
  {
    name: "Dr. Ramesh K.",
    age: "School Administrator",
    program: "Shadow Teaching",
    quote: "The integration process was seamless. Insighte shadows are trained with a depth we haven't seen elsewhere.",
    avatar: "RK"
  },
  {
    name: "Sarah M.",
    age: "Adult with ADHD",
    program: "ADHD Nexus",
    quote: "Finding a group that doesn't try to 'fix' you but helps you flow is life-changing.",
    avatar: "SM"
  }
];

const VALUE_LADDER = [
  { id: "community", name: "Circles", price: "Free", commitment: "Weekly", for: "Everyone", desc: "Low-friction peer support." },
  { id: "courses", name: "Courses", price: "₹X", commitment: "Self-paced", for: "Parents & Pros", desc: "Deep-dive learning." },
  { id: "programs", name: "Programs", price: "₹XX", commitment: "Structured", for: "Clinical Need", desc: "Evidence-led interventions." },
  { id: "intensive", name: "1:1 Care", price: "₹XXX", commitment: "Dedicated", for: "High Intensity", desc: "Personalized specialist support." }
];

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────

const StatCounter = ({ end, label, prefix = "", suffix = "" }: { end: number, label: string, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = (end - start) / steps;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center px-2">
      <div className="text-xl md:text-2xl font-black text-[#2de0c4] font-dm-sans">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-[9px] uppercase tracking-widest text-slate-500 mt-1 font-bold leading-tight">
        {label}
      </div>
    </div>
  );
};

const ProgramCard = ({ program, audience }: { program: Program, audience: Audience }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-[24px] overflow-hidden transition-all duration-500 hover:border-[#2de0c4]/30 hover:bg-white/[0.06] h-full"
    >
      {/* Visual Header */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={program.image} 
          alt={program.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-40" />
        <div className="absolute top-3 left-3 flex gap-2">
          {program.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[8px] font-black tracking-widest text-[#2de0c4] uppercase border border-[#2de0c4]/20">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="font-serif-display text-lg leading-tight mb-1 text-white group-hover:text-[#2de0c4] transition-colors">
          {program.title}
        </h3>
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 block">
          {program.name}
        </span>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3 h-3 text-[#2de0c4]" />
            <span className="font-bold">{program.proof}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <Clock className="w-3 h-3" />
            <span className="font-medium">{program.slot}</span>
          </div>
        </div>

        {/* Expandable Outcomes on Hover */}
        <div className={cn(
          "transition-all duration-500 overflow-hidden",
          isHovered ? "max-h-20 opacity-100 mb-4" : "max-h-0 opacity-0 mb-0"
        )}>
          <div className="pt-3 border-t border-white/5 space-y-1.5">
            {program.outcomes.slice(0, 2).map(o => (
              <div key={o} className="flex items-center gap-2 text-[10px] text-slate-400">
                <div className="w-1 h-1 rounded-full bg-[#2de0c4]" />
                {o}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase tracking-widest text-[#2de0c4]">Enrolling</span>
            <span className="text-sm font-black text-white font-dm-sans">{program.price}</span>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full bg-[#2de0c4] text-[#0d1117] flex items-center justify-center transition-all hover:bg-white"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function ProgramsRedesign() {
  const [audience, setAudience] = useState<Audience>("all");
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPrograms = PROGRAMS.filter(p => 
    audience === "all" || p.persona.includes(audience)
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-50 font-dm-sans selection:bg-[#2de0c4]/30 overflow-x-hidden">
      
      {/* Standard Navbar handled by Shell */}

      <main>
        
        {/* ═══ HERO SECTION ═══════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-16 px-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-radial from-[#2de0c4]/5 to-transparent -z-10" />
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl lg:text-5xl font-black tracking-tighter text-white mb-4 leading-tight font-dm-sans"
            >
              Precision care for every <br className="hidden md:block" />
              <span className="text-[#2de0c4] font-serif-display italic">neuro-signature.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-medium"
            >
              Select your path to browse specialized programs engineered for meaningful growth.
            </motion.p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["parent", "educator", "adult"] as const).map((type, idx) => (
              <motion.button
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                onClick={() => setAudience(type)}
                className={cn(
                  "relative group h-32 rounded-3xl overflow-hidden border transition-all duration-300",
                  audience === type 
                    ? "bg-[#2de0c4]/10 border-[#2de0c4]" 
                    : "bg-white/[0.03] border-white/5 hover:border-white/20"
                )}
              >
                <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors",
                    audience === type ? "bg-[#2de0c4] text-[#0d1117]" : "bg-white/5 text-[#2de0c4]"
                  )}>
                    {type === "parent" && <Heart className="w-5 h-5" />}
                    {type === "educator" && <GraduationCap className="w-5 h-5" />}
                    {type === "adult" && <Sparkles className="w-5 h-5" />}
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em]",
                    audience === type ? "text-[#2de0c4]" : "text-slate-400 group-hover:text-white"
                  )}>
                    {type === "adult" ? "Adult ADHD" : `${type}`}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ═══ TRUST BAR ══════════════════════════════════════════════════════ */}
        <section className="bg-white/[0.01] border-y border-white/5 py-8">
          <div className="max-w-5xl mx-auto px-6 flex justify-between gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
            <StatCounter end={500} label="Schools" suffix="+" />
            <StatCounter end={1200} label="Families" suffix="+" />
            <StatCounter end={4.9} label="Rating" suffix="/5" />
            <StatCounter end={2016} label="Established" prefix="Est " />
          </div>
        </section>

        {/* ═══ GRID SECTION ═══════════════════════════════════════════════════ */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center md:text-left mb-12">
             <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase mb-2">
               Core <span className="text-[#2de0c4] font-serif-display italic">Pathways</span>
             </h2>
             <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
               Clinical rigor meets parental warmth.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((prog) => (
                <ProgramCard key={prog.id} program={prog} audience={audience} />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ═══ COMMUNITY ENTRY ════════════════════════════════════════════════ */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="relative p-8 md:p-16 rounded-[32px] bg-gradient-to-br from-[#2de0c4]/10 via-transparent to-transparent border border-white/5 overflow-hidden">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter mb-4 uppercase leading-none">
                Not ready for a program? <br />
                <span className="text-[#2de0c4] font-serif-display italic">Join the circles.</span>
              </h2>
              <p className="text-sm text-slate-400 mb-8 max-w-lg font-medium">
                Free, expert-guided spaces for parents and adults to connect and share without friction.
              </p>
              <div className="flex gap-3">
                <Link href="/triage" className="px-6 py-3 rounded-xl bg-[#2de0c4] text-[#0d1117] text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
                  Browse Circles
                </Link>
                <Link href="/about" className="px-6 py-3 rounded-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                  Our Method
                </Link>
              </div>
            </div>
            
            <div className="absolute top-1/2 right-[-10%] translate-y-[-50%] opacity-5 hidden lg:block">
               <Users className="w-96 h-96" />
            </div>
          </div>
        </section>

        {/* ═══ VALUE LADDER ═══════════════════════════════════════════════════ */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VALUE_LADDER.map(node => (
                <div key={node.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center transition-all hover:bg-white/[0.05]">
                  <div className="text-[8px] font-black uppercase tracking-widest text-[#2de0c4] mb-2">{node.commitment}</div>
                  <h4 className="text-sm font-black text-white uppercase mb-1">{node.name}</h4>
                  <p className="text-[9px] text-slate-500 font-bold leading-tight">{node.desc}</p>
                </div>
              ))}
           </div>
        </section>

      </main>

    </div>
  );
}
