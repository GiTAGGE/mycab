import type { City, Faq, Locality, Route, Service, Vehicle } from "@/types";
import { cities } from "./cities";
import { faqs } from "./faqs";
import { localities } from "./localities";
import { pricingRules } from "./pricing";
import {
  networkReviews,
  reviewStats,
  reviews,
  reviewsForCity,
  reviewsForService,
} from "./reviews";
import { routes } from "./routes";
import { services } from "./services";
import { vehicles } from "./vehicles";

export {
  cities,
  faqs,
  localities,
  networkReviews,
  pricingRules,
  reviewStats,
  reviews,
  reviewsForCity,
  reviewsForService,
  routes,
  services,
  vehicles,
};

export const PUBLIC_SERVICE_IDS = ["local", "airport", "outstation"] as const;

export const NETWORK_SERVICE_IDS = [
  "local",
  "airport",
  "outstation",
  "car-rental",
  "tours",
  "tempo",
] as const;

export function publicServices(): Service[] {
  return services.filter((service) =>
    (PUBLIC_SERVICE_IDS as readonly string[]).includes(service.id),
  );
}

export function networkServices(): Service[] {
  return services.filter((service) =>
    (NETWORK_SERVICE_IDS as readonly string[]).includes(service.id),
  );
}

export function liveCities(): City[] {
  return cities.filter((city) => city.status === "live");
}

export function getCity(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getRouteByPageSlug(pageSlug: string): Route | undefined {
  return routes.find((route) => route.pageSlug === pageSlug);
}

export function getRouteById(id: string): Route | undefined {
  return routes.find((route) => route.id === id);
}

export function routesFromCity(citySlug: string): Route[] {
  return routes.filter(
    (route) => route.originCitySlug === citySlug && route.status === "live",
  );
}

export function networkRoutes(perCity = 2): Route[] {
  return liveCities().flatMap((city) => routesFromCity(city.slug).slice(0, perCity));
}

export function leisureRoutesFrom(citySlug: string): Route[] {
  const city = getCity(citySlug);
  const fromHere = routesFromCity(citySlug);
  if (!city) return fromHere.slice(0, 6);
  const popular = city.popularDestinationSlugs
    .map((slug) => fromHere.find((route) => route.destinationSlug === slug))
    .filter((route): route is Route => Boolean(route));
  if (popular.length > 0) return popular;
  return fromHere.slice(0, 6);
}

/** @deprecated Use leisureRoutesFrom("hubli") */
export function hubliLeisureRoutes(): Route[] {
  return leisureRoutesFrom("hubli");
}

export function tempoRoutesFrom(citySlug: string): Route[] {
  return routesFromCity(citySlug).filter((route) => route.vehicleIds.includes("tempo"));
}

export function localPackageFrom(citySlug: string, unit: "4hr" | "8hr" = "8hr") {
  return pricingRules.find(
    (rule) =>
      rule.citySlug === citySlug &&
      rule.service === "local" &&
      rule.unit === unit &&
      rule.vehicleId === "sedan",
  );
}

export function getVehicle(id: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.id === id);
}

export function localitiesInCity(citySlug: string): Locality[] {
  return localities.filter((locality) => locality.citySlug === citySlug);
}

export function faqsFor(options: {
  citySlug?: string;
  routeId?: string;
  service?: Faq["service"];
}): Faq[] {
  return faqs.filter((faq) => {
    if (options.routeId) {
      if (faq.routeId === options.routeId) return true;
      if (faq.routeId) return false;
      if (faq.service) return false;
      if (faq.citySlug && faq.citySlug !== options.citySlug) return false;
      return !faq.citySlug || faq.citySlug === options.citySlug;
    }
    if (faq.routeId && faq.routeId !== options.routeId) return false;
    if (faq.service && faq.service !== options.service) return false;
    if (faq.citySlug && faq.citySlug !== options.citySlug) return false;
    return true;
  });
}
