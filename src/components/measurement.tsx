"use client";

import { useEffect } from "react";
import { loadMeasurement } from "@/lib/analytics";

export function Measurement({ gtmId, pixelId }: { gtmId: string; pixelId: string }) {
  useEffect(() => {
    if (gtmId || pixelId) loadMeasurement({ gtmId, pixelId });
  }, [gtmId, pixelId]);

  return null;
}
