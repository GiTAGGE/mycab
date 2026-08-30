import type { Vehicle } from "@/types";

export const vehicles: Vehicle[] = [
  {
    id: "hatchback",
    name: "Hatchback",
    slug: "hatchback",
    seats: 4,
    bags: 2,
    multiplier: 0.88,
    blurb: "Light bags, short hops, city traffic.",
  },
  {
    id: "sedan",
    name: "Sedan",
    slug: "sedan",
    seats: 4,
    bags: 3,
    multiplier: 1,
    blurb: "The default for airport and intercity.",
  },
  {
    id: "suv",
    name: "SUV",
    slug: "suv",
    seats: 6,
    bags: 4,
    multiplier: 1.35,
    blurb: "Families, extra luggage, hill routes.",
  },
  {
    id: "innova",
    name: "Innova",
    slug: "innova",
    seats: 7,
    bags: 5,
    multiplier: 1.5,
    blurb: "Longer journeys with 6–7 people.",
  },
  {
    id: "tempo",
    name: "Tempo traveller",
    slug: "tempo-traveller",
    seats: 12,
    bags: 10,
    multiplier: 2.2,
    blurb: "Groups, airport lots, wedding vans.",
  },
];
