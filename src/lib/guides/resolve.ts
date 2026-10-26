import { getCity, getRouteById } from "@/lib/data";
import { durationLabel, inrFrom } from "@/lib/format";
import { cityName } from "@/lib/trip-intent";
import type { Faq, Route, ServiceKind } from "@/types";
import { cityGuides } from "./city-guides";
import { composeServiceGuide } from "./compose-service";
import { linksForCity, linksForRoute } from "./internal-links";
import { routeGuides } from "./route-guides";
import type { PageGuide } from "./types";

export type GuideQuery = {
  citySlug?: string;
  service?: ServiceKind | null;
  routeId?: string | null;
};

function mapService(kind?: ServiceKind | null): ServiceKind | null {
  if (!kind) return null;
  if (kind === "one-way" || kind === "round-trip") return "outstation";
  return kind;
}

function enrichRouteGuide(route: Route, guide: PageGuide): PageGuide {
  const origin = cityName(route.originCitySlug);
  const dest = route.destinationName;
  const time = durationLabel(route.durationMinutes).replace(/^~/, "");
  const stopList = guide.stops.map((stop) => stop.title).slice(0, 5);
  const typeProse = guide.types.map((item) => item.body).join(" ");
  const stopProse = guide.stops
    .slice(0, 3)
    .map((stop) => `${stop.title}: ${stop.body}`)
    .join(" ");
  const links = linksForRoute(route);
  const otherCabs = links
    .filter((link) => link.href.includes("-to-") && !link.href.endsWith(`/${route.pageSlug}`))
    .slice(0, 3)
    .map((link) => link.label);
  const serviceMentions = links
    .filter((link) => link.href.includes("/local-cabs") || link.href.includes("/airport-taxi") || link.href.includes("/outstation-cabs"))
    .slice(0, 3)
    .map((link) => link.label);
  const article = [
    `A ${origin} to ${dest} cab is ${route.distanceKm} km and usually about ${time} door to door. Published sedan fares start ${inrFrom(route.sedanFare)}; fuel and driver sit in that number, and tolls on this ${origin}–${dest} taxi run are called out before you pay. ${guide.lead}`,
    typeProse
      ? typeProse
      : `${route.why} One way and return are both booked on the same ${origin} to ${dest} cab fare family.`,
    stopList.length > 0
      ? `Usual pauses on this road: ${stopList.join(", ")}. ${stopProse}`
      : "",
    otherCabs.length > 0
      ? `Also from ${origin}: ${otherCabs.join(", ")}.${
          serviceMentions.length > 0 ? ` In the city: ${serviceMentions.join(", ")}.` : ""
        }`
      : serviceMentions.length > 0
        ? `In the city: ${serviceMentions.join(", ")}.`
        : "",
  ].filter(Boolean);

  return {
    ...guide,
    seoHeading: `${origin} to ${dest} cab — fare, time and the road`,
    article,
    links,
  };
}

export function resolveGuide(query: GuideQuery): PageGuide | null {
  if (query.routeId) {
    const route = getRouteById(query.routeId);
    const authored = routeGuides[query.routeId];
    if (route && authored) return enrichRouteGuide(route, authored);
    if (route) {
      const origin = cityName(route.originCitySlug);
      return enrichRouteGuide(route, {
        title: `How ${origin} to ${route.destinationName} actually feels`,
        lead: route.why,
        types: [
          {
            name: "This road",
            body: `${route.distanceKm} km, about ${durationLabel(route.durationMinutes).replace(/^~/, "")} door to door. ${route.why}`,
          },
        ],
        stops: [],
        stopsHeading: "Along this road",
      });
    }
  }

  const service = mapService(query.service);
  if (query.citySlug && service) {
    const composed = composeServiceGuide(query.citySlug, service);
    if (composed) return composed;
  }

  if (query.citySlug && cityGuides[query.citySlug]) {
    return {
      ...cityGuides[query.citySlug],
      links: linksForCity(query.citySlug),
    };
  }

  const city = query.citySlug ? getCity(query.citySlug) : undefined;
  if (!city) return null;
  return {
    title: `How ${city.name} actually moves`,
    lead: city.trustLine,
    types: [],
    stops: [],
    links: linksForCity(city.slug),
  };
}

export function guideFaqs(routeId: string): Faq[] {
  const route = getRouteById(routeId);
  const guide = routeGuides[routeId];
  if (!route) return [];
  const origin = cityName(route.originCitySlug);
  const dest = route.destinationName;
  const food = guide?.stops.find((stop) => /food|tea|coffee|meal|thali|juice|sweet/i.test(stop.kind + stop.title));
  const pause = guide?.stops[1] ?? guide?.stops[0];
  const time = durationLabel(route.durationMinutes).replace(/^~/, "");
  return [
    {
      id: `g-${routeId}-time`,
      citySlug: route.originCitySlug,
      routeId,
      service: null,
      question: `How long is ${origin} to ${dest} by cab?`,
      answer: `A ${origin} to ${dest} cab is usually about ${time} door to door for ${route.distanceKm} km — traffic and rain can add time. We quote the full pin-to-pin window, not highway-only time.`,
    },
    {
      id: `g-${routeId}-fare`,
      citySlug: route.originCitySlug,
      routeId,
      service: null,
      question: `What is the taxi fare from ${origin} to ${dest}?`,
      answer: `Published sedan fares for a ${origin} to ${dest} taxi start ${inrFrom(route.sedanFare)}. Fuel and driver are included. Tolls on this route are confirmed before you pay. SUV, Innova and tempo are listed on the same card when the trip allows them.`,
    },
    {
      id: `g-${routeId}-oneway`,
      citySlug: route.originCitySlug,
      routeId,
      service: null,
      question: `Can I book a one way cab from ${origin} to ${dest}?`,
      answer:
        route.services.includes("one-way")
          ? `Yes. A ${origin} to ${dest} one way cab is a normal booking. Round trip is available when you want the same car back — tell us the return date on WhatsApp.`
          : `This ${origin} to ${dest} taxi is priced as a day trip / return. Say so on WhatsApp if you only need a drop; we confirm the fare before you pay.`,
    },
    {
      id: `g-${routeId}-stop`,
      citySlug: route.originCitySlug,
      routeId,
      service: null,
      question: `Where do people actually stop on the ${origin}–${dest} road?`,
      answer: pause
        ? `${pause.title}: ${pause.body}`
        : `Tea and a washroom at a stall the driver already uses on this ${origin} to ${dest} cab run. Ask on WhatsApp if you want a specific pause.`,
    },
    ...(food
      ? [
          {
            id: `g-${routeId}-food`,
            citySlug: route.originCitySlug,
            routeId,
            service: null,
            question: `What is worth eating on the way to ${dest}?`,
            answer: `${food.title}. ${food.body}`,
          } satisfies Faq,
        ]
      : []),
  ];
}
