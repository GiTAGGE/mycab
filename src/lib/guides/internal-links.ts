import { cities, getCity, routes, routesFromCity } from "@/lib/data";
import { cityName } from "@/lib/trip-intent";
import { cityPath, routePath, servicePath } from "@/lib/urls";
import type { Route } from "@/types";
import type { SiteLink } from "./types";

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
  const city = getCity(citySlug);
  if (!city) return [];
  const name = city.name;
  const fromHere = routesFromCity(citySlug);
  const links: SiteLink[] = [
    {
      href: servicePath(city, "local-cabs"),
      label: `${name} local taxi`,
      hint: "4 hr / 8 hr",
    },
    {
      href: servicePath(city, "outstation-cabs"),
      label: `outstation cab from ${name}`,
    },
  ];
  if (city.airport) {
    links.push({
      href: servicePath(city, "airport-taxi"),
      label: `${name} airport taxi`,
      hint: city.airport.code,
    });
  }
  fromHere.slice(0, 8).forEach((route, index) => {
    links.push({
      href: routePath(route),
      label: ANCHOR[index % ANCHOR.length](name, route.destinationName),
      hint: `${route.distanceKm} km`,
    });
  });
  return unique(links).slice(0, 12);
}

export function linksForService(citySlug: string, kind: string): SiteLink[] {
  const city = getCity(citySlug);
  if (!city) return [];
  const name = city.name;
  const fromHere = routesFromCity(citySlug);
  const links: SiteLink[] = [
    { href: cityPath(city), label: `cab service in ${name}` },
  ];

  if (kind === "local") {
    fromHere.slice(0, 4).forEach((route, index) => {
      links.push({
        href: routePath(route),
        label: ANCHOR[index % 2](name, route.destinationName),
      });
    });
    if (city.airport) {
      links.push({
        href: servicePath(city, "airport-taxi"),
        label: `${name} airport taxi`,
      });
    }
    links.push({
      href: servicePath(city, "outstation-cabs"),
      label: `outstation cab from ${name}`,
    });
  } else if (kind === "airport") {
    links.push({
      href: servicePath(city, "local-cabs"),
      label: `${name} local taxi`,
    });
    fromHere.slice(0, 5).forEach((route, index) => {
      links.push({
        href: routePath(route),
        label: ANCHOR[(index + 1) % ANCHOR.length](name, route.destinationName),
      });
    });
  } else {
    fromHere.forEach((route, index) => {
      links.push({
        href: routePath(route),
        label: ANCHOR[index % ANCHOR.length](name, route.destinationName),
        hint: `${route.distanceKm} km`,
      });
    });
    links.push({
      href: servicePath(city, "local-cabs"),
      label: `${name} local cab`,
    });
    if (city.airport) {
      links.push({
        href: servicePath(city, "airport-taxi"),
        label: `${name} airport taxi`,
      });
    }
  }

  return unique(links).slice(0, 14);
}
