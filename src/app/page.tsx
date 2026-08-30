import Link from "next/link";
import { HomeChooser } from "@/components/home-chooser";
import { RouteCard } from "@/components/route-card";
import { hubliLeisureRoutes, liveCities, localPackageFrom, networkRoutes, publicServices } from "@/lib/data";
import { inrFrom } from "@/lib/format";
import { servicePath } from "@/lib/urls";

export default function HomePage() {
  const cities = liveCities();
  const popular = networkRoutes(2);
  const tripTypes = publicServices();

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pb-8 pt-14 sm:pt-20">
        <p className="text-sm text-muted">
          {cities.map((city) => city.name).join(" · ")}
        </p>
        <h1 className="display mt-4 text-[2.35rem] leading-[1.12] sm:text-6xl">
          Tell us the trip.
        </h1>
        <p className="mt-4 max-w-lg text-lg leading-7 text-ink-soft">
          Local hours or a ride to another city. Five Karnataka cities, one
          fare card — then WhatsApp.
        </p>
        <div className="mt-8">
          <HomeChooser cities={cities} services={tripTypes} />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="display text-3xl">Local, in every city</h2>
        <p className="mt-2 text-ink-soft">
          4 or 8 hours. Same driver. Not an A-to-B drop.
        </p>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {cities.map((city) => {
            const pack = localPackageFrom(city.slug, "8hr");
            return (
              <Link
                key={city.slug}
                href={servicePath(city, "local-cabs")}
                className="flex items-center justify-between gap-4 py-4"
              >
                <span>
                  <span className="block font-medium">{city.name}</span>
                  <span className="block text-sm text-muted">{city.region}</span>
                </span>
                <span className="text-sm font-medium text-accent">{pack ? `${inrFrom(pack.amount)} / 8 hr` : "Get fare"}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12">
        <h2 className="display text-3xl">From Hubli</h2>
        <p className="mt-2 text-ink-soft">
          Dandeli, Gokarna, Murudeshwar, Hampi, Hospet — and the rest of the
          North Karnataka runs.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hubliLeisureRoutes().map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
        <Link href="/hubli/outstation-cabs" className="mt-6 inline-block text-sm text-accent underline decoration-accent/40 underline-offset-4">
          All Hubli outstation trips
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20">
        <h2 className="display text-3xl">Across the network</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </section>
    </>
  );
}
