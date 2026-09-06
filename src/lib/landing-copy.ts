import type { City, Service, ServiceKind } from "@/types";
import { localPackageFrom } from "@/lib/data";
import { inrFrom } from "@/lib/format";

export type LandingCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  stats: Array<{ value: string; label: string }>;
};

const CITY_LEAD: Record<string, string> = {
  bangalore:
    "Airport, a few hours in the city, or an outstation run. The fare is on the card before WhatsApp.",
  hubli:
    "The searches that actually convert here: a cab in Hubli, car rental with a driver, and outstation to Dandeli, Gokarna or Dharwad.",
  dharwad:
    "Taxi in Dharwad is not a renamed Hubli page. Twin-city fare to Hubli. Airport is Hubballi — we price that run.",
  belgaum:
    "IXG airport, local Belagavi hours, and the Goa ghat. Same trip builder as Hubli — this city’s fares.",
  mangalore:
    "IXE, local Mangaluru hours, and the Udupi coast. Tell us the trip; we do not invent a brochure.",
};

export function cityLandingCopy(city: City): LandingCopy {
  const local = localPackageFrom(city.slug, "8hr");
  return {
    eyebrow: `Cab service in ${city.name}`,
    title: city.hero,
    lead: CITY_LEAD[city.slug] ?? city.trustLine,
    stats: [
      { value: "24×7", label: "Booking" },
      { value: local ? inrFrom(local.amount) : "Fare first", label: local ? "Local / 8 hr" : "On the card" },
      { value: city.airport?.code ?? "City", label: city.airport ? "Airport" : "Live" },
    ],
  };
}

export function serviceLandingCopy(city: City, service: Service): LandingCopy {
  const local = localPackageFrom(city.slug, "8hr");
  const byKind: Partial<Record<ServiceKind, LandingCopy>> = {
    airport: {
      eyebrow: `${city.name} airport taxi`,
      title: `${city.airport?.code ?? "Airport"} runs, door to door.`,
      lead: city.airport
        ? `To and from ${city.airport.name}. Flight-aware pickup. No terminal guessing after you confirm.`
        : service.description,
      stats: [
        { value: city.airport?.code ?? "—", label: "Airport" },
        { value: "Tracked", label: "On delay" },
        { value: "24×7", label: "Pickup" },
      ],
    },
    local: {
      eyebrow: `${city.name} local taxi`,
      title: `Hours in ${city.name}, not a drop.`,
      lead: "4 or 8 hours with the same driver. Meetings, errands, family stops — without booking a new cab each time.",
      stats: [
        { value: local ? inrFrom(local.amount) : "8 hr", label: local ? "Sedan / 8 hr" : "Package" },
        { value: "4 / 8 hr", label: "Packages" },
        { value: "Same driver", label: "All stops" },
      ],
    },
    outstation: {
      eyebrow: `${city.name} outstation taxi`,
      title: `Outstation from ${city.name}.`,
      lead: service.description,
      stats: [
        { value: "Published", label: "Fare" },
        { value: "Fuel + driver", label: "Included" },
        { value: "24×7", label: "Booking" },
      ],
    },
    "car-rental": {
      eyebrow: `${city.name} car rental`,
      title: `Car rental in ${city.name} — with a driver.`,
      lead: "Not a self-drive desk. Sedan, SUV, Innova or tempo. The published fare is the fare.",
      stats: [
        { value: "Driver", label: "Included" },
        { value: "Sedan–tempo", label: "Fleet" },
        { value: "Fare first", label: "Then WhatsApp" },
      ],
    },
    tours: {
      eyebrow: `${city.name} tours and travels`,
      title: `Tours from ${city.name} — same car, your days.`,
      lead: city.slug === "hubli"
        ? "Dandeli, Gokarna, Murudeshwar, Hampi. Multi-day with one driver. We do not invent a brochure you did not ask for."
        : `Multi-stop trips from ${city.name}. Same driver for the days you actually want.`,
      stats: [
        { value: "Same car", label: "All days" },
        { value: "Your days", label: "Not a package trap" },
        { value: "Tempo", label: "If the group is large" },
      ],
    },
    tempo: {
      eyebrow: `Tempo traveller in ${city.name}`,
      title: `12 seats. One driver. ${city.name}.`,
      lead: "Airport lots, family functions, and multi-day tours. Tell us the headcount — we will not put twelve people in an Innova.",
      stats: [
        { value: "12", label: "Seats" },
        { value: "Driver", label: "Included" },
        { value: "Airport + tour", label: "Usual jobs" },
      ],
    },
  };

  return (
    byKind[service.kind] ?? {
      eyebrow: `${city.name} ${service.shortName.toLowerCase()}`,
      title: `${city.name} ${service.name.toLowerCase()}`,
      lead: service.description,
      stats: service.trust.slice(0, 3).map((item) => ({ value: item, label: "" })),
    }
  );
}

export function routeLandingLead(origin: string, destination: string, why: string): LandingCopy {
  return {
    eyebrow: `${origin} to ${destination} cab`,
    title: `${origin} to ${destination}.`,
    lead: why,
    stats: [
      { value: "Published", label: "Fare" },
      { value: "Fuel + driver", label: "Included" },
      { value: "WhatsApp", label: "To confirm" },
    ],
  };
}
