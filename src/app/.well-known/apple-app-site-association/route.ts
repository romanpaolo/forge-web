/**
 * Apple App Site Association (AASA) — universal-links manifest.
 *
 * The iOS app carries `applinks:www.forge.equipment`, so Apple's CDN
 * fetches `https://www.forge.equipment/.well-known/apple-app-site-association`
 * (no redirect, exact `application/json` MIME, no `.json` extension).
 * This Route Handler serves the SAME manifest as the dashboard's SSOT at
 * `Forge_Web/Forge/dashboard/app/.well-known/apple-app-site-association/route.ts`
 * — keep the two byte-identical (same appID, same path list) whenever
 * either changes.
 *
 * `appID` is `<TeamID>.<BundleID>`:
 *   - TeamID:   5U7GD4FXQL            (Apple Developer team prefix)
 *   - BundleID: equipment.forge.Forge (matches Forge_IOS Info.plist)
 *
 * Path list:
 *   - "NOT /privacy" / "NOT /terms" / "NOT /support" — MUST stay
 *     in-browser: App Store reviewers tap these from the listing to
 *     validate policy/support URLs; opening the app instead is a
 *     rejection. (On this host /privacy and /terms 308 to /legal#…,
 *     which is fine — exclusions just keep the tap in Safari.)
 *   - "/invite/*"  — invite links open the iOS Accept-Invite flow when
 *     the app is installed; otherwise this host forwards them to the
 *     dashboard (see next.config.ts redirects).
 *   - "/accept/*"  — kept in lockstep with the backend/dashboard AASA.
 *
 * `dynamic = "force-static"`: the response never varies per-request, so
 * Next bakes it at build time and serves it from the CDN edge.
 *
 * Do NOT add a `public/.well-known/apple-app-site-association` static
 * file alongside this — dual sources for the same extensionless path is
 * a build-order-dependent routing conflict (see the 2026-05-25 incident
 * documented in the dashboard SSOT file).
 */

export const dynamic = "force-static";

// appID = <TeamID>.<BundleID>. Single source so applinks + webcredentials
// can never drift from each other.
const APP_ID = "5U7GD4FXQL.equipment.forge.Forge";

interface AppLinkDetail {
  appID: string;
  paths: string[];
}

interface AppleAppSiteAssociation {
  applinks: {
    apps: string[];
    details: AppLinkDetail[];
  };
  webcredentials: {
    apps: string[];
  };
}

const AASA: AppleAppSiteAssociation = {
  applinks: {
    apps: [],
    details: [
      {
        appID: APP_ID,
        // NOT-exclusions first (Apple evaluates top-to-bottom), then the
        // shared include-paths that mirror the backend/dashboard AASA.
        paths: [
          "NOT /privacy",
          "NOT /terms",
          "NOT /support",
          "/invite/*",
          "/accept/*",
        ],
      },
    ],
  },
  webcredentials: {
    apps: [APP_ID],
  },
};

export async function GET() {
  return new Response(JSON.stringify(AASA), {
    status: 200,
    headers: {
      // Apple requires `application/json` exactly — the bare type is
      // safest across older OS versions.
      "Content-Type": "application/json",
      // Long-ish edge cache; contents change only on bundle-id / team-id /
      // path-list edits, all of which redeploy this file.
      "Cache-Control": "public, max-age=3600",
    },
  });
}
