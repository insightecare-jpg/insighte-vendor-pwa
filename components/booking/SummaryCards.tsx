import { SelectedBookingContext } from "@/lib/booking-types";
import { Clock, GraduationCap, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ExpertSummaryCard({ context }: { context: SelectedBookingContext }) {
  const expert = context.selectedExpert;
  if (!expert) return null;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white/[0.03] border border-white/5 rounded-3xl items-start backdrop-blur-md">
      {(() => {
        const category = (expert.title || "").toLowerCase();
        let fallbackImage = "/images/experts/special_educator.png";
        if (category.includes("speech")) fallbackImage = "/images/experts/speech_therapist.png";
        else if (category.includes("autism") || category.includes("aba")) fallbackImage = "/images/experts/autism_specialist.png";
        else if (category.includes("counsel") || category.includes("behavior")) fallbackImage = "/images/experts/behavioral_specialist.png";

        return expert.photo ? (
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/10">
            <Image 
              src={expert.photo} 
              alt={expert.name} 
              fill 
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = fallbackImage;
              }}
            />
          </div>
        ) : (
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-white/5">
            <Image src={fallbackImage} alt={expert.name} fill className="object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-xl font-bold text-white/40">{expert.name.charAt(0)}</span>
            </div>
          </div>
        );
      })()}
      
      <div className="flex-1 space-y-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <h2 className="text-2xl font-black text-white italic tracking-tight">{expert.name}</h2>
             <ShieldCheck className="w-4 h-4 text-[#baccb3]" />
           </div>
          <p className="text-[10px] uppercase font-black text-[#baccb3] tracking-widest">{expert.title}</p>
        </div>
        
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-bold">
          <div className="flex items-center gap-2 text-[#c8c5cd]">
            <GraduationCap className="w-4 h-4 text-[#d3c4b5]" />
            <span>{expert.yearsOfExperience}y Experience</span>
          </div>
          <div className="flex items-center gap-2 text-[#c8c5cd]">
            <Clock className="w-4 h-4 text-[#baccb3]" />
            <span>{context.durationMinutes} Min Session</span>
          </div>
          {expert.completedSessions && (
            <div className="flex items-center gap-2 text-[#c8c5cd]">
              <Star className="w-4 h-4 text-[#ef9f27] fill-[#ef9f27]" />
              <span>{expert.completedSessions}+ Sessions</span>
            </div>
          )}
          <div className="mt-1">
            <span className="px-3 py-1 rounded-full bg-white/5 text-[#baccb3] border border-[#baccb3]/20 text-[9px] uppercase font-black tracking-wider">
              {context.selectedService}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConsultationSummaryCard({ context }: { context: SelectedBookingContext }) {
  return (
    <div className="flex flex-col gap-4 p-8 bg-white/[0.03] border border-white/5 rounded-3xl backdrop-blur-md">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
           <h2 className="text-2xl font-black text-white italic">{context.selectedService}</h2>
           <div className="w-2 h-2 rounded-full bg-[#baccb3] animate-pulse" />
        </div>
        <p className="text-sm text-[#c8c5cd] italic font-medium">Standard exploratory consultation with a care manager.</p>
      </div>
      
      <div className="flex items-center gap-2 text-[11px] font-bold text-[#baccb3]">
        <Clock className="w-4 h-4" />
        <span>{context.durationMinutes} MINUTE SESSION</span>
      </div>
    </div>
  );
}
