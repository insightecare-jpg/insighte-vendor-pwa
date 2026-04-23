"use client";

import React, { useState, useEffect } from "react";
import { Users, UserPlus, ChevronRight, Activity, MapPin, School, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { getParentDashboard } from "@/lib/actions/parent";
import { createClient } from "@/lib/supabase/client";
import { getMockUser, isDevBypassActive } from "@/lib/api/dev-bypass-helper";
import Link from "next/link";
import { ChildProfileCard } from "@/components/parent/dashboard/ChildProfileCard";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateChildProfile } from "@/lib/actions/parent";
import { toast } from "sonner";
import { Camera, Loader2, Save } from "lucide-react";
import Image from "next/image";

export default function MyChildrenPage() {
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      let userId: string | null = null;
      if (isDevBypassActive()) userId = getMockUser()?.id || null;
      else {
        const { data: { user } } = await supabase.auth.getUser();
        userId = user?.id || null;
      }
      if (userId) {
        const data = await getParentDashboard(userId);
        setChildren(data?.children || []);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (child: any) => {
    setSelectedChild({ ...child });
    setIsEditDialogOpen(true);
  };

  const handleSaveChild = async () => {
    setSaving(true);
    const res = await updateChildProfile(selectedChild.id, {
      avatar_url: selectedChild.avatar_url,
      name: selectedChild.name,
      school: selectedChild.school
    });
    if (res.success) {
      toast.success("Identity Synchronized", { description: `${selectedChild.name}'s profile has been updated.` });
      setIsEditDialogOpen(false);
      fetchData();
    } else {
      toast.error(res.error || "Update failed");
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6 md:p-12 pb-32">
      <header className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif italic mb-2">My Children</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Managing care for your loved ones</p>
        </div>
        <Link href="/parent/onboarding/learner">
          <Button className="h-14 px-8 rounded-2xl bg-[#2de0c4] text-black font-black hover:scale-105 transition-all">
            <UserPlus className="w-5 h-5 mr-2" /> Add Child Profile
          </Button>
        </Link>
      </header>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {children.length > 0 ? children.map((child) => (
            <ChildProfileCard 
              key={child.id} 
              child={child} 
              onClick={() => handleEditClick(child)} 
            />
          )) : (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
              <Users className="w-20 h-20 text-zinc-800 mx-auto mb-6" />
              <p className="text-zinc-600 font-bold uppercase tracking-widest italic text-lg">No profiles connected to your sanctuary yet.</p>
              <Link href="/parent/onboarding/learner" className="inline-block mt-8">
                <Button className="h-14 px-12 rounded-[2rem] bg-white text-black font-black hover:bg-[#2de0c4] transition-colors">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#0b0f15] border border-white/10 text-white p-10 rounded-[3rem] shadow-2xl max-w-md">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-3xl font-serif italic text-[#2de0c4]">Personalize Profile</DialogTitle>
            <DialogDescription className="text-zinc-500 text-[10px] font-black uppercase tracking-widest italic">
              Crafting a unique clinical identity for your child
            </DialogDescription>
          </DialogHeader>

          {selectedChild && (
            <div className="space-y-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#2de0c4] to-[#1a8e7b] p-0.5 overflow-hidden relative shadow-xl shadow-[#2de0c4]/10">
                  {selectedChild.avatar_url ? (
                    <img src={selectedChild.avatar_url} alt="" className="w-full h-full object-cover rounded-[1.4rem]" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#0d1117] rounded-[1.4rem]">
                      <Camera className="w-8 h-8 text-[#2de0c4]" />
                    </div>
                  )}
                </div>
                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 italic">Avatar Preview</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#2de0c4] italic ml-2">Avatar URL</label>
                  <Input 
                    value={selectedChild.avatar_url || ''} 
                    onChange={e => setSelectedChild({...selectedChild, avatar_url: e.target.value})}
                    placeholder="https://..."
                    className="h-14 bg-white/5 border-none rounded-2xl px-6 font-bold text-white italic"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#2de0c4] italic ml-2">Full Name</label>
                  <Input 
                    value={selectedChild.name || ''} 
                    onChange={e => setSelectedChild({...selectedChild, name: e.target.value})}
                    className="h-14 bg-white/5 border-none rounded-2xl px-6 font-bold text-white italic"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSaveChild}
                disabled={saving}
                className="w-full h-16 rounded-[2rem] bg-[#2de0c4] text-black font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Save Identity
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
