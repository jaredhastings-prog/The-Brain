import { Suspense } from "react";

import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-sidebar text-sidebar-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 md:px-6">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.9fr)_420px] lg:items-center">
          <section>
            <div className="inline-flex rounded-md border border-sidebar-accent bg-sidebar-accent/45 px-3 py-1 text-sm text-sidebar-foreground/75">
              Private workspace access
            </div>
            <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-normal md:text-5xl">
              Secure login for Jared Brain.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-sidebar-foreground/65">
              This is a private personal operating system for Jared&apos;s
              thinking, capture, and memory. Authorised access only.
            </p>
          </section>
          <Suspense fallback={<LoginCardFallback />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

function LoginCardFallback() {
  return (
    <div className="rounded-lg border border-sidebar-accent bg-sidebar-accent/35 p-5 shadow-2xl">
      <div className="h-6 w-32 rounded-md bg-sidebar-accent" />
      <div className="mt-6 h-10 rounded-md bg-sidebar-accent" />
      <div className="mt-3 h-10 rounded-md bg-sidebar-accent" />
      <div className="mt-5 h-10 rounded-md bg-sidebar-accent" />
    </div>
  );
}
