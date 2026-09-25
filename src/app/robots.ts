import type { MetadataRoute } from "next";

// /brand and /design are internal design-system references - keep them out
// of search indexes (their layouts also set robots noindex metadata). Since
// F-662 the production build does not serve them at all (404 unless built
// with FORGE_INTERNAL_PAGES=on); the disallow stays for any build that does.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/brand", "/design"],
      },
    ],
    sitemap: "https://www.forge.equipment/sitemap.xml",
  };
}
