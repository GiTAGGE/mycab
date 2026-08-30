import type { Metadata } from "next";
import { TripBuilder } from "@/components/trip-builder";
import { brand } from "@/lib/brand";
import { cityPlaceId } from "@/lib/places";

export const metadata: Metadata = {
  title: "Plan your ride",
};

export default function BookPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-10">
      <TripBuilder
        citySlug={brand.cityDefault}
        initialFromId={cityPlaceId(brand.cityDefault)}
        heading="Tell us your trip"
      />
    </section>
  );
}
