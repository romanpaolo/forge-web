"use client";

import { useState, useEffect } from "react";
import { Hexagon, Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  NAV_LINKS,
  DASHBOARD_URL,
  CALENDLY_URL,
  trialSignupUrl,
} from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm ${
          scrolled
            ? "bg-forge-body/80 backdrop-blur-md border-b border-forge-graphite/40"
            : "bg-forge-body/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Forge, back to top"
            >
              <Hexagon size={20} strokeWidth={1.5} className="text-forge-ash" aria-hidden="true" />
              <span className="text-forge-white font-medium text-xl tracking-[0.15em]">
                FORGE
              </span>
            </a>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-forge-smoke hover:text-forge-white transition-colors text-sm font-medium group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-forge-cyan transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop CTAs — primary trial signup, clearly-secondary sales (PRD 9.1) */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={DASHBOARD_URL}
                className="text-forge-smoke hover:text-forge-white transition-colors text-sm font-medium mr-1"
              >
                Sign in
              </a>
              <Button
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
              >
                Talk to Sales
              </Button>
              <Button
                href={trialSignupUrl()}
                variant="primary"
                size="sm"
                className="hover:shadow-[0_0_20px_rgba(248,250,252,0.15)] transition-shadow duration-300"
              >
                Start Free Trial
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-forge-smoke hover:text-forge-white transition-colors p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-forge-body/95 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu content */}
        <div className="relative flex flex-col h-full px-6 py-8">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-12">
            <a
              href="/"
              className="flex items-center gap-2"
              onClick={handleNavClick}
              aria-label="Forge, back to top"
            >
              <Hexagon size={20} strokeWidth={1.5} className="text-forge-ash" aria-hidden="true" />
              <span className="text-forge-white font-medium text-xl tracking-[0.15em]">
                FORGE
              </span>
            </a>

            <button
              className="text-forge-smoke hover:text-forge-white transition-colors p-1"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={24} strokeWidth={2} />
            </button>
          </div>

          {/* Nav links stacked */}
          <nav className="flex flex-col gap-2 flex-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-forge-smoke hover:text-forge-white transition-colors text-2xl font-semibold py-3 border-b border-forge-graphite/30"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile CTAs — primary trial signup, clearly-secondary sales (PRD 9.1) */}
          <div className="pt-8 flex flex-col gap-3">
            <a
              href={DASHBOARD_URL}
              onClick={handleNavClick}
              className="text-forge-smoke hover:text-forge-white transition-colors text-base font-medium text-center py-2"
            >
              Sign in
            </a>
            <Button
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="md"
              onClick={handleNavClick}
              className="w-full"
            >
              Talk to Sales
            </Button>
            <Button
              href={trialSignupUrl()}
              variant="primary"
              size="md"
              onClick={handleNavClick}
              className="w-full"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
