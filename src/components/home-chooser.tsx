"use client";

import { useMemo, useState } from "react";
import type { City, Service, ServiceKind } from "@/types";
import { TripBuilder } from "@/components/trip-builder";
import { airportPlaceId, cityPlaceId, localPlaceId } from "@/lib/places";

const tripOrder: ServiceKind[] = ["local", "airport", "outstation"];

export function HomeChooser({
  cities,
  services,
}: {
  cities: City[];
  services: Service[];
}) {
  const [citySlug, setCitySlug] = useState<string | undefined>(undefined);
  const [trip, setTrip] = useState<ServiceKind>("outstation");
  const city = cities.find((item) => item.slug === citySlug);
  const types = useMemo(
    () =>
      tripOrder
        .map((kind) => services.find((item) => item.kind === kind))
        .filter((item): item is Service => Boolean(item)),
    [services],
  );

  return (
    <section className="book-card rounded-[28px] border border-line bg-card p-5 sm:p-8">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {types.map((item) => {
          const active = trip === item.kind;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTrip(item.kind)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-accent text-white"
                  : "bg-paper text-ink-soft hover:bg-accent-soft"
              }`}
            >
              {item.shortName}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-muted">
        {types.find((item) => item.kind === trip)?.journey}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {cities.map((item) => {
          const active = citySlug === item.slug;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => setCitySlug(item.slug)}
              className={`rounded-full px-3 py-1.5 text-sm ${
                active
                  ? "bg-accent text-white"
                  : "text-ink-soft hover:bg-accent-soft"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <div className="mt-6 border-t border-line pt-6">
        <TripBuilder
          key={`${citySlug ?? "any"}-${trip}`}
          embedded
          citySlug={citySlug}
          initialFromId={citySlug ? cityPlaceId(citySlug) : undefined}
          initialToId={
            citySlug && trip === "airport"
              ? airportPlaceId(citySlug)
              : citySlug && trip === "local"
                ? localPlaceId(citySlug)
                : undefined
          }
          mode={trip}
          heading={
            trip === "local"
              ? city
                ? `Local hours in ${city.name}`
                : "Local hours — pick a city"
              : city
                ? `${city.name} · ${types.find((item) => item.kind === trip)?.shortName}`
                : "Where are you going?"
          }
        />
      </div>
    </section>
  );
}
