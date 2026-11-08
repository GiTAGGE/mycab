import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

function parseJsonc(text) {
  const stripped = text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:"'\\])\/\/.*$/gm, "$1")
    .replace(/,\s*([}\]])/g, "$1");
  return JSON.parse(stripped);
}

const config = parseJsonc(readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8"));
const env = { ...process.env };

for (const [key, value] of Object.entries(config.vars ?? {})) {
  if (env[key] == null || env[key] === "") env[key] = String(value);
}

if (!env.SITE_BUILD_ID) env.SITE_BUILD_ID = new Date().toISOString();

const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const child = spawn(process.execPath, [nextBin, "build"], {
  stdio: "inherit",
  env,
});

child.on("exit", (code) => process.exit(code ?? 1));
