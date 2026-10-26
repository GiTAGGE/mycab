import Link from "next/link";
import { resolveGuide, type GuideQuery } from "@/lib/guides";
import type { SiteLink } from "@/lib/guides";

export function JourneyGuide(query: GuideQuery) {
  const guide = resolveGuide(query);
  if (!guide) return null;
  const stopsHeading = guide.stopsHeading ?? "Along the road";
  const heading = guide.seoHeading ?? guide.title;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="display text-3xl">{heading}</h2>
      <p className="mt-2 max-w-3xl text-ink-soft">{guide.lead}</p>

      {guide.article && guide.article.length > 0 ? (
        <div className="mt-6 max-w-3xl space-y-4 text-[0.95rem] leading-7 text-ink-soft">
          {guide.article.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>
              <LinkedProse text={paragraph} links={guide.links ?? []} />
            </p>
          ))}
        </div>
      ) : null}

      {guide.types.length > 0 ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {guide.types.map((item) => (
            <article key={item.name} className="rounded-2xl border border-line bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-accent">{item.name}</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{item.body}</p>
            </article>
          ))}
        </div>
      ) : null}

      {guide.stops.length > 0 ? (
        <>
          <h3 className="display mt-12 text-2xl">{stopsHeading}</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guide.stops.map((stop) => (
              <article key={stop.title} className="rounded-2xl border border-line bg-card p-5">
                <p className="text-xs uppercase tracking-wide text-muted">{stop.kind}</p>
                <p className="mt-1 text-lg font-semibold text-ink">{stop.title}</p>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{stop.body}</p>
              </article>
            ))}
          </div>
        </>
      ) : null}

      {guide.links && guide.links.length > 0 ? (
        <KeywordLinks
          title="Routes and city cabs people also search"
          links={guide.links}
        />
      ) : null}
    </section>
  );
}

function KeywordLinks({ title, links }: { title: string; links: SiteLink[] }) {
  return (
    <div className="mt-12">
      <h3 className="display text-2xl">{title}</h3>
      <p className="mt-2 max-w-2xl text-sm text-ink-soft">
        Internal links to the exact taxi page — same network, different road or
        a local / airport pin in that city.
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 text-sm font-medium text-ink transition hover:border-accent/40 hover:text-accent"
            >
              {link.label}
              {link.hint ? (
                <span className="text-xs font-normal text-muted">{link.hint}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LinkedProse({ text, links }: { text: string; links: SiteLink[] }) {
  if (links.length === 0) return text;
  const sorted = [...links].sort((a, b) => b.label.length - a.label.length);
  type Piece = { href?: string; text: string };
  let pieces: Piece[] = [{ text }];
  for (const link of sorted) {
    const next: Piece[] = [];
    for (const piece of pieces) {
      if (piece.href) {
        next.push(piece);
        continue;
      }
      const index = piece.text.toLowerCase().indexOf(link.label.toLowerCase());
      if (index < 0) {
        next.push(piece);
        continue;
      }
      const before = piece.text.slice(0, index);
      const match = piece.text.slice(index, index + link.label.length);
      const after = piece.text.slice(index + link.label.length);
      if (before) next.push({ text: before });
      next.push({ href: link.href, text: match });
      if (after) next.push({ text: after });
    }
    pieces = next;
  }
  return (
    <>
      {pieces.map((piece, index) =>
        piece.href ? (
          <Link
            key={`${piece.href}-${index}`}
            href={piece.href}
            className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          >
            {piece.text}
          </Link>
        ) : (
          <span key={`t-${index}`}>{piece.text}</span>
        ),
      )}
    </>
  );
}
