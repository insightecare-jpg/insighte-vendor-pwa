"use client";

import React, { useState, useEffect, useTransition } from "react";
import { 
  Plus, 
  Filter, 
  Search,
  Clock, 
  MessageSquare, 
  X,
  RefreshCw,
  Calendar,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getAdminBookings, type AdminBooking } from "@/lib/actions/admin";

export default function BookingsHubPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming"); // upcoming, past, all
  const [isPending, startTransition] = useTransition();

  const loadBookings = async (currentFilter: string) => {
    setLoading(true);
    const data = await getAdminBookings({ status: currentFilter });
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    loadBookings(filter);
  }, [filter]);

  const handleFilterChange = (newFilter: string) => {
    startTransition(() => {
      setFilter(newFilter);
    });
  };

  return (
    <div className="space-y-10 pb-24 text-zinc-100 max-w-7xl mx-auto">
       {/* MINIMALIST HEADER */}
       <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
             <h1 className="text-4xl font-black font-manrope tracking-tighter text-white uppercase italic">Bookings Hub</h1>
             <p className="text-sm text-zinc-500 font-medium">
                Live stream of clinical sessions and consultation appointments.
             </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex bg-[#1D1E31] p-1 rounded-xl border border-white/5">
                {['upcoming', 'past', 'all'].map((f) => (
                  <button
                    key={f}
                    onClick={() => handleFilterChange(f)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                      filter === f ? "bg-[#BACCB3] text-[#382F24]" : "text-zinc-500 hover:text-zinc-300"
                    )}
                  >
                    {f}
                  </button>
                ))}
             </div>
             <Button className="h-12 px-6 rounded-xl bg-[#D3C4B5] text-[#382F24] font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all">
                <Plus className="h-4 w-4 mr-2" /> New
             </Button>
          </div>
       </section>

       {/* QUICK SEARCH & STATUS */}
       <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
             <Input 
               placeholder="Search by learner or provider name..." 
               className="h-14 bg-[#1D1E31]/50 border-white/5 pl-12 rounded-2xl text-sm focus:ring-[#D3C4B5]/20"
             />
          </div>
          <div className="bg-[#1D1E31]/50 border border-white/5 rounded-2xl px-6 flex items-center justify-between h-14">
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Live Status</span>
             <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-500">Operational</span>
             </div>
          </div>
       </section>

       {/* SESSIONS LIST */}
       <section className="space-y-6">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-24 space-y-4 opacity-30">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-widest">Synchronizing Registry...</p>
             </div>
          ) : bookings.length === 0 ? (
             <div className="bg-[#1D1E31]/20 border border-dashed border-white/10 rounded-[2.5rem] p-24 text-center">
                <p className="text-zinc-600 font-medium italic">No {filter} bookings found in the clinical registry.</p>
             </div>
          ) : (
             <div className="grid grid-cols-1 gap-4">
                {bookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="group bg-[#1D1E31]/40 hover:bg-[#1D1E31] border border-white/5 hover:border-white/10 p-6 rounded-3xl transition-all flex flex-col md:flex-row items-center gap-8"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-black/40 flex items-center justify-center border border-white/5 flex-shrink-0">
                       <span className="text-xl font-black text-[#BACCB3]">{booking.child_name[0]}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-white truncate">{booking.child_name}</h3>
                          <Badge className="bg-[#3D4536]/40 text-[#BACCB3] border-none text-[8px] font-black uppercase tracking-widest">
                             {booking.service_category}
                          </Badge>
                       </div>
                       <div className="flex items-center gap-4 text-sm text-zinc-500">
                          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <span className="h-1 w-1 rounded-full bg-zinc-800" />
                          <span className="truncate">Provider: {booking.provider_name}</span>
                       </div>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                       <div className="text-right hidden md:block">
                          <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">Status</p>
                          <p className={cn(
                             "text-xs font-bold uppercase tracking-widest",
                             booking.status === 'confirmed' || booking.status === 'upcoming' ? "text-[#BACCB3]" : "text-zinc-500"
                          )}>
                             {booking.status}
                          </p>
                       </div>
                       <div className="h-10 w-[1px] bg-white/5 mx-2 hidden md:block" />
                       <div className="flex items-center gap-2">
                          <button className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all">
                             <MessageSquare className="h-4 w-4" />
                          </button>
                          <button className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-all">
                             <X className="h-4 w-4" />
                          </button>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          )}
       </section>

       {/* FAB */}
       <div className="fixed bottom-8 right-8 z-[100]">
          <Button className="h-16 w-16 rounded-full bg-[#D3C4B5] text-[#382F24] shadow-2xl hover:scale-110 transition-all">
             <Plus className="h-6 w-6" />
          </Button>
       </div>
    </div>
  );
}
