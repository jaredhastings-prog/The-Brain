"use client";

import * as React from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const supabase = React.useMemo(() => createSupabaseBrowserClient(), []);
  const [isPending, setIsPending] = React.useState(false);

  async function handleLogout() {
    setIsPending(true);
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <Button
      aria-label="Log out"
      className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      disabled={isPending}
      onClick={handleLogout}
      size="icon"
      type="button"
      variant="ghost"
    >
      <LogOut />
    </Button>
  );
}
