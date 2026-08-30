import Link from "next/link";
import { RouteCard } from "@/components/route-card";
import { TripBuilder } from "@/components/trip-builder";
import { brand } from "@/lib/brand";
import { getCity, liveCities, routesFromCity, services } from "@/lib/data";
import { cityPlaceId } from "@/lib/places";
import { servicePath } from "@/lib/urls";

export default function HomePage() {
  const city = getCity(brand.cityDefault) ?? liveCities()[0];
  if (!city) return null;
  const popular = routesFromCity(city.slug).slice(0, 6);

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-8 pt-10 sm:pt-16">
        <p className="text-sm font-medium text-accent-dark">{city.name} first · more cities next</p>
        <h1 className="display mt-3 max-w-3xl text-4xl leading-tight sm:text-6xl">
          Yes, we can take you from A to B. Here’s roughly what it costs.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-7 text-ink-soft">
          Not another cab brochure. A trip builder that turns Google traffic
          into a clear fare — then WhatsApp, without a 15-field form.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          {services
            .filter((service) => ["airport", "outstation", "local", "round-trip"].includes(service.id))
            .map((service) => (
              <Link
                key={service.id}
                href={servicePath(city, service)}
                className="rounded-2xl border border-line bg-card px-4 py-4 hover:border-ink/20"
              >
                <p className="font-medium">{service.shortName}</p>
                <p className="mt-1 text-sm text-muted">{service.journey}</p>
              </Link>
            ))}
        </div>
        <div className="mt-8">
          <TripBuilder
            citySlug={city.slug}
            initialFromId={cityPlaceId(city.slug)}
            heading={city.hero}
          />
        </div>
        <p className="mt-4 text-center text-sm text-muted">
          Need a cab right now? The WhatsApp message already carries the trip.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="display text-3xl">Popular trips from {city.name}</h2>
            <p className="mt-2 text-ink-soft">Conversion shortcuts, not SEO filler.</p>
          </div>
          <Link href={`/${city.slug}`} className="text-sm font-medium underline">
            All {city.name} trips
          </Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
          <Link
            href={servicePath(city, "airport-taxi")}
            className="rounded-2xl border border-line bg-forest px-4 py-4 text-white"
          >
            <p className="text-sm text-white/70">{city.name} Airport</p>
            <p className="mt-1 text-lg font-semibold">Airport taxi</p>
            <p className="mt-3 text-sm">From ₹699 · ~45 min</p>
          </Link>
        </div>
      </section>
    </>
  );
}
