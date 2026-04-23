"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart, ShieldCheck, ArrowRight, Target, Sparkles,
  Users, Award, Globe, Zap, Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── TEAM DATA ────────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: "Midhun Noble", role: "Founder & CEO", dept: "leadership",
    initials: "MN", accent: "#c5b8f8", accentBg: "rgba(139,127,240,0.15)",
    bio: "Parent, architect, and advocate. Midhun built Insighte after realising how fractured and inaccessible the care ecosystem was for Indian families.",
  },
  {
    name: "Trisha Mukherjee", role: "Chief Clinical Officer", dept: "clinical",
    initials: "TM", accent: "#5DCAA5", accentBg: "rgba(29,158,117,0.15)",
    bio: "20+ years in pediatric psychology and neuro-affirming practice. Trisha leads the clinical framework and specialist vetting at Insighte.",
  },
  {
    name: "Dr. Ananya Rao", role: "Lead Speech Pathologist", dept: "clinical",
    initials: "AR", accent: "#85B7EB", accentBg: "rgba(24,95,165,0.15)",
    bio: "Pioneer in communication-first speech therapy. Dr. Rao trains our speech therapy specialists and designs assessment protocols.",
  },
  {
    name: "Riya Venkatesan", role: "Head of Partner Success", dept: "ops",
    initials: "RV", accent: "#F0997B", accentBg: "rgba(216,90,48,0.15)",
    bio: "Former special educator turned ops lead. Riya ensures every specialist joining Insighte is supported, retained, and growing.",
  },
  {
    name: "Arjun Mehta", role: "Head of Engineering", dept: "tech",
    initials: "AM", accent: "#97C459", accentBg: "rgba(59,109,17,0.15)",
    bio: "Architect of the Insighte platform. Arjun believes technology should be invisible — it should just work, accessibly, for everyone.",
  },
  {
    name: "Kavya Suresh", role: "Community Manager", dept: "ops",
    initials: "KS", accent: "#EF9F27", accentBg: "rgba(239,159,39,0.15)",
    bio: "Kavya grows the Insighte parent and practitioner community, running our support groups and digital spaces.",
  },
];

const DEPT_TABS = [
  { id: "all", label: "All" },
  { id: "leadership", label: "Leadership" },
  { id: "clinical", label: "Clinical" },
  { id: "tech", label: "Tech" },
  { id: "ops", label: "Operations" },
];

const VALUES = [
  { icon: <Heart className="w-5 h-5" />, title: "Connection Before Correction", desc: "We lead with empathy. Our platform never hard-fails — every touchpoint is designed to feel like a warm hand, not a locked door.", color: "#c5b8f8" },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Neuro-Affirming, Always", desc: "We design for every brain. No flickering, no cognitive overload — every experience is built around how children and parents actually process the world.", color: "#5DCAA5" },
  { icon: <Award className="w-5 h-5" />, title: "Clinical Integrity", desc: "Only vetted, credentialed specialists on Insighte. We'd rather have fewer experts than compromise on the quality of care your child receives.", color: "#85B7EB" },
  { icon: <Globe className="w-5 h-5" />, title: "Radical Accessibility", desc: "Care shouldn't be a privilege. We actively work to make quality support affordable, local, and available to families across India's tier-1 and tier-2 cities.", color: "#EF9F27" },
];

const STATS = [
  { value: "1,000+", label: "Families supported" },
  { value: "200+", label: "Verified specialists" },
  { value: "12", label: "Cities active" },
  { value: "< 24h", label: "Avg match time" },
];

const CAREERS = [
  { title: "Clinical Quality Lead", dept: "Clinical", type: "Full-time · Bangalore", desc: "Own the specialist vetting, training, and outcomes framework." },
  { title: "Full-Stack Engineer (Next.js)", dept: "Engineering", type: "Full-time · Remote", desc: "Build the weightless care infrastructure that serves 1000s of families." },
  { title: "Specialist Partnerships Manager", dept: "Ops", type: "Full-time · Delhi/Bangalore", desc: "Recruit, onboard, and retain India's best child-development specialists." },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [activeDept, setActiveDept] = useState("all");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const visibleTeam = activeDept === "all" ? TEAM : TEAM.filter((m) => m.dept === activeDept);

  return (
    <div className="min-h-screen">
      <main className="pt-20">

        {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
        <section className="relative px-6 py-18 md:py-24 text-center overflow-hidden">
          {/* Cinematic Background Ambient Light */}
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(139,127,240,0.1)_0%,transparent_70%)] pointer-events-none" />

          <div className="inline-flex items-center gap-2 mb-5 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-[#c5b8f8]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#b0a8f0]">Our Story & Mission</span>
          </div>

          <h1 className="font-dm-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-[#f0ece4] max-w-4xl mx-auto mb-6">
            Making care<br />
            <em className="text-[#c5b8f8] italic not-italic font-dm-serif">accessible</em> — for every family
          </h1>

          <p className="text-base md:text-lg text-[#8a8591] max-w-xl mx-auto mb-12 leading-relaxed font-manrope">
            Insighte is a care marketplace on a mission to connect Indian families with verified, neuro-affirming specialists — for therapy, education, and child development.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center max-w-3xl mx-auto bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden backdrop-blur-md">
            {STATS.map((stat, i) => (
              <div key={i} className={cn(
                "px-8 py-6 flex-1 min-w-[140px] text-center",
                i < STATS.length - 1 ? "border-r border-white/[0.07]" : ""
              )}>
                <div className="font-dm-serif text-3xl md:text-4xl font-bold text-[#c5b8f8] mb-1">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#5a5466]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ STORY ═══════════════════════════════════════════════════════════ */}
        <section className="px-6 py-18 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quote card */}
            <div className="bg-[#8b7ff0]/10 border border-[#8b7ff0]/20 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group">
              <Quote className="w-10 h-10 text-[#c5b8f8]/20 absolute top-6 right-6 transition-transform group-hover:scale-110" />
              <p className="font-dm-serif text-2xl md:text-3xl text-[#f0ece4] leading-snug mb-8 italic">
                "Empathy is our most powerful technology."
              </p>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-[#c5b8f8] text-lg">Midhun Noble</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5a5466]">Founder & CEO</span>
              </div>
            </div>

            {/* Fighting for the family */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-[2rem] p-8 md:p-10 hover:border-white/20 transition-colors">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5a5466] mb-4">Why we exist</div>
              <h3 className="font-dm-serif text-2xl md:text-3xl text-[#f0ece4] leading-tight mb-4">
                Fighting for the family
              </h3>
              <p className="text-sm md:text-base text-[#8a8591] leading-relaxed">
                Traditional childcare hasn't changed in decades. Parents are left navigating a fragmented ecosystem of unverified WhatsApp referrals, overbooked clinics, and inconsistent quality. We knew families deserved better.
                <br /><br />
                Insighte was built with one conviction: <strong className="text-[#c5b8f8] font-bold">connection before correction</strong>. Before we treat, we understand. Before we prescribe, we listen.
              </p>
            </div>

            {/* Connection before correction */}
            <div className="bg-[#1d9e75]/10 border border-[#1d9e75]/20 rounded-[2rem] p-8 md:p-10 hover:border-[#1d9e75]/40 transition-colors">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5DCAA5] mb-4">Our Doctrine</div>
              <h3 className="font-dm-serif text-2xl md:text-3xl text-[#f0ece4] leading-tight mb-4">
                Celebrating how<br />every child learns
              </h3>
              <p className="text-sm md:text-base text-[#8a8591] leading-relaxed">
                We don't see neurodiversity as a deficit to be corrected. We see it as a different kind of intelligence — one that deserves specialists who truly understand it and tools that celebrate, not suppress, it.
              </p>
              <div className="mt-8 px-5 py-3 bg-[#1d9e75]/10 rounded-2xl text-[13px] text-[#5DCAA5] font-bold border border-[#1d9e75]/10">
                500+ families navigated with empathy first
              </div>
            </div>
          </div>
        </section>

        {/* ═══ VALUES ══════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#6b6475] mb-3">What we stand for</div>
            <h2 className="font-dm-serif text-3xl md:text-5xl text-[#f0ece4] leading-tight">
              Our values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((val, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white border border-white/5" style={{ color: val.color }}>
                  {val.icon}
                </div>
                <div className="text-lg font-bold text-[#f0ece4] mb-3 leading-tight font-manrope">{val.title}</div>
                <div className="text-sm text-[#5a5466] leading-relaxed font-manrope">{val.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ TEAM ════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#6b6475] mb-3">The People</div>
              <h2 className="font-dm-serif text-3xl md:text-5xl text-[#f0ece4] leading-tight">
                Guided by experts
              </h2>
            </div>
            {/* Dept filter */}
            <div className="flex flex-wrap gap-2">
              {DEPT_TABS.map((tab) => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveDept(tab.id)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-xs font-bold transition-all border",
                    activeDept === tab.id 
                      ? "bg-[#8b7ff0]/15 border-[#8b7ff0]/40 text-[#c5b8f8]" 
                      : "bg-white/5 border-white/10 text-[#8a8591] hover:bg-white/10"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleTeam.map((member) => (
              <div key={member.name} className="bg-white/[0.03] border border-white/[0.08] rounded-[2rem] p-8 flex gap-6 items-start hover:bg-white/[0.06] hover:border-white/20 transition-all group">
                {/* Avatar */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 font-dm-serif text-xl font-bold border-2" 
                  style={{ 
                    backgroundColor: member.accentBg, 
                    borderColor: `${member.accent}40`,
                    color: member.accent
                  }}
                >
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-lg font-bold text-[#f0ece4] mb-1 font-manrope">{member.name}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest mb-4 transition-colors group-hover:text-white" style={{ color: member.accent }}>
                    {member.role}
                  </div>
                  <p className="text-sm text-[#8a8591] leading-relaxed font-manrope line-clamp-4">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CAREERS ═════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24 max-w-7xl mx-auto">
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#8b7ff0]/40 to-transparent" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#8b7ff0]/5 rounded-full blur-[100px]" />

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-12">
              <div className="max-w-xl">
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c5b8f8] mb-4">Join the team</div>
                <h2 className="font-dm-serif text-3xl md:text-5xl text-[#f0ece4] leading-[1.1] mb-6">
                  Build the future<br />of care in India
                </h2>
                <p className="text-base text-[#5a5466] leading-relaxed font-manrope">
                  We're hiring people who believe precision and empathy are inseparable — in our product, our clinical work, and our team culture.
                </p>
              </div>
              <Link href="/partners" className="inline-flex items-center gap-3 bg-[#c5b8f8] text-[#0d0f1a] rounded-full px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-[#8b7ff0]/20 whitespace-nowrap">
                Join as Specialist <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="space-y-3">
              {CAREERS.map((job) => (
                <div key={job.title} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/20 transition-all cursor-pointer group">
                  <div className="flex-1">
                    <div className="text-lg font-bold text-[#e8e2d8] mb-1 font-manrope group-hover:text-white transition-colors">{job.title}</div>
                    <div className="text-xs text-[#5a5466] mb-3 uppercase tracking-widest font-black">{job.type}</div>
                    <p className="text-sm text-[#8a8591] max-w-2xl font-manrope">
                      {job.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-1.5 rounded-full bg-[#8b7ff0]/10 border border-[#8b7ff0]/20 text-[#c5b8f8] text-[10px] font-black uppercase tracking-widest">
                      {job.dept}
                    </span>
                    <ArrowRight className="w-6 h-6 text-[#5a5466] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-[#5a5466] mt-10 font-manrope">
              Don't see a fit? Send us your story at{" "}
              <a href="mailto:careers@insighte.in" className="text-[#c5b8f8] hover:text-white transition-colors underline underline-offset-4">careers@insighte.in</a>
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
