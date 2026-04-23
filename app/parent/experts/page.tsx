"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Filter, MessageSquare, Calendar, ChevronRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { getParentDashboard } from "@/lib/actions/parent";
import { createClient } from "@/lib/supabase/client";
import { getMockUser, isDevBypassActive } from "@/lib/api/dev-bypass-helper";

export default function MyExpertsPage() {
  const [experts, setExperts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        let userId: string | null = null;
        if (isDevBypassActive()) userId = getMockUser()?.id || null;
        else {
          const { data: { user } } = await supabase.auth.getUser();
          userId = user?.id || null;
        }

        if (userId) {
          const data = await getParentDashboard(userId);
          setExperts(data?.experts || []);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6 md:p-12">
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-serif italic mb-2">My Specialists</h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Your verified care team</p>
      </header>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.length > 0 ? experts.map((expert) => (
            <motion.div 
              key={expert.id}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:border-[#2de0c4]/30 transition-all group"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-3xl bg-[#2de0c4] flex items-center justify-center text-black shadow-lg shadow-[#2de0c4]/10 overflow-hidden">
                  {expert.image_url ? (
                    <img src={expert.image_url} alt={expert.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-serif italic font-black">{expert.name[0]}</span>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-serif italic mb-1 group-hover:text-[#2de0c4] transition-colors">{expert.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">{expert.service_type || 'Specialist'}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Activity className="w-4 h-4 text-[#2de0c4]" />
                  <span className="text-xs font-bold font-mono">ID: {expert.id.slice(0, 8)}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <Calendar className="w-4 h-4 text-[#2de0c4]" />
                  <span className="text-xs font-bold">Linked since 2024</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 rounded-2xl border-white/10 text-white font-bold hover:bg-white/5">
                  <MessageSquare className="mr-2 w-4 h-4" /> Message
                </Button>
                <Button className="h-12 rounded-2xl bg-white text-black font-black hover:bg-[#2de0c4] transition-colors">
                  Book Sync
                </Button>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
              <Users className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
              <p className="text-zinc-600 font-bold uppercase tracking-widest italic">No experts linked to your care journey yet.</p>
              <Button className="mt-8 h-14 px-8 rounded-[2rem] bg-[#2de0c4] text-black font-black">Find Specialist</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
