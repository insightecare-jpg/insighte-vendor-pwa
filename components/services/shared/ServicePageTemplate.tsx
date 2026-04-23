"use client";

import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicePageData } from "@/types/services";

// Use generic shared components
import { HeroSection } from "./HeroSection";
import { SignsSection } from "./SignsSection";
import { ConditionsSection } from "./ConditionsSection";
import { PathwaysSection } from "./PathwaysSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { WhyInsighteSection } from "./WhyInsighteSection";
import { TherapistPreview } from "./TherapistPreview";
import { FAQSection } from "./FAQSection";
import { FinalCTA } from "./FinalCTA";

import { getProviderCounts } from "@/lib/actions/stats";
import { useEffect, useState } from "react";

interface ServicePageTemplateProps {
  data: ServicePageData;
  serviceName: string;
  slug: string;
}

export function ServicePageTemplate({ data, serviceName, slug }: ServicePageTemplateProps) {
  const [stats, setStats] = useState<{ total: number; byService: Record<string, number> } | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const result = await getProviderCounts();
        setStats(result);
      } catch (err) {
        console.error("Failed to fetch provider counts", err);
      }
    }
    fetchStats();
  }, []);

  // Determine current service count
  const currentServiceCount = stats?.byService[serviceName] || stats?.total || 46;
  const poolCount = stats?.total || 48;
  // JSON-LD for Local Business and Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@type": "MedicalOrganization",
      "name": "Insighte Care",
      "url": "https://insighte.care",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Bangalore" },
      { "@type": "City", "name": "Delhi" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${serviceName} Services`,
      "itemListElement": data.conditions.map(c => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": c.title,
          "description": c.description
        }
      }))
    }
  };

  return (
    <div className="bg-[#0d0f1a] min-h-screen text-white selection:bg-indigo-500/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      
      <main>
        <HeroSection data={data.hero} />
        <SignsSection signs={data.signs} />
        <ConditionsSection conditions={data.conditions} />
        <PathwaysSection ageGroups={data.ageGroups} />
        <HowItWorksSection steps={data.steps} />
        <WhyInsighteSection valueProps={data.valueProps} />
        <TherapistPreview 
          therapists={data.therapists} 
          viewAllHref={`/booking/checkout?type=consultation&service=${slug}`}
          categoryName={`${serviceName} specialists`}
          serviceId={slug}
          poolCount={poolCount}
          availableCount={currentServiceCount}
        />
        
        <section className="py-12 border-y border-white/5 bg-indigo-500/[0.02]">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-2xl font-serif text-white mb-2">Transparent Pricing</h3>
                    <p className="text-zinc-400">Starting from ₹{data.pricing.basePrice} {data.pricing.description}</p>
                </div>
                <div className="flex gap-4">
                    <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-zinc-400">Home Visit Available</span>
                    <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-zinc-400">Online Options</span>
                </div>
            </div>
        </section>

        <FAQSection faqs={data.faqs} />
        <FinalCTA 
          serviceId={slug} 
          serviceName={serviceName} 
        />
      </main>

      <Footer />
    </div>
  );
}
