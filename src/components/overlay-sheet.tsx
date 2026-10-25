"use client";

import { useEffect, type ReactNode } from "react";
import { CloseIcon } from "@/components/icons";

export function OverlaySheet({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="overlay-root" role="presentation">
      <button type="button" className="overlay-backdrop" aria-label="Close" onClick={onClose} />
      <div
        className="overlay-sheet"
        role="dialog"
        aria-modal
        aria-labelledby="overlay-sheet-title"
      >
        <div className="sheet-handle sm:hidden" aria-hidden />
        <div className="flex items-start justify-between gap-3 px-5 pb-3 pt-1 sm:pt-5">
          <div className="min-w-0">
            <p id="overlay-sheet-title" className="display text-[1.35rem] leading-none text-ink">
              {title}
            </p>
            {subtitle ? <p className="mt-1 text-sm leading-5 text-muted">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-line bg-paper p-2 text-muted transition hover:text-ink"
            aria-label="Close"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="overlay-sheet-body">{children}</div>
        {footer ? <div className="border-t border-line px-5 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}
