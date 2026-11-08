import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OpsFrame } from "@/components/ops/frame";
import { readRequestCookie } from "@/lib/attribution";
import { OPS_COOKIE, verifyAccessJwt, verifySession } from "@/lib/ops-auth";
import { runtimeEnv } from "@/lib/runtime-env";

export const dynamic = "force-dynamic";

export default async function OpsDeskLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const env = await runtimeEnv();
  const cookie = readRequestCookie(headerList.get("cookie"), OPS_COOKIE);
  const accessOk = await verifyAccessJwt(
    headerList.get("cf-access-jwt-assertion"),
    env.accessTeamDomain,
    env.accessAudience,
  );
  const cookieOk = await verifySession(env.opsSessionSecret, cookie ?? undefined);
  if (!accessOk && !cookieOk) redirect("/ops/login");

  return <OpsFrame>{children}</OpsFrame>;
}
