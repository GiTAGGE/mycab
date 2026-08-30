import Link from "next/link";
import { brand } from "@/lib/brand";
import { rawWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

export function Header({ citySlug }: { citySlug?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-[17px] font-semibold tracking-tight">
          {brand.name}
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/cities" className="text-ink-soft hover:text-ink">
            Cities
          </Link>
          {citySlug ? (
            <span className="hidden capitalize text-muted sm:inline">{citySlug}</span>
          ) : null}
          <a
            href={rawWhatsAppUrl()}
            className="inline-flex items-center gap-1.5 text-forest"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
