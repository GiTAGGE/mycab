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
      "One-way and round-trip intercity cabs with a clear fare before you book. Fuel and driver included.",
    trust: ["One-way available", "No return fare on selected routes", "Professional drivers"],
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
    journey: "I only need to get there",
    description:
      "Pay for the trip you are actually taking. No forced return fare on published one-way routes.",
    trust: ["One-way pricing", "Drop and done", "Sedan to tempo traveller"],
  },
  {
    id: "round-trip",
    kind: "round-trip",
    slug: "round-trip-cabs",
    name: "Round trip",
    shortName: "Return",
    journey: "I’m coming back",
    description:
      "Same car and driver for the return. Better when you have a meeting, wedding, or a 2–3 day getaway.",
    trust: ["Same driver both ways", "Waiting as agreed", "Clear day-wise estimate"],
  },
];
