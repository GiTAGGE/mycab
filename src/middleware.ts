import { NextResponse, type NextRequest } from "next/server";
import { OPS_COOKIE, verifyAccessJwt, verifySession } from "@/lib/ops-auth";
import { runtimeEnv } from "@/lib/runtime-env";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headers = new Headers(request.headers);
  headers.set("x-seecabs-path", pathname);

  const login = pathname === "/ops/login";
  const sessionPost = pathname === "/api/ops/session" && request.method === "POST";
  if (login || sessionPost) {
    return NextResponse.next({ request: { headers } });
  }

  const env = await runtimeEnv();
  const accessOk = await verifyAccessJwt(
    request.headers.get("cf-access-jwt-assertion"),
    env.accessTeamDomain,
    env.accessAudience,
  );
  const cookieOk = await verifySession(env.opsSessionSecret, request.cookies.get(OPS_COOKIE)?.value);
  if (accessOk || cookieOk) {
    return NextResponse.next({ request: { headers } });
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401, headers: { "Cache-Control": "private, no-store" } });
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/ops/login";
  redirectUrl.search = "";
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/ops", "/ops/:path*", "/api/ops/:path*"],
};
