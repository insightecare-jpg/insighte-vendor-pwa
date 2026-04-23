"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getMockBookingContext } from "@/lib/mockBooking";
import { CheckoutState, SelectedBookingContext } from "@/lib/booking-types";
import { BookingConfirmationCard } from "@/components/booking/BookingConfirmationCard";
import { Loader2 } from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [context, setContext] = useState<SelectedBookingContext | null>(null);
  
  // Note: in a real implementation we would fetch the booking from the database 
  // using the "id" param. For now, we mock it via similar init as checkout.
  // Using an arbitrary static state that looks "confirmed".
  const [checkoutState] = useState<CheckoutState>({
    selectedMode: "online",
    selectedSlot: {
       id: "slot-confirm",
       date: new Date().toISOString().split("T")[0],
       startTime: "10:00 AM",
       endTime: "11:00 AM",
       isAvailable: false
    },
    homeAddress: null,
    selectedClinicLocation: null,
    paymentStatus: "success",
    bookingStatus: "confirmed",
  });

  useEffect(() => {
    // Basic mock re-hydration 
    const mockCtx = getMockBookingContext("expert_session", "Speech Therapy", "trisha-sharma");
    setContext(mockCtx);
  }, []);

  if (!context) return null;

  return (
    <div className="w-full relative z-10">
      <BookingConfirmationCard context={context} state={checkoutState} />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-8 md:py-12 flex flex-col pt-32 pb-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-neutral-950 to-neutral-950 pointer-events-none"></div>
      
      <Suspense fallback={
        <div className="flex h-[50vh] items-center justify-center relative z-10">
           <Loader2 className="w-8 h-8 animate-spin text-neutral-500" />
        </div>
      }>
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
