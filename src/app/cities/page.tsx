import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cities",
  description: "Live and upcoming MyCab cities. Bangalore is first.",
};

export default function CitiesPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="display text-4xl sm:text-5xl">Book a cab anywhere — starting with one city done properly.</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        We don’t clone a Bangalore page and swap the name. Each city gets its
        own routes, airport, pickups and prices when it’s live.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {cities.map((city) => (
          <Link
            key={city.id}
            href={city.status === "live" ? `/${city.slug}` : "/"}
            className="rounded-2xl border border-line bg-card p-5"
          >
            <p className="text-sm text-muted">{city.state}</p>
            <p className="mt-1 text-2xl font-semibold">{city.name}</p>
            <p className="mt-2 text-sm text-ink-soft">{city.tagline}</p>
            <p className="mt-4 text-xs uppercase tracking-wide text-accent-dark">
              {city.status === "live" ? "Live" : "Draft"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
