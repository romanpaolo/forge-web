import { Hexagon } from "lucide-react";
import { APP_STORE_URL, CASE_STUDY_PATH } from "@/lib/constants";

// Only real destinations - no href="#" placeholders. About/Blog and social
// icons return when they have somewhere to point.
const FOOTER_LINKS = {
  Product: [
    { label: "Product", href: "/#product" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "Customers", href: CASE_STUDY_PATH },
    { label: "Contact", href: "/support" },
  ],
  Legal: [
    { label: "Privacy", href: "/legal#privacy" },
    { label: "Terms", href: "/legal#terms" },
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
            <Hexagon size={20} strokeWidth={1.5} className="text-forge-ash" aria-hidden="true" />
            <span className="text-forge-white font-medium text-xl tracking-[0.15em]">
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

          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-forge-smoke hover:text-forge-white text-sm transition-colors"
          >
            Download on the App Store
          </a>
        </div>
      </div>
    </footer>
  );
}
