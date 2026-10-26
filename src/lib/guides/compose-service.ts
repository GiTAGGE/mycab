import { getCity, getVehicle, liveCities, routesFromCity } from "@/lib/data";
import { inrFrom } from "@/lib/format";
import { vehicleAmount } from "@/lib/pricing-model";
import type { City, ServiceKind } from "@/types";
import { linksForService } from "./internal-links";
import { serviceGuides } from "./service-guides";
import type { GuideBlock, GuideStop, PageGuide } from "./types";

const CITY_JOBS: Record<
  string,
  { pins: string; airportJob: string; groupJob: string; tourJob: string; rentalJob: string }
> = {
  hubli: {
    pins: "Unkal, Gokul Road, Vidyanagar and Keshwapur",
    airportJob: "HBX arrivals with a family and bags",
    groupJob: "Dandeli, Gokarna and Hampi groups",
    tourJob: "a forest day then the coast, or Hampi with a night in Hospet",
    rentalJob: "meetings in Hubballi, then a twin-city hop to Dharwad",
  },
  dharwad: {
    pins: "University, Saptapur, Malamaddi and CBT",
    airportJob: "the Hubballi Airport (HBX) transfer with parents and luggage",
    groupJob: "campus groups to Hubli, Belgaum or Hampi",
    tourJob: "campus to Hampi, or coast via Goa, starting from Dharwad",
    rentalJob: "a university week with the same driver",
  },
  belgaum: {
    pins: "Camp, Tilakwadi, Shahapur and Vadgaon",
    airportJob: "IXG lots after a family landing",
    groupJob: "Goa, Kolhapur and Hubli groups",
    tourJob: "Goa nights or a Kolhapur function from Camp",
    rentalJob: "function week in Belagavi with sedan or tempo",
  },
  bangalore: {
    pins: "Koramangala, Indiranagar, Whitefield and HSR",
    airportJob: "BLR arrivals for a family spread across the city",
    groupJob: "Mysore, Coorg and Tirupati groups",
    tourJob: "Mysore–Coorg, Ooty with a night, or a temple circuit",
    rentalJob: "client days that bounce across ORR and inner ring",
  },
  mangalore: {
    pins: "Kadri, Hampankatta, Bejai and Kankanady",
    airportJob: "IXE in drizzle with a family and temple bags",
    groupJob: "Udupi, Manipal and Coorg groups",
    tourJob: "temple, Udupi, a beach, maybe Coorg",
    rentalJob: "a coast day that is still a city booking until you leave town",
  },
};

function jobs(city: City) {
  return (
    CITY_JOBS[city.slug] ?? {
      pins: city.name,
      airportJob: city.airport ? `${city.airport.code} lots` : "airport lots",
      groupJob: "group outstation runs",
      tourJob: "the days you name",
      rentalJob: "hours in town and a published outstation",
    }
  );
}

function official(city: City) {
  return city.officialName ?? city.name;
}

function destNames(city: City, limit = 4): string[] {
  const fromHere = routesFromCity(city.slug);
  const popular = city.popularDestinationSlugs
    .map((slug) => fromHere.find((route) => route.destinationSlug === slug)?.destinationName)
    .filter((name): name is string => Boolean(name));
  const rest = fromHere.map((route) => route.destinationName);
  return [...new Set([...popular, ...rest])].slice(0, limit);
}

function tempoSampleFare(city: City): number | null {
  const tempo = getVehicle("tempo");
  const route = routesFromCity(city.slug).find((item) => item.vehicleIds.includes("tempo"));
  if (!tempo || !route) return null;
  return vehicleAmount(route.sedanFare, tempo.multiplier);
}

function otherLive(city: City) {
  return liveCities().filter((item) => item.slug !== city.slug);
}

function fallbackTempo(city: City): { types: GuideBlock[]; stops: GuideStop[]; stopsHeading: string } {
  const code = city.airport?.code ?? "the airport";
  const dests = destNames(city, 3);
  const job = jobs(city);
  return {
    types: [
      {
        name: "12 seats",
        body: "A tempo traveller in this city seats twelve with a driver. Innova is the next step down. Sedan is the wrong vehicle once bags and elders both show up.",
      },
      {
        name: `${code} lots`,
        body: job.airportJob.charAt(0).toUpperCase() + job.airportJob.slice(1) + ". One van, one fare, nameboard at arrivals.",
      },
      {
        name: "Group outstation",
        body: dests.length
          ? `${dests.join(", ")} — published tempo fares on those roads, fuel and driver included.`
          : "Published tempo fares on the outstation roads from this city.",
      },
    ],
    stopsHeading: `When people book a tempo in ${city.name}`,
    stops: [
      {
        title: "Family airport",
        kind: "Airport",
        body: `${job.airportJob}. Share the flight number.`,
      },
      {
        title: "Group road",
        kind: "Outstation",
        body: `${job.groupJob}. One driver for the day, not a convoy of sedans.`,
      },
      {
        title: "Function or tour",
        kind: "Event",
        body: "Wedding houses, campus lots, multi-day bags. Tell us the days. Tempo is the vehicle; tours is the itinerary.",
      },
    ],
  };
}

function fallbackRental(city: City): { types: GuideBlock[]; stops: GuideStop[]; stopsHeading: string } {
  const job = jobs(city);
  return {
    types: [
      {
        name: "Driver included",
        body: `Car rental in ${city.name} is a car with a driver — sedan through tempo traveller. Not a self-drive counter.`,
      },
      {
        name: "Local hours",
        body: `4 or 8 hours around ${job.pins}. Same driver. Extra kilometres published before you start.`,
      },
      {
        name: "Outstation and airport",
        body: city.airport
          ? `${city.airport.code} transfers and intercity runs use the same fleet. You pick the vehicle on the fare card.`
          : "Intercity runs use the same fleet. You pick the vehicle on the fare card.",
      },
    ],
    stopsHeading: `How rental is used in ${city.name}`,
    stops: [
      {
        title: "A working day",
        kind: "City",
        body: job.rentalJob.charAt(0).toUpperCase() + job.rentalJob.slice(1) + ".",
      },
      {
        title: "A group",
        kind: "Fleet",
        body: "Seven or more people should see the tempo traveller fare, not a sedan that will not close.",
      },
    ],
  };
}

function fallbackTours(city: City): { types: GuideBlock[]; stops: GuideStop[]; stopsHeading: string } {
  const dests = destNames(city, 4);
  const job = jobs(city);
  return {
    types: [
      {
        name: "Your days",
        body: `Tours from ${city.name} keep the same car. ${job.tourJob.charAt(0).toUpperCase() + job.tourJob.slice(1)}.`,
      },
      {
        name: "Usual corridors",
        body: dests.length
          ? `${dests.join(", ")} — published route fares, night halt yours.`
          : "You name the pins. We keep the driver.",
      },
      {
        name: "Group size",
        body: "Sedan for four. Innova for six. Tempo traveller when the group is 7–12.",
      },
    ],
    stopsHeading: `Tour notes from ${city.name}`,
    stops: [
      {
        title: "One car, several days",
        kind: "Same driver",
        body: "Do not re-book each morning. Night halt is yours. The driver starts when you do.",
      },
    ],
  };
}

function articleFor(city: City, kind: ServiceKind): string[] {
  const name = city.name;
  const place = official(city);
  const dests = destNames(city, 4);
  const destPhrase = dests.length ? dests.join(", ") : "published destinations";
  const others = otherLive(city)
    .map((item) => item.name)
    .slice(0, 4);
  const otherPhrase = others.length ? others.join(", ") : "other live cities";
  const code = city.airport?.code;
  const tempoFare = tempoSampleFare(city);
  const job = jobs(city);

  if (kind === "tempo") {
    return [
      `A tempo traveller in ${name} is a 12-seater with a driver. Use it for ${job.airportJob}, family functions, and group trips toward ${destPhrase}.`,
      `${tempoFare ? `Published tempo fares on these roads start ${inrFrom(tempoFare)}. ` : ""}Fuel and driver are included. Tolls are called out before you pay. Sedan and Innova run out of room around seven people with bags — one van is the honest booking.`,
      `Hours inside ${place} are a ${name} local taxi. A sedan drop to another city is an outstation cab from ${name}. Several days with the same car is a tour. Tempo traveller in ${otherPhrase} follows the same 12-seat logic with that city’s airport and roads.`,
    ];
  }

  if (kind === "car-rental") {
    return [
      `Car rental in ${name} is a car with a driver in ${place} — sedan, SUV, Innova or tempo traveller.`,
      `Local hours cover ${job.pins}. Airport transfers${code ? ` at ${code}` : ""} and outstation to ${destPhrase} use the same fleet on published fares.`,
      `Need only a few hours? Book a ${name} local taxi. A 12-seater group is a tempo traveller in ${name}. Intercity sedan drops live on outstation cab from ${name}.`,
    ];
  }

  if (kind === "tours") {
    return [
      `Tours from ${name} keep one car and one driver for the days you name. Typical circuits: ${job.tourJob}.`,
      `Usual pins include ${destPhrase}. Night halt is yours. Fuel and driver sit in the published route fares; extra days are confirmed on WhatsApp.`,
      `A single drop is an outstation cab from ${name}. A 12-seater group should open tempo traveller in ${name}. Hours in town stay on ${name} local taxi.`,
    ];
  }

  if (kind === "local") {
    return [
      `A ${name} local taxi is 4 or 8 hours with the same driver around ${job.pins}.`,
      `This is not an outstation drop. Extra kilometres are published before you start. Airport runs${code ? ` to ${code}` : ""} are a separate ${name} airport taxi booking.`,
      `Leaving town toward ${destPhrase} is an outstation cab from ${name}. A group of 7–12 should see tempo traveller in ${name}.`,
    ];
  }

  if (kind === "airport") {
    return [
      `${code ? `${code} ` : ""}airport taxi in ${name} is door to door.`,
      `Fares follow the neighbourhood, not a surge slider. Share the flight number. Waiting on delay is part of the transfer.`,
      `Hours after you land are a ${name} local taxi. A group arrival is often a tempo traveller in ${name}. Outstation the same day is an outstation cab from ${name}.`,
    ];
  }

  if (kind === "outstation") {
    return [
      `Outstation cabs from ${name} run to ${destPhrase} on published fares.`,
      `Fuel and driver are included. Tolls are called out before you pay. One way and return sit in the same fare family for that road.`,
      `Hours in ${place} stay on ${name} local taxi. ${code ? `Flights use ${name} airport taxi (${code}). ` : ""}A 12-seater group uses tempo traveller in ${name}. Same car for several days is a tour from ${name}.`,
    ];
  }

  return [city.trustLine];
}

function headingFor(city: City, kind: ServiceKind): string {
  switch (kind) {
    case "tempo":
      return `Tempo traveller in ${city.name} — 12 seats, driver included`;
    case "car-rental":
      return `Car rental in ${city.name} — with a driver`;
    case "tours":
      return `Tours from ${city.name} — same car, your days`;
    case "local":
      return `Local taxi in ${city.name} — 4 and 8 hour packages`;
    case "airport":
      return `${city.name} airport taxi${city.airport ? ` (${city.airport.code})` : ""}`;
    case "outstation":
      return `Outstation cab from ${city.name}`;
    default:
      return `${city.name} ${kind}`;
  }
}

export function composeServiceGuide(citySlug: string, kind: ServiceKind): PageGuide | null {
  const city = getCity(citySlug);
  if (!city) return null;

  const authored = serviceGuides[`${city.slug}:${kind}`];
  const generated =
    kind === "tempo"
      ? fallbackTempo(city)
      : kind === "car-rental"
        ? fallbackRental(city)
        : kind === "tours"
          ? fallbackTours(city)
          : null;

  const title = authored?.title ?? headingFor(city, kind);
  const lead =
    authored?.lead ??
    (kind === "tempo"
      ? `12 seats from ${official(city)}. Airport lots, family functions, group roads.`
      : city.trustLine);

  const types = authored?.types?.length ? authored.types : (generated?.types ?? []);
  const stops = authored?.stops?.length ? authored.stops : (generated?.stops ?? []);
  const stopsHeading = authored?.stopsHeading ?? generated?.stopsHeading;

  return {
    title,
    lead,
    types,
    stops,
    stopsHeading,
    seoHeading: headingFor(city, kind),
    article: articleFor(city, kind),
    links: linksForService(city.slug, kind),
  };
}

export { tempoSampleFare };
