import Link from "next/link";
import { HomeChooser } from "@/components/home-chooser";
import { RouteCard } from "@/components/route-card";
import { liveCities, localPackageFrom, networkRoutes, services } from "@/lib/data";
import { inrFrom } from "@/lib/format";
import { servicePath } from "@/lib/urls";

export default function HomePage() {
  const cities = liveCities();
  const popular = networkRoutes(2);
  const tripTypes = services.filter((service) =>
    ["local", "airport", "outstation", "one-way", "round-trip"].includes(service.id),
  );

  return (
    <>
      <section className="constellation text-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pt-20">
          <p className="text-sm font-medium tracking-wide text-gold">
            Karnataka network · 5 live cities
          </p>
          <h1 className="display mt-3 max-w-4xl text-4xl leading-[1.1] sm:text-6xl">
            Not a Bangalore website.
            <br />
            A cab platform for the state.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-white/75">
            Hubli, Dharwad, Belgaum, Mangalore and Bangalore — each with its
            own airport, local hours, and routes. Pick the city and the trip
            type. Then see a fare.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-white/55">
            {cities.map((city, index) => (
              <span key={city.slug} className="inline-flex items-center gap-3">
                <span className="font-semibold tracking-[0.18em] text-gold">
                  {city.shortCode}
                </span>
                <span>{city.name}</span>
                {index < cities.length - 1 ? (
                  <span className="hidden h-px w-8 bg-white/20 sm:block" />
                ) : null}
              </span>
            ))}
          </div>

          <p className="mt-12 text-sm font-medium text-white/70">1 · Your city</p>
          <div className="mt-3">
            <HomeChooser cities={cities} services={tripTypes} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="display text-3xl sm:text-4xl">Local hours, in every live city</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Local is a trip type — 4 or 8 hours with the same driver — not a
          hidden menu item under outstation.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {cities.map((city) => {
            const pack = localPackageFrom(city.slug, "8hr");
            return (
              <Link
                key={city.slug}
                href={servicePath(city, "local-cabs")}
                className="rounded-2xl border border-line bg-card p-5"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-gold">
                  {city.shortCode}
                </p>
                <p className="mt-2 text-lg font-semibold">{city.name}</p>
                <p className="mt-1 text-sm text-muted">8 hours / 80 km</p>
                <p className="mt-3 text-accent-dark">
                  {pack ? inrFrom(pack.amount) : "Get fare"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="display text-3xl sm:text-4xl">Trips across the network</h2>
        <p className="mt-3 text-ink-soft">
          Hubli → Dharwad is not a Bangalore page with the name changed.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </section>
    </>
  );
}
