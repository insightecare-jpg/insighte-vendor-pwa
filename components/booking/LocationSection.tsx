import { SelectedBookingContext, CheckoutState, ClinicLocation } from "@/lib/booking-types";
import { MapPin, Home, Building2, Navigation, Info, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

function OnlineLocation() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 bg-purple-500/[0.03] border border-purple-500/20 rounded-2xl relative overflow-hidden backdrop-blur-sm"
    >
      <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500 opacity-50" />
      <div className="flex items-center gap-4">
        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
          <Navigation className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-neutral-50 mb-1">Secure Video Link</h4>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
            A unique encrypted meeting link will be generated and shared via email and SMS after your booking is confirmed.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function HomeAddressForm({ state, onStateChange }: { state: CheckoutState, onStateChange: (s: CheckoutState) => void }) {
  const address = state.homeAddress || { line1: "", area: "", city: "", pincode: "", notes: "" };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onStateChange({
      ...state,
      homeAddress: { ...address, [name]: value }
    });
  };

  const inputClasses = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-neutral-100 placeholder:text-neutral-700 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/5 transition-all text-sm font-medium";
  const labelClasses = "text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 sm:p-8 bg-[#0d0f1a] border border-white/10 rounded-2xl"
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 border border-orange-500/20">
          <Home className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xl font-bold text-neutral-50 font-serif lowercase">Home Visit Details</h4>
          <p className="text-sm text-neutral-500">Provide the address for the therapist visit</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className={labelClasses}>House / Flat / Landmark</label>
          <div className="relative group">
            <Compass className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="text" 
              name="line1"
              value={address.line1}
              onChange={handleChange}
              className={cn(inputClasses, "pl-12")}
              placeholder="e.g. 301, Blue Heaven Apts"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className={labelClasses}>Area / Locality</label>
            <input 
              type="text" 
              name="area"
              value={address.area}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. Indiranagar"
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses}>Pincode</label>
            <input 
              type="text" 
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. 560038"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClasses}>Special Instructions (Optional)</label>
          <div className="relative">
            <textarea 
              name="notes"
              value={address.notes}
              onChange={handleChange}
              rows={3}
              className={cn(inputClasses, "resize-none h-24")}
              placeholder="Gate code, landmark, or specific arrival instructions..."
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ClinicLocationOptions({ 
  clinics, 
  state, 
  onStateChange 
}: { 
  clinics: ClinicLocation[], 
  state: CheckoutState, 
  onStateChange: (s: CheckoutState) => void 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
          <Building2 className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xl font-bold text-neutral-50 font-serif lowercase">Select a Center</h4>
          <p className="text-sm text-neutral-500">Pick the clinic location that works best for you</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {clinics.map((clinic) => {
          const isSelected = state.selectedClinicLocation?.id === clinic.id;
          return (
            <motion.button
              key={clinic.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onStateChange({ ...state, selectedClinicLocation: clinic })}
              className={cn(
                "group flex flex-col sm:flex-row sm:items-center text-left p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden",
                isSelected
                  ? "bg-white border-white shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
                  : "bg-[#0d0f1a] border-white/10 hover:border-white/20"
              )}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 p-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className={cn(
                    "text-lg font-bold transition-colors",
                    isSelected ? "text-[#0d0f1a]" : "text-neutral-50 group-hover:text-purple-400"
                  )}>{clinic.name}</span>
                  {clinic.distance && (
                    <span className={cn(
                      "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border transition-colors",
                      isSelected 
                        ? "bg-black/5 border-black/10 text-black/60" 
                        : "bg-white/5 border-white/10 text-neutral-400"
                    )}>
                      {clinic.distance}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className={cn(
                    "w-3.5 h-3.5",
                    isSelected ? "text-neutral-400" : "text-neutral-600"
                  )} />
                  <span className={cn(
                    "text-sm font-medium leading-normal",
                    isSelected ? "text-neutral-500" : "text-neutral-400"
                  )}>{clinic.address}</span>
                </div>
              </div>
              
              <div className={cn(
                "mt-4 sm:mt-0 sm:ml-6 flex items-center justify-center p-2 rounded-lg transition-colors border",
                isSelected 
                  ? "bg-black/5 border-black/10 text-black/60" 
                  : "bg-white/5 border-white/10 text-neutral-600 group-hover:text-neutral-400"
              )}>
                <ChevronRight className="w-5 h-5" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function LocationSection({
  context,
  state,
  onStateChange
}: {
  context: SelectedBookingContext;
  state: CheckoutState;
  onStateChange: (state: CheckoutState) => void;
}) {
  if (state.selectedMode === "online") {
    return <OnlineLocation />;
  }

  if (state.selectedMode === "home") {
    return <HomeAddressForm state={state} onStateChange={onStateChange} />;
  }

  if (state.selectedMode === "clinic" && context.selectedExpert?.clinicLocations) {
    if (context.selectedExpert.clinicLocations.length === 0) {
      return (
        <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-400">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <Info className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium">No clinic locations found for this expert.</p>
        </div>
      );
    }
    return (
      <ClinicLocationOptions 
        clinics={context.selectedExpert.clinicLocations} 
        state={state} 
        onStateChange={onStateChange} 
      />
    );
  }

  return null;
}
