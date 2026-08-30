import type { City, Faq, Locality, Route, Service, Vehicle } from "@/types";
import { cities } from "./cities";
import { faqs } from "./faqs";
import { localities } from "./localities";
import { pricingRules } from "./pricing";
import { routes } from "./routes";
import { services } from "./services";
import { vehicles } from "./vehicles";

export { cities, faqs, localities, pricingRules, routes, services, vehicles };

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
    if (faq.routeId && faq.routeId !== options.routeId) return false;
    if (faq.service && faq.service !== options.service) return false;
    if (faq.citySlug && faq.citySlug !== options.citySlug) return false;
    return true;
  });
}
