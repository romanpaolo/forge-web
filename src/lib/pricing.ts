// Static pricing tiers — never computed at runtime, never model-generated.
//
// INTENTIONALLY EMPTY (2026-07): the beta is free and no paid prices are
// committed, so /pricing ships only the free Founders Council offer (the
// <Pricing /> section) — pricing/page.tsx degrades gracefully via
// hasPaidTiers. Populate with REAL, approved numbers only when paid plans
// actually launch.

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

export const PRICING_TIERS: PricingTier[] = [];
