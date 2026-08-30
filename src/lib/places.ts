import type { Place } from "@/types";
import { cities, localities, routes } from "@/lib/data";

export function airportPlaceId(citySlug: string): string {
  return `airport:${citySlug}`;
}

export function cityPlaceId(citySlug: string): string {
  return `city:${citySlug}`;
}

export function localityPlaceId(localityId: string): string {
  return `locality:${localityId}`;
}

export function destinationPlaceId(routeId: string): string {
  return `destination:${routeId}`;
}

export function allPlaces(): Place[] {
  const places: Place[] = [];

  for (const city of cities) {
    places.push({
      id: cityPlaceId(city.slug),
      label: city.name,
      hint: city.state,
      kind: "city",
      citySlug: city.slug,
    });
    if (city.airport) {
      places.push({
        id: airportPlaceId(city.slug),
        label: `${city.name} Airport`,
        hint: `${city.airport.code} · ${city.airport.name}`,
        kind: "airport",
        citySlug: city.slug,
      });
    }
  }

  for (const locality of localities) {
    if (locality.slug === "airport") continue;
    places.push({
      id: localityPlaceId(locality.id),
      label: locality.name,
      hint: `${titleCity(locality.citySlug)} area`,
      kind: "locality",
      citySlug: locality.citySlug,
      localitySlug: locality.slug,
    });
  }

  for (const route of routes) {
    const exists = places.some(
      (place) =>
        place.kind === "city" &&
        place.label.toLowerCase() === route.destinationName.toLowerCase(),
    );
    if (exists) continue;
    places.push({
      id: destinationPlaceId(route.id),
      label: route.destinationName,
      hint: `From ${titleCity(route.originCitySlug)}`,
      kind: "city",
      citySlug: route.destinationSlug,
    });
  }

  return places;
}

export function getPlace(id: string | null | undefined): Place | undefined {
  if (!id) return undefined;
  const found = allPlaces().find((place) => place.id === id);
  if (found) return found;
  if (id.startsWith("destination:")) {
    const route = routes.find((item) => item.id === id.slice("destination:".length));
    if (!route) return undefined;
    return {
      id,
      label: route.destinationName,
      hint: `From ${titleCity(route.originCitySlug)}`,
      kind: "city",
      citySlug: route.destinationSlug,
    };
  }
  return undefined;
}

export function placesForPicker(preferredCity?: string): Place[] {
  const places = allPlaces();
  if (!preferredCity) return places;
  return [...places].sort((a, b) => {
    const aMatch = a.citySlug === preferredCity ? 0 : 1;
    const bMatch = b.citySlug === preferredCity ? 0 : 1;
    if (aMatch !== bMatch) return aMatch - bMatch;
    return a.label.localeCompare(b.label);
  });
}

function titleCity(slug: string): string {
  return cities.find((city) => city.slug === slug)?.name ?? slug;
}
