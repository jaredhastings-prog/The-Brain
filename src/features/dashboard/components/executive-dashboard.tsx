import Link from "next/link";
import { ArrowRight, GraduationCap, UtensilsCrossed } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ExecutiveDashboard() {
  return (
    <div className="flex min-h-[60vh] flex-col justify-center space-y-8 max-w-2xl">
      <div>
        <h1 className="text-4xl font-semibold tracking-normal text-foreground md:text-5xl">
          Jared Brain
        </h1>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Your personal knowledge system. Start with what matters now.
        </p>
      </div>

      <div className="space-y-3">
        <LandingCard
          icon={<GraduationCap className="size-5" />}
          title="Study & Learning"
          subtitle="Business Psychology · NLP"
          href="/study-learning"
          label="Go to Study & Learning"
        />
        <LandingCard
          icon={<UtensilsCrossed className="size-5" />}
          title="Recipes"
          subtitle="Your recipe collection"
          href="/recipes"
          label="Go to Recipes"
        />
      </div>
    </div>
  );
}

function LandingCard({
  icon,
  title,
  subtitle,
  href,
  label,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)]">
      <div className="flex items-center gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
          {icon}
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">{title}</div>
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        </div>
      </div>
      <Button asChild className="mt-4 w-full justify-between" variant="secondary">
        <Link href={href}>
          {label}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
