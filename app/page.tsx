


export const dynamic = "force-dynamic";
import React from "react";
import Link from "next/link";
import {
  Home as HomeIcon,
  LayoutDashboard,
  User,
  CalendarDays,
  ShieldCheck,
  Heart,
  Users,
} from "lucide-react";




import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { SchoolLogoScroll } from "@/components/ui/school-logo-scroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InteractiveHero } from "@/components/home/interactive-hero";
import { getFeaturedProviders } from "@/lib/actions/providers";




// ─── DATA DELEGATES ───────────────────────────────────────────────────────────
const HOW_STEPS = [
  { num: "01", title: "Discover", desc: "Browse specialized partners or use our guided triage." },
  { num: "02", title: "Match", desc: "Find the expert who resonates with your child's signature." },
  { num: "03", title: "Connect", desc: "Book a 1:1 session instantly — online or in-person." },
  { num: "04", title: "Grow", desc: "Receive evidence-based support and regular progress logs." },
];




const WHY_ITEMS = [
  {
    icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
    title: "Vetted Sovereignty",
    desc: "Every specialist goes through a 4-step verification process before joining."
