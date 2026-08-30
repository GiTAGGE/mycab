import type { Locality, Route } from "@/types";

/** Hubli commercial anchors — the rest of the book follows this model. */
export const HUBLI_ANCHORS = {
  dharwad: 1400,
  dandeli: 2999,
  gokarna: 3999,
  hampi: 3999,
} as const;

export const OUTSTATION = {
  base: 1999,
  perKm: 13.5,
  twinMaxKm: 25,
  twinFare: 1400,
  dayTripFactor: 1.45,
} as const;

/** Extra rupees so Hubli → Hampi lands on ₹3,999, not ₹3,899. */
const TOURIST_PREMIUM: Record<string, number> = {
  hampi: 100,
};

export const CITY_PACKAGES: Record<
  string,
  {
    airportSedan: number;
    airportHubMinutes: number;
    airportPerMinute: number;
    local4: number;
    local8: number;
  }
> = {
  bangalore: {
    airportSedan: 799,
    airportHubMinutes: 20,
    airportPerMinute: 8,
    local4: 1899,
    local8: 2799,
  },
  hubli: {
    airportSedan: 699,
    airportHubMinutes: 10,
    airportPerMinute: 8,
    local4: 1699,
    local8: 2499,
  },
  dharwad: {
    airportSedan: 999,
    airportHubMinutes: 26,
    airportPerMinute: 8,
    local4: 1699,
    local8: 2499,
  },
  belgaum: {
    airportSedan: 699,
    airportHubMinutes: 12,
    airportPerMinute: 8,
    local4: 1699,
    local8: 2499,
  },
  mangalore: {
    airportSedan: 749,
    airportHubMinutes: 12,
    airportPerMinute: 8,
    local4: 1799,
    local8: 2599,
  },
};

export function roundX99(amount: number): number {
  return Math.max(99, Math.round(amount / 100) * 100 - 1);
}

export function isDayTrip(route: Pick<Route, "services">): boolean {
  return route.services.length === 1 && route.services[0] === "round-trip";
}

export function oneWaySedan(distanceKm: number, destinationSlug?: string): number {
  if (distanceKm <= OUTSTATION.twinMaxKm) return OUTSTATION.twinFare;
  const premium = destinationSlug ? (TOURIST_PREMIUM[destinationSlug] ?? 0) : 0;
  return roundX99(OUTSTATION.base + distanceKm * OUTSTATION.perKm + premium);
}

export function dayTripSedan(distanceKm: number, destinationSlug?: string): number {
  return roundX99(oneWaySedan(distanceKm, destinationSlug) * OUTSTATION.dayTripFactor);
}

export function routeSedanFare(
  route: Pick<Route, "distanceKm" | "destinationSlug" | "services">,
): number {
  if (isDayTrip(route)) return dayTripSedan(route.distanceKm, route.destinationSlug);
  return oneWaySedan(route.distanceKm, route.destinationSlug);
}

export function applyRouteFares<T extends Route>(records: T[]): T[] {
  return records.map((route) => ({
    ...route,
    sedanFare: routeSedanFare(route),
  }));
}

export function localityAirportSedan(locality: Locality): number {
  const city = CITY_PACKAGES[locality.citySlug];
  if (!city) return locality.airportFareFrom;
  if (locality.slug === "airport") return city.airportSedan;
  const extra = Math.max(0, locality.airportMinutes - city.airportHubMinutes);
  return roundX99(city.airportSedan + extra * city.airportPerMinute);
}

export function applyLocalityFares<T extends Locality>(records: T[]): T[] {
  return records.map((locality) => ({
    ...locality,
    airportFareFrom: localityAirportSedan(locality),
  }));
}

export function vehicleAmount(sedanFare: number, multiplier: number): number {
  return Math.round(sedanFare * multiplier);
}

export function assertHubliAnchors(routes: Route[]): void {
  const fare = (slug: string) =>
    routes.find((route) => route.originCitySlug === "hubli" && route.destinationSlug === slug)
      ?.sedanFare;

  const actual = {
    dharwad: fare("dharwad"),
    dandeli: fare("dandeli"),
    gokarna: fare("gokarna"),
    hampi: fare("hampi"),
  };

  if (
    actual.dharwad !== HUBLI_ANCHORS.dharwad ||
    actual.dandeli !== HUBLI_ANCHORS.dandeli ||
    actual.gokarna !== HUBLI_ANCHORS.gokarna ||
    actual.hampi !== HUBLI_ANCHORS.hampi
  ) {
    throw new Error(
      `Hubli anchors drifted: ${JSON.stringify(actual)} expected ${JSON.stringify(HUBLI_ANCHORS)}`,
    );
  }
}
