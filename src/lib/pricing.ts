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
/** $/year (20% off), includes the first 3 seats. ≈ $199/mo. */
export const BASE_ANNUAL = 2390;
/** $/year per seat above the included 3 (20% off). ≈ $31/mo. */
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

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}
