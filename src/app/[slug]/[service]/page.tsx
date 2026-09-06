import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { ReviewRail } from "@/components/review-rail";
import { RouteCard } from "@/components/route-card";
import { TripBuilder } from "@/components/trip-builder";
import { TrustPills } from "@/components/trust-pills";
import {
  cities,
  faqsFor,
  getCity,
  getService,
  hubliLeisureRoutes,
  localitiesInCity,
  reviewStats,
  reviewsForService,
  routesFromCity,
  services,
} from "@/lib/data";
import { inrFrom } from "@/lib/format";
import { serviceLandingCopy } from "@/lib/landing-copy";
import { airportPlaceId, cityPlaceId, localityPlaceId } from "@/lib/places";
import type { ServiceKind } from "@/types";
import { servicePath } from "@/lib/urls";

type Params = { slug: string; service: string };

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
  const copy = serviceLandingCopy(city, service);
  return {
    title: copy.eyebrow,
    description: copy.lead,
  };
}

function builderMode(kind: ServiceKind): ServiceKind | undefined {
  if (kind === "local" || kind === "airport" || kind === "outstation") return kind;
  if (kind === "tours" || kind === "tempo") return "outstation";
  return undefined;
}

export default async function ServicePage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { slug, service: serviceSlug } = await params;
  const query = await searchParams;
  const city = getCity(slug);
  const service = getService(serviceSlug);
  if (!city || !service) notFound();

  const pickups = localitiesInCity(city.slug);
  const fromLocality = pickups.find((item) => item.slug === query.from);
  const initialFromId = fromLocality
    ? localityPlaceId(fromLocality.id)
    : cityPlaceId(city.slug);
  const initialToId =
    service.kind === "airport" ? airportPlaceId(city.slug) : undefined;
  const outstation = routesFromCity(city.slug);
  const leisure =
    city.slug === "hubli" ? hubliLeisureRoutes() : outstation.slice(0, 6);
  const serviceFaqs = faqsFor({
    citySlug: city.slug,
    service: service.kind,
  });
  const cityReviews = reviewsForService(city.slug, service.kind);
  const stats = reviewStats(cityReviews);
  const copy = serviceLandingCopy(city, service);
  const showRoutes =
    service.kind === "outstation" ||
    service.kind === "one-way" ||
    service.kind === "round-trip" ||
    service.kind === "car-rental" ||
    service.kind === "tours" ||
    service.kind === "tempo";

  return (
    <>
      <PageHero copy={copy} rating={stats.average} reviewCount={stats.count}>
        <TripBuilder
          citySlug={city.slug}
          initialFromId={
            query.from === "airport" ? airportPlaceId(city.slug) : initialFromId
          }
          initialToId={
            query.from === "airport" ? cityPlaceId(city.slug) : initialToId
          }
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

      {service.kind === "airport" ? (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="display text-3xl">Choose a pickup area</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pickups
              .filter((item) => item.slug !== "airport")
              .map((locality) => (
                <Link
                  key={locality.id}
                  href={`${servicePath(city, service)}?from=${locality.slug}`}
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
      ) : null}

      {showRoutes && (service.kind === "tours" ? leisure : outstation).length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="display text-3xl">
            {service.kind === "tours"
              ? `Trips people book from ${city.name}`
              : `Published routes from ${city.name}`}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(service.kind === "tours" ? leisure : outstation).map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </section>
      ) : null}

      <ReviewRail title={`Reviews in ${city.name}`} reviews={cityReviews} />
      <FaqList items={serviceFaqs} />
    </>
  );
}
