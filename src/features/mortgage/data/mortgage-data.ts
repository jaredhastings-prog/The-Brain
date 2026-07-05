export type MortgageLoan = {
  originalAmount: number;
  loanStartDate: string;
  termYears: number;
  // Estimate — actual figure depends on rate history since 2021.
  // Replace with the real number from statements when available.
  interestPaidToDate: number;
  interestPaidIsEstimate: boolean;
  balance: number;
  balanceAsOf: string;
  annualRate: number;
  fixedUntil: string;
  loanEndDate: string;
  monthlyRepayment: number;
  estTotalInterestIfUnchanged: number;
  extraRepaymentCapPerYear: number;
};

export type ExtraRepayment = {
  date: string;
  amount: number;
  note?: string;
};

export type BalanceSnapshot = {
  date: string;
  balance: number;
};

export type Scenario = {
  id: string;
  label: string;
  extraMonthly: number;
  offsetBalance: number;
  yearsSaved: string;
  interestSaved: string;
};

export const mortgageLoan: MortgageLoan = {
  originalAmount: 601342,
  loanStartDate: "2021-07-01",
  termYears: 30,
  interestPaidToDate: 125000,
  interestPaidIsEstimate: true,
  balance: 547495.61,
  balanceAsOf: "2026-07-01",
  annualRate: 0.0574,
  fixedUntil: "2027-01-29",
  loanEndDate: "2051-08-07",
  monthlyRepayment: 3437,
  estTotalInterestIfUnchanged: 487000,
  // Placeholder — confirm exact cap and offset terms with the lender before
  // treating these as hard limits.
  extraRepaymentCapPerYear: 10000,
};

// Log extra repayments here as they happen — the cap tracker sums the
// current calendar year against extraRepaymentCapPerYear.
export const extraRepayments: ExtraRepayment[] = [];

// Log actual balances over time to plot progress against the baseline.
export const balanceSnapshots: BalanceSnapshot[] = [
  { date: "2026-07-01", balance: 547495.61 },
];

export const scenarios: Scenario[] = [
  {
    id: "extra-300",
    label: "+$300/month extra",
    extraMonthly: 300,
    offsetBalance: 0,
    yearsSaved: "~4 years",
    interestSaved: "~$88,800",
  },
  {
    id: "extra-500",
    label: "+$500/month extra",
    extraMonthly: 500,
    offsetBalance: 0,
    yearsSaved: "~6 years",
    interestSaved: "~$131,800",
  },
  {
    id: "offset-only",
    label: "$10k offset only (post-2027)",
    extraMonthly: 0,
    offsetBalance: 10000,
    yearsSaved: "~1–1.5 years",
    interestSaved: "~$15,000–$20,000",
  },
  {
    id: "offset-extra-300",
    label: "$10k offset + $300/month extra",
    extraMonthly: 300,
    offsetBalance: 10000,
    yearsSaved: "~5 years",
    interestSaved: "~$105,000",
  },
  {
    id: "offset-extra-500",
    label: "$10k offset + $500/month extra",
    extraMonthly: 500,
    offsetBalance: 10000,
    yearsSaved: "~7 years",
    interestSaved: "~$148,000",
  },
];

export type AmortizationPoint = {
  monthIndex: number;
  balance: number;
};

export type AmortizationResult = {
  points: AmortizationPoint[];
  months: number;
  totalInterest: number;
};

export function amortize(
  startingBalance: number,
  annualRate: number,
  monthlyRepayment: number,
  extraMonthly = 0,
  offsetBalance = 0,
  maxMonths = 12 * 40,
): AmortizationResult {
  const monthlyRate = annualRate / 12;
  const points: AmortizationPoint[] = [{ monthIndex: 0, balance: startingBalance }];
  let balance = startingBalance;
  let totalInterest = 0;
  let month = 0;

  while (balance > 0 && month < maxMonths) {
    month += 1;
    const interestBase = Math.max(balance - offsetBalance, 0);
    const interest = interestBase * monthlyRate;
    totalInterest += interest;
    balance = balance + interest - monthlyRepayment - extraMonthly;
    if (balance < 0) balance = 0;
    points.push({ monthIndex: month, balance });
  }

  return { points, months: month, totalInterest };
}
