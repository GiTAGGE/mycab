import Link from "next/link";
import { brand } from "@/lib/brand";
import { liveCities } from "@/lib/data";
import { rawWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

export function Header({ citySlug }: { citySlug?: string }) {
  const cities = liveCities();

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-sm font-semibold text-white">
            M
          </span>
          <span className="text-[17px] font-semibold tracking-tight text-navy">
            {brand.name}
          </span>
        </Link>
        <nav className="flex min-w-0 items-center gap-1 sm:gap-2">
          <Link
            href="/cities"
            className="hidden rounded-full px-2.5 py-1.5 text-sm text-ink-soft hover:bg-paper-deep sm:inline"
          >
            Cities
          </Link>
          <div className="flex max-w-[52vw] items-center gap-1 overflow-x-auto text-sm sm:max-w-none">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className={`shrink-0 rounded-full px-2.5 py-1.5 ${
                  citySlug === city.slug
                    ? "bg-navy text-white"
                    : "text-ink-soft hover:bg-paper-deep"
                }`}
              >
                {city.name}
              </Link>
            ))}
          </div>
          <a
            href={rawWhatsAppUrl()}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-3 py-2 text-sm font-medium text-white"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
