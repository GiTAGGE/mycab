import Link from "next/link";
import { BrandRibbon } from "@/components/brand-ribbon";
import { CallLink } from "@/components/call-link";
import { Wordmark } from "@/components/wordmark";
import { WhatsAppIcon } from "@/components/icons";
import { WhatsAppLink } from "@/components/whatsapp-link";

export function Header({ citySlug }: { citySlug?: string }) {
  return (
    <header className="site-header sticky top-0 z-30">
      <BrandRibbon placement="header" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:py-2.5">
        <Wordmark />
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link href="/cities" className="hidden text-sm text-ink-soft hover:text-ink sm:inline">
            Cities
          </Link>
          {citySlug ? (
            <span className="hidden capitalize text-sm text-muted md:inline">{citySlug}</span>
          ) : null}
          <CallLink />
          <WhatsAppLink source="header" className="wa-chip">
            <WhatsAppIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </WhatsAppLink>
        </nav>
      </div>
    </header>
  );
}
