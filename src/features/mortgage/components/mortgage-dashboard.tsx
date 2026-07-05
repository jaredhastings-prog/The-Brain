"use client";

import * as React from "react";
import { AlertTriangle, CalendarClock, Landmark, PiggyBank, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  amortize,
  balanceSnapshots,
  extraRepayments,
  mortgageLoan,
  scenarios,
  type Scenario,
} from "@/features/mortgage/data/mortgage-data";
import { cn } from "@/lib/utils";

const currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

const currencyExact = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

export function MortgageDashboard() {
  const [activeScenarioId, setActiveScenarioId] = React.useState<string>("extra-300");
  const activeScenario = scenarios.find((s) => s.id === activeScenarioId);

  const baseline = React.useMemo(
    () =>
      amortize(
        mortgageLoan.balance,
        mortgageLoan.annualRate,
        mortgageLoan.monthlyRepayment,
      ),
    [],
  );

  const scenarioResult = React.useMemo(() => {
    if (!activeScenario) return null;
    return amortize(
      mortgageLoan.balance,
      mortgageLoan.annualRate,
      mortgageLoan.monthlyRepayment,
      activeScenario.extraMonthly,
      activeScenario.offsetBalance,
    );
  }, [activeScenario]);

  const interestSaved = scenarioResult
    ? baseline.totalInterest - scenarioResult.totalInterest
    : 0;
  const monthsSaved = scenarioResult ? baseline.months - scenarioResult.months : 0;

  const currentYear = new Date().getFullYear();
  const extraThisYear = extraRepayments
    .filter((r) => new Date(r.date).getFullYear() === currentYear)
    .reduce((sum, r) => sum + r.amount, 0);
  const capUsedPct = Math.min(
    (extraThisYear / mortgageLoan.extraRepaymentCapPerYear) * 100,
    100,
  );
  const nearCap = capUsedPct >= 80;

  const latestSnapshot = balanceSnapshots[balanceSnapshots.length - 1];

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="signal">Mortgage</Badge>
          <Badge variant="outline">
            {(mortgageLoan.annualRate * 100).toFixed(2)}% fixed until Jan 2027
          </Badge>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
          {currencyExact.format(latestSnapshot.balance)}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Balance as of {formatDate(latestSnapshot.date)} · loan ends{" "}
          {formatDate(mortgageLoan.loanEndDate)} on minimum repayments
        </p>

        <PayoffProgress currentBalance={latestSnapshot.balance} />

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatTile
            icon={<Landmark className="size-4" />}
            label="Monthly repayment"
            value={currency.format(mortgageLoan.monthlyRepayment)}
            helper="Estimated minimum"
          />
          <StatTile
            icon={<TrendingDown className="size-4" />}
            label="Interest if unchanged"
            value={`~${currency.format(mortgageLoan.estTotalInterestIfUnchanged)}`}
            helper="Over remaining life"
          />
          <StatTile
            icon={<CalendarClock className="size-4" />}
            label="Years remaining"
            value={`~${Math.round(baseline.months / 12)} yrs`}
            helper="On minimum repayments"
          />
        </div>
      </section>

      <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">Payoff projection</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Minimum-repayment baseline vs the selected strategy.
            </p>
          </div>
          {scenarioResult && (
            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">
                {currency.format(interestSaved)} interest saved
              </div>
              <div className="text-xs text-muted-foreground">
                {(monthsSaved / 12).toFixed(1)} years off the loan
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {scenarios.map((scenario) => (
            <Button
              key={scenario.id}
              size="sm"
              variant={scenario.id === activeScenarioId ? "default" : "outline"}
              className="h-8 rounded-full px-4 text-xs"
              onClick={() => setActiveScenarioId(scenario.id)}
            >
              {scenario.label}
            </Button>
          ))}
        </div>

        {scenarioResult && (
          <ProjectionChart
            baseline={baseline.points.map((p) => p.balance)}
            scenario={scenarioResult.points.map((p) => p.balance)}
            startBalance={mortgageLoan.balance}
          />
        )}

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-5 rounded-full bg-muted-foreground/50" />
            Minimum repayments
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-5 rounded-full bg-primary" />
            {activeScenario?.label}
          </span>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
          <div className="flex items-center gap-2">
            <PiggyBank className="size-4 text-muted-foreground" />
            <h2 className="text-base font-semibold text-foreground">
              Extra repayments · {currentYear}
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Fixed-rate period likely caps extra repayments at ~
            {currency.format(mortgageLoan.extraRepaymentCapPerYear)}/year. Confirm the
            exact cap with the lender.
          </p>
          <div className="mt-4">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-semibold text-foreground">
                {currency.format(extraThisYear)}
              </span>
              <span className="text-muted-foreground">
                of {currency.format(mortgageLoan.extraRepaymentCapPerYear)} cap
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  nearCap ? "bg-amber-500" : "bg-primary",
                )}
                style={{ width: `${capUsedPct}%` }}
              />
            </div>
            {nearCap && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-amber-600">
                <AlertTriangle className="size-3.5" />
                Approaching the annual extra-repayment cap
              </p>
            )}
          </div>
          {extraRepayments.length === 0 ? (
            <p className="mt-4 rounded-md border border-dashed border-border/70 bg-muted/30 p-3 text-xs text-muted-foreground">
              No extra repayments logged yet. Log them here as they happen to track
              progress against the cap.
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {extraRepayments.map((r) => (
                <li
                  key={`${r.date}-${r.amount}`}
                  className="flex items-center justify-between rounded-md border border-border/70 bg-muted/30 px-3 py-2 text-sm"
                >
                  <span className="text-muted-foreground">
                    {formatDate(r.date)}
                    {r.note ? ` · ${r.note}` : ""}
                  </span>
                  <span className="font-medium text-foreground">
                    {currency.format(r.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
          <div className="flex items-center gap-2">
            <CalendarClock className="size-4 text-muted-foreground" />
            <h2 className="text-base font-semibold text-foreground">
              Milestone: 29 Jan 2027
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Fixed rate ends — the key restructure point. <MilestoneCountdown />
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "Refinance rate check — compare against the market",
              "Add an offset account",
              "Remove the extra-repayment cap",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-md border border-border/70 bg-muted/30 px-3 py-2.5 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-5 text-muted-foreground">
            These figures are estimates based on standard amortisation math — not
            confirmed against the actual loan contract or lender rules. Verify the
            exact extra-repayment cap and offset terms before treating them as hard
            limits.
          </p>
        </section>
      </div>

      <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <h2 className="text-base font-semibold text-foreground">Modelled scenarios</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pre-modelled outcomes — tap a row to plot it above.
        </p>
        <div className="mt-4 space-y-2">
          {scenarios.map((scenario) => (
            <ScenarioRow
              key={scenario.id}
              scenario={scenario}
              active={scenario.id === activeScenarioId}
              onSelect={() => setActiveScenarioId(scenario.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function PayoffProgress({ currentBalance }: { currentBalance: number }) {
  const principalPaid = mortgageLoan.originalAmount - currentBalance;
  const principalPct = (principalPaid / mortgageLoan.originalAmount) * 100;

  const estLifetimeInterest =
    mortgageLoan.interestPaidToDate + mortgageLoan.estTotalInterestIfUnchanged;
  const interestPct = (mortgageLoan.interestPaidToDate / estLifetimeInterest) * 100;

  const yearsIn =
    (Date.now() - new Date(mortgageLoan.loanStartDate).getTime()) /
    (1000 * 60 * 60 * 24 * 365.25);

  return (
    <div className="mt-6 space-y-5 rounded-md border border-border/70 bg-muted/30 p-4 md:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-foreground">Payoff progress</h2>
        <span className="text-xs text-muted-foreground">
          {currency.format(mortgageLoan.originalAmount)} · {mortgageLoan.termYears}-year
          loan · started {formatDate(mortgageLoan.loanStartDate)} (
          {yearsIn.toFixed(1)} years in)
        </span>
      </div>

      <div>
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold text-foreground">
            Principal · {principalPct.toFixed(1)}% paid off
          </span>
          <span className="text-xs text-muted-foreground">
            {currency.format(principalPaid)} paid · {currency.format(currentBalance)} to
            go
          </span>
        </div>
        <div className="mt-2 flex h-4 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-l-full bg-emerald-500"
            style={{ width: `${principalPct}%` }}
          />
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold text-foreground">
            Interest · {interestPct.toFixed(0)}% of lifetime est.
            {mortgageLoan.interestPaidIsEstimate ? " *" : ""}
          </span>
          <span className="text-xs text-muted-foreground">
            ~{currency.format(mortgageLoan.interestPaidToDate)} paid · ~
            {currency.format(mortgageLoan.estTotalInterestIfUnchanged)} to go
          </span>
        </div>
        <div className="mt-2 flex h-4 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-l-full bg-amber-500"
            style={{ width: `${interestPct}%` }}
          />
        </div>
      </div>

      {mortgageLoan.interestPaidIsEstimate && (
        <p className="text-xs leading-5 text-muted-foreground">
          * Interest paid to date is an estimate — rate history since 2021 hasn&apos;t
          been confirmed. Update with the actual figure from statements.
        </p>
      )}
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
  helper,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-md border border-border/70 bg-muted/30 p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-xl font-semibold text-foreground">{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{helper}</div>
    </div>
  );
}

function ScenarioRow({
  scenario,
  active,
  onSelect,
}: {
  scenario: Scenario;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full flex-wrap items-center justify-between gap-2 rounded-md border px-3 py-2.5 text-left text-sm transition-colors",
        active
          ? "border-primary/50 bg-primary/5"
          : "border-border/70 bg-muted/30 hover:bg-muted/50",
      )}
    >
      <span className={cn("font-medium", active ? "text-foreground" : "text-muted-foreground")}>
        {scenario.label}
      </span>
      <span className="flex gap-4 text-xs text-muted-foreground">
        <span>{scenario.yearsSaved} saved</span>
        <span className="font-medium text-foreground">{scenario.interestSaved}</span>
      </span>
    </button>
  );
}

function ProjectionChart({
  baseline,
  scenario,
  startBalance,
}: {
  baseline: number[];
  scenario: number[];
  startBalance: number;
}) {
  const width = 720;
  const height = 260;
  const padX = 8;
  const padY = 12;
  const months = baseline.length;

  const toPath = (series: number[]) =>
    series
      .map((balance, i) => {
        const x = padX + (i / (months - 1)) * (width - padX * 2);
        const y = padY + (1 - balance / startBalance) * (height - padY * 2);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  const yearMarks = [];
  for (let year = 5; year * 12 < months; year += 5) {
    yearMarks.push(year);
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mt-4 w-full"
      role="img"
      aria-label="Mortgage balance projection: baseline vs selected strategy"
    >
      {yearMarks.map((year) => {
        const x = padX + ((year * 12) / (months - 1)) * (width - padX * 2);
        return (
          <g key={year}>
            <line
              x1={x}
              y1={padY}
              x2={x}
              y2={height - padY}
              className="stroke-border"
              strokeDasharray="2 4"
            />
            <text
              x={x}
              y={height - 1}
              textAnchor="middle"
              className="fill-muted-foreground text-[9px]"
            >
              {year}y
            </text>
          </g>
        );
      })}
      <path
        d={toPath(baseline)}
        fill="none"
        className="stroke-muted-foreground/50"
        strokeWidth={2}
      />
      <path
        d={toPath(scenario)}
        fill="none"
        className="stroke-primary"
        strokeWidth={2.5}
      />
    </svg>
  );
}

function MilestoneCountdown() {
  const [months, setMonths] = React.useState<number | null>(null);

  React.useEffect(() => {
    const target = new Date("2027-01-29").getTime();
    const now = Date.now();
    setMonths(Math.max(Math.round((target - now) / (1000 * 60 * 60 * 24 * 30.44)), 0));
  }, []);

  if (months === null) return null;
  return <span className="font-medium text-foreground">~{months} months away.</span>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
