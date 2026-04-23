"use server";

import { createClient, createStaticClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * INSIGHTE CARE PLATFORM - PARTNER VANGUARD ACTIONS
 * Dynamic data fetching for the Marketplace & Profile Sanctuary.
 */

export async function getPublicProviders() {
  const supabase = createStaticClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('partners')
    .select('*, services(*)');

  if (error) {
    console.error("Error fetching partners:", error.message);
    return [];
  }

  return data || [];
}

export async function getFeaturedProviders() {
  const supabase = createStaticClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('partners')
    .select('*, services(*)')
    .eq('is_featured', true)
    .limit(10);

  if (error) {
    console.error("Error fetching featured partners:", error.message);
    return [];
  }

  return data || [];
}

export async function getProviderById(identifier: string) {
  const supabase = await createClient();
  if (!supabase) return null;

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(identifier);

  try {
    // 1. Fetch the Primary Partner Record
    const { data: partner, error } = await supabase
      .from('partners')
      .select('*')
      .eq(isUuid ? 'id' : 'slug', identifier)
      .maybeSingle();

    if (error) {
      console.error(`Critical error fetching partner ${identifier}:`, error.message);
      return null;
    }

    if (!partner) {
      // 1b. Fallback to hardcoded Featured Experts if not in DB (Vanguard Doctrine)
      const { FEATURED_EXPERTS } = await import("@/lib/constants");
      const fallback = FEATURED_EXPERTS.find(e => e.slug === identifier || e.id === identifier);
      
      if (!fallback) return null;
      
      return {
        ...fallback,
        services: [],
        reviews: [],
        slots: [],
        provider_outcomes: [],
        provider_fit_items: []
      };
    }

    // 2. Parallelized Fetching of Related Data (Decoupled from joined selects to handle schema mismatches)
    const [
      { data: services },
      { data: reviews },
      { data: slots },
      { data: outcomes },
      { data: fitItems }
    ] = await Promise.all([
      supabase.from('services').select('*').eq('partner_id', partner.id),
      supabase.from('reviews').select('*').eq('partner_id', partner.id),
      supabase.from('slots').select('*').eq('partner_id', partner.id).eq('status', 'available'),
      supabase.from('provider_outcomes').select('*').eq('partner_id', partner.id).order('order_index', { ascending: true }),
      supabase.from('provider_fit_items').select('*').eq('partner_id', partner.id).order('order_index', { ascending: true })
    ]);

    // 3. Assemble and Harden the final object
    return {
      ...partner,
      services: services || [],
      reviews: reviews || [],
      slots: slots || [],
      provider_outcomes: outcomes || [],
      provider_fit_items: fitItems || []
    };
  } catch (err) {
    console.error("Critical architectural failure in getProviderById:", err);
    return null;
  }
}

/**
 * SEEDING FUNCTIONALITY
 * To be used sparingly for initial development.
 */
export async function seedInitialProviders() {
  const supabase = await createClient();
  if (!supabase) return { error: "Client not initialized" };

  const initialPartners = [
    {
      name: "Dr. Jyoti B.",
      category: "Autism",
      bio: "Clinical psychologist specializing in neuro-developmental support and family guidance through evidence-based ABA therapy.",
      slug: "jyoti-b",
      verified: true
    },
    {
      name: "Meera Nayak",
      category: "Behavior Therapy",
      bio: "Behavioral analyst focusing on compassionate, neuro-affirming strategies for social-emotional growth.",
      slug: "meera-nayak",
      verified: true
    }
  ];

  const { data: partners, error: partnerError } = await supabase
    .from('partners')
    .upsert(initialPartners, { onConflict: 'name' })
    .select();

  if (partnerError) return { error: partnerError.message };

  // Seed services, reviews, and slots
  for (const partner of (partners || [])) {
    // 1. Services
    await supabase.from('services').upsert([
      { 
        partner_id: partner.id, 
        title: "Sanctuary Momentum Session",
        price: partner.category === 'insighte' ? 1800 : 2200,
        duration: 60,
        type: "1:1 Video Call",
        description: "A deep-dive clinical session focused on immediate progress."
      }
    ], { onConflict: 'partner_id, title' });

    // 2. Reviews (Mock data)
    await supabase.from('reviews').upsert([
      {
        partner_id: partner.id,
        parent_name: "Anita Deshmukh",
        rating: 5,
        content: `Amazing progress with ${partner.name.split(' ')[0]}. The neuro-affirming approach really works for our son.`
      }
    ], { onConflict: 'partner_id, content' });

    // 3. Slots (Next 3 days)
    const today = new Date();
    const mockSlots = Array.from({ length: 3 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i + 1);
      date.setHours(10, 0, 0, 0);
      const end = new Date(date);
      end.setHours(11, 0, 0, 0);
      return {
        partner_id: partner.id,
        start_time: date.toISOString(),
        end_time: end.toISOString(),
        status: 'available'
      };
    });
    
    await supabase.from('slots').upsert(mockSlots);
  }

  revalidatePath("/marketplace");
  revalidatePath("/providers/[slug]");
  return { success: true, count: partners?.length };
}
