import type { Metadata } from "next";
import { HomeChooser } from "@/components/home-chooser";
import { liveCities, publicServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Plan your ride",
};

export default function BookPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="display text-4xl">Plan your ride</h1>
      <p className="mt-3 max-w-lg text-ink-soft">
        Local hours or a trip between cities. Same card as the homepage.
      </p>
      <div className="mt-8">
        <HomeChooser cities={liveCities()} services={publicServices()} />
      </div>
    </section>
  );
}
