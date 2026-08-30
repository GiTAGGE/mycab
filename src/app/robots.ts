import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://mycab.example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/ops", "/api"],
    },
    sitemap: `${site}/sitemap.xml`,
  };
}
