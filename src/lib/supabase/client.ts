import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseConfig } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/database.types";

export function createSupabaseBrowserClient() {
  const { anonKey, url } = getSupabaseConfig();

  return createBrowserClient<Database>(url, anonKey);
}
