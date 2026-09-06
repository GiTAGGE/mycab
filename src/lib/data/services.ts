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
  {
    id: "car-rental",
    kind: "car-rental",
    slug: "car-rental",
    name: "Car rental",
    shortName: "Car rental",
    journey: "I need a car with a driver",
    description:
      "Car rental with a driver — not a self-drive desk. Sedan to tempo traveller. The published fare is the fare.",
    trust: ["Driver included", "Sedan to tempo", "Published fare"],
  },
  {
    id: "tours",
    kind: "tours",
    slug: "tours",
    name: "Tours and travels",
    shortName: "Tours",
    journey: "I want a multi-stop trip",
    description:
      "Same car for a coast, ruins or forest run. Tell us the days — we do not invent a brochure itinerary you did not ask for.",
    trust: ["Same driver all days", "Published route fares", "Tempo if the group is large"],
  },
  {
    id: "tempo",
    kind: "tempo",
    slug: "tempo-traveller",
    name: "Tempo traveller",
    shortName: "Tempo",
    journey: "We are a group",
    description:
      "12-seater tempo traveller with a driver. Airport lots, family functions, and multi-day tours.",
    trust: ["12 seats", "Driver included", "Airport and outstation"],
  },
];
