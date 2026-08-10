import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import { CALENDLY_URL } from "@/lib/constants";

// Founders Council beta offer — shown on /pricing above the paid tiers.
// PRD 9.10: free during beta, lock-in founding rate afterward.
export default function Pricing() {
  return (
    <section className="relative py-16 md:py-24 bg-transparent overflow-hidden">
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <SectionLabel>Founders Council</SectionLabel>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-[-0.01em] text-forge-white mt-6">
          Free for the entire beta.
        </h2>

        <p className="text-forge-smoke text-lg max-w-xl mx-auto mt-4 leading-relaxed">
          Run real job walks on your own jobs, shape the product with direct access
          to the dev team, and lock in founding pricing before the beta ends.
        </p>

        <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 text-sm text-forge-ash">
          {[
            "Full ScopeSnap access",
            "Unlimited job walks",
            "No credit card",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="text-forge-cyan font-mono" aria-hidden="true">＋</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
          >
            Join Founders Council
          </Button>
        </div>

        <p className="text-forge-graphite text-xs mt-6">
          We are hand picking 20 contractors. Book a 30-minute call and we will get you set up.
        </p>
      </div>
    </section>
  );
}
