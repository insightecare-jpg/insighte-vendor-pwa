"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";

const EXCLUDED_PATHS = [
  "/admin",
  "/auth",
  "/login",
  "/signup",
  "/dashboard",
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if current path starts with any excluded prefix
  const isExcluded = EXCLUDED_PATHS.some(path => pathname?.startsWith(path));

  if (isExcluded) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <MobileNav />
    </>
  );
}
