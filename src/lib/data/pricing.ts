import type { PricingRule } from "@/types";
import { vehicles } from "./vehicles";

function cityPricing(
  citySlug: string,
  airportSedan: number,
  local4Sedan: number,
  local8Sedan: number,
): PricingRule[] {
  const airport = vehicles.map((vehicle) => ({
    id: `${citySlug}-airport-${vehicle.id}`,
    citySlug,
    service: "airport" as const,
    vehicleId: vehicle.id,
    amount: Math.round(airportSedan * vehicle.multiplier),
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
    amount: Math.round(local4Sedan * vehicle.multiplier),
    unit: "4hr" as const,
    label: "4 hours / 40 km",
  }));

  const local8 = localVehicles.map((vehicle) => ({
    id: `${citySlug}-local8-${vehicle.id}`,
    citySlug,
    service: "local" as const,
    vehicleId: vehicle.id,
    amount: Math.round(local8Sedan * vehicle.multiplier),
    unit: "8hr" as const,
    label: "8 hours / 80 km",
  }));

  return [...airport, ...local4, ...local8];
}

export const pricingRules: PricingRule[] = [
  ...cityPricing("bangalore", 699, 1499, 2199),
  ...cityPricing("hubli", 449, 1199, 1799),
  ...cityPricing("dharwad", 799, 1199, 1799),
  ...cityPricing("belgaum", 499, 1299, 1899),
  ...cityPricing("mangalore", 549, 1399, 1999),
];
