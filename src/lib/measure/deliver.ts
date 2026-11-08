import { getConversion, insertConversion, updateConversion } from "@/lib/db/store";
import type { RuntimeEnv } from "@/lib/runtime-env";
import { absoluteUrl } from "@/lib/site";
import type { ConversionDestination, Lead } from "@/types";

type SendInput = {
  lead: Lead;
  eventId: string;
  env: RuntimeEnv;
  clientId: string;
  pageUrl: string;
  ip: string | null;
  userAgent: string | null;
};

export async function recordLeadConversions(input: SendInput): Promise<void> {
  await Promise.all([sendGa4(input), sendMeta(input)]);
}

export async function retryConversion(id: string, env: RuntimeEnv): Promise<void> {
  const event = await getConversion(id);
  if (!event || event.status !== "failed") return;
  const destination = event.destination;
  try {
    const response = await postDestination(destination, event.payloadJson, env);
    await updateConversion(id, {
      status: response.ok ? "sent" : "failed",
      error: response.ok ? null : response.error,
    });
  } catch (error) {
    await updateConversion(id, {
      status: "failed",
      error: error instanceof Error ? error.message : "Retry failed",
    });
  }
}

async function sendGa4(input: SendInput): Promise<void> {
  const configured = Boolean(input.env.ga4MeasurementId && input.env.ga4ApiSecret);
  const payload = {
    client_id: input.clientId,
    events: [
      {
        name: "generate_lead",
        params: {
          currency: "INR",
          value: input.lead.estimatedFare ?? 0,
          engagement_time_msec: 1,
          event_id: input.eventId,
          trip_intent: input.lead.intent,
          page_location: input.pageUrl,
          ...(input.lead.gclid ? { gclid: input.lead.gclid } : {}),
        },
      },
    ],
  };
  await send("ga4", "generate_lead", input, configured, payload);
}

async function sendMeta(input: SendInput): Promise<void> {
  const configured = Boolean(input.env.metaCapiToken && input.env.metaPixelId);
  const userData: Record<string, string> = {};
  if (input.ip) userData.client_ip_address = input.ip;
  if (input.userAgent) userData.client_user_agent = input.userAgent;
  if (input.lead.fbclid) {
    userData.fbc = `fb.1.${Date.now()}.${input.lead.fbclid}`;
  }
  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: input.pageUrl,
        user_data: userData,
        custom_data: {
          currency: "INR",
          value: input.lead.estimatedFare ?? 0,
          content_name: `${input.lead.originLabel} to ${input.lead.destinationLabel}`,
        },
      },
    ],
  };
  const stored = {
    data: payload.data.map((item) => ({
      ...item,
      user_data: {
        ...(item.user_data.fbc ? { fbc: item.user_data.fbc } : {}),
      },
    })),
  };
  await send("meta", "Lead", input, configured, payload, JSON.stringify(stored));
}

async function send(
  destination: ConversionDestination,
  eventName: string,
  input: SendInput,
  configured: boolean,
  payload: unknown,
  storedPayload?: string,
): Promise<void> {
  const payloadJson = storedPayload ?? JSON.stringify(payload);
  if (!configured) {
    await insertConversion({
      leadId: input.lead.id,
      destination,
      eventName,
      eventId: input.eventId,
      status: "skipped",
      payloadJson,
      error: null,
    });
    return;
  }
  const row = await insertConversion({
    leadId: input.lead.id,
    destination,
    eventName,
    eventId: input.eventId,
    status: "pending",
    payloadJson,
    error: null,
  });
  try {
    const response = await postDestination(destination, JSON.stringify(payload), input.env);
    await updateConversion(row.id, {
      status: response.ok ? "sent" : "failed",
      error: response.ok ? null : response.error,
      payloadJson,
    });
  } catch (error) {
    await updateConversion(row.id, {
      status: "failed",
      error: error instanceof Error ? error.message : "Request failed",
      payloadJson,
    });
  }
}

async function postDestination(
  destination: ConversionDestination,
  body: string,
  env: RuntimeEnv,
): Promise<{ ok: boolean; error: string | null }> {
  const url =
    destination === "ga4"
      ? `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(env.ga4MeasurementId)}&api_secret=${encodeURIComponent(env.ga4ApiSecret)}`
      : `https://graph.facebook.com/v21.0/${encodeURIComponent(env.metaPixelId)}/events?access_token=${encodeURIComponent(env.metaCapiToken)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  if (response.ok) return { ok: true, error: null };
  const text = await response.text();
  return { ok: false, error: text.slice(0, 500) || `HTTP ${response.status}` };
}

export function leadPageUrl(landingPage: string | null, env: RuntimeEnv): string {
  if (!landingPage) return env.siteUrl;
  if (landingPage.startsWith("http")) return landingPage;
  return absoluteUrl(landingPage);
}
