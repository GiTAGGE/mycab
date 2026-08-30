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
        Five live cities. Each one is real data — not a renamed Bangalore page.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Hubli is not Bangalore. Dharwad flies from Hubballi Airport. Belgaum
        has IXG and a Goa run. Mangalore has the coast. Local hours exist in
        every live city.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {cities.map((city) => (
          <Link
            key={city.id}
            href={city.status === "live" ? `/${city.slug}` : "/cities"}
            className="rounded-2xl border border-line bg-card p-5"
          >
            <p className="text-xs font-semibold tracking-[0.16em] text-gold">
              {city.shortCode} · {city.region}
            </p>
            <p className="mt-2 text-2xl font-semibold">{city.name}</p>
            {city.officialName ? (
              <p className="text-sm text-muted">{city.officialName}</p>
            ) : null}
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
