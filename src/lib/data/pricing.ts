import type { PricingRule } from "@/types";
import { CITY_PACKAGES } from "@/lib/pricing-model";
import { vehicles } from "./vehicles";

function cityPricing(citySlug: string): PricingRule[] {
  const pack = CITY_PACKAGES[citySlug];
  if (!pack) return [];

  const airport = vehicles.map((vehicle) => ({
    id: `${citySlug}-airport-${vehicle.id}`,
    citySlug,
    service: "airport" as const,
    vehicleId: vehicle.id,
    amount: Math.round(pack.airportSedan * vehicle.multiplier),
    unit: "trip" as const,
    label: "Airport transfer",
  }));

  const localVehicles = vehicles.filter((vehicle) =>
    ["hatchback", "sedan", "suv", "innova"].includes(vehicle.id),
  );

  const local4 = localVehicles.map((vehicle) => ({
    id: `${citySlug}-local4-${vehicle.id}`,
    citySlug,
    service: "local" as const,
    vehicleId: vehicle.id,
    amount: Math.round(pack.local4 * vehicle.multiplier),
    unit: "4hr" as const,
    label: "4 hours / 40 km",
  }));

  const local8 = localVehicles.map((vehicle) => ({
    id: `${citySlug}-local8-${vehicle.id}`,
    citySlug,
    service: "local" as const,
    vehicleId: vehicle.id,
    amount: Math.round(pack.local8 * vehicle.multiplier),
    unit: "8hr" as const,
    label: "8 hours / 80 km",
  }));

  return [...airport, ...local4, ...local8];
}

export const pricingRules: PricingRule[] = Object.keys(CITY_PACKAGES).flatMap(cityPricing);
