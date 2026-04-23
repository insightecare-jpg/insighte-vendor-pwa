"use server";

import { createStaticClient } from "@/lib/supabase/server";
import { SERVICE_GROUPS } from "../constants";

export async function getProviderCounts() {
  const supabase = createStaticClient();
  if (!supabase) return { total: 0, byService: {}, byGroup: {} };

  try {
    // 1. Fetch all services to count unique partners per service title
    const { data: services, error } = await supabase
      .from('services')
      .select('title, partner_id');

    if (error) throw error;

    const byService: Record<string, number> = {};
    const uniquePartnersByService: Record<string, Set<string>> = {};

    services.forEach((s: any) => {
      if (!uniquePartnersByService[s.title]) {
        uniquePartnersByService[s.title] = new Set();
      }
      uniquePartnersByService[s.title].add(s.partner_id);
    });

    Object.keys(uniquePartnersByService).forEach(title => {
      byService[title] = uniquePartnersByService[title].size;
    });

    // 2. Aggregate by Groups defined in constants
    const byGroup: Record<string, number> = {};
    const uniquePartnersByGroup: Record<string, Set<string>> = {};

    SERVICE_GROUPS.forEach(group => {
      uniquePartnersByGroup[group.name] = new Set();
      group.services.forEach(serviceName => {
        if (uniquePartnersByService[serviceName]) {
          uniquePartnersByService[serviceName].forEach(pid => {
            uniquePartnersByGroup[group.name].add(pid);
          });
        }
      });
      byGroup[group.name] = uniquePartnersByGroup[group.name].size;
    });

    // 3. Get total count from partners table
    const { count: totalPartners, error: countError } = await supabase
      .from('partners')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    return {
      total: totalPartners || 46,
      byService,
      byGroup
    };
  } catch (error) {
    console.error("Error fetching provider counts:", error);
    return { total: 46, byService: {}, byGroup: {} };
  }
}
