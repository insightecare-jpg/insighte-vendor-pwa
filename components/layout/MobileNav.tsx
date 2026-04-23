"use client";

import React from "react";
import Link from "next/link";
import { Home as HomeIcon, LayoutDashboard, Sparkles, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50 flex justify-around items-center px-4 py-3 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl bg-[#0d0f1a]/80">
      <Link href="/" className={cn(
        "flex flex-col items-center justify-center rounded-full p-3 transition-all",
        pathname === "/" ? "bg-[#c5b8f8] text-[#0d0f1a]" : "text-[#8a8591]"
      )} aria-label="Home">
        <HomeIcon className="w-5 h-5" />
      </Link>
      <Link href="/specialists" className={cn(
        "flex flex-col items-center justify-center p-3 transition-all",
        pathname === "/specialists" ? "text-[#c5b8f8]" : "text-[#8a8591]"
      )} aria-label="Find specialists">
        <LayoutDashboard className="w-5 h-5" />
      </Link>
      <Link href="/triage" className={cn(
        "flex flex-col items-center justify-center p-3 transition-all",
        pathname === "/triage" ? "text-[#c5b8f8]" : "text-[#8a8591]"
      )} aria-label="Get Matched">
        <Sparkles className="w-5 h-5" />
      </Link>
      <Link href="/login" className={cn(
        "flex flex-col items-center justify-center p-3 transition-all",
        pathname === "/login" ? "text-[#c5b8f8]" : "text-[#8a8591]"
      )} aria-label="Account">
        <User className="w-5 h-5" />
      </Link>
    </nav>
  );
}
