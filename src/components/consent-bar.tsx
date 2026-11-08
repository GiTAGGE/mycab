"use client";

import { useEffect, useSyncExternalStore } from "react";
import { loadMeasurement } from "@/lib/analytics";
import { readConsent, subscribeConsent, writeConsent, type ConsentChoice } from "@/lib/consent";

function subscribeMounted() {
  return () => {};
}

export function ConsentBar({ gtmId, pixelId }: { gtmId: string; pixelId: string }) {
  const mounted = useSyncExternalStore(subscribeMounted, () => true, () => false);
  const choice = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  const enabled = Boolean(gtmId || pixelId);

  useEffect(() => {
    if (mounted && choice === "granted" && enabled) loadMeasurement({ gtmId, pixelId });
  }, [mounted, choice, enabled, gtmId, pixelId]);

  if (!mounted || !enabled || choice) return null;

  function choose(next: ConsentChoice) {
    writeConsent(next);
    if (next === "granted") loadMeasurement({ gtmId, pixelId });
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 px-4 py-3 shadow-[0_-12px_30px_-20px_rgba(28,20,16,0.5)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          We use Google and Meta tags only after you accept, so ad clicks and fare checks can be measured. Reject keeps those tags off.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-full border border-line px-4 py-2 text-sm"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
