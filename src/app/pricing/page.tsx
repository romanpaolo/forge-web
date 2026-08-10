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
    "One price: $249/month includes your first 3 seats, +$39/month per additional seat, 20% off billed annually. 14-day free trial. No credit card required to start.",
  openGraph: {
    title: "Forge Pricing | One Price, First 3 Seats Included",
    description:
      "Join the Founders Council. Full ScopeSnap access, unlimited job walks, locked-in founding rate.",
    type: "website",
    url: "https://www.forge.equipment/pricing",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// Pricing page - PRD 9.10, word-for-word.
export default function PricingPage() {
  const hasPaidTiers = PRICING_TIERS.length > 0;
  const gridCols = TIER_GRID[PRICING_TIERS.length] ?? "md:grid-cols-3 max-w-6xl";

  return (
    <div className="min-h-screen bg-forge-body text-forge-white">
      <Navbar />

      {/* Page header - clears the fixed Navbar */}
      <header className="max-w-7xl mx-auto px-6 pt-40 pb-8 text-center">
        <SectionLabel>Pricing</SectionLabel>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-medium uppercase tracking-[-0.01em] text-forge-white mt-6">
          Free While We Build It Together
        </h1>
        <p className="text-forge-smoke text-lg max-w-2xl mx-auto mt-6">
          $249/month covers your first 3 seats: owner, PM, and estimator,
          however you split it. Add teammates for $39/month each. No per-walk
          fees, no usage caps.
        </p>
      </header>

      {/* Founders Council — the live offer */}
      <Pricing />

      {/* FAQ - the 7 Q&As from PRD 9.10 */}
      <FAQ items={PRICING_FAQ} />

      {/* Android waitlist - renders ONLY behind NEXT_PUBLIC_ANDROID_WAITLIST=true */}
      <AndroidWaitlist />

      <FinalCTA />

      <Footer />
    </div>
  );
}
