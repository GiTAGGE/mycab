"use client";

import { useMemo, useState } from "react";
import type { Place } from "@/types";
import { readAttribution } from "@/lib/attribution";
import type { ServiceKind } from "@/types";
import { getVehicle, vehicles } from "@/lib/data";
import { quoteTrip, startingFare } from "@/lib/fare";
import { inr, prettyDate, tomorrowISO } from "@/lib/format";
import { getPlace, localPlaceId, placesForPicker } from "@/lib/places";
import { tripTitle } from "@/lib/trip-intent";
import { PlacePicker } from "@/components/place-picker";
import { TrustPills } from "@/components/trust-pills";
import { CarIcon, ClockIcon, PinIcon, WhatsAppIcon } from "@/components/icons";

type PickerSide = "from" | "to" | null;

export function TripBuilder({
  initialFromId,
  initialToId,
  citySlug,
  heading = "Where are you going?",
  mode,
  initialReturn = false,
  embedded = false,
}: {
  initialFromId?: string;
  initialToId?: string;
  citySlug?: string;
  heading?: string;
  mode?: ServiceKind;
  initialReturn?: boolean;
  embedded?: boolean;
}) {
  const isLocal = mode === "local";
  const places = useMemo(() => placesForPicker(citySlug), [citySlug]);
  const [fromId, setFromId] = useState(initialFromId ?? "");
  const [toId, setToId] = useState(
    initialToId ?? (isLocal && citySlug ? localPlaceId(citySlug) : ""),
  );
  const [date, setDate] = useState(tomorrowISO());
  const [returnOn, setReturnOn] = useState(initialReturn || mode === "round-trip");
  const [returnDate, setReturnDate] = useState("");
  const [localUnit, setLocalUnit] = useState<"4hr" | "8hr">("8hr");
  const [passengers, setPassengers] = useState(2);
  const [vehicleId, setVehicleId] = useState<string | null>(null);
  const [picker, setPicker] = useState<PickerSide>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = getPlace(fromId);
  const to = getPlace(toId);
  const ready = Boolean(from && to && (isLocal || from.id !== to.id));
  const quote =
    from && to && (isLocal || from.id !== to.id)
      ? quoteTrip(from, to, isLocal ? null : returnOn ? returnDate || date : null, passengers, {
          localUnit,
        })
      : null;
  const start = quote ? startingFare(quote) : null;
  const selectedVehicle = quote?.vehicles.find((item) => item.vehicleId === vehicleId) ?? quote?.vehicles[0];

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
          returnDate: isLocal ? null : returnOn ? returnDate || date : null,
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
    <section className={embedded ? "" : "rounded-[28px] border border-line bg-card p-5 shadow-sm sm:p-7"}>
      {embedded ? null : <p className="text-sm font-medium text-muted">Plan your ride</p>}
      <h2 className={`display ${embedded ? "text-2xl sm:text-3xl" : "mt-1 text-3xl sm:text-4xl"}`}>
        {heading}
      </h2>

      <div className="mt-6 space-y-3">
        <PlaceButton
          label="From"
          place={from}
          onClick={() => setPicker("from")}
        />
        {isLocal ? (
          <div className="rounded-2xl border border-line bg-paper px-4 py-4">
            <p className="text-xs uppercase tracking-wide text-muted">Trip type</p>
            <p className="mt-1 text-lg font-medium">Local hours in this city</p>
            <p className="mt-1 text-sm text-muted">
              Same driver, multiple stops. Not an A-to-B drop.
            </p>
          </div>
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
        <div className="mt-5 rounded-2xl bg-paper px-4 py-4">
          <p className="text-sm text-muted">{quote.title}</p>
          <p className="mt-1 text-xl font-semibold">{tripTitle(from as Place, to as Place)}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-ink-soft">
            {start ? <span>{inr(start)}*</span> : <span>Exact fare on WhatsApp</span>}
            {quote.durationLabel ? (
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                {quote.durationLabel}
              </span>
            ) : null}
          </div>
          <div className="mt-3">
            <TrustPills items={quote.trust} />
          </div>
        </div>
      ) : null}

      {ready ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">When?</span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-base"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Passengers</span>
            <input
              type="number"
              min={1}
              max={12}
              value={passengers}
              onChange={(event) => setPassengers(Number(event.target.value) || 1)}
              className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-base"
            />
          </label>
        </div>
      ) : null}

      {ready && isLocal ? (
        <div className="mt-4 flex gap-2">
          <Toggle active={localUnit === "4hr"} onClick={() => setLocalUnit("4hr")} label="4 hours" />
          <Toggle active={localUnit === "8hr"} onClick={() => setLocalUnit("8hr")} label="8 hours" />
        </div>
      ) : null}

      {ready && !isLocal ? (
        <div className="mt-4 flex gap-2">
          <Toggle
            active={!returnOn}
            onClick={() => setReturnOn(false)}
            label="One way"
          />
          <Toggle
            active={returnOn}
            onClick={() => setReturnOn(true)}
            label="Return"
          />
        </div>
      ) : null}

      {ready && returnOn ? (
        <label className="mt-3 block">
          <span className="mb-1.5 block text-sm text-muted">Return date</span>
          <input
            type="date"
            value={returnDate}
            onChange={(event) => setReturnDate(event.target.value)}
            className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-base"
          />
        </label>
      ) : null}

      {quote && quote.vehicles.length > 0 ? (
        <div className="mt-6 space-y-3">
          <p className="text-sm font-medium text-muted">Choose your ride</p>
          {quote.vehicles.map((item) => {
            const vehicle = getVehicle(item.vehicleId);
            if (!vehicle) return null;
            const active = (selectedVehicle?.vehicleId ?? "") === item.vehicleId;
            return (
              <button
                key={item.vehicleId}
                type="button"
                onClick={() => setVehicleId(item.vehicleId)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left ${
                  active ? "border-ink bg-paper" : "border-line bg-card"
                }`}
              >
                <span>
                  <span className="flex items-center gap-2 font-medium">
                    <CarIcon className="h-4 w-4" />
                    {vehicle.name}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {vehicle.seats} passengers · {item.label}
                  </span>
                </span>
                <span className="text-lg font-semibold">{inr(item.amount)}</span>
              </button>
            );
          })}
          <p className="text-xs leading-5 text-muted">
            Final fare depends on pickup, drop and travel date. Tolls on the
            route are confirmed before you pay.
          </p>
        </div>
      ) : null}

      {quote && quote.vehicles.length === 0 ? (
        <p className="mt-5 rounded-2xl bg-paper px-4 py-3 text-sm text-ink-soft">
          We can still do this trip. Continue on WhatsApp for an exact fare —
          no need to guess a price we don’t have yet.
        </p>
      ) : null}

      <button
        type="button"
        onClick={continueWhatsApp}
        disabled={!ready || submitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-4 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {submitting ? "Opening WhatsApp…" : ready ? "Confirm on WhatsApp" : "Choose from and to"}
      </button>
      {ready && selectedVehicle ? (
        <p className="mt-3 text-center text-sm text-muted">
          {tripTitle(from as Place, to as Place)} · {prettyDate(date)} ·{" "}
          {vehicles.find((item) => item.id === selectedVehicle.vehicleId)?.name} ·{" "}
          {inr(selectedVehicle.amount)}
        </p>
      ) : null}
      {error ? <p className="mt-3 text-center text-sm text-accent">{error}</p> : null}

      <PlacePicker
        open={picker === "from"}
        title="Where from?"
        places={places}
        onClose={() => setPicker(null)}
        onSelect={(place) => setFromId(place.id)}
      />
      <PlacePicker
        open={picker === "to"}
        title="Where to?"
        places={places}
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
      className="flex w-full items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-4 text-left"
    >
      <PinIcon className="h-5 w-5 text-accent" />
      <span>
        <span className="block text-xs uppercase tracking-wide text-muted">{label}</span>
        <span className="block text-lg font-medium">
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
      className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium ${
        active ? "bg-ink text-paper" : "bg-paper text-ink-soft"
      }`}
    >
      {label}
    </button>
  );
}
