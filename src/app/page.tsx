import Link from "next/link";
import { HomeChooser } from "@/components/home-chooser";
import { PageHero } from "@/components/page-hero";
import { ReviewRail } from "@/components/review-rail";
import { RouteCard } from "@/components/route-card";
import {
  hubliLeisureRoutes,
  liveCities,
  localPackageFrom,
  networkReviews,
  networkRoutes,
  publicServices,
  reviewsForCity,
  reviewStats,
} from "@/lib/data";
import { inrFrom } from "@/lib/format";
import { servicePath } from "@/lib/urls";

export default function HomePage() {
  const cities = liveCities();
  const popular = networkRoutes(2);
  const tripTypes = publicServices();
  const reviews = networkReviews(2);
  const stats = reviewStats(cities.flatMap((city) => reviewsForCity(city.slug)));

  return (
    <>
      <PageHero
        compact
        rating={stats.average}
        reviewCount={stats.count}
        copy={{
          eyebrow: "Karnataka cabs",
          title: "A cab in Karnataka — fare first.",
          lead: "Local cabs, airport transfers, car rentals and outstation trips from Hubli, Dharwad, Belgaum, Bangalore and Mangalore. See the fare before you confirm.",
          stats: [
            { value: "5", label: "Live cities" },
            { value: "24×7", label: "Booking" },
            { value: "WhatsApp", label: "To confirm" },
          ],
        }}
      >
        <HomeChooser cities={cities} services={tripTypes} />
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-14">
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
                <span className="text-sm font-medium text-accent">
                  {pack ? `${inrFrom(pack.amount)} / 8 hr` : "Get fare"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="display text-3xl">From Hubli</h2>
        <p className="mt-2 text-ink-soft">
          Dandeli, Gokarna, Murudeshwar, Hampi, Hospet — the North Karnataka runs
          people actually book.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hubliLeisureRoutes().map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
        <Link
          href="/hubli/outstation-cabs"
          className="mt-6 inline-block text-sm text-accent underline decoration-accent/40 underline-offset-4"
        >
          All Hubli outstation trips
        </Link>
      </section>

      <ReviewRail title="Reviews across the network" reviews={reviews} preview={6} />

      <section className="mx-auto max-w-6xl px-4 pb-20">
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
