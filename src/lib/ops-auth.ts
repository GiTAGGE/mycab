export const OPS_COOKIE = "sc_ops";
const SESSION_MS = 12 * 60 * 60 * 1000;

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function textToBase64Url(value: string): string {
  return bytesToBase64Url(new TextEncoder().encode(value));
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (value.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function timingSafeEqual(left: string, right: string): boolean {
  const a = new TextEncoder().encode(left);
  const b = new TextEncoder().encode(right);
  const length = Math.max(a.length, b.length);
  let mismatch = a.length === b.length ? 0 : 1;
  for (let index = 0; index < length; index += 1) {
    mismatch |= (a[index] ?? 0) ^ (b[index] ?? 0);
  }
  return mismatch === 0;
}

async function hmac(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return bytesToBase64Url(new Uint8Array(signature));
}

export async function passwordsMatch(input: string, expected: string): Promise<boolean> {
  if (!expected) return false;
  const digest = async (value: string) => {
    const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
    return bytesToBase64Url(new Uint8Array(hash));
  };
  return timingSafeEqual(await digest(input), await digest(expected));
}

export async function signSession(secret: string): Promise<string> {
  const payload = textToBase64Url(JSON.stringify({ exp: Date.now() + SESSION_MS }));
  return `${payload}.${await hmac(secret, payload)}`;
}

export async function verifySession(secret: string, token: string | undefined): Promise<boolean> {
  if (!secret || !token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = await hmac(secret, payload);
  if (!timingSafeEqual(signature, expected)) return false;
  try {
    const data = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

type AccessJwk = JsonWebKey & { kid?: string };

let certsCache: { fetchedAt: number; keys: AccessJwk[] } | null = null;

async function accessKeys(teamDomain: string): Promise<AccessJwk[]> {
  if (certsCache && Date.now() - certsCache.fetchedAt < 60 * 60 * 1000) return certsCache.keys;
  const response = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!response.ok) return [];
  const body = (await response.json()) as { keys?: AccessJwk[] };
  const keys = body.keys ?? [];
  certsCache = { fetchedAt: Date.now(), keys };
  return keys;
}

export async function verifyAccessJwt(
  jwt: string | null,
  teamDomain: string,
  audience: string,
): Promise<boolean> {
  if (!jwt || !teamDomain || !audience) return false;
  const [headerPart, payloadPart, signaturePart] = jwt.split(".");
  if (!headerPart || !payloadPart || !signaturePart) return false;
  try {
    const header = JSON.parse(new TextDecoder().decode(base64UrlToBytes(headerPart))) as {
      alg?: string;
      kid?: string;
    };
    if (header.alg !== "RS256" || !header.kid) return false;
    const payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payloadPart))) as {
      aud?: string | string[];
      exp?: number;
      iss?: string;
    };
    const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!audiences.includes(audience)) return false;
    if (typeof payload.exp !== "number" || payload.exp * 1000 <= Date.now()) return false;
    if (payload.iss && payload.iss !== `https://${teamDomain}`) return false;
    const jwk = (await accessKeys(teamDomain)).find((key) => key.kid === header.kid);
    if (!jwk) return false;
    const key = await crypto.subtle.importKey(
      "jwk",
      jwk,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const signature = Uint8Array.from(base64UrlToBytes(signaturePart));
    return crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      signature,
      new TextEncoder().encode(`${headerPart}.${payloadPart}`),
    );
  } catch {
    return false;
  }
}

export function sessionCookie(token: string, secure: boolean): string {
  const parts = [
    `${OPS_COOKIE}=${token}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${SESSION_MS / 1000}`,
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

export function clearSessionCookie(secure: boolean): string {
  const parts = [`${OPS_COOKIE}=`, "HttpOnly", "Path=/", "SameSite=Lax", "Max-Age=0"];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}
