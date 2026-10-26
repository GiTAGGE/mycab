"use client";

import { useMemo, useState } from "react";
import type { Place } from "@/types";
import { readAttribution } from "@/lib/attribution";
import type { ServiceKind } from "@/types";
import { getVehicle, vehicles } from "@/lib/data";
import { quoteTrip } from "@/lib/fare";
import { inr, prettyDate, tomorrowISO } from "@/lib/format";
import { getPlace, localPlaceId, placesForPicker } from "@/lib/places";
import { tripTitle } from "@/lib/trip-intent";
import { CallLink } from "@/components/call-link";
import { PlacePicker } from "@/components/place-picker";
import { preferredVehicleId, RidePicker, RideTrigger } from "@/components/ride-picker";
import { TrustPills } from "@/components/trust-pills";
import { BrandRibbon } from "@/components/brand-ribbon";
import { ClockIcon, PinIcon } from "@/components/icons";

type PickerSide = "from" | "to" | null;

export function TripBuilder({
  initialFromId,
  initialToId,
  citySlug,
  heading = "Where are you going?",
  mode,
  embedded = false,
  initialPassengers = 2,
}: {
  initialFromId?: string;
  initialToId?: string;
  citySlug?: string;
  heading?: string;
  mode?: ServiceKind;
  embedded?: boolean;
  initialPassengers?: number;
}) {
  const isLocal = mode === "local";
  const fromPlaces = useMemo(
    () => placesForPicker({ citySlug, mode, side: "from" }),
    [citySlug, mode],
  );
  const toPlaces = useMemo(
    () => placesForPicker({ citySlug, mode, side: "to" }),
    [citySlug, mode],
  );
  const [fromId, setFromId] = useState(initialFromId ?? "");
  const [toId, setToId] = useState(
    initialToId ?? (isLocal && citySlug ? localPlaceId(citySlug) : ""),
  );
  const [date, setDate] = useState(tomorrowISO());
  const [localUnit, setLocalUnit] = useState<"4hr" | "8hr">("8hr");
  const [passengers, setPassengers] = useState(initialPassengers);
  const [vehicleId, setVehicleId] = useState("sedan");
  const [picker, setPicker] = useState<PickerSide>(null);
  const [rideOpen, setRideOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = getPlace(fromId);
  const to = getPlace(toId);
  const ready = Boolean(from && to && (isLocal || from.id !== to.id));
  const quote =
    from && to && (isLocal || from.id !== to.id)
      ? quoteTrip(from, to, null, passengers, {
          localUnit,
        })
      : null;
  const selectedVehicleId = quote ? preferredVehicleId(quote.vehicles, vehicleId) : "sedan";
  const selectedVehicle = quote?.vehicles.find((item) => item.vehicleId === selectedVehicleId);
  const selectedVehicleName = selectedVehicle
    ? getVehicle(selectedVehicle.vehicleId)?.name
    : undefined;
  const shownFare = selectedVehicle?.amount ?? null;

  async function continueWhatsApp() {
    if (!from || !to) return;
    setSubmitting(true);
    setError(null);
    try {
      const attribution = readAttribution();
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromId: from.id,
          toId: to.id,
          date,
          returnDate: null,
          passengers,
          vehicleId: selectedVehicle?.vehicleId ?? null,
          landingPage: window.location.pathname,
          localUnit: isLocal ? localUnit : undefined,
          attribution,
        }),
      });
      const payload = (await response.json()) as { whatsappUrl?: string; error?: string };
      if (!response.ok || !payload.whatsappUrl) {
        throw new Error(payload.error || "Could not start WhatsApp");
      }
      window.open(payload.whatsappUrl, "_self");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start WhatsApp");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className={
        embedded
          ? ""
          : `book-card rounded-[22px] border border-line bg-card p-3.5 shadow-sm sm:rounded-[28px] sm:p-7 ${
              ready ? "book-card-ready" : ""
            }`
      }
    >
      {embedded ? null : <BrandRibbon />}
      {embedded || ready ? null : (
        <p className="text-sm font-medium text-muted">Plan your ride — choose from and to</p>
      )}
      {ready && !embedded ? null : (
        <h2 className={`display ${embedded ? "text-xl sm:text-3xl" : "mt-1 text-2xl sm:text-4xl"}`}>
          {heading}
        </h2>
      )}

      <div className={`space-y-2 sm:space-y-3 ${ready && !embedded ? "" : "mt-4 sm:mt-6"}`}>
        <PlaceButton
          label="From"
          place={from}
          onClick={() => setPicker("from")}
        />
        {isLocal ? (
          ready ? null : (
            <div className="rounded-2xl border border-line bg-paper px-3 py-3 sm:px-4 sm:py-4">
              <p className="text-xs uppercase tracking-wide text-muted">Trip type</p>
              <p className="mt-1 text-base font-medium sm:text-lg">Local hours in this city</p>
              <p className="mt-1 text-sm text-muted">
                Same driver, multiple stops. Not an A-to-B drop.
              </p>
            </div>
          )
        ) : (
          <PlaceButton
            label="To"
            place={to}
            placeholder="Airport, city or another city"
            onClick={() => setPicker("to")}
          />
        )}
      </div>

      {ready && quote ? (
        <div className="fare-lock mt-3 rounded-2xl px-3 py-3 sm:mt-5 sm:px-4 sm:py-4">
          <p className="text-xs uppercase tracking-wide text-muted sm:text-sm sm:normal-case sm:tracking-normal">
            {quote.title}
          </p>
          <p className="mt-0.5 text-lg font-semibold sm:mt-1 sm:text-xl">
            {tripTitle(from as Place, to as Place)}
          </p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-ink-soft sm:mt-3">
            {shownFare ? (
              <span className="font-semibold text-accent">
                {inr(shownFare)}*
                {selectedVehicleName ? (
                  <span className="ml-1.5 font-medium text-ink-soft">{selectedVehicleName}</span>
                ) : null}
              </span>
            ) : (
              <span>Exact fare on WhatsApp</span>
            )}
            {quote.durationLabel ? (
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                {quote.durationLabel}
              </span>
            ) : null}
          </div>
          <div className="mt-2 sm:mt-3">
            <TrustPills items={quote.trust} />
          </div>
        </div>
      ) : null}

      {ready ? (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
          <label className="block">
            <span className="mb-1 block text-xs text-muted sm:mb-1.5 sm:text-sm">When?</span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="field-premium w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm sm:rounded-2xl sm:px-4 sm:py-3 sm:text-base"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-muted sm:mb-1.5 sm:text-sm">Passengers</span>
            <input
              type="number"
              min={1}
              max={12}
              value={passengers}
              onChange={(event) => setPassengers(Number(event.target.value) || 1)}
              className="field-premium w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm sm:rounded-2xl sm:px-4 sm:py-3 sm:text-base"
            />
          </label>
        </div>
      ) : null}

      {ready && isLocal ? (
        <div className="mt-2.5 flex gap-2 sm:mt-4">
          <Toggle active={localUnit === "4hr"} onClick={() => setLocalUnit("4hr")} label="4 hours" />
          <Toggle active={localUnit === "8hr"} onClick={() => setLocalUnit("8hr")} label="8 hours" />
        </div>
      ) : null}

      {quote && quote.vehicles.length > 0 && selectedVehicle ? (
        <div className="mt-3 space-y-2 sm:mt-5 sm:space-y-3">
          <RideTrigger quote={selectedVehicle} onClick={() => setRideOpen(true)} />
          <p className="text-[11px] leading-4 text-muted sm:text-xs sm:leading-5">
            Final fare depends on pickup, drop and travel date. Tolls on the
            route are confirmed before you pay.
          </p>
        </div>
      ) : null}

      {quote && quote.vehicles.length === 0 ? (
        <p className="mt-3 rounded-2xl bg-paper px-4 py-3 text-sm text-ink-soft sm:mt-5">
          We can still do this trip. Continue on WhatsApp for an exact fare —
          no need to guess a price we don’t have yet.
        </p>
      ) : null}

      <div className="book-actions">
        <button
          type="button"
          onClick={() => {
            if (!ready) {
              setPicker(from ? "to" : "from");
              return;
            }
            void continueWhatsApp();
          }}
          disabled={submitting}
          className={`live-cta flex w-full items-center justify-center gap-2 rounded-full px-4 py-3.5 text-[15px] font-semibold whitespace-nowrap sm:px-5 sm:py-4 sm:text-base ${
            ready ? "confirm-book" : "ready-book"
          }`}
        >
          <span className="ready-live" aria-hidden>
            <span className="ready-live-core" />
          </span>
          {ready
            ? submitting
              ? "Opening WhatsApp…"
              : "Check fare & availability"
            : "Ready to book • Cab waiting"}
        </button>
        <CallLink variant="form" />
        {ready && selectedVehicle ? (
          <p className="mt-2 hidden text-center text-sm tracking-wide text-muted sm:mt-3 sm:block">
            {tripTitle(from as Place, to as Place)} · {prettyDate(date)} ·{" "}
            {vehicles.find((item) => item.id === selectedVehicle.vehicleId)?.name} ·{" "}
            {inr(selectedVehicle.amount)}
          </p>
        ) : null}
      </div>
      {error ? <p className="mt-3 text-center text-sm text-accent">{error}</p> : null}

      <RidePicker
        open={rideOpen}
        quotes={quote?.vehicles ?? []}
        selectedId={selectedVehicleId}
        onClose={() => setRideOpen(false)}
        onSelect={setVehicleId}
      />
      <PlacePicker
        open={picker === "from"}
        title="Where from?"
        places={fromPlaces}
        onClose={() => setPicker(null)}
        onSelect={(place) => setFromId(place.id)}
      />
      <PlacePicker
        open={picker === "to"}
        title="Where to?"
        places={toPlaces}
        onClose={() => setPicker(null)}
        onSelect={(place) => setToId(place.id)}
      />
    </section>
  );
}

function PlaceButton({
  label,
  place,
  placeholder = "Choose a place",
  onClick,
}: {
  label: string;
  place?: Place;
  placeholder?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition sm:rounded-2xl sm:px-4 sm:py-4 ${
        place ? "place-set border-line" : "border-line bg-paper hover:border-[rgba(124,79,29,0.22)]"
      }`}
    >
      <PinIcon className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
      <span>
        <span className="block text-[11px] uppercase tracking-wide text-muted sm:text-xs">{label}</span>
        <span className="block text-base font-medium sm:text-lg">
          {place ? place.label : placeholder}
        </span>
      </span>
    </button>
  );
}

function Toggle({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-full px-3 py-2 text-sm font-medium sm:px-4 sm:py-2.5 ${
        active ? "bg-accent text-white" : "bg-paper text-ink-soft hover:bg-accent-soft"
      }`}
    >
      {label}
    </button>
  );
}
