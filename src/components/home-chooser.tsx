"use client";

import { useMemo, useState } from "react";
import type { City, Service, ServiceKind } from "@/types";
import { TripBuilder } from "@/components/trip-builder";
import { airportPlaceId, cityPlaceId, localPlaceId } from "@/lib/places";

const tripOrder: ServiceKind[] = [
  "local",
  "airport",
  "outstation",
  "one-way",
  "round-trip",
];

export function HomeChooser({
  cities,
  services,
}: {
  cities: City[];
  services: Service[];
}) {
  const [citySlug, setCitySlug] = useState<string | null>(null);
  const [trip, setTrip] = useState<ServiceKind | null>(null);
  const city = cities.find((item) => item.slug === citySlug);
  const service = services.find((item) => item.kind === trip);
  const types = useMemo(
    () =>
      tripOrder
        .map((kind) => services.find((item) => item.kind === kind))
        .filter((item): item is Service => Boolean(item)),
    [services],
  );

  const builder = city && trip
    ? {
        citySlug: city.slug,
        initialFromId: cityPlaceId(city.slug),
        initialToId:
          trip === "airport"
            ? airportPlaceId(city.slug)
            : trip === "local"
              ? localPlaceId(city.slug)
              : undefined,
        mode: trip,
        initialReturn: trip === "round-trip",
        heading:
          trip === "local"
            ? `Local hours in ${city.name}`
            : trip === "airport"
              ? `${city.name} airport transfer`
              : `Leaving ${city.name}`,
      }
    : null;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-5">
        {cities.map((item) => {
          const active = citySlug === item.slug;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => setCitySlug(item.slug)}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                active
                  ? "border-white bg-white text-navy shadow-lg"
                  : "border-white/15 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              <p className="text-[11px] font-semibold tracking-[0.16em] text-gold">
                {item.shortCode}
              </p>
              <p className="mt-1 text-lg font-semibold">{item.name}</p>
              <p className={`mt-1 text-xs ${active ? "text-muted" : "text-white/60"}`}>
                {item.region}
              </p>
            </button>
          );
        })}
      </div>

      <p className="mt-8 text-sm font-medium text-white/70">2 · Trip type</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-5">
        {types.map((item) => {
          const active = trip === item.kind;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTrip(item.kind)}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                active
                  ? "border-teal-200 bg-accent text-white"
                  : "border-white/15 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              <p className="font-semibold">{item.shortName}</p>
              <p className={`mt-1 text-xs leading-5 ${active ? "text-white/80" : "text-white/60"}`}>
                {item.journey}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {builder && city && service ? (
          <TripBuilder
            key={`${city.slug}-${trip}`}
            citySlug={builder.citySlug}
            initialFromId={builder.initialFromId}
            initialToId={builder.initialToId}
            mode={builder.mode}
            initialReturn={builder.initialReturn}
            heading={builder.heading}
          />
        ) : (
          <div className="rounded-[28px] border border-white/10 bg-white/5 px-5 py-8 text-center text-white/70">
            Choose a city and a trip type — including local hours — then the
            fare appears. Nothing is pre-filled for Bangalore.
          </div>
        )}
      </div>
    </div>
  );
}
