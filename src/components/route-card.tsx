import Link from "next/link";
import type { Route } from "@/types";
import { getVehicle } from "@/lib/data";
import { durationLabel, inrFrom } from "@/lib/format";
import { vehicleAmount } from "@/lib/pricing-model";
import { cityName } from "@/lib/trip-intent";
import { routePath } from "@/lib/urls";

export function RouteCard({
  route,
  vehicleId,
}: {
  route: Route;
  vehicleId?: string;
}) {
  const origin = cityName(route.originCitySlug);
  const vehicle = vehicleId ? getVehicle(vehicleId) : undefined;
  const allowed = vehicle ? route.vehicleIds.includes(vehicle.id) : true;
  const fare =
    vehicle && allowed ? vehicleAmount(route.sedanFare, vehicle.multiplier) : route.sedanFare;

  return (
    <Link
      href={routePath(route)}
      className="block rounded-2xl border border-line bg-card p-4 transition hover:-translate-y-0.5 hover:border-accent/30"
    >
      <p className="text-sm text-muted">
        {origin} to {route.destinationName} taxi
        {vehicle ? ` · ${vehicle.name}` : ""}
      </p>
      <p className="mt-1 text-lg font-semibold tracking-tight">
        {origin} to {route.destinationName} cab
      </p>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-medium text-accent">{inrFrom(fare)}</span>
        <span className="text-muted">{durationLabel(route.durationMinutes)}</span>
      </div>
    </Link>
  );
}
