import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { JourneyGuide } from "@/components/journey-guide";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { RelatedNav } from "@/components/related-nav";
import { ReviewRail } from "@/components/review-rail";
import { RouteCard } from "@/components/route-card";
import { TripBuilder } from "@/components/trip-builder";
import { TrustPills } from "@/components/trust-pills";
import {
  cities,
  getCity,
  getService,
  leisureRoutesFrom,
  localitiesInCity,
  reviewStats,
  reviewsForCity,
  reviewsForService,
  routesFromCity,
  services,
  tempoRoutesFrom,
  vehicles,
} from "@/lib/data";
import { inrFrom } from "@/lib/format";
import { serviceFaqsFor, serviceLinkGroups } from "@/lib/guides";
import { serviceLandingCopy, serviceSeo } from "@/lib/landing-copy";
import { airportPlaceId, cityPlaceId } from "@/lib/places";
import { breadcrumbJsonLd, faqJsonLd, taxiServiceJsonLd } from "@/lib/seo";
import type { ServiceKind } from "@/types";
import { absoluteUrl } from "@/lib/site";
import { servicePath } from "@/lib/urls";

type Params = { slug: string; service: string };

export const dynamic = "force-static";

export function generateStaticParams() {
  return cities.flatMap((city) =>
    services
      .filter((service) => city.availableServiceIds.includes(service.id))
      .map((service) => ({ slug: city.slug, service: service.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, service: serviceSlug } = await params;
  const city = getCity(slug);
  const service = getService(serviceSlug);
  if (!city || !service) return { title: "Trip" };
  const seo = serviceSeo(city, service);
  const path = `/${city.slug}/${service.slug}`;
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: absoluteUrl(path),
      type: "website",
    },
  };
}

function builderMode(kind: ServiceKind): ServiceKind | undefined {
  if (kind === "local" || kind === "airport" || kind === "outstation") return kind;
  if (kind === "tours" || kind === "tempo") return "outstation";
  return undefined;
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, service: serviceSlug } = await params;
  const city = getCity(slug);
  const service = getService(serviceSlug);
  if (!city || !service) notFound();

  const initialFromId = cityPlaceId(city.slug);
  const initialToId = service.kind === "airport" ? airportPlaceId(city.slug) : undefined;
  const serviceFaqs = serviceFaqsFor(city.slug, service.kind);
  const allCityReviews = reviewsForCity(city.slug);
  const cityReviews = reviewsForService(city.slug, service.kind);
  const stats = reviewStats(allCityReviews);
  const faqSchema = faqJsonLd(serviceFaqs);
  const copy = serviceLandingCopy(city, service);
  const path = `/${city.slug}/${service.slug}`;

  return (
    <>
      <JsonLd data={taxiServiceJsonLd(city, allCityReviews, path)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: city.name, path: `/${city.slug}` },
          { name: service.name, path: path },
        ])}
      />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
      <PageHero copy={copy} rating={stats.average} reviewCount={stats.count}>
        <TripBuilder
          citySlug={city.slug}
          initialFromId={initialFromId}
          initialToId={initialToId}
          mode={builderMode(service.kind)}
          initialPassengers={service.kind === "tempo" ? 8 : 2}
          heading={
            service.kind === "airport"
              ? "Airport, or a neighbourhood first"
              : service.kind === "tempo"
                ? "Group trip"
                : "Tell us the trip"
          }
        />
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 pt-4">
        <TrustPills items={service.trust} />
        {city.airport && service.kind === "airport" ? (
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={servicePath(city, service)}
              className="rounded-full bg-accent px-4 py-2 text-sm text-white"
            >
              {city.name} → Airport
            </Link>
            <Link
              href={`${servicePath(city, service)}?from=airport`}
              className="rounded-full border border-line bg-card px-4 py-2 text-sm"
            >
              Airport → {city.name}
            </Link>
          </div>
        ) : null}
      </section>

      <JourneyGuide citySlug={city.slug} service={service.kind} hideLinks />

      <ServiceBody citySlug={city.slug} kind={service.kind} />

      <RelatedNav groups={serviceLinkGroups(city.slug, service.kind)} />

      <ReviewRail title={`${service.name} reviews in ${city.name}`} reviews={cityReviews} />
      <FaqList items={serviceFaqs} />
    </>
  );
}

function ServiceBody({ citySlug, kind }: { citySlug: string; kind: ServiceKind }) {
  const city = getCity(citySlug);
  if (!city) return null;

  if (kind === "airport") {
    const pickups = localitiesInCity(city.slug).filter((item) => item.slug !== "airport");
    if (pickups.length === 0) return null;
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="display text-3xl">Choose a pickup area</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pickups.map((locality) => (
            <Link
              key={locality.id}
              href={`${servicePath(city, "airport-taxi")}?from=${locality.slug}`}
              className="rounded-2xl border border-line bg-card p-4"
            >
              <p className="font-medium">
                {locality.name} → Airport
              </p>
              <p className="mt-2 text-sm font-medium text-accent">
                {inrFrom(locality.airportFareFrom)}
              </p>
              <p className="mt-1 text-sm text-muted">~{locality.airportMinutes} min</p>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  if (kind === "tempo") {
    const routes = tempoRoutesFrom(city.slug).slice(0, 9);
    return (
      <>
        <FleetStrip highlight="tempo" />
        {routes.length > 0 ? (
          <section className="mx-auto max-w-6xl px-4 py-10">
            <h2 className="display text-3xl">Tempo traveller routes from {city.name}</h2>
            <p className="mt-2 max-w-2xl text-ink-soft">
              Group fares on these roads — 12 seats, driver included. Sedan prices live on the
              outstation page.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {routes.map((route) => (
                <RouteCard key={route.id} route={route} vehicleId="tempo" />
              ))}
            </div>
          </section>
        ) : null}
      </>
    );
  }

  if (kind === "tours") {
    const routes = leisureRoutesFrom(city.slug);
    if (routes.length === 0) return null;
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="display text-3xl">Tour corridors from {city.name}</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Usual pins people string into a multi-day trip. Same car. You name the nights.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </section>
    );
  }

  if (kind === "car-rental") {
    return <FleetStrip />;
  }

  if (kind === "outstation") {
    const routes = routesFromCity(city.slug);
    if (routes.length === 0) return null;
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="display text-3xl">{city.name} outstation cab routes</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </section>
    );
  }

  return null;
}

function FleetStrip({ highlight }: { highlight?: string }) {
  const list = highlight
    ? vehicles.filter((vehicle) => vehicle.id === highlight || vehicle.id === "innova" || vehicle.id === "sedan")
    : vehicles;
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="display text-3xl">{highlight ? "12 seats, or the next size down" : "Fleet with a driver"}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((vehicle) => (
          <article
            key={vehicle.id}
            className={`rounded-2xl border bg-card p-5 ${
              highlight && vehicle.id === highlight ? "border-accent/50" : "border-line"
            }`}
          >
            <p className="text-xs uppercase tracking-wide text-accent">{vehicle.name}</p>
            <p className="mt-2 text-2xl font-semibold">{vehicle.seats} seats</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{vehicle.blurb}</p>
            <p className="mt-3 text-xs text-muted">{vehicle.bags} bags · driver included</p>
          </article>
        ))}
      </div>
    </section>
  );
}
