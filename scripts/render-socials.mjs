// Render the SocialsHero composition with live availability from Supabase.
// Reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from .env.local.
// Usage:
//   node scripts/render-socials.mjs
//   node scripts/render-socials.mjs --output public/socials-2026-04.mp4

import { createClient } from "@supabase/supabase-js";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

// Naive .env.local parser so we don't pull in dotenv just for this.
function loadEnv() {
  try {
    const raw = readFileSync(join(repoRoot, ".env.local"), "utf-8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local optional; rely on real env
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

const { data: units, error } = await supabase
  .from("units")
  .select("monthly_rent, status, available_from")
  .eq("status", "available");

if (error) {
  console.error("Failed to fetch availability:", error);
  process.exit(1);
}

const availableCount = units?.length ?? 0;
const fromPrice = units?.length
  ? Math.min(...units.map((u) => Number(u.monthly_rent)).filter((n) => n > 0))
  : 4300;

console.log(`▸ Live data — ${availableCount} units available, from R${fromPrice.toLocaleString("en-ZA")}`);

const outArg = process.argv.indexOf("--output");
const outPath = outArg !== -1 ? process.argv[outArg + 1] : "public/socials-availability.mp4";

const props = JSON.stringify({ availableCount, fromPrice });
console.log(`▸ Rendering with props: ${props}`);

execSync(
  `npx remotion render remotion/index.ts SocialsHero ${outPath} --codec=h264 --props=${JSON.stringify(props)}`,
  { stdio: "inherit", cwd: repoRoot },
);

console.log(`✓ Rendered ${outPath}`);
