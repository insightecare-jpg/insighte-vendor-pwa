import { Slot } from "./booking-types";

// Generate some slots for the next 7 days
const generateMockSlots = (): Slot[] => {
  const slots: Slot[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    
    // Add 3 slots per day
    slots.push(
      {
        id: `slot-${i}-1`,
        date: dateStr,
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        isAvailable: Math.random() > 0.3, // 70% chance of being available
      },
      {
        id: `slot-${i}-2`,
        date: dateStr,
        startTime: "02:00 PM",
        endTime: "03:00 PM",
        isAvailable: Math.random() > 0.3,
      },
      {
        id: `slot-${i}-3`,
        date: dateStr,
        startTime: "05:00 PM",
        endTime: "06:00 PM",
        isAvailable: Math.random() > 0.3, // Make evening less available
      }
    );
  }
  
  return slots;
};

export const MOCK_SLOTS = generateMockSlots();
