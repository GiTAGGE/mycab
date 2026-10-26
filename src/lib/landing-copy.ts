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

const LOCAL_LEAD: Record<string, { title: string; lead: string }> = {
  bangalore: {
    title: "Hours in Bengaluru — Koramangala, Whitefield, the same sedan.",
    lead: "4 or 8 hours across Koramangala, Indiranagar, HSR and Whitefield. Filter coffee, a client, a house. Same driver for the day.",
  },
  hubli: {
    title: "Hours in Hubballi — Gokul Road, Unkal, Keshwapur.",
    lead: "4 or 8 hours with the same driver. Clinic, college gate, Unkal pause. Belgaum and Gokarna are outstation bookings.",
  },
  dharwad: {
    title: "Hours in Dharwad — university lanes, Saptapur, Malamaddi.",
    lead: "Saptapur, Malamaddi, University, a pedha stop. Narrow lanes. Same driver. HBX is a different booking.",
  },
  belgaum: {
    title: "Hours in Belagavi — Camp, Tilakwadi, Shahapur.",
    lead: "Cantonment shade, fort, thali, a wedding house. Outstation to Goa is a separate booking.",
  },
  mangalore: {
    title: "Hours in Mangaluru — Kadri, drizzle, ghee roast.",
    lead: "Temple, Hampankatta, a house in Bejai. The car waits in rain. Udupi is a different road.",
  },
};

const AIRPORT_LEAD: Record<string, string> = {
  bangalore: "Hebbal is not Whitefield. Electronic City is not Yelahanka. BLR fares follow the neighbourhood.",
  hubli: "HBX is a short city hop. Navanagar is not Vidyanagar in the morning school rush. Share the flight number.",
  dharwad: "There is no Dharwad airport. HBX is a real transfer, with morning fog on that road.",
  belgaum: "IXG is close. If you actually landed at HBX, that is a different city and a different fare.",
  mangalore: "IXE in drizzle. Kadri is close. Surathkal is the longer city run. Red mud on the tyres is normal.",
};

const OUTSTATION_LEAD: Record<string, string> = {
  bangalore: "Mysore is the usual. Coorg and Ooty are hills. Tirupati is a temple dawn. Fuel and driver included on published fares.",
  hubli: "Belgaum is the north business road. Dandeli is forest. Gokarna is coast. Hampi is stone. Fuel and driver included.",
  dharwad: "Hubli next door, Belgaum shorter from this side, Hampi and Goa as full sits. The start pin is Dharwad.",
  belgaum: "Goa is the ghat. Hubli is the straight road. Kolhapur and Pune go north. Gokarna is a beach without changing cars in Hubli.",
  mangalore: "Udupi and Manipal are the short coast. Kasargod is Kerala. Coorg is hills. Bangalore and Goa are long sits.",
};

const TOURS_LEAD: Record<string, string> = {
  bangalore: "Mysore–Coorg, Ooty with a night, or a temple circuit. Same car. You name the days.",
  hubli: "Dandeli then Gokarna, or Hampi with a night in Hospet. Same car for the days you name.",
  dharwad: "Campus to Hampi, or coast via Goa. Multi-day, starting from Dharwad.",
  belgaum: "Goa nights, or Gokarna, or a Kolhapur function. Same car from Camp.",
  mangalore: "Temple, Udupi, a beach, maybe Coorg. Same car. Ghee roast stays in town.",
};

export function serviceLandingCopy(city: City, service: Service): LandingCopy {
  const local = localPackageFrom(city.slug, "8hr");
  const name = city.officialName ?? city.name;
  const localCopy = LOCAL_LEAD[city.slug];
  const byKind: Partial<Record<ServiceKind, LandingCopy>> = {
    airport: {
      eyebrow: `${city.name} airport taxi`,
      title: `${city.airport?.code ?? "Airport"} runs, door to door.`,
      lead: AIRPORT_LEAD[city.slug] ??
        (city.airport
          ? `Airport transfers to and from ${city.airport.name}. See the fare before you confirm.`
          : cityServicesLead(name)),
      stats: [
        { value: city.airport?.code ?? "—", label: "Airport" },
        { value: "Tracked", label: "On delay" },
        { value: "24×7", label: "Pickup" },
      ],
    },
    local: {
      eyebrow: `${city.name} local taxi`,
      title: localCopy?.title ?? `Hours in ${city.name}, not a drop.`,
      lead: localCopy?.lead ?? `4 or 8 hours in ${name} with the same driver. Meetings, errands, family stops. See the fare before you confirm.`,
      stats: [
        { value: local ? inrFrom(local.amount) : "8 hr", label: local ? "Sedan / 8 hr" : "Package" },
        { value: "4 / 8 hr", label: "Packages" },
        { value: "Same driver", label: "All stops" },
      ],
    },
    outstation: {
      eyebrow: `${city.name} outstation taxi`,
      title: `Outstation from ${city.name}.`,
      lead: OUTSTATION_LEAD[city.slug] ?? `Intercity cabs from ${name}. Fuel and driver included. See the fare before you confirm.`,
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
        TOURS_LEAD[city.slug] ??
        `Multi-stop trips from ${name}. Same driver for the days you want. See the fare before you confirm.`,
      stats: [
        { value: "Same car", label: "All days" },
        { value: "Your days", label: "You name the stops" },
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
    title: `${origin} to ${destination} taxi.`,
    lead: `${why} See the ${origin} to ${destination} cab fare before you confirm.`,
    stats: [
      { value: "Published", label: "Taxi fare" },
      { value: "Fuel + driver", label: "Included" },
      { value: "WhatsApp", label: "To confirm" },
    ],
  };
}
