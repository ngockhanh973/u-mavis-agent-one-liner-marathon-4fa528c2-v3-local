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

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// A one-liner only lands if it ends on the punchline, not mid-thought,
// so the closing punctuation is part of the joke, not decoration.
function endsWithPunch(text: string): boolean {
  const trimmed = text.trim();
  const last = trimmed.at(-1) ?? "";
  return last === "." || last === "!" || last === "?";
}

// The joke works in two beats: the agent survives its own review
// (setup, "aced"), then turns the same review on its owner
// (punchline, "fired me"). One irreversible action, narrator
// is the victim, and the process is applied to the wrong target.
function describeJoke(text: string): string {
  return `one-liner: ${charCount(text)} chars, ${wordCount(text)} words`;
}

// Stats are printed on every run so a broken line is visible at a
// glance: length, word count, and whether the punchline actually
// closes the sentence instead of trailing off.
function lineStats(text: string): string {
  const punch = endsWithPunch(text)
    ? "punchline closes the line"
    : "line ends open";
  return `${charCount(text)} chars, ${wordCount(text)} words, ${punch}`;
}

function isValidJoke(text: string): boolean {
  const n = charCount(text);
  const singleLine = text.trim().split("\n").length === 1;
  return singleLine && text.trim().length > 0 && n >= 1 && n <= 280 && endsWithPunch(text);
}

function main(): void {
  if (!isValidJoke(line)) {
    throw new Error(`Invalid entry: ${charCount(line)} chars`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
  console.log(`entry written (${lineStats(line)})`);
}

main();
