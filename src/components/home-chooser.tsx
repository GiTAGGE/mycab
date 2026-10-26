"use client";

import { useMemo, useState } from "react";
import type { City, Service, ServiceKind } from "@/types";
import { BrandRibbon } from "@/components/brand-ribbon";
import { CitySelect } from "@/components/city-select";
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
    <section
      className={`book-card rounded-[22px] border border-line bg-card p-3.5 transition sm:rounded-[28px] sm:p-7 ${
        citySlug && (trip === "local" || trip === "airport") ? "book-card-ready" : ""
      }`}
    >
      <BrandRibbon />
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
      <div className="journey-row">
        <p>{types.find((item) => item.kind === trip)?.journey}</p>
        <CitySelect cities={cities} value={citySlug} onChange={setCitySlug} />
      </div>

      <div className="mt-4 border-t border-line pt-4 sm:mt-6 sm:pt-6">
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
