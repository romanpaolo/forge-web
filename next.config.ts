import type { NextConfig } from "next";

// The live product dashboard. App-path traffic that lands on the marketing
// domain (invite emails, e-sign links, Firebase auth-action links, login)
// forwards there so forge.equipment links keep working.
// Kept in sync with src/lib/constants.ts via the SAME env var. Setting
// NEXT_PUBLIC_DASHBOARD_URL moves both the in-page links and these redirects.
//
// The fallback is now the real custom domain (2026-08-08): the dashboard
// moved off its Vercel-assigned host onto app.forge.equipment, so prod no
// longer needs the env var set at all. The var stays for preview/staging
// deploys that need to point at a different dashboard build.
const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.forge.equipment";

const nextConfig: NextConfig = {
  reactCompiler: true,

  async redirects() {
    return [
      // Legal shortcuts - the product's consent modals and older links
      // depend on /privacy and /terms resolving.
      { source: "/privacy", destination: "/legal#privacy", permanent: true },
      { source: "/terms", destination: "/legal#terms", permanent: true },

      // App-path forwarding to the live dashboard. Next.js preserves query
      // strings by default (important for /auth/action?mode=…&oobCode=…).
      // Non-permanent on purpose: these are cross-host forwards between two
      // separately-deployed Vercel projects. A 308 would be cached by the
      // browser forever, so any future retune (path rename, project merge)
      // could never reach clients who already followed the old hop.
      //
      // Every source here must correspond to a route that actually exists on
      // the dashboard, or the hop lands on a 404 that looks like a Forge
      // outage. Verified against Forge_Web/Forge/dashboard/app/ on 2026-08-08:
      // /invite, /sign, /share, /login, /auth/action all resolve.
      //
      // NOT forwarded, deliberately:
      //   /privacy /terms /support — these live HERE (marketing/legal), and
      //     the AASA excludes them so App Store reviewers stay in Safari.
      //   /accept/* — listed in the AASA path list but vestigial: no route
      //     exists on either project and the backend never emits the path.
      //     Forwarding it would 404. Either build the route or drop it from
      //     both AASA manifests; do not paper over it with a redirect.
      {
        source: "/invite/:token",
        destination: `${DASHBOARD_URL}/invite/:token`,
        permanent: false,
      },
      {
        source: "/sign/:path*",
        destination: `${DASHBOARD_URL}/sign/:path*`,
        permanent: false,
      },
      // Client-facing share links. The backend mints these as
      // `${WEB_APP_URL}/share/{token}` (processing.controller.ts:646,
      // client-doc-email.service.ts:2200, change-order-email.service.ts:155)
      // and emails them to homeowners — the single most externally-visible
      // Forge URL there is. Before this rule they 404'd on the marketing
      // domain whenever WEB_APP_URL pointed at forge.equipment.
      {
        source: "/share/:token",
        destination: `${DASHBOARD_URL}/share/:token`,
        permanent: false,
      },
      {
        source: "/auth/action",
        destination: `${DASHBOARD_URL}/auth/action`,
        permanent: false,
      },
      {
        source: "/login",
        destination: `${DASHBOARD_URL}/login`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
