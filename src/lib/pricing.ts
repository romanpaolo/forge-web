// Production pricing - PRD Section 8 (Ethan Rife, Michael-audited, 2026-07).
// These are the ONLY approved numbers. Client-side math here is a display
// convenience; the future Stripe Checkout flow (PRD Section 13 - blocked on
// backend work) recomputes entitlements server-side from subscription line
// items and never trusts these values.

export const INCLUDED_SEATS = 3;
export const MIN_SEATS = 3;

/** $/month, includes the first 3 seats. */
export const BASE_MONTHLY = 249;
/** $/month per seat above the included 3. */
export const SEAT_MONTHLY = 39;
/** $/year (20% off), includes the first 3 seats. Reads as $199/month. */
export const BASE_ANNUAL = 2390;
/** $/year per seat above the included 3 (20% off). Reads as $31/month. */
export const SEAT_ANNUAL = 374;

export type BillingPlan = "monthly" | "annual";

/** Monthly total in dollars: 249 + 39 × (seats − 3). */
export function monthlyTotal(seats: number): number {
  return BASE_MONTHLY + SEAT_MONTHLY * Math.max(0, seats - INCLUDED_SEATS);
}

/** Annual total in dollars: 2390 + 374 × (seats − 3). */
export function annualTotal(seats: number): number {
  return BASE_ANNUAL + SEAT_ANNUAL * Math.max(0, seats - INCLUDED_SEATS);
}

/**
 * An annual price expressed as the monthly rate we show on the card: the
 * annual amount divided by 12, rounded to whole dollars. $2,390/yr reads as
 * $199/month, $374/yr per seat reads as $31/month.
 *
 * Display only. Nobody is charged this number; the annual plan charges the
 * annual total once, and the card prints that total in full underneath.
 *
 * Whole dollars is deliberate. There are two ways to arrive at the discounted
 * monthly rate and they disagree in the cents: annual total ÷ 12 gives
 * $199.17 base and $31.17 per seat, while monthly rate × 0.8 gives $199.20 and
 * $31.20. Rounding to dollars makes both routes land on the same figure, and
 * it matches how the plans are quoted in copy ($199/month, not $199.17).
 */
export function annualAsMonthly(annualAmount: number): number {
  return Math.round(annualAmount / 12);
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}
