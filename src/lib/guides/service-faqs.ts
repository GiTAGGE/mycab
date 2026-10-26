import { faqsFor, getCity, routesFromCity } from "@/lib/data";
import type { City, Faq, ServiceKind } from "@/types";

function destNames(city: City, limit = 3): string[] {
  const fromHere = routesFromCity(city.slug);
  const popular = city.popularDestinationSlugs
    .map((slug) => fromHere.find((route) => route.destinationSlug === slug)?.destinationName)
    .filter((name): name is string => Boolean(name));
  return [...new Set([...popular, ...fromHere.map((route) => route.destinationName)])].slice(
    0,
    limit,
  );
}

function generated(city: City, kind: ServiceKind): Faq[] {
  const name = city.name;
  const dests = destNames(city);
  const destPhrase = dests.join(", ") || "published destinations";
  const code = city.airport?.code;
  const base = {
    citySlug: city.slug,
    routeId: null as string | null,
    service: kind,
  };

  if (kind === "tempo") {
    return [
      {
        ...base,
        id: `${city.slug}-tempo-when`,
        question: `When should I book a tempo traveller in ${name}?`,
        answer: `When you are more than six or seven with bags — airport lots${code ? ` at ${code}` : ""}, family functions, and group runs to ${destPhrase}. A sedan will not pretend to be a 12-seater.`,
      },
      {
        ...base,
        id: `${city.slug}-tempo-seats`,
        question: `How many seats is a tempo traveller in ${name}?`,
        answer:
          "Twelve seats, plus a driver. Innova is the step below. Tell us the headcount on WhatsApp if you are between 7 and 12.",
      },
      {
        ...base,
        id: `${city.slug}-tempo-airport`,
        question: `Can I take a tempo traveller to the airport from ${name}?`,
        answer: code
          ? `Yes. ${code} lots are a usual tempo job from ${name}. Share the flight number. The fare is the published tempo transfer, not a sedan price with extra people squeezed in.`
          : `Yes, if this city has an airport transfer. Share the flight number.`,
      },
    ];
  }

  if (kind === "car-rental") {
    return [
      {
        ...base,
        id: `${city.slug}-rental-self`,
        question: `Is ${name} car rental self-drive?`,
        answer: `No. Car rental in ${name} is a car with a driver — sedan through tempo traveller. This is not a self-drive counter.`,
      },
      {
        ...base,
        id: `${city.slug}-rental-vs-local`,
        question: `How is car rental different from a ${name} local taxi?`,
        answer: `Local is a 4-hour or 8-hour city package. Car rental is the wider fleet: local hours, airport, and outstation with the vehicle you pick. Same published-fare rule.`,
      },
    ];
  }

  if (kind === "tours") {
    return [
      {
        ...base,
        id: `${city.slug}-tours-fixed`,
        question: `Do you sell fixed tour packages from ${name}?`,
        answer: `We run the days you name — typically ${destPhrase} — with the same car. No fixed package unless you ask for one.`,
      },
      {
        ...base,
        id: `${city.slug}-tours-tempo`,
        question: `Can a ${name} tour use a tempo traveller?`,
        answer: `Yes. Groups of 7–12 should book the tempo traveller. Sedan and Innova stay on smaller tours.`,
      },
    ];
  }

  if (kind === "local") {
    return [
      {
        ...base,
        id: `${city.slug}-local-hours`,
        question: `Can I keep a car for a few hours in ${name}?`,
        answer: `Yes. Local is a 4-hour or 8-hour package with the same driver — not a one-drop city taxi. Extra kilometres are published before you confirm.`,
      },
    ];
  }

  if (kind === "airport") {
    return [
      {
        ...base,
        id: `${city.slug}-airport-wait`,
        question: `Will the driver wait if my ${name} flight is delayed?`,
        answer: code
          ? `Yes. Share the flight number. We track the landing into ${code} and adjust pickup. Waiting for delays is included on airport trips.`
          : `Yes. Share the flight number. Waiting for delays is included on airport trips.`,
      },
    ];
  }

  if (kind === "outstation") {
    return [
      {
        ...base,
        id: `${city.slug}-outstation-fare`,
        question: `Is the published outstation fare from ${name} the fare?`,
        answer: `Yes. The number you see for ${destPhrase} is the fare for that trip — fuel and driver included. Tolls are called out before confirmation.`,
      },
    ];
  }

  return [];
}

export function serviceFaqsFor(citySlug: string, kind: ServiceKind): Faq[] {
  const city = getCity(citySlug);
  const authored = faqsFor({ citySlug, service: kind });
  if (!city) return authored;
  const extra = generated(city, kind);
  const seen = new Set(authored.map((item) => item.question.toLowerCase()));
  return [...authored, ...extra.filter((item) => !seen.has(item.question.toLowerCase()))];
}
