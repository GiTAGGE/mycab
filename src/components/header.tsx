import Link from "next/link";
import { brand } from "@/lib/brand";
import { liveCities } from "@/lib/data";
import { rawWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

export function Header({ citySlug }: { citySlug?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-sm font-semibold text-paper">
            M
          </span>
          <span className="text-[17px] font-semibold tracking-tight">{brand.name}</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link href="/cities" className="hidden rounded-full px-2.5 py-1.5 text-sm text-ink-soft hover:bg-paper-deep sm:inline">
            Cities
          </Link>
          <CityLinks current={citySlug} />
          <a
            href={rawWhatsAppUrl()}
            className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-2 text-sm font-medium text-white"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function CityLinks({ current }: { current?: string }) {
  const cities = liveCities();
  return (
    <div className="flex items-center gap-1 text-sm">
      {cities.map((city) => (
        <Link
          key={city.slug}
          href={`/${city.slug}`}
          className={`rounded-full px-2.5 py-1.5 ${
            current === city.slug ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-deep"
          }`}
        >
          {city.name}
        </Link>
      ))}
    </div>
  );
}
