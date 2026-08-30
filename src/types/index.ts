export type CityStatus = "live" | "draft";
export type ServiceKind =
  | "airport"
  | "outstation"
  | "local"
  | "one-way"
  | "round-trip";
export type PlaceKind = "city" | "airport" | "locality";
export type TripKind =
  | "airport"
  | "local"
  | "outstation-one-way"
  | "outstation-round-trip";
export type LeadStatus = "new" | "qualified" | "booked" | "completed" | "lost";

export type City = {
  id: string;
  name: string;
  slug: string;
  state: string;
  status: CityStatus;
  airport: {
    name: string;
    code: string;
    slug: string;
  } | null;
  tagline: string;
  hero: string;
  trustLine: string;
  popularDestinationSlugs: string[];
  availableServiceIds: string[];
  seoTitle: string;
  seoDescription: string;
  region: string;
  shortCode: string;
  officialName?: string;
};

export type Service = {
  id: string;
  kind: ServiceKind;
  slug: string;
  name: string;
  shortName: string;
  journey: string;
  description: string;
  trust: string[];
};

export type Vehicle = {
  id: string;
  name: string;
  slug: string;
  seats: number;
  bags: number;
  multiplier: number;
  blurb: string;
};

export type Locality = {
  id: string;
  citySlug: string;
  name: string;
  slug: string;
  airportMinutes: number;
  airportFareFrom: number;
};

export type Route = {
  id: string;
  originCitySlug: string;
  destinationName: string;
  destinationSlug: string;
  pageSlug: string;
  distanceKm: number;
  durationMinutes: number;
  services: Array<"one-way" | "round-trip">;
  vehicleIds: string[];
  sedanFare: number;
  status: CityStatus;
  why: string;
};

export type PricingRule = {
  id: string;
  citySlug: string;
  service: "airport" | "local";
  vehicleId: string;
  amount: number;
  unit: "trip" | "4hr" | "8hr";
  label: string;
};

export type Faq = {
  id: string;
  citySlug: string | null;
  routeId: string | null;
  service: ServiceKind | null;
  question: string;
  answer: string;
};

export type Place = {
  id: string;
  label: string;
  hint: string;
  kind: PlaceKind;
  citySlug: string;
  localitySlug?: string;
};

export type Attribution = {
  firstTouchSource: string | null;
  firstTouchCampaign: string | null;
  firstTouchKeyword: string | null;
  firstTouchContent: string | null;
  firstLandingPage: string | null;
  lastTouchSource: string | null;
  lastTouchCampaign: string | null;
  gclid: string | null;
  fbclid: string | null;
  utmSource: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  landingPage: string | null;
};

export type TripDraft = {
  fromId: string;
  toId: string;
  date: string | null;
  returnDate: string | null;
  passengers: number;
};

export type VehicleQuote = {
  vehicleId: string;
  amount: number;
  label: string;
  includes: string[];
};

export type FareQuote = {
  intent: TripKind;
  title: string;
  subtitle: string;
  durationLabel: string | null;
  exact: boolean;
  vehicles: VehicleQuote[];
  trust: string[];
  routeId: string | null;
};

export type Lead = {
  id: string;
  createdAt: string;
  status: LeadStatus;
  originLabel: string;
  destinationLabel: string;
  date: string | null;
  returnDate: string | null;
  passengers: number;
  vehicleId: string | null;
  estimatedFare: number | null;
  intent: TripKind;
  landingPage: string | null;
  source: string | null;
  campaign: string | null;
  keyword: string | null;
  gclid: string | null;
  attribution: Attribution;
  whatsappUrl: string;
};
