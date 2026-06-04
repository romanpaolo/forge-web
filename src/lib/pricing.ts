// Static pricing tiers — never computed at runtime, never model-generated.
// Populate with REAL numbers when paid plans launch. While this array is empty,
// /pricing ships only the free Founders Council offer (the <Pricing /> section),
// which matches the rest of the site's "free during beta" messaging.

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
      "One-tap Buildertrend, PDF, and PM handoff exports",
      "Priority support from the dev team",
      "Add a seat for every member of your crew",
    ],
    cta: { label: "Get Early Access", href: "https://calendly.com/christian-forge/30min" },
  },
];
