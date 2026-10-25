"use client";

import { getVehicle } from "@/lib/data";
import { inr } from "@/lib/format";
import type { VehicleQuote } from "@/types";
import { CarIcon, CheckIcon, ChevronIcon, UsersIcon } from "@/components/icons";
import { OverlaySheet } from "@/components/overlay-sheet";

const DEFAULT_VEHICLE_ID = "sedan";

export function preferredVehicleId(quotes: VehicleQuote[], currentId?: string | null) {
  if (currentId && quotes.some((item) => item.vehicleId === currentId)) {
    return currentId;
  }
  if (quotes.some((item) => item.vehicleId === DEFAULT_VEHICLE_ID)) {
    return DEFAULT_VEHICLE_ID;
  }
  return quotes[0]?.vehicleId ?? DEFAULT_VEHICLE_ID;
}

export function RidePicker({
  open,
  quotes,
  selectedId,
  onClose,
  onSelect,
}: {
  open: boolean;
  quotes: VehicleQuote[];
  selectedId: string;
  onClose: () => void;
  onSelect: (vehicleId: string) => void;
}) {
  const selectedName = getVehicle(selectedId)?.name ?? "Sedan";
  const subtitle =
    selectedId === DEFAULT_VEHICLE_ID
      ? "Sedan is selected. Switch only if you need more seats."
      : `${selectedName} is selected. Sedan is the usual pick.`;

  return (
    <OverlaySheet
      open={open}
      onClose={onClose}
      title="Choose your ride"
      subtitle={subtitle}
    >
      <ul className="space-y-2">
        {quotes.map((item) => {
          const vehicle = getVehicle(item.vehicleId);
          if (!vehicle) return null;
          const active = selectedId === item.vehicleId;
          const recommended = item.vehicleId === DEFAULT_VEHICLE_ID;
          return (
            <li key={item.vehicleId}>
              <button
                type="button"
                autoFocus={active}
                onClick={() => {
                  onSelect(item.vehicleId);
                  onClose();
                }}
                className={`ride-option ${active ? "ride-option-active" : ""}`}
              >
                <span className="ride-option-glyph" aria-hidden>
                  <CarIcon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold tracking-tight">{vehicle.name}</span>
                    {recommended ? <span className="ride-badge">Usual pick</span> : null}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-5 text-muted">{vehicle.blurb}</span>
                  <span className="mt-1.5 flex items-center gap-3 text-xs text-ink-soft">
                    <span className="inline-flex items-center gap-1">
                      <UsersIcon className="h-3.5 w-3.5" />
                      {vehicle.seats} seats
                    </span>
                    <span>{vehicle.bags} bags</span>
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-lg font-semibold tabular-nums leading-none text-accent">
                    {inr(item.amount)}
                  </span>
                  {active ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="text-[11px] text-muted">{item.label}</span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </OverlaySheet>
  );
}

export function RideTrigger({
  quote,
  onClick,
}: {
  quote: VehicleQuote;
  onClick: () => void;
}) {
  const vehicle = getVehicle(quote.vehicleId);
  if (!vehicle) return null;
  const recommended = quote.vehicleId === DEFAULT_VEHICLE_ID;

  return (
    <button
      type="button"
      onClick={onClick}
      className="ride-trigger"
      aria-haspopup="dialog"
    >
      <span className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          Choose your ride
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
          Change
          <ChevronIcon className="h-3.5 w-3.5" />
        </span>
      </span>
      <span className="mt-2.5 flex items-center gap-3">
        <span className="ride-option-glyph" aria-hidden>
          <CarIcon className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1 text-left">
          <span className="flex items-center gap-2 font-semibold tracking-tight">
            {vehicle.name}
            {recommended ? <span className="ride-badge">Selected</span> : null}
          </span>
          <span className="mt-0.5 block text-sm text-muted">
            {vehicle.seats} passengers · {quote.label}
          </span>
        </span>
        <span className="text-lg font-semibold tabular-nums text-accent">{inr(quote.amount)}</span>
      </span>
    </button>
  );
}
