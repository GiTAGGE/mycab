import type { Place, TripKind } from "@/types";
import { getCity, localities, routes } from "@/lib/data";

export function detectIntent(
  from: Place,
  to: Place,
  returnDate: string | null,
): TripKind {
  const airportInvolved = from.kind === "airport" || to.kind === "airport";
  const sameCity = from.citySlug === to.citySlug;
  const fromIsLocal = from.kind === "locality" || from.kind === "airport";
  const toIsLocal = to.kind === "locality" || to.kind === "airport";

  if (airportInvolved && sameCity) return "airport";
  if (sameCity && fromIsLocal && toIsLocal) return "local";
  if (returnDate) return "outstation-round-trip";
  return "outstation-one-way";
}

export function findRoute(from: Place, to: Place) {
  const originSlug = from.citySlug;
  const destinationName = to.label.replace(/ Airport$/i, "");
  return (
    routes.find((route) => {
      if (route.originCitySlug !== originSlug) return false;
      return (
        route.destinationSlug === to.citySlug ||
        route.destinationName.toLowerCase() === destinationName.toLowerCase()
      );
    }) ?? null
  );
}

export function tripTitle(from: Place, to: Place): string {
  return `${from.label} → ${to.label}`;
}

export function intentCopy(kind: TripKind): { title: string; trust: string[] } {
  switch (kind) {
    case "airport":
      return {
        title: "Airport transfer",
        trust: [
          "Flight tracking",
          "Driver assigned before pickup",
          "No surge after confirmation",
        ],
      };
    case "local":
      return {
        title: "Local rental",
        trust: ["Same driver for the package", "4 hr or 8 hr", "Extra km published"],
      };
    case "outstation-round-trip":
      return {
        title: "Round-trip outstation",
        trust: ["Same car both ways", "Waiting as agreed", "Fuel & driver included"],
      };
    default:
      return {
        title: "One-way intercity taxi",
        trust: ["One-way available", "Fuel & driver included", "24×7 booking"],
      };
  }
}

export function isAirportLocality(place: Place): boolean {
  return place.kind === "airport" || place.localitySlug === "airport";
}

export function localityForPlace(place: Place) {
  if (place.kind === "airport") {
    return localities.find(
      (locality) =>
        locality.citySlug === place.citySlug && locality.slug === "airport",
    );
  }
  if (!place.localitySlug) return undefined;
  return localities.find((locality) => locality.slug === place.localitySlug);
}

export function cityName(slug: string): string {
  return getCity(slug)?.name ?? slug;
}
