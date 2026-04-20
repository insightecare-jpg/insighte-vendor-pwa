require('dotenv').config({ path: '.env.local' });
const { createServerClient } = require('@supabase/ssr');

const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { cookies: { getAll: () => [], setAll: () => {} } }
);

async function test() {
  const { data, error } = await supabase
    .from('partners')
    .select('*, services(*), reviews(*), slots(*)')
    .eq('slug', 'priya-sharma')
    .maybeSingle();
    
  console.log("Data:", data);
  console.log("Error:", error);
}
test();
