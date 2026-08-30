import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="display text-4xl">That trip page doesn’t exist</h1>
      <p className="mt-3 text-ink-soft">
        We only publish URLs that match a real customer decision.
      </p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-ink px-5 py-3 text-paper">
        Plan a ride
      </Link>
    </section>
  );
}
