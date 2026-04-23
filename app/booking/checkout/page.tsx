"use client";

import { Suspense } from "react";
import { CheckoutContent } from "./CheckoutContent";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 px-4 py-8 md:py-12 flex flex-col pt-24 md:pt-32 pb-40">
      <div className="max-w-6xl mx-auto w-full relative">
        {/* We use Suspense around the main content because it consumes useSearchParams */}
        <Suspense fallback={
          <div className="flex h-[50vh] items-center justify-center">
             <Loader2 className="w-8 h-8 animate-spin text-neutral-500" />
          </div>
        }>
          <CheckoutContent />
        </Suspense>
      </div>
    </div>
  );
}
