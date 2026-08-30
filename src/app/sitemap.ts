import type { MetadataRoute } from "next";
import { cities, routes, services } from "@/lib/data";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://mycab.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/cities", "/book"].map((path) => ({
    url: `${site}${path || "/"}`,
    lastModified: new Date(),
  }));

  const cityPages = cities
    .filter((city) => city.status === "live")
    .flatMap((city) => [
      { url: `${site}/${city.slug}`, lastModified: new Date() },
      ...services
        .filter((service) => city.availableServiceIds.includes(service.id))
        .map((service) => ({
          url: `${site}/${city.slug}/${service.slug}`,
          lastModified: new Date(),
        })),
    ]);

  const routePages = routes
    .filter((route) => route.status === "live")
    .map((route) => ({
      url: `${site}/${route.pageSlug}`,
      lastModified: new Date(),
    }));

  return [...staticPages, ...cityPages, ...routePages];
}
