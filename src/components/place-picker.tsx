"use client";

import { useMemo, useState } from "react";
import type { Place } from "@/types";
import { PinIcon } from "@/components/icons";

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ink/40 p-3 sm:p-6" role="dialog" aria-modal>
      <div className="sheet-enter mx-auto flex h-full max-h-[88vh] max-w-lg flex-col rounded-3xl bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <p className="text-lg font-semibold">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm text-muted"
          >
            Close
          </button>
        </div>
        <div className="px-5 py-3">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search city, airport or area"
            className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-base outline-none focus:border-ink"
          />
        </div>
        <ul className="flex-1 overflow-y-auto px-2 pb-4">
          {filtered.map((place) => (
            <li key={place.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(place);
                  setQuery("");
                  onClose();
                }}
                className="flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left hover:bg-paper"
              >
                <PinIcon className="mt-0.5 h-5 w-5 text-accent" />
                <span>
                  <span className="block font-medium">{place.label}</span>
                  <span className="block text-sm text-muted">{place.hint}</span>
                </span>
              </button>
            </li>
          ))}
          {filtered.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-muted">
              No match. Pick the closest city — we’ll confirm the exact pin on WhatsApp.
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
