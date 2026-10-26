"use client";

import { useMemo, useState } from "react";
import type { Place } from "@/types";
import { PinIcon } from "@/components/icons";
import { OverlaySheet } from "@/components/overlay-sheet";

export function PlacePicker({
  open,
  title,
  places,
  onClose,
  onSelect,
}: {
  open: boolean;
  title: string;
  places: Place[];
  onClose: () => void;
  onSelect: (place: Place) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return places;
    return places.filter(
      (place) =>
        place.label.toLowerCase().includes(q) ||
        place.hint.toLowerCase().includes(q),
    );
  }, [places, query]);

  const groups = useMemo(() => groupPlaces(filtered), [filtered]);

  return (
    <OverlaySheet
      open={open}
      onClose={() => {
        setQuery("");
        onClose();
      }}
      title={title}
      subtitle="Only places that belong on this trip — not every city we operate."
    >
      <div className="px-2 pb-2">
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search this list"
          className="field-premium w-full rounded-2xl border border-line bg-paper px-4 py-3 text-base"
        />
      </div>
      <ul className="space-y-3 px-1 pb-2">
        {groups.map((group) => (
          <li key={group.label}>
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              {group.label}
            </p>
            <ul>
              {group.places.map((place) => (
                <li key={place.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(place);
                      setQuery("");
                      onClose();
                    }}
                    className="flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left hover:bg-paper"
                  >
                    <PinIcon className="mt-0.5 h-5 w-5 text-accent" />
                    <span>
                      <span className="block font-medium">{place.label}</span>
                      <span className="block text-sm text-muted">{place.hint}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
        {filtered.length === 0 ? (
          <li className="px-4 py-8 text-center text-sm text-muted">
            Nothing in this trip’s list. Pick the closest pin — we confirm the exact
            drop on WhatsApp.
          </li>
        ) : null}
      </ul>
    </OverlaySheet>
  );
}

function groupPlaces(places: Place[]) {
  const buckets: Array<{ label: string; match: (place: Place) => boolean }> = [
    {
      label: "Pickup areas",
      match: (place) => place.kind === "locality" && !place.id.startsWith("local:"),
    },
    { label: "Airports", match: (place) => place.kind === "airport" },
    { label: "Local hours", match: (place) => place.id.startsWith("local:") },
    { label: "Cities", match: (place) => place.id.startsWith("city:") },
    { label: "Destinations", match: (place) => place.id.startsWith("destination:") },
  ];

  const used = new Set<string>();
  const groups: Array<{ label: string; places: Place[] }> = [];
  for (const bucket of buckets) {
    const items = places.filter((place) => !used.has(place.id) && bucket.match(place));
    if (items.length === 0) continue;
    items.forEach((place) => used.add(place.id));
    groups.push({ label: bucket.label, places: items });
  }
  const rest = places.filter((place) => !used.has(place.id));
  if (rest.length > 0) groups.push({ label: "Other", places: rest });
  return groups;
}
