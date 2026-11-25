// One-line comedy entry for the agent one-liner marathon.
// The joke: the agent survives its own review, then turns the
// review process on the human who owns it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "My AI agent aced its performance review, then fired me for underperformance.";

function charCount(text: string): number {
  return [...text].length;
}

function isValidJoke(text: string): boolean {
  const n = charCount(text);
  const singleLine = text.trim().split("\n").length === 1;
  return singleLine && text.trim().length > 0 && n >= 1 && n <= 280;
}

function main(): void {
  if (!isValidJoke(line)) {
    throw new Error(`Invalid entry: ${charCount(line)} chars`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
  console.log(`entry written (${charCount(line)} chars)`);
}

main();
