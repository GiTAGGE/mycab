import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="display text-4xl">That trip isn’t listed</h1>
      <p className="mt-3 text-ink-soft">
        Choose a city or a published route, or start a booking and tell us the pins on WhatsApp.
      </p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-accent px-5 py-3 text-white">
        Plan a ride
      </Link>
    </section>
  );
}
