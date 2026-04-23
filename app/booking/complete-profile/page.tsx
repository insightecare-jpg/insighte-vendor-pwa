"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CompleteProfilePage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-8 md:py-12 flex flex-col items-center justify-center pt-32 pb-40">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-xl text-center space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-50 mb-2">Complete Your Profile</h1>
          <p className="text-neutral-400">
            Tell us a bit more about your child so we can tailor the session to their needs.
          </p>
        </div>
        
        {/* Mock form fields */}
        <div className="space-y-4 text-left">
           <div className="space-y-1.5">
             <label className="text-sm font-medium text-neutral-300">Child's Name</label>
             <input type="text" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-purple-500" placeholder="e.g. Aryan" />
           </div>
           
           <div className="space-y-1.5">
             <label className="text-sm font-medium text-neutral-300">Age</label>
             <input type="text" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-purple-500" placeholder="e.g. 4 years" />
           </div>
        </div>

        <div className="pt-4 space-y-3">
          <Button className="w-full text-base py-6 rounded-xl" asChild>
             <Link href="/parent/dashboard">Save & Continue to Dashboard</Link>
          </Button>
          <Button variant="ghost" className="w-full text-neutral-500 hover:text-neutral-300" asChild>
             <Link href="/parent/dashboard">Skip for now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
