import { notFound } from "next/navigation";

// /brand and /design are internal design-system references. Production served
// them publicly (HTTP 200, noindex only), carrying retired claims and an old
// statistic (F-662, N10 in the F-658 claims audit, RZ 2026-09-24). They are
// now served ONLY when the build ran with FORGE_INTERNAL_PAGES=on.
//
// An ALLOWLIST on purpose: unset, empty, "true", "1" or anything else means
// not served, so a build that forgets the variable hides them rather than
// publishing them. Production (Vercel) does not set it.
//
// The pages are static, so the decision is made at BUILD time: set the
// variable for `next build` (and `next dev`), not only for `next start`.
// CI builds a second time with it on so the F-631 text-fit audit still loads
// both pages (.github/workflows/ci.yml). Locally:
//   FORGE_INTERNAL_PAGES=on npm run dev
export function internalPagesEnabled(): boolean {
  return process.env.FORGE_INTERNAL_PAGES === "on";
}

/** Call at the top of an internal page's server layout. */
export function requireInternalPages(): void {
  if (!internalPagesEnabled()) notFound();
}
