"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

function subscribe() {
  return () => {};
}

function clientTrue() {
  return true;
}

function serverFalse() {
  return false;
}

/** Render overlays on document.body so sticky cards and the site header cannot trap them. */
export function BodyPortal({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(subscribe, clientTrue, serverFalse);
  if (!mounted) return null;
  return createPortal(children, document.body);
}
