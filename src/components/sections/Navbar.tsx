"use client";

import { useState, useEffect } from "react";
import { Flame, Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-forge-iron/80 backdrop-blur-md border-b border-forge-graphite/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center gap-2 group"
              aria-label="Forge — back to top"
            >
              <Flame
                className="text-forge-orange"
                size={22}
                strokeWidth={2.25}
                aria-hidden="true"
              />
              <span className="text-forge-white font-bold text-xl tracking-tight">
                FORGE
              </span>
            </a>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-forge-smoke hover:text-forge-white transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button href="#pricing" variant="primary" size="sm">
                Get Early Access
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
          className="absolute inset-0 bg-forge-iron/95 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu content */}
        <div className="relative flex flex-col h-full px-6 py-8">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-12">
            <a
              href="#hero"
              className="flex items-center gap-2"
              onClick={handleNavClick}
              aria-label="Forge — back to top"
            >
              <Flame
                className="text-forge-orange"
                size={22}
                strokeWidth={2.25}
                aria-hidden="true"
              />
              <span className="text-forge-white font-bold text-xl tracking-tight">
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

          {/* Mobile CTA */}
          <div className="pt-8">
            <Button
              href="#pricing"
              variant="primary"
              size="md"
              onClick={handleNavClick}
              className="w-full"
            >
              Get Early Access
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
