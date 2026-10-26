import { cities, getCity, getServiceById, liveCities, routes, routesFromCity } from "@/lib/data";
import { cityName } from "@/lib/trip-intent";
import { cityPath, networkServicePath, routePath, servicePath } from "@/lib/urls";
import type { Route, ServiceKind } from "@/types";
import type { SiteLink } from "./types";

export type LinkGroup = {
  title: string;
  links: SiteLink[];
};

const SIBLING_KINDS: ServiceKind[] = [
  "local",
  "airport",
  "outstation",
  "car-rental",
  "tours",
  "tempo",
];

const CLUSTERS: Record<string, string[]> = {
  coast: ["goa", "gokarna", "karwar", "murudeshwar", "udupi", "kundapur", "kasargod", "manipal"],
  hills: ["coorg", "ooty", "wayanad", "dandeli", "sirsi", "jog-falls", "nandi-hills"],
  ruins: ["hampi", "hospet", "badami"],
  business: ["belgaum", "dharwad", "hubli", "kolhapur", "pune"],
  temple: ["tirupati", "murudeshwar", "udupi", "mysore"],
  long: ["bangalore", "mysore", "chennai", "hyderabad", "pune", "kochi", "coimbatore", "pondicherry", "goa"],
};

const ANCHOR: Array<(origin: string, dest: string) => string> = [
  (o, d) => `${o} to ${d} cab`,
  (o, d) => `${o} to ${d} taxi`,
  (o, d) => `taxi from ${o} to ${d}`,
  (o, d) => `${o} to ${d} one way cab`,
  (o, d) => `${o} to ${d} taxi fare`,
];

function clusterOf(destSlug: string): string | null {
  for (const [name, slugs] of Object.entries(CLUSTERS)) {
    if (slugs.includes(destSlug)) return name;
  }
  return null;
}

function liveRoute(originSlug: string, destSlug: string): Route | undefined {
  return routes.find(
    (route) =>
      route.status === "live" &&
      route.originCitySlug === originSlug &&
      route.destinationSlug === destSlug,
  );
}

function reverseRoute(route: Route): Route | undefined {
  const destIsCity = cities.some((city) => city.slug === route.destinationSlug);
  if (!destIsCity) return undefined;
  return liveRoute(route.destinationSlug, route.originCitySlug);
}

function unique(links: SiteLink[]): SiteLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    const key = `${link.href}|${link.label}`;
    if (seen.has(key) || seen.has(link.href)) return false;
    seen.add(key);
    seen.add(link.href);
    return true;
  });
}

export function linksForRoute(route: Route): SiteLink[] {
  const origin = cityName(route.originCitySlug);
  const dest = route.destinationName;
  const originCity = getCity(route.originCitySlug);
  const destCity = getCity(route.destinationSlug);
  const cluster = clusterOf(route.destinationSlug);
  const siblings = routesFromCity(route.originCitySlug).filter((item) => item.id !== route.id);
  const sameCluster = cluster
    ? siblings.filter((item) => clusterOf(item.destinationSlug) === cluster)
    : [];
  const otherCluster = siblings.filter((item) => !sameCluster.includes(item));
  const otherOrigins = routes.filter(
    (item) =>
      item.status === "live" &&
      item.id !== route.id &&
      item.destinationSlug === route.destinationSlug &&
      item.originCitySlug !== route.originCitySlug,
  );
  const reverse = reverseRoute(route);

  const pickSiblings = [...sameCluster, ...otherCluster].slice(0, 5);
  const links: SiteLink[] = [];

  if (reverse) {
    links.push({
      href: routePath(reverse),
      label: `${dest} to ${origin} cab`,
      hint: "Return direction",
    });
  }

  pickSiblings.forEach((item, index) => {
    const o = cityName(item.originCitySlug);
    const d = item.destinationName;
    links.push({
      href: routePath(item),
      label: ANCHOR[index % ANCHOR.length](o, d),
      hint: `${item.distanceKm} km`,
    });
  });

  otherOrigins.slice(0, 2).forEach((item, index) => {
    links.push({
      href: routePath(item),
      label: ANCHOR[(index + 2) % ANCHOR.length](
        cityName(item.originCitySlug),
        item.destinationName,
      ),
      hint: "Same destination, other start",
    });
  });

  if (originCity) {
    links.push({
      href: servicePath(originCity, "outstation-cabs"),
      label: `outstation cab from ${origin}`,
      hint: "All published routes",
    });
    links.push({
      href: servicePath(originCity, "local-cabs"),
      label: `${origin} local taxi`,
      hint: "4 hr / 8 hr in town",
    });
    if (originCity.airport) {
      links.push({
        href: servicePath(originCity, "airport-taxi"),
        label: `${origin} airport taxi`,
        hint: originCity.airport.code,
      });
    }
    links.push({
      href: cityPath(originCity),
      label: `cab service in ${origin}`,
      hint: "City home",
    });
  }

  if (destCity) {
    links.push({
      href: cityPath(destCity),
      label: `cab service in ${destCity.name}`,
      hint: "At the other end",
    });
    links.push({
      href: servicePath(destCity, "local-cabs"),
      label: `${destCity.name} local cab`,
      hint: "Hours after you arrive",
    });
  } else if (cluster) {
    const sibling = siblings.find((item) => clusterOf(item.destinationSlug) === cluster);
    if (sibling) {
      links.push({
        href: routePath(sibling),
        label: `${origin} to ${sibling.destinationName} cab`,
      });
    }
  }

  return unique(links).slice(0, 12);
}

export function linksForCity(citySlug: string): SiteLink[] {
  return serviceLinkGroups(citySlug, null).flatMap((group) => group.links);
}

export function siblingServiceLinks(citySlug: string, kind: ServiceKind | null): SiteLink[] {
  const city = getCity(citySlug);
  if (!city) return [];
  const name = city.name;
  const links: SiteLink[] = [
    { href: cityPath(city), label: `cab service in ${name}`, hint: "City home" },
  ];

  for (const sibling of SIBLING_KINDS) {
    if (sibling === kind) continue;
    if (!city.availableServiceIds.includes(sibling)) continue;
    if (sibling === "airport" && !city.airport) continue;
    const service = getServiceById(sibling);
    if (!service) continue;
    links.push({
      href: servicePath(city, service),
      label: serviceLabel(name, sibling),
      hint: service.shortName,
    });
  }

  return unique(links);
}

function serviceLabel(cityNameValue: string, kind: ServiceKind): string {
  switch (kind) {
    case "local":
      return `${cityNameValue} local taxi`;
    case "airport":
      return `${cityNameValue} airport taxi`;
    case "outstation":
      return `outstation cab from ${cityNameValue}`;
    case "car-rental":
      return `car rental in ${cityNameValue}`;
    case "tours":
      return `tours from ${cityNameValue}`;
    case "tempo":
      return `tempo traveller in ${cityNameValue}`;
    default:
      return `${cityNameValue} ${kind}`;
  }
}

export function otherCityServiceLinks(citySlug: string, kind: ServiceKind): SiteLink[] {
  const service = getServiceById(kind);
  if (!service) return [];
  return liveCities()
    .filter((city) => city.slug !== citySlug && city.availableServiceIds.includes(kind))
    .map((city) => ({
      href: servicePath(city, service),
      label: serviceLabel(city.name, kind),
      hint: city.airport?.code ?? city.region,
    }));
}

export function serviceLinkGroups(citySlug: string, kind: ServiceKind | null): LinkGroup[] {
  const city = getCity(citySlug);
  if (!city) return [];
  const name = city.name;
  const groups: LinkGroup[] = [
    {
      title: `More in ${name}`,
      links: siblingServiceLinks(citySlug, kind),
    },
  ];

  if (kind) {
    const hub = getServiceById(kind);
    groups.push({
      title: otherCitiesTitle(kind),
      links: otherCityServiceLinks(citySlug, kind),
    });
    if (hub) {
      groups.push({
        title: "Across the network",
        links: [
          {
            href: networkServicePath(hub),
            label: networkHubLabel(kind),
            hint: "All live cities",
          },
        ],
      });
    }
  } else {
    groups.push({
      title: "Other cities",
      links: liveCities()
        .filter((item) => item.slug !== citySlug)
        .map((item) => ({
          href: cityPath(item),
          label: `cab service in ${item.name}`,
          hint: item.region,
        })),
    });
  }

  return groups.filter((group) => group.links.length > 0);
}

function otherCitiesTitle(kind: ServiceKind): string {
  switch (kind) {
    case "tempo":
      return "Tempo traveller in other cities";
    case "car-rental":
      return "Car rental in other cities";
    case "tours":
      return "Tours from other cities";
    case "local":
      return "Local taxi in other cities";
    case "airport":
      return "Airport taxi in other cities";
    case "outstation":
      return "Outstation cabs from other cities";
    default:
      return "Other cities";
  }
}

function networkHubLabel(kind: ServiceKind): string {
  switch (kind) {
    case "tempo":
      return "Tempo traveller in Karnataka";
    case "car-rental":
      return "Car rental with driver";
    case "tours":
      return "Tours and travels";
    case "local":
      return "Local taxi packages";
    case "airport":
      return "Airport taxi";
    case "outstation":
      return "Outstation cabs";
    default:
      return kind;
  }
}

export function linksForService(citySlug: string, kind: string): SiteLink[] {
  return serviceLinkGroups(citySlug, kind as ServiceKind).flatMap((group) => group.links);
}
