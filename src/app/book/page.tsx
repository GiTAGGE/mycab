import type { Metadata } from "next";
import { HomeChooser } from "@/components/home-chooser";
import { liveCities, services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Plan your ride",
};

export default function BookPage() {
  return (
    <section className="constellation px-4 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="display text-4xl">Tell us the city, then the trip type.</h1>
        <p className="mt-3 max-w-xl text-white/70">
          Local hours or an A-to-B trip. Same builder in every live city.
        </p>
        <p className="mt-8 text-sm font-medium text-white/70">1 · Your city</p>
        <div className="mt-3">
          <HomeChooser cities={liveCities()} services={services} />
        </div>
      </div>
    </section>
  );
}
