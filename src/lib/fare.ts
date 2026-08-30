import type { FareQuote, Place, VehicleQuote } from "@/types";
import { pricingRules, vehicles } from "@/lib/data";
import { durationLabel } from "@/lib/format";
import {
  detectIntent,
  findRoute,
  intentCopy,
  localityForPlace,
  tripTitle,
} from "@/lib/trip-intent";

const OUTSTATION_INCLUDES = ["Fuel", "Driver", "One-way on published routes"];
const AIRPORT_INCLUDES = ["Fuel", "Driver", "Door-to-door"];
const LOCAL_INCLUDES = ["Fuel", "Driver", "Package hours"];

export function quoteTrip(
  from: Place,
  to: Place,
  returnDate: string | null,
  passengers: number,
  options?: { localUnit?: "4hr" | "8hr" },
): FareQuote {
  const intent = detectIntent(from, to, returnDate);
  const copy = intentCopy(intent);
  const route = findRoute(from, to);

  if (intent === "airport") {
    return airportQuote(from, to, copy.title);
  }

  if (intent === "local") {
    return localQuote(from, passengers, copy, options?.localUnit ?? "8hr");
  }

  if (route) {
    const round = intent === "outstation-round-trip";
    const quotes = vehicles
      .filter((vehicle) => route.vehicleIds.includes(vehicle.id))
      .filter((vehicle) => vehicle.seats >= Math.min(passengers, vehicle.seats))
      .map((vehicle) => {
        const base = Math.round(route.sedanFare * vehicle.multiplier);
        const amount = round ? Math.round(base * 1.75) : base;
        return {
          vehicleId: vehicle.id,
          amount,
          label: round ? "Round trip estimate" : "One-way estimate",
          includes: [
            ...OUTSTATION_INCLUDES,
            ...(round ? ["Return with same car"] : []),
          ],
        } satisfies VehicleQuote;
      });

    return {
      intent,
      title: copy.title,
      subtitle: `${tripTitle(from, to)} · ${route.distanceKm} km`,
      durationLabel: durationLabel(
        round ? route.durationMinutes * 2 : route.durationMinutes,
      ),
      exact: false,
      vehicles: quotes,
      trust: copy.trust,
      routeId: route.id,
    };
  }

  return {
    intent,
    title: copy.title,
    subtitle: tripTitle(from, to),
    durationLabel: null,
    exact: false,
    vehicles: [],
    trust: copy.trust,
    routeId: null,
  };
}

function airportQuote(from: Place, to: Place, title: string): FareQuote {
  const area = localityForPlace(from.kind === "airport" ? to : from);
  const citySlug = from.citySlug;
  const rules = pricingRules.filter(
    (rule) => rule.citySlug === citySlug && rule.service === "airport",
  );
  const areaFare = area && area.slug !== "airport" ? area.airportFareFrom : null;

  const quotes = rules.map((rule) => {
    const vehicle = vehicles.find((item) => item.id === rule.vehicleId);
    const amount = areaFare
      ? rule.vehicleId === "sedan"
        ? areaFare
        : Math.round(areaFare * (vehicle?.multiplier ?? 1))
      : rule.amount;

    return {
      vehicleId: rule.vehicleId,
      amount,
      label: "Airport transfer",
      includes: AIRPORT_INCLUDES,
    } satisfies VehicleQuote;
  });

  const minutes = area?.airportMinutes ?? 45;

  return {
    intent: "airport",
    title,
    subtitle: tripTitle(from, to),
    durationLabel: durationLabel(minutes),
    exact: false,
    vehicles: quotes,
    trust: [
      "Flight tracking",
      "Driver assigned before pickup",
      "No surge after confirmation",
    ],
    routeId: null,
  };
}

function localQuote(
  from: Place,
  passengers: number,
  copy: { title: string; trust: string[] },
  unit: "4hr" | "8hr",
): FareQuote {
  const rules = pricingRules.filter(
    (rule) =>
      rule.citySlug === from.citySlug &&
      rule.service === "local" &&
      rule.unit === unit,
  );

  const quotes = rules
    .filter((rule) => {
      const vehicle = vehicles.find((item) => item.id === rule.vehicleId);
      return vehicle ? passengers <= vehicle.seats : false;
    })
    .map((rule) => ({
      vehicleId: rule.vehicleId,
      amount: rule.amount,
      label: rule.label,
      includes: LOCAL_INCLUDES,
    }));

  return {
    intent: "local",
    title: copy.title,
    subtitle: `Around ${from.label.replace(/^Local in /, "")}`,
    durationLabel: unit === "4hr" ? "4 hr / 40 km" : "8 hr / 80 km",
    exact: false,
    vehicles: quotes,
    trust: copy.trust,
    routeId: null,
  };
}

export function startingFare(quote: FareQuote): number | null {
  if (quote.vehicles.length === 0) return null;
  return Math.min(...quote.vehicles.map((vehicle) => vehicle.amount));
}
