import { getCity, getRouteById } from "@/lib/data";
import { durationLabel } from "@/lib/format";
import { cityName } from "@/lib/trip-intent";
import type { Faq, ServiceKind } from "@/types";
import { cityGuides } from "./city-guides";
import { routeGuides } from "./route-guides";
import { serviceGuides } from "./service-guides";
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

export function resolveGuide(query: GuideQuery): PageGuide | null {
  if (query.routeId) {
    const authored = routeGuides[query.routeId];
    if (authored) return authored;
    const route = getRouteById(query.routeId);
    if (route) {
      const origin = cityName(route.originCitySlug);
      return {
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
      };
    }
  }

  const service = mapService(query.service);
  if (query.citySlug && service) {
    const keyed = serviceGuides[`${query.citySlug}:${service}`];
    if (keyed) return keyed;
  }

  if (query.citySlug && cityGuides[query.citySlug]) {
    return cityGuides[query.citySlug];
  }

  const city = query.citySlug ? getCity(query.citySlug) : undefined;
  if (!city) return null;
  return {
    title: `How ${city.name} actually moves`,
    lead: city.trustLine,
    types: [],
    stops: [],
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
  return [
    {
      id: `g-${routeId}-time`,
      citySlug: route.originCitySlug,
      routeId,
      service: null,
      question: `How long is ${origin} to ${dest} by cab?`,
      answer: `Usually about ${durationLabel(route.durationMinutes).replace(/^~/, "")} door to door for ${route.distanceKm} km — traffic and rain can add time. We quote the full pin-to-pin window, not a highway-only fantasy.`,
    },
    {
      id: `g-${routeId}-stop`,
      citySlug: route.originCitySlug,
      routeId,
      service: null,
      question: `Where do people actually stop on the ${origin}–${dest} road?`,
      answer: pause
        ? `${pause.title}: ${pause.body}`
        : `Tea and a washroom at a stall the driver already uses on this road. Ask on WhatsApp if you want a specific pause.`,
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
