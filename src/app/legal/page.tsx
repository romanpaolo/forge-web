"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Hexagon, Menu, X } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import SectionLabel from "@/components/ui/SectionLabel";
import Footer from "@/components/sections/Footer";
import { msaUrl, privacyUrl, termsUrl } from "@/lib/constants";

// ─── Data ────────────────────────────────────────────────────────────────────

// Terms, Privacy and the MSA are LINKS, not copies. Each is published once,
// by the app (app.forge.equipment/terms, /privacy and /legal/msa), so there
// is no second copy to drift from it. Copies here had drifted every time:
// - MSA (F-050, ruling 11 in the 2026-09-22 integration PRD): an earlier
//   revision carried its own copy, and its clause 3.4 had fallen behind.
// - Terms and Privacy (F-662, Q3 = a, RZ 2026-09-24): this page's Privacy
//   Policy said declining AI consent still lets you use Forge, where the
//   app's policy, the one the product links, says AI processing is required;
//   its Terms printed a change log about the free beta and founding rates.
// The #terms and #privacy sections stay, as short links, because the App
// Store listing and older pages cite those anchors.
//
// The Refund Policy and the Disclaimer are published ONLY here (the app has
// no page for either), so they stay as text. The Refund Policy lost its
// bullet about usage charges under F-662 (N5): Forge has none.
const NAV_SECTIONS = [
  { id: "terms", label: "Terms of Service" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "refund", label: "Refund Policy" },
  { id: "disclaimer", label: "Disclaimer" },
  // Last on purpose: the MSA governs deals signed with an Order Form, and
  // every self-serve signup stays under the Terms of Service.
  { id: "msa", label: "Master Subscription Agreement" },
];

// ─── Section wrapper ─────────────────────────────────────────────────────────

function Section({
  id,
  tag,
  title,
  effectiveDate = "March 29, 2026",
  children,
}: {
  id: string;
  tag: string;
  title: string;
  /** null for a section that points at a document dated elsewhere. */
  effectiveDate?: string | null;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-16 border-b border-white/5">
      <div className="mb-10">
        <SectionLabel>{tag}</SectionLabel>
        <h2 className="text-3xl font-semibold text-forge-white mt-4 mb-3 tracking-tight">
          {title}
        </h2>
        {effectiveDate !== null && (
          <p className="text-forge-smoke text-sm">Effective Date: {effectiveDate}</p>
        )}
      </div>
      <div className="prose-legal max-w-3xl flex flex-col gap-8">{children}</div>
    </section>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState("terms");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionEls = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => el && observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-forge-body text-forge-white">
      <Navbar />

      {/* ── Top nav bar ─────────────────────────────────────────────────── */}
      <header className="fixed top-16 left-0 right-0 z-40 bg-forge-iron/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-forge-smoke hover:text-forge-white transition-colors"
              aria-label="Back to Forge home"
            >
              <Hexagon size={18} strokeWidth={2} className="text-forge-cyan" aria-hidden="true" />
              <span className="font-bold text-forge-white tracking-tight">FORGE</span>
            </Link>
            <span className="text-forge-graphite select-none">/</span>
            <span className="text-forge-smoke text-sm font-medium">Legal</span>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-forge-smoke hover:text-forge-white transition-colors"
            onClick={() => setMobileSidebarOpen((o) => !o)}
            aria-label="Toggle section navigation"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Mobile section nav overlay ──────────────────────────────────── */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden pt-16">
          <div
            className="absolute inset-0 bg-forge-iron/95 backdrop-blur-md"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <nav className="relative px-6 py-6 flex flex-col gap-1">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === section.id
                    ? "bg-forge-cyan/10 text-forge-cyan"
                    : "text-forge-smoke hover:text-forge-white hover:bg-white/5"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24 flex gap-16">
        {/* ── Sticky sidebar ──────────────────────────────────────────────── */}
        {/* w-max with a w-52 floor: the sidebar is as wide as its longest
            label, so "Master Subscription Agreement" is one line instead of
            two (F-631). Labels are whitespace-nowrap. */}
        <aside className="hidden md:block w-max min-w-52 flex-shrink-0">
          <div className="sticky top-40">
            <p className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4 px-4">
              Sections
            </p>
            <nav className="flex flex-col gap-0.5" aria-label="Legal page sections">
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`text-left whitespace-nowrap px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    activeSection === section.id
                      ? "bg-forge-cyan/10 text-forge-cyan border-l-2 border-forge-cyan"
                      : "text-forge-smoke hover:text-forge-white hover:bg-white/5 border-l-2 border-transparent"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Main content ────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          {/* Page header */}
          <div className="mb-16 pb-16 border-b border-white/5">
            <SectionLabel>Forge</SectionLabel>
            <h1 className="text-5xl font-bold text-forge-white mt-5 mb-4 tracking-tight leading-tight">
              Legal
            </h1>
            <p className="text-forge-smoke text-lg leading-relaxed max-w-2xl">
              The Refund Policy and Disclaimer for Forge Solutions, Corp, with
              links to our Terms of Service, Privacy Policy and Master
              Subscription Agreement. Please read these documents carefully
              before using our platform.
            </p>
          </div>

          {/* ── 1. Terms of Service ──────────────────────────────────────── */}
          {/* Lands at /legal#terms. A link, not a copy: see NAV_SECTIONS. */}
          <Section id="terms" tag="Legal" title="Terms of Service" effectiveDate={null}>
            <p className="text-forge-smoke text-sm leading-relaxed">
              Your use of Forge is governed by the Forge Terms of Service. The
              current version, with its effective date, is published in the
              Forge app:{" "}
              <a
                href={termsUrl()}
                className="text-forge-cyan hover:text-forge-cyan-light transition-colors underline underline-offset-4"
              >
                read the Terms of Service
              </a>
              .
            </p>
          </Section>

          {/* ── 2. Privacy Policy ────────────────────────────────────────── */}
          {/* Lands at /legal#privacy. A link, not a copy: see NAV_SECTIONS. */}
          <Section id="privacy" tag="Legal" title="Privacy Policy" effectiveDate={null}>
            <p className="text-forge-smoke text-sm leading-relaxed">
              How Forge collects, uses and shares your data is set out in the
              Forge Privacy Policy. The current version, with its effective
              date, is published in the Forge app:{" "}
              <a
                href={privacyUrl()}
                className="text-forge-cyan hover:text-forge-cyan-light transition-colors underline underline-offset-4"
              >
                read the Privacy Policy
              </a>
              .
            </p>
          </Section>

          {/* ── 3. Refund Policy ─────────────────────────────────────────── */}
          <Section id="refund" tag="Legal" title="Refund Policy">
            <p className="text-forge-smoke text-sm leading-relaxed">
              All payments for Forge Solutions, Corp are final.
            </p>
            <p className="text-forge-smoke text-sm leading-relaxed">
              Due to the nature of digital services and immediate access to the platform,
              we do not offer refunds for subscription fees.
            </p>
            <p className="text-forge-smoke text-sm leading-relaxed">
              Canceling your subscription stops future charges but does not refund the
              current billing period. We do not pro-rate unused time remaining in a
              billing cycle.
            </p>
            <p className="text-forge-smoke text-sm leading-relaxed">
              However, we may review refund requests on a case-by-case basis at our sole
              discretion.
            </p>
            <p className="text-forge-smoke text-sm leading-relaxed">
              To request consideration, contact:{" "}
              <a
                href="mailto:team@forge.equipment"
                className="text-forge-cyan hover:text-forge-cyan-light transition-colors"
              >
                team@forge.equipment
              </a>
            </p>
          </Section>

          {/* ── 4. Disclaimer ────────────────────────────────────────────── */}
          <Section id="disclaimer" tag="Legal" title="Disclaimer">
            <p className="text-forge-smoke text-sm leading-relaxed">
              AI-generated estimates are provided for informational purposes only and may
              not reflect actual project costs. Users are responsible for verifying all
              outputs before making decisions.
            </p>
          </Section>

          {/* ── 5. Master Subscription Agreement ─────────────────────────── */}
          {/* Lands at /legal#msa. The agreement itself, and its dated
              versions, are served by the app; see NAV_SECTIONS. */}
          <Section
            id="msa"
            tag="Legal"
            title="Master Subscription Agreement"
            effectiveDate={null}
          >
            <p className="text-forge-smoke text-sm leading-relaxed">
              Subscriptions purchased under an Order Form are governed by the
              Forge Master Subscription Agreement. The current version, with its
              effective date, is published in the Forge app:{" "}
              <a
                href={msaUrl()}
                className="text-forge-cyan hover:text-forge-cyan-light transition-colors underline underline-offset-4"
              >
                read the Master Subscription Agreement
              </a>
              .
            </p>
          </Section>

          {/* Footer note */}
          <div className="pt-16 text-center">
            <p className="text-forge-smoke text-sm">
              Forge Solutions, Corp · Updated September 2026
            </p>
            <p className="text-forge-graphite text-xs mt-1">
              For questions, contact{" "}
              <a
                href="mailto:team@forge.equipment"
                className="text-forge-cyan hover:text-forge-cyan-light transition-colors"
              >
                team@forge.equipment
              </a>
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}