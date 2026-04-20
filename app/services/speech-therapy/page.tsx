import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { speechTherapyData } from "@/lib/services/speech-therapy.data";

// Components
import { HeroSection } from "@/components/services/speech-therapy/HeroSection";
import { SignsSection } from "@/components/services/speech-therapy/SignsSection";
import { ConditionsSection } from "@/components/services/speech-therapy/ConditionsSection";
import { PathwaysSection } from "@/components/services/speech-therapy/PathwaysSection";
import { HowItWorksSection } from "@/components/services/speech-therapy/HowItWorksSection";
import { WhyInsighteSection } from "@/components/services/speech-therapy/WhyInsighteSection";
import { TherapistPreview } from "@/components/services/speech-therapy/TherapistPreview";
import { FAQSection } from "@/components/services/speech-therapy/FAQSection";
import { FinalCTA } from "@/components/services/speech-therapy/FinalCTA";

export const metadata: Metadata = {
  title: "Speech Therapy for Children in Bangalore | Verified Specialists | Insighte",
  description: "Find expert speech therapists in Bangalore for speech delay, stuttering, and communication challenges. Neuro-affirmative care at home, online, or in centers.",
  keywords: ["Speech Therapy Bangalore", "Speech Therapist near me", "Child speech delay", "Stuttering therapy Bangalore", "Neuro-affirmative speech therapy"],
  openGraph: {
    title: "Best Speech Therapy for Children in Bangalore",
    description: "Expert, vetted specialists helping children thrive in communication.",
    type: "website",
    locale: "en_IN",
  },
};

export default function SpeechTherapyPage() {
  const data = speechTherapyData;

  // JSON-LD for Local Business and Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Speech Therapy",
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
      "name": "Speech Therapy Services",
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
        {/* Unified design language - Hero */}
        <HeroSection data={data.hero} />
        
        {/* Emotional hook - What parents see */}
        <SignsSection signs={data.signs} />
        
        {/* Clinical depth - What we treat */}
        <ConditionsSection conditions={data.conditions} />
        
        {/* Developmental pathways - Age specific */}
        <PathwaysSection ageGroups={data.ageGroups} />
        
        {/* Simple process for busy parents */}
        <HowItWorksSection steps={data.steps} />
        
        {/* Parent-first trust section */}
        <WhyInsighteSection valueProps={data.valueProps} />
        
        {/* Proof & People */}
        <TherapistPreview therapists={data.therapists} />
        
        {/* Pricing & Transparency (Simple session info) */}
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

        {/* Education & Confidence */}
        <FAQSection faqs={data.faqs} />
        
        {/* The soulful final touch */}
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
