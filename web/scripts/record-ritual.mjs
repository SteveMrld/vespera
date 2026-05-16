// Enregistre un screencast complet de la scène /ritual.
// Usage : npm run capture:ritual (le dev server doit tourner sur :3000)
// Sortie : <repoRoot>/docs/captures/ritual-step2-v1.webm

import { chromium } from "playwright";
import { mkdir, rename, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "..", "..");
const OUT_DIR = resolve(REPO_ROOT, "docs", "captures");
const OUT_FILE = resolve(OUT_DIR, "ritual-step2-v1.webm");
const TMP_DIR = resolve(__dirname, ".tmp-record");

const URL = process.env.RITUAL_URL ?? "http://localhost:3000/ritual";
const DURATION_MS = Number(process.env.RITUAL_DURATION ?? 17000);
const VIEWPORT = { width: 390, height: 844 }; // iPhone-like mobile

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(TMP_DIR, { recursive: true });

  console.log(`> Launching chromium, recording ${URL} for ${DURATION_MS}ms`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    recordVideo: { dir: TMP_DIR, size: VIEWPORT },
    reducedMotion: "no-preference",
  });

  const page = await context.newPage();

  page.on("pageerror", (err) => console.error("[page error]", err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") console.error("[console error]", msg.text());
  });

  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(DURATION_MS);

  await context.close();
  await browser.close();

  // Playwright nomme la vidéo aléatoirement dans TMP_DIR. On la déplace.
  const files = await readdir(TMP_DIR);
  const webm = files.find((f) => f.endsWith(".webm"));
  if (!webm) {
    throw new Error("Aucune vidéo .webm produite par Playwright");
  }
  await rename(resolve(TMP_DIR, webm), OUT_FILE);
  console.log(`> Saved: ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
