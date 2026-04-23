"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCheckoutContext } from "@/lib/actions/checkout";
import { CheckoutState, SelectedBookingContext } from "@/lib/booking-types";
import { CheckoutShell } from "@/components/booking/CheckoutShell";
import { ExpertSummaryCard, ConsultationSummaryCard } from "@/components/booking/SummaryCards";
import { ModeSelector } from "@/components/booking/ModeSelector";
import { SlotPicker } from "@/components/booking/SlotPicker";
import { LocationSection } from "@/components/booking/LocationSection";
import { StickyBookingSidebar } from "@/components/booking/StickyBookingSidebar";
import { CheckoutAuthIntegration } from "@/components/booking/CheckoutAuthIntegration";
import { ChildSelector } from "@/components/booking/ChildSelector";
import { User } from "@supabase/supabase-js";

export function CheckoutContent() {
  const searchParams = useSearchParams();
  const [context, setContext] = useState<SelectedBookingContext | null>(null);
  
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    selectedMode: "online",
    selectedSlot: null,
    homeAddress: null,
    selectedClinicLocation: null,
    paymentStatus: "idle",
    bookingStatus: "draft",
  });

  const [isAuthConfirmed, setIsAuthConfirmed] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  useEffect(() => {
    // Initialize context from URL via Server Action
    const type = searchParams.get("type");
    const service = searchParams.get("service");
    const expertId = searchParams.get("expertId") || searchParams.get("provider_id");
    
    fetchCheckoutContext(type, service, expertId).then((mockCtx) => {
      if (mockCtx) {
        setContext(mockCtx);
        setCheckoutState(prev => ({
          ...prev,
          selectedMode: mockCtx.defaultMode
        }));
      }
    });
  }, [searchParams]);

  if (!context) return null;

  return (
    <CheckoutShell
      sidebar={
        <StickyBookingSidebar 
          context={context} 
          state={checkoutState} 
          childId={selectedChildId}
          onStateChange={setCheckoutState} 
          isAuthConfirmed={isAuthConfirmed}
        />
      }
    >
      <div className="flex flex-col space-y-10 w-full mb-20 lg:mb-0 pb-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-medium tracking-tight text-neutral-50 mb-1">
             Confirm your booking
          </h1>
          <p className="text-neutral-400 text-lg">
             Review your session details and secure your slot.
          </p>
        </div>

        {context.bookingType === "expert_session" ? (
          <ExpertSummaryCard context={context} />
        ) : (
          <ConsultationSummaryCard context={context} />
        )}

        <SlotPicker 
          slots={context.availableSlots} 
          selectedSlot={checkoutState.selectedSlot} 
          onSelect={(slot) => setCheckoutState(s => ({ ...s, selectedSlot: slot }))} 
        />

        {context.allowedModes.length > 1 && (
          <ModeSelector 
            allowedModes={context.allowedModes} 
            selectedMode={checkoutState.selectedMode} 
            onSelect={(mode) => setCheckoutState(s => ({ ...s, selectedMode: mode }))} 
          />
        )}

        <CheckoutAuthIntegration onAuthSuccess={(u) => {
          setIsAuthConfirmed(true);
          setCurrentUser(u);
        }} />

        {isAuthConfirmed && currentUser && (
          <ChildSelector 
            userId={currentUser.id} 
            selectedChildId={selectedChildId} 
            onSelect={setSelectedChildId} 
          />
        )}

        <LocationSection 
          context={context} 
          state={checkoutState} 
          onStateChange={setCheckoutState} 
        />
        
        {/* Mobile sticky bottom CTA wrapper is handled in CheckoutShell or Sidebar component on mobile */}
      </div>
    </CheckoutShell>
  );
}
