import type { Metadata } from "next";
import { Mail, CalendarDays } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import FAQ from "@/components/sections/FAQ";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "@/components/support/ContactForm";
import { SUPPORT_FAQ } from "@/lib/constants";

const SUPPORT_EMAIL = "team@forge.equipment";
const CALENDLY_URL = "https://calendly.com/christian-forge/30min";

export const metadata: Metadata = {
  title: "Support | Forge",
  description:
    "Get help with Forge and ScopeSnap. Browse common questions, email the team, or book a call. We respond within one business day.",
  openGraph: {
    title: "Forge Support: We've Got Your Back",
    description:
      "Questions, bugs, billing, or onboarding. Reach the Forge team directly. Responses within one business day.",
    type: "website",
    url: "https://www.forge.equipment/support",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-forge-body text-forge-white">
      <Navbar />

      {/* pt clears the fixed Navbar (h-16). No second stacked sub-header like /legal. */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="py-16 border-b border-white/5">
          <SectionLabel>Support</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-bold text-forge-white mt-5 mb-4 tracking-tight leading-tight">
            How can we help?
          </h1>
          <p className="text-forge-smoke text-lg leading-relaxed max-w-2xl">
            Stuck on a job walk, hit a bug, or have a question about your
            account? Browse the common questions below, or reach the team
            directly. We respond within one business day.
          </p>
        </section>

        {/* ── FAQ (support subset; same accordion as home) ──────────────── */}
        <section className="border-b border-white/5">
          <FAQ items={SUPPORT_FAQ} />
        </section>

        {/* ── Contact ───────────────────────────────────────────────────── */}
        <section className="py-16">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="text-3xl font-semibold text-forge-white mt-4 mb-3 tracking-tight">
            Reach the team
          </h2>
          <p className="text-forge-smoke text-sm leading-relaxed max-w-2xl mb-12">
            Pick whatever&rsquo;s fastest for you: email us, book a call, or send
            the form below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Direct options — rounded-lg buttons, matching /legal's nav style. */}
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="group flex items-start gap-4 rounded-lg border border-white/10 bg-forge-iron/40 px-5 py-4 transition-colors hover:border-forge-cyan/40 hover:bg-white/5"
              >
                <Mail
                  size={20}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-forge-cyan"
                  aria-hidden="true"
                />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-forge-white group-hover:text-forge-cyan transition-colors">
                    Email us
                  </span>
                  <span className="text-sm text-forge-smoke">{SUPPORT_EMAIL}</span>
                  <span className="mt-1 text-xs text-forge-graphite">
                    Best for bugs, billing, and account questions.
                  </span>
                </span>
              </a>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-lg border border-white/10 bg-forge-iron/40 px-5 py-4 transition-colors hover:border-forge-cyan/40 hover:bg-white/5"
              >
                <CalendarDays
                  size={20}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-forge-cyan"
                  aria-hidden="true"
                />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-forge-white group-hover:text-forge-cyan transition-colors">
                    Book a call
                  </span>
                  <span className="text-sm text-forge-smoke">30 min walkthrough</span>
                  <span className="mt-1 text-xs text-forge-graphite">
                    Best for onboarding and Founders Council.
                  </span>
                </span>
              </a>
            </div>

            {/* Contact form (client component — composes a mailto). */}
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
