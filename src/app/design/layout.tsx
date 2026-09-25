import type { Metadata } from "next";
import { requireInternalPages } from "@/lib/internalPages";

// Internal design-system reference - never index. (The page itself is a
// client component, so the noindex metadata lives in this layout.)
// Not served at all unless the build ran with FORGE_INTERNAL_PAGES=on
// (F-662, N10): see lib/internalPages.ts.
// generateMetadata runs the gate too, so the 404 a production build serves
// does not carry this page's "(internal)" title either.
export function generateMetadata(): Metadata {
  requireInternalPages();
  return {
    title: "Design | Forge (internal)",
    robots: { index: false, follow: false },
  };
}

export default function DesignLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  requireInternalPages();
  return children;
}
