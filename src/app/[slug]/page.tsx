import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { RouteCard } from "@/components/route-card";
import { TripBuilder } from "@/components/trip-builder";
import { TrustPills } from "@/components/trust-pills";
import { cities, faqsFor, getCity, getRouteByPageSlug, localitiesInCity, routes, routesFromCity, services } from "@/lib/data";
import { durationLabel, inrFrom } from "@/lib/format";
import { cityPlaceId, destinationPlaceId } from "@/lib/places";
import { cityName } from "@/lib/trip-intent";
import { isRouteSlug, servicePath } from "@/lib/urls";

type Params = { slug: string };

export function generateStaticParams() {
  return [
    ...cities.map((city) => ({ slug: city.slug })),
    ...routes.filter((route) => route.status === "live").map((route) => ({ slug: route.pageSlug })),
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
    return { title: city.seoTitle, description: city.seoDescription };
  }
  const route = getRouteByPageSlug(slug);
  if (route) {
    const origin = cityName(route.originCitySlug);
    return {
      title: `${origin} to ${route.destinationName} cab`,
      description: `${origin} → ${route.destinationName} · ${inrFrom(route.sedanFare)} · ${durationLabel(route.durationMinutes)}. ${route.why}`,
    };
  }
  return { title: "Trip" };
}

export default async function SlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (isRouteSlug(slug)) {
    const route = getRouteByPageSlug(slug);
    if (!route) notFound();
    return <RouteLanding routeId={route.id} />;
  }
  const city = getCity(slug);
  if (!city) notFound();
  return <CityLanding citySlug={city.slug} />;
}

function CityLanding({ citySlug }: { citySlug: string }) {
  const city = getCity(citySlug);
  if (!city) return null;
  const popular = routesFromCity(city.slug);
  const pickups = localitiesInCity(city.slug).filter((item) => item.slug !== "airport");
  const cityServices = services.filter((service) =>
    city.availableServiceIds.includes(service.id),
  );

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-6 pt-10">
        {city.status === "draft" ? (
          <p className="mb-3 text-sm font-medium text-accent-dark">Opening soon · same trip builder</p>
        ) : null}
        <h1 className="display text-4xl sm:text-6xl">{city.hero}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{city.trustLine}</p>
        <div className="mt-6">
          <TrustPills items={["Door-to-door", "Professional drivers", "24×7 booking"]} />
        </div>
        <div className="mt-8">
          <TripBuilder
            citySlug={city.slug}
            initialFromId={cityPlaceId(city.slug)}
            heading="Tell us the trip"
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="display text-3xl">What are you trying to do?</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {cityServices.map((service) => (
            <Link
              key={service.id}
              href={servicePath(city, service)}
              className="rounded-2xl border border-line bg-card p-5"
            >
              <p className="text-sm text-muted">{service.journey}</p>
              <p className="mt-1 text-xl font-semibold">{service.name}</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {popular.length > 0 ? (
        <section className="mx-auto max-w-5xl px-4 py-8">
          <h2 className="display text-3xl">Popular trips from {city.name}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </section>
      ) : null}

      {pickups.length > 0 ? (
        <section className="mx-auto max-w-5xl px-4 py-8">
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

      <FaqList items={faqsFor({ citySlug: city.slug })} />
    </>
  );
}

function RouteLanding({ routeId }: { routeId: string }) {
  const route = routes.find((item) => item.id === routeId);
  if (!route) return null;
  const origin = cityName(route.originCitySlug);
  const fromId = cityPlaceId(route.originCitySlug);
  const toId = destinationPlaceId(route.id);
  const related = routesFromCity(route.originCitySlug).filter((item) => item.id !== route.id).slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-6 pt-10">
        <p className="text-sm font-medium text-accent-dark">
          {origin} → {route.destinationName}
        </p>
        <h1 className="display mt-2 text-4xl sm:text-6xl">
          {origin} to {route.destinationName} cab
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{route.why}</p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <span>{inrFrom(route.sedanFare)}</span>
          <span>{durationLabel(route.durationMinutes)}</span>
          <span>{route.distanceKm} km</span>
        </div>
        <div className="mt-8">
          <TripBuilder
            citySlug={route.originCitySlug}
            initialFromId={fromId}
            initialToId={toId}
            heading="This trip is already filled in"
          />
        </div>
      </section>
      {related.length > 0 ? (
        <section className="mx-auto max-w-5xl px-4 py-8">
          <h2 className="display text-3xl">Other trips from {origin}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <RouteCard key={item.id} route={item} />
            ))}
          </div>
        </section>
      ) : null}
      <FaqList items={faqsFor({ citySlug: route.originCitySlug, routeId: route.id })} />
    </>
  );
}
