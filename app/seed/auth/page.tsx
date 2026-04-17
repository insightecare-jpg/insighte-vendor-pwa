
"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";

export default function SetupAuthPage() {
  const [status, setStatus] = useState<string>("Ready to initialize test accounts");
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const setupAccounts = async () => {
    setLoading(true);
    setStatus("Cleaning up...");

    try {
      const accounts = [
        { email: "test-parent@insighte.com", role: "PARENT", name: "Test Parent" },
        { email: "test-therapist@insighte.com", role: "PROVIDER", name: "Test Therapist" },
        { email: "test-admin@insighte.com", role: "ADMIN", name: "Test Admin" },
      ];

      for (const account of accounts) {
        setStatus(`Creating account for ${account.email}...`);
        const { error } = await supabase.auth.admin.createUser({
          email: account.email,
          password: "password123",
          email_confirm: true,
          user_metadata: { role: account.role, full_name: account.name }
        });
        if (error) console.error(error);
      }

      setStatus("Finished!");
    } catch (err: any) {
      console.error(err);
      setStatus("Error: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Seeding</h1>
      <p className="mb-4">{status}</p>
      <Button onClick={setupAccounts} disabled={loading}>
        {loading ? "Seeding..." : "Start Seeding"}
      </Button>
    </div>
  );
}
