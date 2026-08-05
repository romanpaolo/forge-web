import type { NextConfig } from "next";

// The live product dashboard. App-path traffic that lands on the marketing
// domain (invite emails, e-sign links, Firebase auth-action links, login)
// forwards there so forge.equipment links keep working.
// Kept in sync with src/lib/constants.ts via the SAME env var. Setting
// NEXT_PUBLIC_DASHBOARD_URL moves both the in-page links and these redirects.
const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://forge-web-nine.vercel.app";

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
      // Non-permanent on purpose: the dashboard host will move to a custom
      // domain and 308s would be cached by clients forever.
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
