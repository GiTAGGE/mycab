"use client";

import { useEffect } from "react";
import { captureAttributionFromLocation } from "@/lib/attribution";

export function AttributionTracker() {
  useEffect(() => {
    captureAttributionFromLocation();
  }, []);
  return null;
}
