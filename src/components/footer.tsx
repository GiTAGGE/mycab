import Link from "next/link";
import { CallLink } from "@/components/call-link";
import { trustLinks } from "@/components/prose-page";
import { Wordmark } from "@/components/wordmark";
import { liveCities, networkServices } from "@/lib/data";
import { networkServicePath } from "@/lib/urls";

export function Footer() {
  const cities = liveCities();
  const tripTypes = networkServices();

  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:grid-cols-3">
        <div>
          <Wordmark href="/" size="lg" />
          <p className="mt-2 max-w-xs text-sm leading-6 text-ink-soft">
            Bangalore, Hubli, Dharwad, Belgaum and Mangalore. Starting fares for
            local hours and intercity trips. Confirm on the phone or WhatsApp.
          </p>
          <p className="mt-4">
            <CallLink variant="footer" />
          </p>
        </div>
        <div>
          <p className="text-sm text-muted">Cities</p>
          <ul className="mt-3 space-y-2 text-sm">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link className="hover:underline" href={`/${city.slug}`}>
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-muted">Trip types</p>
          <ul className="mt-3 space-y-2 text-sm">
            {tripTypes.map((service) => (
              <li key={service.slug}>
                <Link className="hover:underline" href={networkServicePath(service)}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-muted">
          <span>Karnataka</span>
          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            {trustLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
