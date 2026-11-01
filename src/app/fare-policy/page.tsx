import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage, ProseSection } from "@/components/prose-page";
import { vehicles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Fare policy",
  description:
    "SeeCabs fares are starting fares. Fuel and the driver are in the intercity base. Tolls, parking and waiting are confirmed before you pay.",
  alternates: { canonical: "/fare-policy" },
};

export default function FarePolicyPage() {
  return (
    <ProsePage
      title="Fare policy"
      lede="The number on a page is a starting fare. It is not an all-inclusive total, and it is not a promise that a cab is already waiting."
    >
      <ProseSection title="Starting fare">
        <p>
          Route cards say “from” a sedan price. The booking card uses the same
          idea: the figure can change with the pickup, the drop and the travel
          date. You see that note under the ride choice. The amount you pay is
          the one confirmed on the phone or WhatsApp.
        </p>
      </ProseSection>
      <ProseSection title="What the intercity base includes">
        <p>Fuel and the driver are in the starting fare for a one-way intercity trip. A return, a night halt or extra stops are separate and are added only if you ask for them.</p>
      </ProseSection>
      <ProseSection title="What is confirmed before you pay">
        <p>Tolls, parking and waiting are not silently included. If they apply to your pickup and drop, they are named before you pay. A different vehicle category changes the fare. Sedan is the default.</p>
        <ul className="list-disc space-y-1 pl-5">
          {vehicles.map((vehicle) => (
            <li key={vehicle.id}>
              {vehicle.name} — {vehicle.seats} seats. {vehicle.blurb}
            </li>
          ))}
        </ul>
      </ProseSection>
      <ProseSection title="Local hours and airport">
        <p>Local rental is a 4-hour or 8-hour package with the same driver, not a single drop. Extra time or kilometres are quoted when you pick the package.</p>
        <p>Airport fares depend on the neighbourhood. A longer pickup is a higher starting fare, shown on that city’s airport page. Share the flight number when you confirm so pickup can follow the landing. Waiting beyond what you agree is confirmed before you pay.</p>
      </ProseSection>
      <ProseSection title="Where to read a route">
        <p>
          Each live route has its own distance, typical duration and starting sedan fare. Start from a city page, or open{" "}
          <Link className="text-accent underline decoration-accent/40 underline-offset-4" href="/cities">
            the city list
          </Link>
          .
        </p>
      </ProseSection>
    </ProsePage>
  );
}
