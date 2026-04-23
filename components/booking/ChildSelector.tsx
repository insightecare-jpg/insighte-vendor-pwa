"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { 
  Baby, 
  Plus, 
  Check, 
  Users,
  Sparkles,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function ChildSelector({
  userId,
  selectedChildId,
  onSelect
}: {
  userId: string;
  selectedChildId: string | null;
  onSelect: (id: string) => void;
}) {
  const supabase = createClient();
  const [children, setChildren] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      const { data } = await supabase
        .from('children')
        .select('*')
        .eq('parent_id', userId);
      
      setChildren(data || []);
      setIsLoading(false);
      
      // Auto-select if only one child
      if (data?.length === 1 && !selectedChildId) {
        onSelect(data[0].id);
      }
    };

    fetchChildren();
  }, [userId, onSelect, selectedChildId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white/[0.02] border border-white/5 rounded-2xl">
        <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-[10px] uppercase tracking-widest mb-1">
            <Users className="w-3 h-3" />
            Family Profile
          </div>
          <h4 className="text-2xl font-bold text-neutral-50 font-serif lowercase">
            who is this session for?
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {children.map((child) => (
          <motion.div
            key={child.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(child.id)}
            className={cn(
              "relative cursor-pointer p-5 rounded-2xl border transition-all duration-300 overflow-hidden group",
              selectedChildId === child.id 
                ? "bg-purple-500/10 border-purple-500/50 shadow-lg shadow-purple-500/10" 
                : "bg-white/[0.02] border-white/10 hover:border-white/20"
            )}
          >
            {selectedChildId === child.id && (
              <div className="absolute top-0 right-0 p-3">
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                selectedChildId === child.id ? "bg-purple-500/20 text-purple-400" : "bg-white/5 text-neutral-500"
              )}>
                <Baby className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-neutral-100">{child.name}</p>
                <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">{child.age} Years • {child.preferred_mode || 'Online'}</p>
              </div>
            </div>
            
            {selectedChildId === child.id && (
              <motion.div 
                layoutId="active-glow"
                className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none"
              />
            )}
          </motion.div>
        ))}

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer p-5 rounded-2xl border border-dashed border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-neutral-500 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <p className="font-bold text-neutral-400 group-hover:text-neutral-200 transition-colors">Add Child</p>
            <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest">New Learner Profile</p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedChildId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 p-3 bg-white/[0.03] rounded-xl border border-white/5"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <p className="text-[11px] text-neutral-400 italic">Excellent. We'll tailor the session reports for <strong>{children.find(c => c.id === selectedChildId)?.name}'s</strong> profile.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
