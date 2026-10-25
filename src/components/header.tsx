import Link from "next/link";
import { BrandRibbon } from "@/components/brand-ribbon";
import { CallLink } from "@/components/call-link";
import { Wordmark } from "@/components/wordmark";
import { rawWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

export function Header({ citySlug }: { citySlug?: string }) {
  return (
    <header className="site-header sticky top-0 z-30">
      <BrandRibbon placement="header" />
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16">
        <Wordmark />
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link href="/cities" className="hidden text-sm text-ink-soft hover:text-ink sm:inline">
            Cities
          </Link>
          {citySlug ? (
            <span className="hidden capitalize text-sm text-muted md:inline">{citySlug}</span>
          ) : null}
          <CallLink />
          <a href={rawWhatsAppUrl()} className="wa-chip" aria-label="WhatsApp">
            <WhatsAppIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
