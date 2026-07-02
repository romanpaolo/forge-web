import type { MetadataRoute } from "next";

// /brand and /design are internal design-system references — keep them out
// of search indexes (their layouts also set robots noindex metadata).
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
