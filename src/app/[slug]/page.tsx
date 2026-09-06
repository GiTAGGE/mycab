import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { ReviewRail } from "@/components/review-rail";
import { RouteCard } from "@/components/route-card";
import { TripBuilder } from "@/components/trip-builder";
import {
  cities,
  faqsFor,
  getCity,
  getRouteByPageSlug,
  localitiesInCity,
  reviewStats,
  reviewsForCity,
  routes,
  routesFromCity,
  services,
} from "@/lib/data";
import { durationLabel, inrFrom } from "@/lib/format";
import { cityLandingCopy, routeLandingLead } from "@/lib/landing-copy";
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
  const cityServices = services.filter(
    (service) =>
      city.availableServiceIds.includes(service.id) &&
      !["one-way", "round-trip"].includes(service.id),
  );
  const cityReviews = reviewsForCity(city.slug);
  const stats = reviewStats(cityReviews);
  const copy = cityLandingCopy(city);

  return (
    <>
      <PageHero copy={copy} rating={stats.average} reviewCount={stats.count}>
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
          <h2 className="display text-3xl">Popular trips from {city.name}</h2>
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

      <ReviewRail title={`Reviews in ${city.name}`} reviews={cityReviews} />
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
  const cityReviews = reviewsForCity(route.originCitySlug);
  const matched = cityReviews.filter((review) => review.routeId === route.id);
  const rail = matched.length >= 2 ? matched : cityReviews;
  const stats = reviewStats(rail);
  const copy = {
    ...routeLandingLead(origin, route.destinationName, route.why),
    stats: [
      { value: inrFrom(route.sedanFare), label: "Sedan from" },
      { value: durationLabel(route.durationMinutes), label: "Door to door" },
      { value: `${route.distanceKm} km`, label: "Distance" },
    ],
  };

  return (
    <>
      <PageHero copy={copy} rating={stats.average} reviewCount={stats.count}>
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
          <h2 className="display text-3xl">Other trips from {origin}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <RouteCard key={item.id} route={item} />
            ))}
          </div>
        </section>
      ) : null}
      <ReviewRail title={`Reviews from ${origin}`} reviews={rail} />
      <FaqList items={faqsFor({ citySlug: route.originCitySlug, routeId: route.id })} />
    </>
  );
}
