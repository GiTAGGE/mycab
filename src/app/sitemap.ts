import type { MetadataRoute } from "next";
import { trustLinks } from "@/components/prose-page";
import { cities, networkServices, routes, services } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const site = SITE_URL;
const lastModified = new Date(process.env.SITE_BUILD_ID || "2026-11-08T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/cities",
    ...trustLinks.map((item) => item.href),
    ...networkServices().map((service) => `/${service.slug}`),
  ].map((path) => ({
    url: `${site}${path || "/"}`,
    lastModified,
  }));

  const cityPages = cities
    .filter((city) => city.status === "live")
    .flatMap((city) => [
      { url: `${site}/${city.slug}`, lastModified },
      ...services
        .filter((service) => city.availableServiceIds.includes(service.id))
        .map((service) => ({
          url: `${site}/${city.slug}/${service.slug}`,
          lastModified,
        })),
    ]);

  const routePages = routes
    .filter((route) => route.status === "live")
    .map((route) => ({
      url: `${site}/${route.pageSlug}`,
      lastModified,
    }));

  return [...staticPages, ...cityPages, ...routePages];
}
