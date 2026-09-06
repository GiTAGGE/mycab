import Link from "next/link";
import { brand } from "@/lib/brand";

export function Wordmark({
  href = "/",
  size = "md",
}: {
  href?: string;
  size?: "md" | "lg";
}) {
  const mark = (
    <span
      className={`wordmark tracking-tight ${
        size === "lg" ? "text-[1.45rem] leading-none" : "text-[1.2rem] leading-none"
      }`}
    >
      <span className="wordmark-see">See</span>
      <span className="wordmark-cabs">Cabs</span>
    </span>
  );

  if (!href) {
    return (
      <span aria-label={brand.name} className="inline-flex items-baseline">
        {mark}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={brand.name} className="inline-flex items-baseline">
      {mark}
    </Link>
  );
}
