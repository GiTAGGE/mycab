import type { City, Route, Service } from "@/types";

export function cityPath(city: Pick<City, "slug"> | string): string {
  const slug = typeof city === "string" ? city : city.slug;
  return `/${slug}`;
}

export function servicePath(
  city: Pick<City, "slug"> | string,
  service: Pick<Service, "slug"> | string,
): string {
  const citySlug = typeof city === "string" ? city : city.slug;
  const serviceSlug = typeof service === "string" ? service : service.slug;
  return `/${citySlug}/${serviceSlug}`;
}

export function routePath(route: Pick<Route, "pageSlug">): string {
  return `/${route.pageSlug}`;
}

export function networkServicePath(service: Pick<Service, "slug"> | string): string {
  const slug = typeof service === "string" ? service : service.slug;
  return `/${slug}`;
}

export const NETWORK_SERVICE_SLUGS = [
  "airport-taxi",
  "outstation-cabs",
  "local-cabs",
  "car-rental",
  "tours",
  "tempo-traveller",
] as const;

export function isNetworkServiceSlug(slug: string): boolean {
  return (NETWORK_SERVICE_SLUGS as readonly string[]).includes(slug);
}

export function isRouteSlug(slug: string): boolean {
  return /-to-.*-cab$/.test(slug);
}
