import { SelectedBookingContext, CheckoutState } from "@/lib/booking-types";
import { CheckCircle2, Calendar, MapPin, Video, Home as HomeIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming standard shadcn button exists

export function BookingConfirmationCard({
  context,
  state,
}: {
  context: SelectedBookingContext;
  state: CheckoutState;
}) {
  const ModeIcon = state.selectedMode === "online" ? Video : state.selectedMode === "home" ? HomeIcon : MapPin;
  const modeLabel = state.selectedMode === "online" ? "Online Consultation" : state.selectedMode === "home" ? "Home Visit" : "Clinic Visit";

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl mx-auto">
      {/* Header Banner */}
      <div className="bg-purple-600/10 border-b border-purple-500/20 p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center border border-purple-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-neutral-50 mb-1">Booking Confirmed</h2>
          <p className="text-purple-300/80">We have reserved your slot.</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-8">
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 space-y-6">
          <div className="flex justify-between items-start border-b border-neutral-800 pb-4">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Service scheduled</p>
              <h3 className="text-lg font-medium text-neutral-100">{context.selectedService}</h3>
              {context.selectedExpert && (
                <p className="text-neutral-400">with {context.selectedExpert.name}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-3 items-start">
              <div className="mt-0.5 p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Date & Time</p>
                {state.selectedSlot ? (
                  <>
                    <p className="text-neutral-100 font-medium">
                      {format(parseISO(state.selectedSlot.date), "EEEE, MMM d, yyyy")}
                    </p>
                    <p className="text-neutral-300">
                      {state.selectedSlot.startTime} - {state.selectedSlot.endTime}
                    </p>
                  </>
                ) : (
                  <p className="text-neutral-500">Not selected</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="mt-0.5 p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400">
                <ModeIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1 capitalize">{modeLabel}</p>
                {state.selectedMode === "online" && (
                  <p className="text-neutral-300 text-sm">Meeting link will be sent to your email</p>
                )}
                {state.selectedMode === "home" && state.homeAddress && (
                  <p className="text-neutral-300 text-sm">Therapist will visit your location at {state.homeAddress.area}</p>
                )}
                {state.selectedMode === "clinic" && state.selectedClinicLocation && (
                  <p className="text-neutral-300 text-sm leading-tight">{state.selectedClinicLocation.name}<br/>{state.selectedClinicLocation.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-8 space-y-4">
          <Button variant="default" className="w-full py-6 text-base rounded-xl font-medium" asChild>
            <Link href="/parent/dashboard">
              Continue to Dashboard
            </Link>
          </Button>
          <div className="flex items-center justify-center">
            <Button variant="link" className="text-neutral-500 hover:text-neutral-300" asChild>
               <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
