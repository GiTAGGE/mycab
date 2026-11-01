import type { ReactNode } from "react";

export const trustLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/fare-policy", label: "Fare policy" },
  { href: "/cancellation", label: "Cancellation" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function ProsePage({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="display text-4xl">{title}</h1>
      <p className="mt-4 text-lg leading-7 text-ink-soft">{lede}</p>
      <div className="mt-10 space-y-8">{children}</div>
    </article>
  );
}

export function ProseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="display text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-7 text-ink-soft">{children}</div>
    </section>
  );
}
