"use client";

import { useEffect, useRef, useState } from "react";
import type { City } from "@/types";
import { CheckIcon, ChevronIcon, PinIcon } from "@/components/icons";
import { OverlaySheet } from "@/components/overlay-sheet";

function useCompactSheet() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return compact;
}

export function CitySelect({
  cities,
  value,
  onChange,
}: {
  cities: City[];
  value?: string;
  onChange: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const sheet = useCompactSheet();
  const selected = cities.find((city) => city.slug === value);

  useEffect(() => {
    if (!open || sheet) return;
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, sheet]);

  function choose(slug: string) {
    onChange(slug);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`city-select-btn ${selected ? "city-select-btn-set" : ""}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <PinIcon className="h-3.5 w-3.5 shrink-0 text-accent" />
        <span className="truncate">{selected?.name ?? "Choose city"}</span>
        <ChevronIcon className={`h-3.5 w-3.5 shrink-0 text-muted transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && !sheet ? (
        <ul
          className="city-menu absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-card p-1 shadow-[0_18px_40px_-24px_rgba(28,20,16,0.35)]"
          role="listbox"
        >
          {cities.map((city) => {
            const active = city.slug === value;
            return (
              <li key={city.slug}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => choose(city.slug)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm ${
                    active ? "bg-accent-soft text-ink" : "text-ink-soft hover:bg-paper"
                  }`}
                >
                  <span>
                    <span className="block font-medium text-ink">{city.name}</span>
                    <span className="block text-xs text-muted">{city.region}</span>
                  </span>
                  {active ? <CheckIcon className="h-4 w-4 text-accent" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {sheet ? (
        <OverlaySheet
          open={open}
          onClose={() => setOpen(false)}
          title="Choose city"
          subtitle="We’ll start the trip from here"
        >
          <ul className="space-y-1.5">
            {cities.map((city) => {
              const active = city.slug === value;
              return (
                <li key={city.slug}>
                  <button
                    type="button"
                    onClick={() => choose(city.slug)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left ${
                      active
                        ? "ride-option-active"
                        : "border-line bg-card"
                    }`}
                  >
                    <span>
                      <span className="block font-medium">{city.name}</span>
                      <span className="block text-sm text-muted">{city.region}</span>
                    </span>
                    {active ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </OverlaySheet>
      ) : null}
    </div>
  );
}
