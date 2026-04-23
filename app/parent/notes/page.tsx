"use client";

import React, { useState, useEffect } from "react";
import { FileText, Search, Download, Eye, ChevronRight, Activity, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getParentDashboard } from "@/lib/actions/parent";
import { createClient } from "@/lib/supabase/client";
import { getMockUser, isDevBypassActive } from "@/lib/api/dev-bypass-helper";
import { format } from "date-fns";

export default function ProgressNotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
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
          setNotes(data?.progressNotes || []);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6 md:p-12 pb-32">
      <header className="max-w-7xl mx-auto mb-12 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-serif italic mb-2">Progress Notes</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Clinical insights & session summaries</p>
        </div>
        <div className="hidden md:block">
           <Button variant="outline" className="border-white/10 rounded-xl font-bold h-10 italic">
             <Download className="w-4 h-4 mr-2" /> Export All
           </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-6">
        {notes.length > 0 ? notes.map((note) => (
          <motion.div 
            key={note.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white/5 border border-white/5 rounded-[2rem] p-6 hover:bg-white/[0.07] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-serif italic mb-1">{note.bookings?.services?.title || "Session Summary"}</h3>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">
                  <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {note.bookings?.start_time ? format(new Date(note.bookings.start_time), 'MMM do, yyyy') : '--'}</span>
                  <span className="flex items-center gap-2 text-[#2de0c4]"><Activity className="w-3 h-3" /> Status: Verified</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <Button variant="ghost" className="flex-1 md:flex-none h-12 px-6 rounded-xl bg-white/5 text-white font-bold group-hover:bg-[#2de0c4] group-hover:text-black transition-colors">
                <Eye className="w-4 h-4 mr-2" /> View Full Note
              </Button>
              <Button variant="ghost" className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )) : (
          <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
            <FileText className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
            <p className="text-zinc-600 font-bold uppercase tracking-widest italic">No clinical notes available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
