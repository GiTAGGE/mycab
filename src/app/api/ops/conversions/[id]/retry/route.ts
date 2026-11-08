import { NextResponse } from "next/server";
import { retryConversion } from "@/lib/measure/deliver";
import { runtimeEnv } from "@/lib/runtime-env";

export const runtime = "nodejs";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await retryConversion(id, await runtimeEnv());
  const response = NextResponse.redirect(new URL("/ops/measurement", request.url), 303);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
