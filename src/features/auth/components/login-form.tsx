"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { hasSupabaseConfig } from "@/lib/supabase/env";

type AuthMode = "login" | "signup";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasConfig = hasSupabaseConfig();
  const supabase = React.useMemo(
    () => (hasConfig ? createSupabaseBrowserClient() : null),
    [hasConfig],
  );
  const [mode, setMode] = React.useState<AuthMode>("login");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const nextPath = getSafeNextPath(searchParams.get("next"));
  const isOwnerSetup = mode === "signup";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setMessage("Supabase environment variables are missing.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
                nextPath,
              )}`,
            },
            password,
          });

    setIsSubmitting(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    if (isOwnerSetup && !result.data.session) {
      setMessage(
        "Private access setup started. Check the authorised email to confirm.",
      );
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  return (
    <section className="rounded-lg border border-sidebar-accent bg-sidebar-accent/35 p-5 shadow-2xl">
      <div>
        <div className="text-sm font-medium text-sidebar-foreground/65">
          {isOwnerSetup ? "Authorised owner setup" : "Private workspace access"}
        </div>
        <h2 className="mt-1 text-2xl font-semibold text-sidebar-foreground">
          {isOwnerSetup ? "Private access setup" : "Secure login"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-sidebar-foreground/60">
          This is a private personal operating system. Authorised access only.
        </p>
      </div>

      {!hasConfig ? (
        <div className="mt-5 rounded-md border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm leading-6 text-amber-100">
          Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable authentication.
        </div>
      ) : null}

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-sidebar-foreground/75">
            Email
          </span>
          <Input
            autoComplete="email"
            className="border-sidebar-accent bg-sidebar text-sidebar-foreground placeholder:text-sidebar-foreground/40"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={email}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-sidebar-foreground/75">
            Password
          </span>
          <Input
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className="border-sidebar-accent bg-sidebar text-sidebar-foreground placeholder:text-sidebar-foreground/40"
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimum 6 characters"
            required
            type="password"
            value={password}
          />
        </label>

        {message ? (
          <div className="rounded-md border border-sidebar-accent bg-sidebar/70 px-3 py-2 text-sm leading-6 text-sidebar-foreground/70">
            {message}
          </div>
        ) : null}

        <Button
          className="w-full"
          disabled={!hasConfig || isSubmitting}
          type="submit"
        >
          {isSubmitting
            ? "Please wait..."
            : isOwnerSetup
              ? "Create private access"
              : "Enter Jared Brain"}
        </Button>
      </form>

      <button
        className="mt-4 text-sm text-sidebar-foreground/65 hover:text-sidebar-foreground"
        onClick={() => {
          setMode((current) => (current === "login" ? "signup" : "login"));
          setMessage(null);
        }}
        type="button"
      >
        {isOwnerSetup ? "Return to secure login." : "Authorised setup only."}
      </button>
    </section>
  );
}

function getSafeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}
