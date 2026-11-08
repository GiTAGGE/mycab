import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { brand } from "@/lib/brand";

export function Wordmark({
  href = "/",
  size = "md",
}: {
  href?: string;
  size?: "md" | "lg";
}) {
  const letters =
    size === "lg"
      ? "text-[2.15rem] leading-none sm:text-[2.45rem]"
      : "text-[1.45rem] leading-none sm:text-[2rem]";
  const mark =
    size === "lg"
      ? "mx-1.5 h-[4.5rem] sm:h-20"
      : "mx-1 h-14 sm:mx-1.5 sm:h-[4.5rem]";

  const lockup = (
    <span className="flex min-w-0 flex-col">
      <span className={`wordmark flex items-center ${letters}`}>
        <span className="wordmark-see">S</span>
        <LogoMark className={mark} />
        <span className="wordmark-cabs ml-[0.2em]">Cabs</span>
      </span>
      <span
        className={`block truncate font-medium tracking-wide text-muted ${
          size === "lg" ? "mt-1 text-sm" : "mt-0.5 text-[11px] sm:text-xs"
        }`}
      >
        {brand.tagline}
      </span>
    </span>
  );

  if (!href) {
    return (
      <span aria-label={`${brand.name}. ${brand.tagline}`} className="inline-flex">
        {lockup}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={`${brand.name}. ${brand.tagline}`} className="inline-flex min-w-0">
      {lockup}
    </Link>
  );
}
