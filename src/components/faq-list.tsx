import type { Faq } from "@/types";

export function FaqList({ items }: { items: Faq[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="display text-3xl">Before you book</h2>
      <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-card">
        {items.map((faq) => (
          <details key={faq.id} className="group px-5 py-4">
            <summary className="cursor-pointer list-none text-base font-medium">
              {faq.question}
            </summary>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
