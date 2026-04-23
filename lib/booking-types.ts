export type BookingType = "expert_session" | "consultation";
export type SessionMode = "online" | "home" | "clinic";

export interface Slot {
  id: string;
  startTime: string; // e.g. "09:00 AM"
  endTime: string;   // e.g. "10:00 AM"
  date: string;      // ISO format or simple string "2024-05-01"
  isAvailable: boolean;
}

export interface ClinicLocation {
  id: string;
  name: string;
  address: string;
  distance?: string;
  mapPreviewUrl?: string;
}

// A simplified profile specifically for what's needed at checkout
export interface ExpertBookingProfile {
  id: string;
  name: string;
  title: string;
  photo: string | null;
  specialties: string[];
  yearsOfExperience: number;
  sessionModes: SessionMode[];
  sessionPrice: number;
  completedSessions?: number;
  clinicLocations?: ClinicLocation[];
}

export interface SelectedBookingContext {
  bookingType: BookingType;
  selectedService: string;
  selectedExpert: ExpertBookingProfile | null;
  allowedModes: SessionMode[];
  defaultMode: SessionMode;
  availableSlots: Slot[];
  price: number;
  currency: string;
  durationMinutes: number;
}

export interface CheckoutState {
  selectedMode: SessionMode;
  selectedSlot: Slot | null;
  homeAddress: {
    line1: string;
    area: string;
    city: string;
    pincode: string;
    notes?: string;
  } | null;
  selectedClinicLocation: ClinicLocation | null;
  paymentStatus: "idle" | "processing" | "success" | "error";
  bookingStatus: "draft" | "confirmed";
}
