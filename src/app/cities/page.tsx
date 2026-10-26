import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cities",
  description:
    "Live in Bangalore, Hubli, Dharwad, Belgaum and Mangalore. Each city has its own airport, local hours and routes.",
};

export default function CitiesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="display text-4xl sm:text-5xl">
        Cab service in Bangalore, Hubli, Dharwad, Belgaum and Mangalore.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Each city has its own airport, local hours and outstation routes.
        Hubli and Dharwad share Hubballi Airport (HBX). Belgaum uses IXG.
        Mangalore is the coast.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {cities.map((city) => (
          <Link
            key={city.id}
            href={city.status === "live" ? `/${city.slug}` : "/cities"}
            className="rounded-2xl border border-line bg-card p-5"
          >
            <p className="text-sm text-muted">
              {city.region}
            </p>
            <p className="mt-2 text-2xl font-semibold">{city.name}</p>
            {city.officialName ? (
              <p className="text-sm text-muted">{city.officialName}</p>
            ) : null}
            <p className="mt-2 text-sm text-ink-soft">{city.tagline}</p>
            <p className="mt-4 text-sm text-muted">
              {city.status === "live" ? "Live" : "Coming later"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
