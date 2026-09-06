import { journeyForCity } from "@/lib/data/journeys";

export function JourneyGuide({ citySlug }: { citySlug: string }) {
  const guide = journeyForCity(citySlug);
  if (!guide) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="display text-3xl">{guide.title}</h2>
      <p className="mt-2 max-w-2xl text-ink-soft">{guide.lead}</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {guide.types.map((item) => (
          <article key={item.name} className="rounded-2xl border border-line bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-accent">{item.name}</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{item.body}</p>
          </article>
        ))}
      </div>

      <h3 className="display mt-12 text-2xl">Along the road</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {guide.stops.map((stop) => (
          <article key={stop.title} className="rounded-2xl border border-line bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-muted">{stop.kind}</p>
            <p className="mt-1 text-lg font-semibold text-ink">{stop.title}</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{stop.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
