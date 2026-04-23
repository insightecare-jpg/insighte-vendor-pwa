import { SessionMode } from "@/lib/booking-types";
import { cn } from "@/lib/utils";
import { Video, Home, Building2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function ModeSelector({
  allowedModes,
  selectedMode,
  onSelect,
}: {
  allowedModes: SessionMode[];
  selectedMode: SessionMode;
  onSelect: (mode: SessionMode) => void;
}) {
  const modeData = {
    online: { icon: Video, label: "Online", desc: "Secure video call" },
    home: { icon: Home, label: "At Home", desc: "Therapist visits you" },
    clinic: { icon: Building2, label: "At Clinic", desc: "Visit our center" },
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-[10px] uppercase tracking-widest mb-1">
          <Sparkles className="w-3 h-3" />
          Accessibility
        </div>
        <h3 className="text-2xl font-bold text-neutral-50 font-serif lowercase">Session Mode</h3>
        <p className="text-neutral-400 text-sm">How would you like to connect?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {allowedModes.map((mode) => {
          const { icon: Icon, label, desc } = modeData[mode];
          const isSelected = selectedMode === mode;

          return (
            <motion.button
              key={mode}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(mode)}
              className={cn(
                "flex flex-col items-start p-6 rounded-2xl border transition-all text-left relative overflow-hidden group",
                isSelected
                  ? "bg-white border-white shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
                  : "bg-[#0d0f1a] border-white/10 hover:border-white/30"
              )}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 p-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                </div>
              )}
              
              <div className={cn(
                "p-3 rounded-xl mb-4 transition-colors border",
                isSelected ? "bg-black/5 border-black/10 text-black/60" : "bg-white/5 border-white/10 text-neutral-500 group-hover:text-purple-400"
              )}>
                <Icon className="w-6 h-6" />
              </div>
              
              <span className={cn(
                "font-bold text-lg mb-1 transition-colors",
                isSelected ? "text-[#0d0f1a]" : "text-neutral-200 group-hover:text-purple-400"
              )}>{label}</span>
              <span className={cn(
                "text-xs font-medium leading-relaxed",
                isSelected ? "text-neutral-500" : "text-neutral-500"
              )}>{desc}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
