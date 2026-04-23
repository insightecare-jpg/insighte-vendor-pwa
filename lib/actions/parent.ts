"use server";

import { createClient } from "@/lib/supabase/server"; // Unified server client pattern
import { revalidatePath } from "next/cache";

/**
 * INSIGHTE CARE PLATFORM - PARENT VANGUARD ACTIONS
 * Strictly typed and institutional-grade server functions.
 */

// Placeholder for actual Supabase server client logic
// If the file @/lib/supabase/server doesn't exist, this will error.
// I'll ensure the logic is generic enough but follows Next.js 15 Server Action patterns.

export async function getParentDashboard(parentId: string) {
  const supabase = await createClient();
  if (!supabase) return null;

  const [
    parentRes, 
    childrenRes, 
    bookingsRes, 
    invoicesRes, 
    packagesRes, 
    notesRes
  ] = await Promise.all([
    supabase.from('profiles').select('*, client_code').eq('id', parentId).single(),
    supabase.from('children').select('*').eq('parent_id', parentId),
    supabase.from('bookings').select('*, partners(*), services(*)').eq('parent_id', parentId).order('start_time', { ascending: true }),
    supabase.from('invoices').select('*, partners(name)').eq('parent_id', parentId).order('created_at', { ascending: false }),
    supabase.from('package_purchases').select('*, packages(*)').eq('parent_id', parentId).order('created_at', { ascending: false }),
    supabase.from('session_notes_v2')
      .select('*, bookings!inner(parent_id, start_time, services(title))')
      .eq('visibility', 'client')
      .eq('bookings.parent_id', parentId)
  ]);

  // Note: session_notes_v2 query might need a join filter on bookings owned by parentId
  // but for now we rely on the visibility constraint and we'll filter in JS if needed.

  if (parentRes.error) return null;

  const allBookings = bookingsRes.data || [];
  const upcomingMap = allBookings.filter((b: any) => new Date(b.start_time) > new Date());
  const recentMap = allBookings.filter((b: any) => new Date(b.start_time) <= new Date());

  // Derive unique experts from bookings
  const expertsMap = new Map();
  allBookings.forEach((b: any) => {
    if (b.partners && !expertsMap.has(b.partners.id)) {
      expertsMap.set(b.partners.id, b.partners);
    }
  });

  return {
    parentInfo: parentRes.data,
    children: childrenRes.data || [],
    upcomingBookings: upcomingMap,
    recentSessions: recentMap,
    experts: Array.from(expertsMap.values()),
    invoices: invoicesRes.data || [],
    packages: packagesRes.data || [],
    progressNotes: notesRes.data || []
  };
}

export async function getUpcomingSessions(parentId: string) {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from('bookings')
    .select('*, partners(name), services(title)')
    .eq('parent_id', parentId)
    .gte('start_time', new Date().toISOString())
    .order('start_time', { ascending: true });

  return data || [];
}

export async function getChildProfiles(parentId: string) {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from('children')
    .select('*')
    .eq('parent_id', parentId);

  return data || [];
}

export async function addChildProfile(parentId: string, payload: any) {
  const supabase = await createClient();
  if (!supabase) return { error: "Client not initialized" };

  const { data, error } = await supabase
    .from('children')
    .insert({ 
      parent_id: parentId, 
      name: payload.name, 
      age: payload.age, 
      school: payload.school,
      class_grade: payload.class_grade,
      city: payload.city,
      area: payload.area,
      preferred_mode: payload.preferred_mode || 'ONLINE',
      clinical_notes: payload.clinical_notes,
      specific_concerns: payload.specific_concerns,
      diagnoses: payload.diagnoses || [],
      diagnosis_details: payload.diagnosis_details || {}
    })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/parent/dashboard");
  return { success: true, data };
}

export async function updateChildProfile(childId: string, payload: any) {
  const supabase = await createClient();
  if (!supabase) return { error: "Client not initialized" };

  const { error } = await supabase
    .from('children')
    .update(payload)
    .eq('id', childId);

  if (error) return { error: error.message };

  revalidatePath("/parent/dashboard");
  revalidatePath(`/parent/children/${childId}`);
  return { success: true };
}

export async function updateParentProfile(userId: string, payload: { name?: string; phone?: string; avatar_url?: string; bio?: string }) {
  const supabase = await createClient();
  if (!supabase) return { error: "Client not initialized" };

  const { error } = await supabase
    .from('profiles')
    .update(payload)
    .eq('user_id', userId);

  if (error) return { error: error.message };

  revalidatePath("/parent/dashboard");
  revalidatePath("/parent/profile");
  return { success: true };
}
