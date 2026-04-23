import { SelectedBookingContext, ExpertBookingProfile } from "./booking-types";
import { MOCK_SLOTS } from "./mockSlots";
import { MOCK_CLINICS } from "./mockLocations";

export const MOCK_EXPERTS: Record<string, ExpertBookingProfile> = {
  "trisha-sharma": {
    id: "trisha-sharma",
    name: "Dr. Trisha Sharma",
    title: "Senior Speech & Language Pathologist",
    photo: "https://images.unsplash.com/photo-1594824432243-7f212260233e?auto=format&fit=crop&q=80&w=200&h=200",
    specialties: ["Speech Delay", "Autism Spectrum", "Stuttering"],
    yearsOfExperience: 8,
    sessionModes: ["online", "home", "clinic"],
    sessionPrice: 1500,
    clinicLocations: [MOCK_CLINICS[0], MOCK_CLINICS[1]],
  },
  "zoya-rehman": {
    id: "zoya-rehman",
    name: "Zoya Rehman",
    title: "Child Psychologist",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    specialties: ["Anxiety", "Social Skills", "Emotional Resilience"],
    yearsOfExperience: 9,
    sessionModes: ["online", "clinic"],
    sessionPrice: 1600,
    clinicLocations: [MOCK_CLINICS[2]],
  },
};

export const getMockBookingContext = (
  type: string | null,
  service: string | null,
  expertId: string | null
): SelectedBookingContext => {
  // Consultation booking
  if (type === "consultation" || !expertId) {
    return {
      bookingType: "consultation",
      selectedService: service || "General Consultation",
      selectedExpert: null,
      allowedModes: ["online"],
      defaultMode: "online",
      availableSlots: MOCK_SLOTS,
      price: 0, // Free consultation
      currency: "INR",
      durationMinutes: 30,
    };
  }

  // Expert booking
  const expert = MOCK_EXPERTS[expertId] || MOCK_EXPERTS["trisha-sharma"]; // Fallback to Trisha for testing
  
  return {
    bookingType: "expert_session",
    selectedService: service || expert.specialties[0] || "Therapy Session",
    selectedExpert: expert,
    allowedModes: expert.sessionModes,
    defaultMode: expert.sessionModes[0],
    availableSlots: MOCK_SLOTS,
    price: expert.sessionPrice,
    currency: "INR",
    durationMinutes: 45,
  };
};
