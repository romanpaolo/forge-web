// Production pricing - PRD Section 8 (Ethan Rife, Michael-audited, 2026-07).
// These are the ONLY approved numbers. Client-side math here is a display
// convenience; the future Stripe Checkout flow (PRD Section 13 - blocked on
// backend work) recomputes entitlements server-side from subscription line
// items and never trusts these values.

// ─── Plan configurator math (249 + 39×(seats−3) monthly; 2390 + 374×(seats−3) annual) ───

export type BillingPlan = "monthly" | "annual";

export const MIN_SEATS = 3;
export const INCLUDED_SEATS = 3;

/** Base price for 3 included seats, monthly billing */
const BASE_MONTHLY = 249;

/** Base price for 3 included seats, annual billing */
export const BASE_ANNUAL = 2390;

/** Per additional seat per month (above INCLUDED_SEATS) */
export const SEAT_MONTHLY = 39;

/** Per additional seat per year (above INCLUDED_SEATS) */
export const SEAT_ANNUAL = 374;

export function monthlyTotal(seats: number): number {
  return BASE_MONTHLY + Math.max(0, seats - INCLUDED_SEATS) * SEAT_MONTHLY;
}

export function annualTotal(seats: number): number {
  return BASE_ANNUAL + Math.max(0, seats - INCLUDED_SEATS) * SEAT_ANNUAL;
}

/** Format a whole-dollar amount as "$249" with no cents. */
export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

// ─── Tier definitions ────────────────────────────────────────────────────────

export type PricingTier = {
  name: string;
  /** Display string, e.g. "$49" — kept as text so we never compute money. */
  price: string;
  /** e.g. "per seat / month". Omit for one-line prices. */
  period?: string;
  blurb: string;
  features: string[];
  cta: { label: string; href: string };
  /** Visually emphasize one tier. */
  featured?: boolean;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free Trial",
    price: "$0",
    period: "for 2 weeks",
    blurb: "Run real job walks on your own jobs before you pay a dime.",
    features: [
      "Full ScopeSnap access for 14 days",
      "Unlimited job walks during the trial",
      "Export to Buildertrend, PDF, and PM email",
      "No credit card to start",
    ],
    cta: { label: "Start Free Trial", href: "https://calendly.com/christian-forge/30min" },
  },
  {
    name: "Pro",
    price: "$99",
    period: "per seat / month",
    blurb: "For crews that walk jobs every week and want it all handled.",
    featured: true,
    features: [
      "Everything in the free trial",
      "Unlimited job walks, every month",
      "One tap Buildertrend, PDF, and PM handoff exports",
      "Priority support from the dev team",
      "Add a seat for every member of your crew",
    ],
    cta: { label: "Subscribe", href: "https://buy.stripe.com/fZu5kDcDC99H3ES73c3Nm05" },
  },
];
