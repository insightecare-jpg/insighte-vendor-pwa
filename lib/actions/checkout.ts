"use server";

import { createClient } from "@/lib/supabase/server";
import { SelectedBookingContext, SessionMode, ClinicLocation, Slot } from "@/lib/booking-types";
import { MOCK_SLOTS } from "@/lib/mockSlots";

/**
 * FETCH CHECKOUT CONTEXT
 * Resolves the specialist and service details for the checkout flow.
 */
export async function fetchCheckoutContext(
  type: string | null, 
  serviceTitle: string | null, 
  expertId: string | null
): Promise<SelectedBookingContext | null> {
  
  // 1. Handle Consultation or Missing Expert
  if (type === "consultation" || !expertId) {
    return {
      bookingType: "consultation",
      selectedService: serviceTitle || "General Consultation",
      selectedExpert: null,
      allowedModes: ["online"],
      defaultMode: "online",
      availableSlots: MOCK_SLOTS, 
      price: 0,
      currency: "INR",
      durationMinutes: 30,
    };
  }

  // 2. Handle Mock Specialists (Starting with exp-)
  if (expertId.startsWith('exp-')) {
    const mockDb: Record<string, { name: string; type: string }> = {
      'exp-1': { name: "Lakshmy Balachandran", type: "Speech Language Pathologist" },
      'exp-2': { name: "Dr. Sandeep Singh", type: "Senior Consultant" },
      'exp-3': { name: "Priyanka Murthy", type: "Behavior Specialist" },
      'exp-7': { name: "Meera Krishnan", type: "Early Intervention Specialist" },
    };

    const mock = mockDb[expertId] || { name: "Insighte Specialist", type: "Expert Therapist" };

    return {
      bookingType: "expert_session",
      selectedService: serviceTitle || "Specialized Therapy",
      selectedExpert: {
        id: expertId,
        name: mock.name,
        title: mock.type,
        photo: null,
        specialties: ["Pediatric Care", "Neuro-Affirmative Support"],
        yearsOfExperience: 8,
        sessionModes: ["online", "clinic"],
        sessionPrice: 1500,
        completedSessions: 120,
        clinicLocations: [
          { id: "clinic-1", name: "Insighte Indiranagar", address: "12th Main, Indiranagar, Bangalore" }
        ]
      },
      allowedModes: ["online", "clinic"],
      defaultMode: "online",
      availableSlots: MOCK_SLOTS,
      price: 1500,
      currency: "INR",
      durationMinutes: 45,
    };
  }

  // 3. Handle Real Specialist Fetching
  try {
    const supabase = await createClient();
    if (!supabase) throw new Error("Could not initialize Supabase client");

    const { data: partner, error } = await supabase
      .from('partners')
      .select('*, services(*)')
      .eq('id', expertId)
      .maybeSingle();

    if (error || !partner) {
      console.error("Partner fetch error:", error);
      return {
        bookingType: "consultation",
        selectedService: serviceTitle || "General Consultation",
        selectedExpert: null,
        allowedModes: ["online"],
        defaultMode: "online",
        availableSlots: MOCK_SLOTS,
        price: 0,
        currency: "INR",
        durationMinutes: 30,
      };
    }

    const allowedModes = (partner.session_modes as SessionMode[]) || ["online"];
    const clinicLocations: ClinicLocation[] = [];
    
    if (allowedModes.includes("clinic")) {
      clinicLocations.push({
        id: `clinic-${partner.id}`,
        name: `${partner.name}'s Center`,
        address: `${partner.area || 'Clinic Area'}, ${partner.city || 'City'}`,
      });
    }

    const basePrice = partner.services?.[0]?.price || partner.rate || 1500;
    const photoUrl = partner.avatar_url || partner.profile_image || null;

    return {
      bookingType: "expert_session",
      selectedService: serviceTitle || partner.services?.[0]?.title || "Specialist Session",
      selectedExpert: {
        id: partner.id,
        name: partner.name,
        title: partner.provider_type || partner.category || 'Expert Specialist',
        photo: photoUrl,
        specialties: partner.specializations || [],
        yearsOfExperience: partner.experience_years || 5,
        sessionModes: allowedModes,
        sessionPrice: basePrice,
        completedSessions: partner.verified_sessions_count || 100,
        clinicLocations: clinicLocations
      },
      allowedModes: allowedModes,
      defaultMode: allowedModes[0] || "online",
      availableSlots: MOCK_SLOTS,
      price: basePrice,
      currency: "INR",
      durationMinutes: 45,
    };
  } catch (err) {
    console.error("Checkout Context Critical Failure:", err);
    return null;
  }
}
