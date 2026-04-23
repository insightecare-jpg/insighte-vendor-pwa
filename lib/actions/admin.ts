"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAllProviders() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('partners')
    .select('*, services(*)');
  
  return data || [];
}

export async function getApprovedProviders(): Promise<Provider[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('partners')
    .select('*')
    .eq('verified', true);
  
  return (data || []) as Provider[];
}

export async function getPendingApprovals(): Promise<Provider[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('partners')
    .select('*')
    .eq('verified', false);

  return (data || []) as Provider[];
}

export async function getAllBookings() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('bookings')
    .select('*, profiles(*), partners(*), services(*)');

  return data || [];
}

export type Provider = {
  id: string;
  name: string;
  category: string;
  verified: boolean;
  rate?: number;
  bio?: string;
  specializations?: string[];
  city?: string;
  area?: string;
  type?: string;
  slug?: string;
  profile_image?: string;
  experience_years?: number;
  location_type?: string[];
  languages?: string[];
  age_groups?: string[];
  mode?: string;
};

export type AdminBooking = {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
  child_name: string;
  provider_name: string;
  service_category: string;
};

export type Child = {
  id: string;
  name: string;
  age: number;
  goals?: string;
};

export type Family = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  children: Child[];
};

export async function getAdminBookings(filters?: { status?: string, date?: string }): Promise<AdminBooking[]> {
  const supabase = await createClient();
  
  let query = supabase
    .from('bookings')
    .select(`
      id,
      start_time,
      end_time,
      status,
      profiles ( full_name ),
      partners ( name ),
      children ( name ),
      services ( title, category )
    `);

  if (filters?.status && filters.status !== 'all') {
    if (filters.status === 'upcoming') {
      query = query.gte('start_time', new Date().toISOString()).eq('status', 'upcoming');
    } else if (filters.status === 'past') {
      query = query.lt('start_time', new Date().toISOString());
    } else {
      query = query.eq('status', filters.status);
    }
  }

  const { data, error } = await query.order('start_time', { ascending: filters?.status === 'upcoming' });

  if (error) {
    console.error("Error fetching admin bookings:", error);
    return [];
  }

  return (data || []).map((b: any) => ({
    id: b.id,
    start_time: b.start_time,
    end_time: b.end_time || "N/A",
    status: b.status,
    child_name: (b.children as any)?.name || "Unknown Learner",
    parent_name: (b.profiles as any)?.full_name || "Unknown Parent",
    provider_name: (b.partners as any)?.name || "Unassigned",
    service_category: (b.services as any)?.category || (b.services as any)?.title || "Specialist Care"
  }));
}

export async function getProviderById(id: string) {
  const supabase = await createClient();

  // Try partners table (primary) first
  const { data: partner } = await supabase
    .from('partners')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  return partner ?? null;
}

export async function getProviderBySlug(slugOrId: string) {
  const supabase = await createClient();

  // ── 1. Try partners table by slug ────────────────────────────
  let { data } = await supabase
    .from('partners')
    .select('*')
    .eq('slug', slugOrId)
    .maybeSingle();

  // ── 2. Try by id ──────────────────────────────────────────────
  if (!data) {
    const { data: byId } = await supabase
      .from('partners')
      .select('*')
      .eq('id', slugOrId)
      .maybeSingle();
    data = byId;
  }

  if (!data) return null;

  // ── 3. Enrich with related data where tables exist ────────────
  const [servicesRes, reviewsRes] = await Promise.allSettled([
    supabase.from('services').select('*').eq('partner_id', data.id),
    supabase.from('reviews').select('*').eq('partner_id', data.id).order('created_at', { ascending: false }).limit(10),
  ]);

  return {
    ...data,
    services: servicesRes.status === 'fulfilled' ? (servicesRes.value.data ?? []) : [],
    reviews:  reviewsRes.status  === 'fulfilled' ? (reviewsRes.value.data  ?? []) : [],
    slots:    [],  // handled separately through booking wizard
  };
}

export async function getServicesByProviderId(providerId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('partner_id', providerId);

  return data || [];
}

export async function approveProvider(providerId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('partners')
    .update({ verified: true })
    .eq('id', providerId);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/admin/queue");
  revalidatePath("/admin/specialists");
  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function getAllFamilies(): Promise<Family[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('profiles')
    .select('*, children(*)')
    .eq('role', 'PARENT');

  return (data || []).map((f: any) => ({
    ...f,
    name: f.full_name,
    children: f.children || []
  })) as Family[];
}

export async function getTotalRevenue() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('payments')
    .select('amount')
    .eq('status', 'success');
  
  const total = (data || []).reduce((acc: number, curr: any) => acc + Number(curr.amount), 0);
  return total;
}

export async function getAdminStats() {
  const supabase = await createClient();
  
  const [
    { count: partnerCount },
    { count: bookingCount },
    { count: familyCount }
  ] = await Promise.all([
    supabase.from('partners').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'PARENT')
  ]);

  return {
    providers: partnerCount || 0,
    bookings: bookingCount || 0,
    families: familyCount || 0
  };
}

export async function getRecentActivity() {
  const supabase = await createClient();
  
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, profiles(full_name), services(title)')
    .order('created_at', { ascending: false })
    .limit(5);

  return (bookings || []).map((b: any) => ({
    id: b.id,
    type: 'booking',
    title: 'Booking Confirmed',
    description: `${b.profiles?.full_name || 'Parent'} for '${b.services?.title || 'Service'}'`,
    time: b.created_at
  }));
}
