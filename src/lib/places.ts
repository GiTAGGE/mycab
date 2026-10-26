import type { Place, ServiceKind } from "@/types";
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

export function localPlaceId(citySlug: string): string {
  return `local:${citySlug}`;
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
    places.push({
      id: localPlaceId(city.slug),
      label: `Local in ${city.name}`,
      hint: "4 hr or 8 hr in the city",
      kind: "locality",
      citySlug: city.slug,
      localitySlug: "local-hours",
    });
    if (city.airport) {
      places.push({
        id: airportPlaceId(city.slug),
        label: city.airport.name,
        hint: `${city.airport.code} · from ${city.name}`,
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
  if (id.startsWith("local:")) {
    const citySlug = id.slice("local:".length);
    const city = cities.find((item) => item.slug === citySlug);
    if (!city) return undefined;
    return {
      id,
      label: `Local in ${city.name}`,
      hint: "4 hr or 8 hr in the city",
      kind: "locality",
      citySlug,
      localitySlug: "local-hours",
    };
  }
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

export type PlacePickerQuery = {
  citySlug?: string;
  mode?: ServiceKind;
  side?: "from" | "to";
};

function isLocalHours(place: Place) {
  return place.id.startsWith("local:");
}

function isRouteDestination(place: Place) {
  return place.id.startsWith("destination:");
}

function isCityHub(place: Place) {
  return place.id.startsWith("city:");
}

function isArea(place: Place) {
  return place.kind === "locality" && !isLocalHours(place);
}

export function placesForPicker(query?: PlacePickerQuery | string): Place[] {
  const options: PlacePickerQuery =
    typeof query === "string" || query === undefined ? { citySlug: query } : query;
  const citySlug = options.citySlug;
  const mode = options.mode;
  const side = options.side;
  const all = allPlaces();
  const liveSlugs = new Set(cities.map((city) => city.slug));
  const destsFromOrigin = new Set(
    routes
      .filter((route) => !citySlug || route.originCitySlug === citySlug)
      .map((route) => route.destinationSlug),
  );

  const keep = (place: Place) => {
    if (mode === "local") {
      if (!citySlug) return isCityHub(place) || isLocalHours(place);
      if (place.citySlug !== citySlug) return false;
      if (side === "from") return isArea(place) || isCityHub(place);
      return isArea(place) || isCityHub(place) || isLocalHours(place);
    }

    if (mode === "airport") {
      if (!citySlug) return place.kind === "airport" || isCityHub(place);
      return (
        place.citySlug === citySlug &&
        (isArea(place) || place.kind === "airport" || isCityHub(place))
      );
    }

    if (
      mode === "outstation" ||
      mode === "one-way" ||
      mode === "round-trip" ||
      mode === "tours" ||
      mode === "tempo" ||
      mode === "car-rental"
    ) {
      if (side === "from") {
        if (!citySlug) return isCityHub(place) || place.kind === "airport";
        if (isLocalHours(place) || isRouteDestination(place)) return false;
        if (place.citySlug === citySlug) {
          return isArea(place) || isCityHub(place) || place.kind === "airport";
        }
        return isCityHub(place);
      }
      if (isLocalHours(place) || isArea(place)) return false;
      if (isCityHub(place) && place.citySlug !== citySlug) return true;
      if (place.kind === "airport" && place.citySlug !== citySlug) return true;
      if (isRouteDestination(place) && destsFromOrigin.has(place.citySlug)) return true;
      return false;
    }

    if (!citySlug) {
      return isCityHub(place) || place.kind === "airport" || isRouteDestination(place);
    }
    if (side === "from") {
      if (isLocalHours(place) || isRouteDestination(place)) return false;
      if (place.citySlug === citySlug) {
        return isArea(place) || isCityHub(place) || place.kind === "airport";
      }
      return isCityHub(place);
    }
    if (isArea(place)) return false;
    if (isLocalHours(place)) return place.citySlug === citySlug;
    if (isCityHub(place) || place.kind === "airport") return true;
    if (isRouteDestination(place) && destsFromOrigin.has(place.citySlug)) return true;
    return false;
  };

  const seen = new Set<string>();
  return all
    .filter(keep)
    .filter((place) => {
      if (seen.has(place.id)) return false;
      seen.add(place.id);
      return true;
    })
    .sort((a, b) => {
      const rank = (place: Place) => {
        if (citySlug && place.citySlug === citySlug && isArea(place)) return 0;
        if (citySlug && place.citySlug === citySlug) return 1;
        if (liveSlugs.has(place.citySlug) && isCityHub(place)) return 2;
        if (place.kind === "airport") return 3;
        return 4;
      };
      const diff = rank(a) - rank(b);
      if (diff !== 0) return diff;
      return a.label.localeCompare(b.label);
    });
}

function titleCity(slug: string): string {
  return cities.find((city) => city.slug === slug)?.name ?? slug;
}
