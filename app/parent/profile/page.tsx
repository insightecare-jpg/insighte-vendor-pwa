"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Settings, 
  LogOut, 
  Camera, 
  ChevronRight, 
  ShieldCheck, 
  Mail, 
  Phone,
  ArrowLeft,
  Loader2,
  Trash2,
  Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { isDevBypassActive, getMockUser } from "@/lib/api/dev-bypass-helper";
import { updateParentProfile } from "@/lib/actions/parent";
import { logout } from "@/app/actions/auth";
import Image from "next/image";
import { ParentBottomNav } from "@/components/navigation/ParentBottomNav";

export default function ParentProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      try {
        let userId: string | null = null;
        if (isDevBypassActive()) {
          userId = getMockUser()?.id || null;
        } else {
          const { data: { user } } = await supabase.auth.getUser();
          userId = user?.id || null;
        }

        if (userId) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle();
          setProfile(data);
        }
      } catch (err) {
        console.error("Profile Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    const result = await updateParentProfile(profile.user_id, {
      name: profile.name,
      phone: profile.phone,
      bio: profile.bio,
      avatar_url: profile.avatar_url
    });

    if (result.success) {
      toast.success("Profile Synchronized", { description: "Your details are now updated across the platform." });
      setEditMode(false);
    } else {
      toast.error(result.error || "Update failed");
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    toast.info("Signing out...", { description: "You are being safely logged out." });
    await logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#2de0c4] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-50 selection:bg-[#2de0c4]/30 pb-32">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2de0c4]/5 blur-[150px] rounded-full" />
      </div>

      <main className="max-w-2xl mx-auto px-6 pt-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <Badge className="bg-[#2de0c4]/10 text-[#2de0c4] border-none rounded-full px-4 py-1 text-[8px] font-black uppercase tracking-widest italic mb-2">
              Account Management
            </Badge>
            <h1 className="text-5xl font-serif-display italic tracking-tighter text-white leading-none">
              Your <span className="text-[#2de0c4]">Identity.</span>
            </h1>
          </div>
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-2xl gap-2 font-black uppercase tracking-widest text-[10px]"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        {/* Profile Card */}
        <div className="vessel bg-white/5 border border-white/10 rounded-[3rem] p-10 space-y-12 shadow-2xl relative overflow-hidden">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-6 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-[#2de0c4] to-[#1a8e7b] p-1 shadow-2xl shadow-[#2de0c4]/20 overflow-hidden relative">
                {profile?.avatar_url ? (
                  <Image src={profile.avatar_url} alt="Profile" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#0d1117] rounded-[2.3rem]">
                    <User className="w-12 h-12 text-[#2de0c4]" />
                  </div>
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all cursor-pointer flex items-center justify-center backdrop-blur-sm">
                  <Camera className="w-8 h-8 text-white" />
                  <input 
                    type="text" 
                    placeholder="Paste URL" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setProfile({...profile, avatar_url: e.target.value})}
                  />
                </label>
              </div>
              {/* Pulse effect if no image */}
              {!profile?.avatar_url && (
                <div className="absolute inset-0 rounded-[2.5rem] ring-4 ring-[#2de0c4]/20 animate-pulse pointer-events-none" />
              )}
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-serif italic text-white">{profile?.name || "Member Name"}</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 italic">Insighte ID: {profile?.client_code || "IS-9924"}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-widest text-[#2de0c4] ml-2 italic">DisplayName</label>
                <Input 
                  value={profile?.name || ''} 
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-bold text-white placeholder:text-zinc-800 focus:ring-1 ring-[#2de0c4]/30"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-widest text-[#2de0c4] ml-2 italic">PhoneNumber</label>
                <Input 
                  value={profile?.phone || ''} 
                  onChange={e => setProfile({...profile, phone: e.target.value})}
                  className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-bold text-white placeholder:text-zinc-800 focus:ring-1 ring-[#2de0c4]/30"
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#2de0c4] ml-2 italic">Email Address</label>
              <div className="h-14 bg-white/5 border border-white/5 rounded-2xl px-6 flex items-center gap-4 text-zinc-500 font-bold overflow-hidden">
                <Mail className="w-4 h-4" />
                <span className="truncate">{profile?.email || 'email@example.com'}</span>
                <Badge variant="outline" className="ml-auto border-white/10 text-[8px] font-black uppercase opacity-50">Verified</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#2de0c4] ml-2 italic">Avatar URL</label>
              <Input 
                value={profile?.avatar_url || ''} 
                onChange={e => setProfile({...profile, avatar_url: e.target.value})}
                className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-bold text-white placeholder:text-zinc-800 focus:ring-1 ring-[#2de0c4]/30"
                placeholder="https://images.unsplash.com/..."
              />
              <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest ml-2 italic italic">Paste an image link to personalize your profile.</p>
            </div>

            <Button 
               type="submit"
               disabled={saving}
               className="w-full h-16 rounded-[2rem] bg-[#2de0c4] text-[#0d1117] font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#2de0c4]/10"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
            </Button>
          </form>
        </div>

        {/* Security & Settings Nudge */}
        <div className="mt-12 p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 flex items-center justify-between group">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-white italic">Trust & Privacy</h4>
              <p className="text-[10px] text-zinc-500 font-bold">Your data is secured with institutional RLS policies.</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:translate-x-2 transition-transform" />
        </div>
      </main>

      <ParentBottomNav />
    </div>
  );
}
