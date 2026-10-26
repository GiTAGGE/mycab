import Link from "next/link";
import type { SiteLink } from "@/lib/guides";

export type RelatedGroup = {
  title: string;
  links: SiteLink[];
};

export function RelatedNav({ groups }: { groups: RelatedGroup[] }) {
  const visible = groups.filter((group) => group.links.length > 0);
  if (visible.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {visible.map((group) => (
        <div key={group.title} className="mt-10 first:mt-0">
          <h2 className="display text-2xl sm:text-3xl">{group.title}</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {group.links.map((link) => (
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
      ))}
    </section>
  );
}
