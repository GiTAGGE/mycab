import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "airport",
    kind: "airport",
    slug: "airport-taxi",
    name: "Airport taxi",
    shortName: "Airport",
    journey: "I’m landing or flying out",
    description:
      "Door-to-door airport transfers with flight-aware pickup. No terminal guessing, no surge after you confirm.",
    trust: [
      "Flight tracking on request",
      "Driver assigned before pickup",
      "Meet & greet at arrivals",
    ],
  },
  {
    id: "outstation",
    kind: "outstation",
    slug: "outstation-cabs",
    name: "Outstation cab",
    shortName: "Outstation",
    journey: "I’m going to another city",
    description:
      "Intercity cabs with a clear fare before you book. The published price is the fare — fuel and driver included.",
    trust: ["Published fare", "Fuel & driver included", "Professional drivers"],
  },
  {
    id: "local",
    kind: "local",
    slug: "local-cabs",
    name: "Local rental",
    shortName: "Local",
    journey: "I need a car for a few hours",
    description:
      "Hourly city packages when you have multiple stops — meetings, shopping, family errands — without booking a new cab each time.",
    trust: ["4 hr / 8 hr packages", "Stay with the same driver", "No surge after confirmation"],
  },
  {
    id: "one-way",
    kind: "one-way",
    slug: "one-way-cabs",
    name: "One-way cab",
    shortName: "One way",
    journey: "I’m going to another city",
    description:
      "Intercity cabs with a clear fare before you book. The published price is the fare — fuel and driver included.",
    trust: ["Published fare", "Fuel & driver included", "Professional drivers"],
  },
  {
    id: "round-trip",
    kind: "round-trip",
    slug: "round-trip-cabs",
    name: "Round trip",
    shortName: "Return",
    journey: "I’m going to another city",
    description:
      "Intercity cabs with a clear fare before you book. The published price is the fare — fuel and driver included.",
    trust: ["Published fare", "Fuel & driver included", "Professional drivers"],
  },
];
