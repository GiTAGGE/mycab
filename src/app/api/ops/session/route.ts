import { NextResponse } from "next/server";
import { passwordsMatch, sessionCookie, signSession } from "@/lib/ops-auth";
import { runtimeEnv } from "@/lib/runtime-env";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const env = await runtimeEnv();
  const secure = new URL(request.url).protocol === "https:";
  if (!env.opsPassword || !env.opsSessionSecret) {
    return NextResponse.redirect(new URL("/ops/login?error=unconfigured", request.url), 303);
  }
  if (!(await passwordsMatch(password, env.opsPassword))) {
    return NextResponse.redirect(new URL("/ops/login?error=1", request.url), 303);
  }
  const response = NextResponse.redirect(new URL("/ops", request.url), 303);
  response.headers.set("Set-Cookie", sessionCookie(await signSession(env.opsSessionSecret), secure));
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
