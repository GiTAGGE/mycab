import Link from "next/link";
import type { Route } from "@/types";
import { durationLabel, inrFrom } from "@/lib/format";
import { cityName } from "@/lib/trip-intent";
import { routePath } from "@/lib/urls";

export function RouteCard({ route }: { route: Route }) {
  return (
    <Link
      href={routePath(route)}
      className="block rounded-2xl border border-line bg-card p-4 transition hover:-translate-y-0.5 hover:border-accent/30"
    >
      <p className="text-sm text-muted">From {cityName(route.originCitySlug)}</p>
      <p className="mt-1 text-lg font-semibold tracking-tight">
        {cityName(route.originCitySlug)} → {route.destinationName}
      </p>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-medium text-accent">{inrFrom(route.sedanFare)}</span>
        <span className="text-muted">{durationLabel(route.durationMinutes)}</span>
      </div>
    </Link>
  );
}
