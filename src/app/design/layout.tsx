import type { Metadata } from "next";

// Internal design-system reference — never index. (The page itself is a
// client component, so the noindex metadata lives in this layout.)
export const metadata: Metadata = {
  title: "Design | Forge (internal)",
  robots: { index: false, follow: false },
};

export default function DesignLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
