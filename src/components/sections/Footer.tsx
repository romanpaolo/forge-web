import { Flame, Twitter, Linkedin } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "ScopeSnap", href: "#" },
    { label: "Pricing", href: "#pricing" },
    { label: "Beta", href: "#beta" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-forge-iron border-t border-forge-graphite/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row: logo + link columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo */}
          <div className="flex items-center gap-2 md:col-span-1">
            <Flame
              className="text-forge-orange"
              size={22}
              strokeWidth={2.25}
              aria-hidden="true"
            />
            <span className="text-forge-white font-bold text-xl tracking-tight">
              FORGE
            </span>
          </div>

          {/* Link columns */}
          {(Object.entries(FOOTER_LINKS) as [string, { label: string; href: string }[]][]).map(
            ([column, links]) => (
              <div key={column}>
                <h3 className="text-forge-white font-semibold text-sm uppercase tracking-widest mb-4">
                  {column}
                </h3>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-forge-smoke hover:text-forge-white text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* Bottom row */}
        <div className="border-t border-forge-graphite/50 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-forge-smoke text-sm">
            &copy; 2026 Forge. Built for the trades.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Twitter"
              className="text-forge-smoke hover:text-forge-white transition-colors"
            >
              <Twitter size={18} strokeWidth={1.75} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-forge-smoke hover:text-forge-white transition-colors"
            >
              <Linkedin size={18} strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
