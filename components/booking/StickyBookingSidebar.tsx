import { SelectedBookingContext, CheckoutState } from "@/lib/booking-types";
import { CheckCircle2, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBooking } from "@/lib/actions/booking";
import Script from "next/script";

export function StickyBookingSidebar({
  context,
  state,
  onStateChange,
  isAuthConfirmed,
}: {
  context: SelectedBookingContext;
  state: CheckoutState;
  childId: string | null;
  onStateChange: (s: CheckoutState) => void;
  isAuthConfirmed?: boolean;
}) {
  const router = useRouter();
  const [errorObj, setErrorObj] = useState<string | null>(null);
  
  const isSlotSelected = !!state.selectedSlot;
  
  let isLocationComplete = true;
  if (state.selectedMode === "home") {
    isLocationComplete = !!state.homeAddress?.line1 && !!state.homeAddress?.pincode && !!state.homeAddress?.area;
  } else if (state.selectedMode === "clinic") {
    isLocationComplete = !!state.selectedClinicLocation;
  }

  const canProceed = isSlotSelected && isLocationComplete && isAuthConfirmed && (isAuthConfirmed ? !!childId : true);
  const isFree = context.price === 0;

  const handlePayment = async () => {
    if (!canProceed) return;
    if (context.bookingType === "expert_session" && !context.selectedExpert) return;
    
    setErrorObj(null);
    onStateChange({ ...state, paymentStatus: "processing" });
    
    try {
      if (isFree) {
        const res = await createBooking({
            provider_id: context.selectedExpert?.id || "general-consultation",
            service_id: context.selectedService, 
            child_id: childId,
            slot_id: state.selectedSlot?.id || null,
            start_time: `${state.selectedSlot?.date}T${state.selectedSlot?.startTime}`,
            duration_minutes: context.durationMinutes,
            total_price: context.price
        });
        
        if (res.success) {
           onStateChange({ ...state, paymentStatus: "success", bookingStatus: "confirmed" });
           router.push(`/booking/confirmation?id=${res.bookingId}`);
        } else {
           throw new Error(res.error || "Booking creation failed.");
        }
        return;
      }

      // Paid flow via Razorpay
      const orderReq = await fetch('/api/razorpay/order', {
         method: 'POST',
         body: JSON.stringify({ amount: context.price * 100 }) // Razorpay wants paise
      });
      const order = await orderReq.json();
      if (!order.id) throw new Error("Failed to initialize payment gateway");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mock', 
        amount: order.amount,
        currency: order.currency,
        name: "Insighte Child Center",
        description: `${context.selectedService} with ${context.selectedExpert.name}`,
        order_id: order.id,
        handler: async function (response: any) {
           // Payment Success Callback
           try {
               const res = await createBooking({
                   provider_id: context.selectedExpert!.id,
                   service_id: context.selectedService,
                   child_id: childId,
                   slot_id: state.selectedSlot?.id || null,
                   start_time: `${state.selectedSlot?.date}T${state.selectedSlot?.startTime}`,
                   duration_minutes: context.durationMinutes,
                   total_price: context.price,
                   package_purchase_id: response.razorpay_payment_id // tracking 
               });
               
               if (res.success) {
                  onStateChange({ ...state, paymentStatus: "success", bookingStatus: "confirmed" });
                  router.push(`/booking/confirmation?id=${res.bookingId}`);
               } else {
                  throw new Error(res.error || "Failed to confirm booking.");
               }
           } catch(e: any) {
              setErrorObj(e.message || "Failed to confirm booking on our end.");
              onStateChange({ ...state, paymentStatus: "error" });
           }
        },
        theme: {
            color: "#9333ea"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
         setErrorObj(response.error.description);
         onStateChange({ ...state, paymentStatus: "error" });
      });
      rzp.open();
      
      // Reset processing visually if window opens
      onStateChange({ ...state, paymentStatus: "idle" });

    } catch (err: any) {
      setErrorObj(err.message || "Something went wrong.");
      onStateChange({ ...state, paymentStatus: "error" });
    }
  };

  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col space-y-6 lg:sticky lg:top-24">
      {/* Dynamic Summary section */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-neutral-50 border-b border-neutral-800 pb-4">
          Session Summary
        </h3>

        <ul className="space-y-3">
          <li className="flex justify-between items-start">
            <span className="text-neutral-400">Service</span>
            <span className="text-neutral-50 font-medium text-right max-w-[200px]">{context.selectedService}</span>
          </li>
          
          {context.selectedExpert && (
            <li className="flex justify-between items-start">
              <span className="text-neutral-400">Expert</span>
              <span className="text-neutral-50 font-medium text-right">{context.selectedExpert.name}</span>
            </li>
          )}
          
          <li className="flex justify-between items-start">
            <span className="text-neutral-400">Date & Time</span>
            <span className="text-right flex flex-col items-end">
              {state.selectedSlot ? (
                <>
                  <span className="text-purple-400 font-medium bg-purple-500/10 px-2 rounded-md">
                    {format(parseISO(state.selectedSlot.date), "MMM d, yyyy")}
                  </span>
                  <span className="text-neutral-50 text-sm mt-1">
                    {state.selectedSlot.startTime} - {state.selectedSlot.endTime}
                  </span>
                </>
              ) : (
                <span className="text-neutral-500 italic">Please select</span>
              )}
            </span>
          </li>

          <li className="flex justify-between items-start">
            <span className="text-neutral-400">Mode</span>
            <span className="text-neutral-50 font-medium capitalize">
              {state.selectedMode === "online" ? "Online Video" 
                : state.selectedMode === "home" ? "At Home" : "At Clinic"}
            </span>
          </li>
          
          {state.selectedMode === "clinic" && state.selectedClinicLocation && (
            <li className="flex justify-between items-start pt-2 border-t border-neutral-800">
              <span className="text-neutral-400">Clinic</span>
              <span className="text-emerald-400 text-sm text-right w-2/3 truncate">
                {state.selectedClinicLocation.name}
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Pricing / Payment block */}
      <div className="pt-4 border-t border-neutral-800 space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-neutral-300">Total payable</span>
          <span className="text-3xl font-semibold text-neutral-50 tracking-tight">
            {isFree ? "Free" : `₹${context.price.toLocaleString("en-IN")}`}
          </span>
        </div>

        <button
          onClick={handlePayment}
          disabled={!canProceed || state.paymentStatus === "processing"}
          className="relative w-full py-4 bg-white text-neutral-950 font-semibold rounded-xl transition-all duration-300 overflow-hidden enabled:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
        >
          {state.paymentStatus === "processing" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-neutral-500" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>
                {!isAuthConfirmed ? "Secure Identity First" : (!childId ? "Select Child Profiles" : (isFree ? "Confirm Booking" : "Pay & Confirm Booking"))}
              </span>
              <div className="absolute right-4 w-6 h-6 bg-neutral-950/10 rounded-full flex items-center justify-center translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <CheckCircle2 className="w-4 h-4 text-neutral-950" />
              </div>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-neutral-500 text-sm pt-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure and encrypted</span>
        </div>
      </div>
    </div>
    </>
  );
}
