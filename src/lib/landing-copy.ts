import type { City, Service, ServiceKind } from "@/types";
import { localPackageFrom } from "@/lib/data";
import { inrFrom } from "@/lib/format";

export type LandingCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  stats: Array<{ value: string; label: string }>;
};

export function cityServicesLead(cityName: string): string {
  return `Local cabs, airport transfers, car rentals and outstation trips from ${cityName}. See the fare before you confirm.`;
}

export function cityLandingCopy(city: City): LandingCopy {
  const local = localPackageFrom(city.slug, "8hr");
  return {
    eyebrow: `Cab service in ${city.name}`,
    title: city.hero,
    lead: cityServicesLead(city.name),
    stats: [
      { value: "24×7", label: "Booking" },
      { value: local ? inrFrom(local.amount) : "Fare first", label: local ? "Local / 8 hr" : "On the card" },
      { value: city.airport?.code ?? "City", label: city.airport ? "Airport" : "Live" },
    ],
  };
}

export function serviceLandingCopy(city: City, service: Service): LandingCopy {
  const local = localPackageFrom(city.slug, "8hr");
  const name = city.officialName ?? city.name;
  const byKind: Partial<Record<ServiceKind, LandingCopy>> = {
    airport: {
      eyebrow: `${city.name} airport taxi`,
      title: `${city.airport?.code ?? "Airport"} runs, door to door.`,
      lead: city.airport
        ? `Airport transfers to and from ${city.airport.name}. See the fare before you confirm.`
        : cityServicesLead(name),
      stats: [
        { value: city.airport?.code ?? "—", label: "Airport" },
        { value: "Tracked", label: "On delay" },
        { value: "24×7", label: "Pickup" },
      ],
    },
    local: {
      eyebrow: `${city.name} local taxi`,
      title: `Hours in ${city.name}, not a drop.`,
      lead: `4 or 8 hours in ${name} with the same driver. Meetings, errands, family stops. See the fare before you confirm.`,
      stats: [
        { value: local ? inrFrom(local.amount) : "8 hr", label: local ? "Sedan / 8 hr" : "Package" },
        { value: "4 / 8 hr", label: "Packages" },
        { value: "Same driver", label: "All stops" },
      ],
    },
    outstation: {
      eyebrow: `${city.name} outstation taxi`,
      title: `Outstation from ${city.name}.`,
      lead: `Intercity cabs from ${name}. Fuel and driver included. See the fare before you confirm.`,
      stats: [
        { value: "Published", label: "Fare" },
        { value: "Fuel + driver", label: "Included" },
        { value: "24×7", label: "Booking" },
      ],
    },
    "car-rental": {
      eyebrow: `${city.name} car rental`,
      title: `Car rental in ${city.name} — with a driver.`,
      lead: `A car with a driver in ${name} — not a self-drive desk. Sedan to tempo. See the fare before you confirm.`,
      stats: [
        { value: "Driver", label: "Included" },
        { value: "Sedan–tempo", label: "Fleet" },
        { value: "Fare first", label: "Then WhatsApp" },
      ],
    },
    tours: {
      eyebrow: `${city.name} tours and travels`,
      title: `Tours from ${city.name} — same car, your days.`,
      lead:
        city.slug === "hubli"
          ? "Dandeli, Gokarna, Murudeshwar, Hampi. Multi-day with one driver. See the fare before you confirm."
          : `Multi-stop trips from ${name}. Same driver for the days you want. See the fare before you confirm.`,
      stats: [
        { value: "Same car", label: "All days" },
        { value: "Your days", label: "Not a package trap" },
        { value: "Tempo", label: "If the group is large" },
      ],
    },
    tempo: {
      eyebrow: `Tempo traveller in ${city.name}`,
      title: `12 seats. One driver. ${city.name}.`,
      lead: `A 12-seater with a driver from ${name}. Airport lots, family functions, multi-day tours. See the fare before you confirm.`,
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
      lead: cityServicesLead(name),
      stats: service.trust.slice(0, 3).map((item) => ({ value: item, label: "" })),
    }
  );
}

export function routeLandingLead(origin: string, destination: string, why: string): LandingCopy {
  return {
    eyebrow: `${origin} to ${destination} cab`,
    title: `${origin} to ${destination}.`,
    lead: `${why} See the fare before you confirm.`,
    stats: [
      { value: "Published", label: "Fare" },
      { value: "Fuel + driver", label: "Included" },
      { value: "WhatsApp", label: "To confirm" },
    ],
  };
}
