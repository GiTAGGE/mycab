import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { JourneyGuide } from "@/components/journey-guide";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { RelatedNav } from "@/components/related-nav";
import { RouteCard } from "@/components/route-card";
import { TripBuilder } from "@/components/trip-builder";
import {
  cities,
  faqsFor,
  getCity,
  getRouteByPageSlug,
  getService,
  liveCities,
  localitiesInCity,
  networkServices,
  routes,
  routesFromCity,
  services,
} from "@/lib/data";
import { durationLabel, inr, inrFrom } from "@/lib/format";
import { guideFaqs, serviceLinkGroups } from "@/lib/guides";
import { cityLandingCopy, routeLandingLead } from "@/lib/landing-copy";
import { cityPlaceId, destinationPlaceId } from "@/lib/places";
import { breadcrumbJsonLd, faqJsonLd, routeServiceJsonLd, taxiServiceJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { cityName } from "@/lib/trip-intent";
import {
  isNetworkServiceSlug,
  isRouteSlug,
  networkServicePath,
  routePath,
  servicePath,
} from "@/lib/urls";

type Params = { slug: string };

export function generateStaticParams() {
  return [
    ...cities.map((city) => ({ slug: city.slug })),
    ...routes.filter((route) => route.status === "live").map((route) => ({ slug: route.pageSlug })),
    ...networkServices().map((service) => ({ slug: service.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (city) {
    return {
      title: city.seoTitle,
      description: city.seoDescription,
      alternates: { canonical: `/${city.slug}` },
    };
  }
  const network = isNetworkServiceSlug(slug) ? getService(slug) : undefined;
  if (network) {
    const title = `${network.name} in Karnataka`;
    const description = `${network.description} Live in ${liveCities().map((item) => item.name).join(", ")}.`;
    return {
      title,
      description,
      alternates: { canonical: networkServicePath(network) },
      openGraph: { title, description, url: absoluteUrl(networkServicePath(network)) },
    };
  }
  const route = getRouteByPageSlug(slug);
  if (route) {
    const origin = cityName(route.originCitySlug);
    const title = `${origin} to ${route.destinationName} taxi — sedan from ${inr(route.sedanFare)}`;
    const description = `${origin} to ${route.destinationName} by cab, about ${route.distanceKm} km, typically ${durationLabel(route.durationMinutes)} depending on traffic. Sedan from ${inr(route.sedanFare)}. Fuel and driver in the base. Tolls confirmed before you pay.`;
    return {
      title,
      description,
      alternates: { canonical: `/${route.pageSlug}` },
    };
  }
  return { title: "Trip" };
}

export default async function SlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (isNetworkServiceSlug(slug)) {
    const service = getService(slug);
    if (!service) notFound();
    return <NetworkServiceLanding serviceSlug={service.slug} />;
  }
  if (isRouteSlug(slug)) {
    const route = getRouteByPageSlug(slug);
    if (!route) notFound();
    return <RouteLanding routeId={route.id} />;
  }
  const city = getCity(slug);
  if (!city) notFound();
  return <CityLanding citySlug={city.slug} />;
}

function NetworkServiceLanding({ serviceSlug }: { serviceSlug: string }) {
  const service = getService(serviceSlug);
  if (!service) return null;
  const listed = liveCities().filter((city) => city.availableServiceIds.includes(service.id));
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: service.name, path: networkServicePath(service) },
        ])}
      />
      <p className="text-sm text-muted">SeeCabs network</p>
      <h1 className="display mt-2 text-4xl sm:text-5xl">{service.name} in Karnataka</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">{service.description}</p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {listed.map((city) => (
          <Link
            key={city.slug}
            href={servicePath(city, service)}
            className="rounded-2xl border border-line bg-card p-5 transition hover:border-accent/30"
          >
            <p className="text-sm text-muted">{city.region}</p>
            <p className="mt-1 text-xl font-semibold">
              {service.kind === "tempo"
                ? `Tempo traveller in ${city.name}`
                : service.kind === "tours"
                  ? `Tours from ${city.name}`
                  : service.kind === "car-rental"
                    ? `Car rental in ${city.name}`
                    : service.kind === "outstation"
                      ? `Outstation cab from ${city.name}`
                      : service.kind === "airport"
                        ? `${city.name} airport taxi`
                        : `${city.name} local taxi`}
            </p>
            <p className="mt-2 text-sm text-ink-soft">{city.tagline}</p>
            {city.airport ? (
              <p className="mt-3 text-xs text-muted">{city.airport.code}</p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}

function CityLanding({ citySlug }: { citySlug: string }) {
  const city = getCity(citySlug);
  if (!city) return null;
  const popular = routesFromCity(city.slug);
  const pickups = localitiesInCity(city.slug).filter((item) => item.slug !== "airport");
  const cityServices = services.filter(
    (service) =>
      city.availableServiceIds.includes(service.id) &&
      !["one-way", "round-trip"].includes(service.id),
  );
  const copy = cityLandingCopy(city);
  const cityFaqs = faqsFor({ citySlug: city.slug });
  const faqSchema = faqJsonLd(cityFaqs);

  return (
    <>
      <JsonLd data={taxiServiceJsonLd(city, `/${city.slug}`)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: city.name, path: `/${city.slug}` },
        ])}
      />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
      <PageHero copy={copy}>
        <TripBuilder
          citySlug={city.slug}
          initialFromId={cityPlaceId(city.slug)}
          heading="Tell us the trip"
        />
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="display text-3xl">What are you trying to do?</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cityServices.map((service) => (
            <Link
              key={service.id}
              href={servicePath(city, service)}
              className="rounded-2xl border border-line bg-card p-5 transition hover:border-accent/30"
            >
              <p className="text-sm text-muted">{service.journey}</p>
              <p className="mt-1 text-xl font-semibold">{service.name}</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {popular.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-8">
          <h2 className="display text-3xl">{city.name} outstation cab routes</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </section>
      ) : null}

      {pickups.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-8">
          <h2 className="display text-3xl">Popular pickups in {city.name}</h2>
          <p className="mt-2 text-ink-soft">Near-me without pretending we know your GPS pin.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {pickups.map((locality) => (
              <Link
                key={locality.id}
                href={`${servicePath(city, "airport-taxi")}?from=${locality.slug}`}
                className="rounded-full border border-line bg-card px-4 py-2 text-sm"
              >
                {locality.name} → Airport
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <JourneyGuide citySlug={city.slug} hideLinks />
      <RelatedNav
        groups={serviceLinkGroups(city.slug, null).filter((group) => group.title === "Other cities")}
      />
      <FaqList items={cityFaqs} />
    </>
  );
}

function RouteLanding({ routeId }: { routeId: string }) {
  const route = routes.find((item) => item.id === routeId);
  if (!route) return null;
  const origin = cityName(route.originCitySlug);
  const fromId = cityPlaceId(route.originCitySlug);
  const toId = destinationPlaceId(route.id);
  const related = routesFromCity(route.originCitySlug).filter((item) => item.id !== route.id).slice(0, 6);
  const originCity = getCity(route.originCitySlug);
  const copy = {
    ...routeLandingLead(origin, route.destinationName, route.why),
    stats: [
      { value: inrFrom(route.sedanFare), label: "Sedan from" },
      { value: durationLabel(route.durationMinutes), label: "Typical time" },
      { value: `${route.distanceKm} km`, label: "Distance" },
    ],
  };
  const faqItems = (() => {
    const generated = guideFaqs(route.id);
    const seen = new Set(generated.map((item) => item.question.toLowerCase()));
    const extra = faqsFor({
      citySlug: route.originCitySlug,
      routeId: route.id,
    }).filter((item) => !seen.has(item.question.toLowerCase()));
    return [...generated, ...extra];
  })();
  const faqSchema = faqJsonLd(faqItems);

  return (
    <>
      {originCity ? (
        <>
          <JsonLd
            data={routeServiceJsonLd(originCity, route.destinationName, `/${route.pageSlug}`, {
              distanceKm: route.distanceKm,
              durationMinutes: route.durationMinutes,
              fare: route.sedanFare,
              why: route.why,
            })}
          />
          <JsonLd
            data={breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: origin, path: `/${route.originCitySlug}` },
              { name: `${origin} to ${route.destinationName} cab`, path: `/${route.pageSlug}` },
            ])}
          />
        </>
      ) : null}
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
      <PageHero copy={copy}>
        <TripBuilder
          citySlug={route.originCitySlug}
          initialFromId={fromId}
          initialToId={toId}
          mode="outstation"
          heading="This trip is already filled in"
        />
      </PageHero>
      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-8">
          <h2 className="display text-3xl">Other {origin} taxi routes</h2>
          <p className="mt-2 text-ink-soft">
            Same origin, different road — each {origin} to destination cab has its own
            fare and notes.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <RouteCard key={item.id} route={item} />
            ))}
          </div>
        </section>
      ) : null}
      <JourneyGuide
        routeId={route.id}
        omitHrefs={related.map((item) => routePath(item))}
      />
      <FaqList items={faqItems} />
    </>
  );
}
