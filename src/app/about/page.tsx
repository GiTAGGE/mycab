import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage, ProseSection } from "@/components/prose-page";
import { liveCities, vehicles } from "@/lib/data";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description:
    "SeeCabs shows a starting fare for cabs in Karnataka and confirms the trip on the phone or WhatsApp. A driver is assigned for the booking.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const cities = liveCities();

  return (
    <ProsePage
      title="About SeeCabs"
      lede="SeeCabs shows a starting fare, then confirms the trip with you on the phone or WhatsApp. A driver is assigned for that booking."
    >
      <ProseSection title="What this site does">
        <p>
          {brand.name} is a booking desk for local hours, airport transfers and
          intercity cabs in the cities listed below. You pick the trip on the
          page. The number you see is a starting fare, not a final invoice.
          Confirmation happens in a call or a WhatsApp chat, where the pickup,
          drop, date and any tolls are agreed before you pay.
        </p>
        <p>
          We do not publish a registered office, a GST number, or a claim that
          these cars are a company-owned fleet. The vehicle you choose is a
          category — sedan, SUV, and the others below — and a driver is assigned
          for the booking.
        </p>
      </ProseSection>
      <ProseSection title="Cities on this site">
        <ul className="space-y-2">
          {cities.map((city) => (
            <li key={city.slug}>
              <Link className="text-accent underline decoration-accent/40 underline-offset-4" href={`/${city.slug}`}>
                {city.name}
              </Link>
              <span> — {city.tagline}</span>
            </li>
          ))}
        </ul>
      </ProseSection>
      <ProseSection title="Vehicle categories">
        <ul className="space-y-2">
          {vehicles.map((vehicle) => (
            <li key={vehicle.id}>
              <span className="text-ink">{vehicle.name}</span>
              {` — ${vehicle.seats} seats, ${vehicle.bags} bags. ${vehicle.blurb}`}
            </li>
          ))}
        </ul>
        <p>A larger category starts higher than the sedan fare shown on a route.</p>
      </ProseSection>
    </ProsePage>
  );
}
