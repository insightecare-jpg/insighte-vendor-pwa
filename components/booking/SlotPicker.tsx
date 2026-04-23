import { Slot } from "@/lib/booking-types";
import { format, parseISO } from "date-fns";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, ChevronRight, Sparkles } from "lucide-react";

export function SlotPicker({
  slots,
  selectedSlot,
  onSelect,
}: {
  slots: Slot[];
  selectedSlot: Slot | null;
  onSelect: (slot: Slot) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<string>(
    slots[0]?.date || new Date().toISOString().split("T")[0]
  );

  // Group slots by date
  const slotsByDate = useMemo(() => {
    const grouped: Record<string, Slot[]> = {};
    slots.forEach((slot) => {
      if (!grouped[slot.date]) grouped[slot.date] = [];
      grouped[slot.date].push(slot);
    });
    return grouped;
  }, [slots]);

  const dates = Object.keys(slotsByDate).sort();
  const activeSlots = slotsByDate[selectedDate] || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between border-b border-white/5 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-[10px] uppercase tracking-widest">
            <Calendar className="w-3 h-3" />
            Schedule
          </div>
          <h3 className="text-2xl font-bold text-neutral-50 font-serif lowercase">Select a time slot</h3>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
          <Clock className="w-3 h-3" />
          Indian Standard Time
        </div>
      </div>

      {/* Date Scroller */}
      <div className="relative">
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 mask-fade-edges">
          {dates.map((date) => {
            const d = parseISO(date);
            const isSelected = selectedDate === date;
            const hasAvailable = slotsByDate[date].some((s) => s.isAvailable);
            
            return (
              <motion.button
                key={date}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-2xl min-w-[85px] border transition-all shrink-0 relative overflow-hidden group",
                  isSelected
                    ? "bg-white border-white text-[#0d0f1a] shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                    : "bg-[#0d0f1a] border-white/10 text-neutral-400 hover:border-white/30"
                )}
              >
                {isSelected && (
                  <motion.div 
                    layoutId="activeDateGlow"
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-50" 
                  />
                )}
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest mb-2 transition-colors",
                  isSelected ? "text-neutral-500" : "text-neutral-500 group-hover:text-neutral-300"
                )}>
                  {format(d, "EEE")}
                </span>
                <span className="text-2xl font-bold font-serif">{format(d, "d")}</span>
                {hasAvailable && !isSelected && (
                  <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-purple-500" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div className="relative min-h-[140px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {activeSlots.length === 0 ? (
              <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                <p className="text-neutral-500 font-medium">No slots available on this date.</p>
              </div>
            ) : (
              activeSlots.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                return (
                  <motion.button
                    key={slot.id}
                    whileHover={slot.isAvailable ? { scale: 1.02 } : {}}
                    whileTap={slot.isAvailable ? { scale: 0.98 } : {}}
                    onClick={() => slot.isAvailable && onSelect(slot)}
                    disabled={!slot.isAvailable}
                    className={cn(
                      "group relative p-4 rounded-xl border text-sm font-bold transition-all text-center flex flex-col items-center justify-center gap-1",
                      isSelected
                        ? "bg-purple-600/10 border-purple-500 text-purple-100 ring-1 ring-purple-500"
                        : slot.isAvailable
                        ? "bg-[#0d0f1a] border-white/10 text-neutral-300 hover:border-white/30 hover:bg-white/[0.02]"
                        : "bg-black/40 border-white/5 text-neutral-600 cursor-not-allowed opacity-50"
                    )}
                  >
                    <span className="relative z-10">{slot.startTime}</span>
                    {isSelected && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-1 right-1"
                      >
                        <Sparkles className="w-3 h-3 text-purple-400" />
                      </motion.div>
                    )}
                    {!slot.isAvailable && (
                      <span className="text-[9px] uppercase tracking-tighter opacity-50 mt-1">Booked</span>
                    )}
                  </motion.button>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {selectedSlot && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 p-4 rounded-xl bg-purple-500/5 border border-purple-500/20"
        >
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
             <Clock className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Selected Slot</p>
            <p className="text-neutral-100 font-medium">
              {format(parseISO(selectedSlot.date), "MMMM d, yyyy")} at {selectedSlot.startTime}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-neutral-700" />
        </motion.div>
      )}
    </div>
  );
}
