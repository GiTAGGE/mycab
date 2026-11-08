import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/ops-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secure = new URL(request.url).protocol === "https:";
  const response = NextResponse.redirect(new URL("/ops/login", request.url), 303);
  response.headers.set("Set-Cookie", clearSessionCookie(secure));
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
