const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = Object.fromEntries(
  envContent.split('\n')
    .filter(line => line.includes('='))
    .map(line => line.split('='))
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkState() {
  console.log("--- CARE DASHBOARD TEST DIAGNOSTICS ---");
  
  // 1. Specialists
  const { data: specialists } = await supabase.from('partners').select('id, name').limit(5);
  console.log("\nSpecialists (Partners):", specialists);

  // 2. Services
  const { data: services } = await supabase.from('services').select('id, title, partner_id').limit(5);
  console.log("\nServices:", services);

  // 3. Children
  const { data: children } = await supabase.from('children').select('id, name, parent_id').limit(5);
  console.log("\nChildren:", children);

  // 4. Existing Bookings
  const { data: bookings } = await supabase.from('bookings').select('id, start_time, status').limit(5);
  console.log("\nRecent Bookings:", bookings);

  // 5. Test User
  const devUserId = '00000000-0000-0000-0000-000000000000';
  const { data: testProfiles } = await supabase.from('profiles').select('id, full_name, role').eq('id', devUserId);
  console.log("\nTest Profile (Bypass):", testProfiles);
}

checkState().catch(console.error);
