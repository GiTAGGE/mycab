import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { RouteCard } from "@/components/route-card";
import { TripBuilder } from "@/components/trip-builder";
import { TrustPills } from "@/components/trust-pills";
import { cities, faqsFor, getCity, getService, localitiesInCity, routesFromCity, services } from "@/lib/data";
import { inrFrom } from "@/lib/format";
import { airportPlaceId, cityPlaceId, localityPlaceId } from "@/lib/places";
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
  return {
    title: `${city.name} ${service.name.toLowerCase()}`,
    description: service.description,
  };
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
  const serviceFaqs = faqsFor({
    citySlug: city.slug,
    service: service.kind,
  });

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-6 pt-10">
        <p className="text-sm font-medium text-accent-dark">{service.journey}</p>
        <h1 className="display mt-2 text-4xl sm:text-6xl">
          {city.name} {service.name.toLowerCase()}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{service.description}</p>
        {city.airport && service.kind === "airport" ? (
          <p className="mt-3 text-ink-soft">
            To / from {city.airport.name} ({city.airport.code})
          </p>
        ) : null}
        <div className="mt-5">
          <TrustPills items={service.trust} />
        </div>

        {service.kind === "airport" ? (
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

        <div className="mt-8">
          <TripBuilder
            citySlug={city.slug}
            initialFromId={
              query.from === "airport" ? airportPlaceId(city.slug) : initialFromId
            }
            initialToId={
              query.from === "airport" ? cityPlaceId(city.slug) : initialToId
            }
            heading={
              service.kind === "airport"
                ? "Airport, or a neighbourhood first"
                : "Tell us the trip"
            }
          />
        </div>
      </section>

      {service.kind === "airport" ? (
        <section className="mx-auto max-w-5xl px-4 py-8">
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

      {service.kind === "outstation" || service.kind === "one-way" || service.kind === "round-trip" ? (
        <section className="mx-auto max-w-5xl px-4 py-8">
          <h2 className="display text-3xl">Published routes from {city.name}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {outstation.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </section>
      ) : null}

      <FaqList items={serviceFaqs} />
    </>
  );
}
