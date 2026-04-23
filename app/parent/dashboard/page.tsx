"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Users, 
  Activity,
  Zap,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  User,
  Search,
  BookOpen,
  ArrowUpRight,
  Heart,
  Sparkles,
  CreditCard,
  FileText,
  UserPlus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getMockUser, isDevBypassActive } from "@/lib/api/dev-bypass-helper";
import { getParentDashboard } from "@/lib/actions/parent";
import { ParentBottomNav } from "@/components/navigation/ParentBottomNav";
import { motion, AnimatePresence } from "framer-motion";

// New Hub Components
import { DashboardHero } from "@/components/parent/dashboard/DashboardHero";
import { SpecialistMatcher } from "@/components/parent/dashboard/SpecialistMatcher";
import { ChildProfileCard } from "@/components/parent/dashboard/ChildProfileCard";
import { UpcomingCareCard } from "@/components/parent/dashboard/UpcomingCareCard";

// ─── MOCK / FEATURE DATA ──────────────────────────────────────────────────────

const COMMUNITY_CIRCLES = [
  { id: "1", name: "Parent Support Circle", time: "Every Saturday, 5 PM", members: 85, color: "text-amber-400" },
  { id: "2", name: "Neuro-Inclusive Play", time: "Sundays, 10 AM", members: 42, color: "text-[#2de0c4]" }
];

const KNOWLEDGE_PANTRY = [
  { id: "1", title: "Navigating Sleep Hygiene in ADHD", readingTime: "5 min", category: "Behavioral" },
  { id: "2", title: "IEP Negotiation: A Masterclass", readingTime: "8 min", category: "Advocacy" }
];

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────

const SectionTitle = ({ title, subtitle, badge }: { title: string, subtitle?: string, badge?: string }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
    <div className="space-y-1">
      {badge && (
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#2de0c4] mb-2 block">{badge}</span>
      )}
      <h2 className="text-2xl md:text-3xl font-serif-display text-white tracking-tight leading-none italic">
        {title}
      </h2>
      {subtitle && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{subtitle}</p>}
    </div>
  </div>
);

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

export default function CareCoordinationHub() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        let userId: string | null = null;
        
        if (isDevBypassActive()) {
          userId = getMockUser()?.id || null;
        } else {
          const { data: { user } } = await supabase.auth.getUser();
          userId = user?.id || null;
        }

        if (userId) {
          const dashboardData = await getParentDashboard(userId);
          setData(dashboardData);
        }
      } catch (err) {
        console.error("Dashboard Sync Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
     return (
       <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="flex flex-col items-center gap-6"
         >
            <div className="relative w-20 h-20">
               <div className="absolute inset-0 border-4 border-[#2de0c4]/10 rounded-full" />
               <div className="absolute inset-0 border-4 border-t-[#2de0c4] rounded-full animate-spin" />
               <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#2de0c4] animate-pulse" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#2de0c4] animate-pulse italic">Synchronizing Your Dashboard...</p>
         </motion.div>
       </div>
     );
  }

  const { 
    children = [], 
    upcomingBookings = [], 
    recentSessions = [], 
    parentInfo = {},
    experts = [],
    invoices = [],
    packages = [],
    progressNotes = []
  } = data || {};

  const hasChildren = children.length > 0;
  const hasBooking = upcomingBookings.length > 0;
  const nextBooking = upcomingBookings[0];

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-50 font-dm-sans selection:bg-[#2de0c4]/30 overflow-x-hidden">
      
      {/* ── BACKGROUND DEPTH ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2de0c4]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[180px] rounded-full" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-32">
        
        {/* ═══ DYNAMIC HERO SECTION ═════════════════════════════════════════════ */}
        {hasBooking ? (
          <UpcomingCareCard booking={nextBooking} />
        ) : (
          <DashboardHero 
            userName={parentInfo?.name || "Caregiver"} 
            hasBooking={false} 
            onAddChild={() => {}}
            onFindSpecialist={() => {}}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          
          {/* LEFT: PRIMARY ACTIONS & REGISTRY (8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* CHILD REGISTRY */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <SectionTitle title="Connected Learners" subtitle="Profiles & Clinical Goals" />
                <Link href="/parent/onboarding/learner">
                  <Button variant="ghost" className="text-[#2de0c4] text-xs font-black uppercase tracking-widest gap-2">
                    <UserPlus className="w-4 h-4" /> Add Child
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {children.map((child: any) => (
                  <ChildProfileCard key={child.id} child={child} />
                ))}
              </div>
            </section>

            {/* SPECIALIST MATCHER (If no booking) */}
            {!hasBooking && hasChildren && (
              <section>
                <SectionTitle title="Find Your Specialist" subtitle="Matched to your child's specific needs" />
                <SpecialistMatcher children={children} onSearch={() => {}} />
              </section>
            )}

            {/* UPCOMING SESSIONS LIST (If exists) */}
            {hasBooking && upcomingBookings.length > 1 && (
              <section>
                <SectionTitle title="Future Sessions" subtitle="Upcoming synchronizations" />
                <div className="space-y-4">
                  {upcomingBookings.slice(1).map((booking: any) => (
                    <div key={booking.id} className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-[#2de0c4]/30 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#2de0c4]">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{booking.services?.title}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">
                            {new Date(booking.start_time).toLocaleDateString()} at {new Date(booking.start_time).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <Link href={`/parent/sessions/${booking.id}`}>
                        <Button variant="ghost" className="text-[#2de0c4] group-hover:translate-x-2 transition-transform">
                          <ChevronRight />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT: SECONDARY MODULES (4 Cols) */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* QUICK ACTIONS BENTO */}
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
              <h3 className="text-xl font-serif italic mb-6">Care Management</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Billing", icon: CreditCard, count: invoices.length, href: "/parent/billing" },
                  { label: "Notes", icon: FileText, count: progressNotes.length, href: "/parent/notes" },
                  { label: "Experts", icon: Users, count: experts.length, href: "/parent/experts" },
                  { label: "Support", icon: MessageSquare, count: 0, href: "/parent/support" }
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#2de0c4]/30 transition-all group">
                    <item.icon className="w-6 h-6 text-[#2de0c4] mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-white">{item.count || '--'}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* RECOMMENDED CONTENT */}
            <div className="space-y-6">
              <SectionTitle title="Knowledge Hub" badge="New" />
              {KNOWLEDGE_PANTRY.map(art => (
                <Link href="/blog" key={art.id} className="block group">
                  <div className="p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex items-start gap-4 bg-white/5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-slate-500 group-hover:text-[#2de0c4] transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-white group-hover:text-[#2de0c4] transition-colors leading-tight italic">{art.title}</p>
                      <p className="text-[8px] font-black uppercase tracking-widest text-slate-600">{art.category} · {art.readingTime}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* COMMUNITY CIRCLES NUDGE */}
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#2de0c4]/10 to-transparent border border-[#2de0c4]/20 relative overflow-hidden group">
              <Sparkles className="absolute top-4 right-4 w-6 h-6 text-[#2de0c4] opacity-20" />
              <h4 className="text-xl font-serif italic text-white mb-4">Join Parent Circles</h4>
              <p className="text-sm text-zinc-400 mb-6">Connect with 150+ parents navigating similar journeys.</p>
              <Button className="w-full h-12 rounded-2xl bg-[#2de0c4] text-black font-black hover:scale-105 transition-all">
                Explore Communities
              </Button>
            </div>

          </div>
        </div>
      </main>

      {/* ── MOBILE HUD NAVIGATION ── */}
      <ParentBottomNav />
    </div>
  );
}
