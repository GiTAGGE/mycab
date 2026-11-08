"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { LogoMark } from "@/components/logo-mark";
import { brand } from "@/lib/brand";

function fitTagline(name: HTMLElement, tag: HTMLElement) {
  const label = tag.textContent ?? "";
  const gaps = Math.max(label.length - 1, 1);
  tag.style.letterSpacing = "0px";
  const target = name.getBoundingClientRect().width;
  const natural = tag.getBoundingClientRect().width;
  let spacing = (target - natural) / gaps;
  tag.style.letterSpacing = `${spacing}px`;
  const drift = target - tag.getBoundingClientRect().width;
  if (Math.abs(drift) > 0.4) {
    spacing += drift / gaps;
    tag.style.letterSpacing = `${spacing}px`;
  }
}

export function Wordmark({
  href = "/",
  size = "md",
}: {
  href?: string;
  size?: "md" | "lg";
}) {
  const nameRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const mark = size === "lg" ? "h-12 w-12" : "h-9 w-9 sm:h-10 sm:w-10";
  const letters = size === "lg" ? "text-[1.85rem] sm:text-[2rem]" : "text-[1.2rem] sm:text-[1.45rem]";
  const tagline = size === "lg" ? "wordmark-tag-lg" : "wordmark-tag-md";

  useLayoutEffect(() => {
    const name = nameRef.current;
    const tag = tagRef.current;
    if (!name || !tag) return;

    const fit = () => fitTagline(name, tag);
    fit();
    const fonts = document.fonts;
    fonts?.ready.then(fit).catch(() => {});
    const observer = new ResizeObserver(fit);
    observer.observe(name);
    return () => observer.disconnect();
  }, [size]);

  const lockup = (
    <span className={`logo-lockup flex min-w-0 items-center ${size === "lg" ? "gap-3.5" : "gap-2.5"}`}>
      <LogoMark className={`${mark} shrink-0`} />
      <span className="wordmark-copy">
        <span ref={nameRef} className={`wordmark flex items-baseline leading-none ${letters}`}>
          <span className="wordmark-see">See</span>
          <span className="wordmark-cabs">Cabs</span>
        </span>
        <span ref={tagRef} className={`wordmark-tag ${tagline}`}>
          {brand.tagline}
        </span>
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
