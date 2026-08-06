import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Pricing from "@/components/sections/Pricing";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { PRICING_TIERS, type PricingTier } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing | Forge",
  description:
    "Forge is free during the entire beta. Join the Founders Council to lock in founding member pricing. No credit card, no commitment.",
  openGraph: {
    title: "Forge Pricing: Free During Beta",
    description:
      "Join the Founders Council. Full ScopeSnap access, unlimited job walks, locked-in founding rate.",
    type: "website",
    url: "https://www.forge.equipment/pricing",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// Sharp tier card — rounded-none + corner-bracket framing (pattern from Pricing.tsx:71-76).
function TierCard({ tier }: { tier: PricingTier }) {
  return (
    <div className="relative">
      {/* Outer corner brackets */}
      <div className="absolute -inset-4 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-forge-graphite/50" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-forge-graphite/50" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-forge-graphite/50" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-forge-graphite/50" />
      </div>

      <div
        className={`h-full bg-forge-graphite/50 backdrop-blur-sm rounded-none p-8 flex flex-col gap-6 ${
          tier.featured
            ? "border border-forge-cyan/40 shadow-[0_0_80px_rgba(14,165,233,0.05)]"
            : "border border-white/5"
        }`}
      >
        <div className="flex flex-col gap-2">
          <span className="bg-forge-white/5 text-forge-ash self-start px-4 py-1.5 text-sm font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-mono)]">
            {tier.name}
          </span>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-4xl font-medium text-forge-white tabular-nums tracking-tight">
              {tier.price}
            </span>
            {tier.period && (
              <span className="text-forge-smoke text-sm">{tier.period}</span>
            )}
          </div>
          <p className="text-forge-smoke text-sm leading-relaxed mt-1">{tier.blurb}</p>
        </div>

        <ul className="flex flex-col gap-3 flex-1">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-left">
              <span
                className="text-forge-cyan font-mono text-sm shrink-0 mt-0.5"
                aria-hidden="true"
              >
                ＋
              </span>
              <span className="text-forge-white text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          href={tier.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          variant={tier.featured ? "primary" : "secondary"}
          size="md"
          className="w-full"
        >
          {tier.cta.label}
        </Button>
      </div>
    </div>
  );
}

// Lay the tier grid out around however many tiers exist, kept centered.
const TIER_GRID: Record<number, string> = {
  1: "md:grid-cols-1 max-w-md",
  2: "md:grid-cols-2 max-w-3xl",
  3: "md:grid-cols-3 max-w-6xl",
};

export default function PricingPage() {
  const hasPaidTiers = PRICING_TIERS.length > 0;
  const gridCols = TIER_GRID[PRICING_TIERS.length] ?? "md:grid-cols-3 max-w-6xl";

  return (
    <div className="min-h-screen bg-forge-body text-forge-white">
      <Navbar />

      {/* Page header — clears the fixed Navbar */}
      <header className="max-w-7xl mx-auto px-6 pt-40 pb-8 text-center">
        <SectionLabel>Pricing</SectionLabel>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-medium uppercase tracking-[-0.01em] text-forge-white mt-6">
          Free While We Build It Together
        </h1>
        <p className="text-forge-smoke text-lg max-w-2xl mx-auto mt-6">
          Forge is free for the entire beta. Get on the job site, run your walks, and
          help shape the tool, then lock in founding member pricing before it ships.
        </p>
      </header>

      {/* Founders Council — the live offer */}
      <Pricing />

      {/* Paid tiers — render only when real numbers exist in src/lib/pricing.ts */}
      {hasPaidTiers && (
        <section className="relative py-24 md:py-32 bg-transparent">
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <SectionLabel>Plans</SectionLabel>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium uppercase tracking-[-0.01em] text-forge-white mt-6">
              Pick Your Crew Size
            </h2>
            <p className="text-forge-smoke text-lg max-w-2xl mx-auto mt-4">
              Straightforward plans that scale with the jobs you run. No per-walk fees,
              no surprises.
            </p>

            <div className={`grid grid-cols-1 ${gridCols} gap-12 mt-20 text-left mx-auto`}>
              {PRICING_TIERS.map((tier) => (
                <TierCard key={tier.name} tier={tier} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />

      <Footer />
    </div>
  );
}
