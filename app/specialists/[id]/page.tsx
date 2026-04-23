import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Award, 
  Calendar, 
  Clock, 
  MessageSquare, 
  ChevronRight, 
  ArrowLeft,
  Users,
  Brain,
  Zap,
  CheckCircle2,
  Quote,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { getProviderById } from "@/lib/actions/providers";
import ProfileClient from "./ProfileClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const provider = await getProviderById(id);
  
  if (!provider) return { title: "Specialist Not Found" };

  return {
    title: `${provider.name} | ${provider.specializations?.[0] || 'Specialist'} | Insighte`,
    description: provider.bio || `View the profile of ${provider.name}, a verified specialist on Insighte with ${provider.verified_sessions_count}+ sessions completed.`,
    openGraph: {
      title: `${provider.name} — Verified Specialist on Insighte`,
      description: provider.bio,
      images: [provider.avatar_url || ""],
    }
  };
}

export default async function ProviderProfileSanctuary({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const provider = await getProviderById(id);

  if (!provider) {
    // If not found in DB, try to find in hardcoded list for fallback or 404
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#0d0f1a] text-[#e8e2d8]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-36 pb-32">
        {/* BACK NAVIGATION */}
        <Link href="/specialists" className="inline-flex mb-16 group">
            <div className="flex items-center gap-3 py-3 px-6 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-[#8b7ff0]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8a8591]">
                  Return to Discovery
                </span>
            </div>
        </Link>

        <ProfileClient provider={provider} />
      </main>

      <Footer />
    </div>

  );
}
