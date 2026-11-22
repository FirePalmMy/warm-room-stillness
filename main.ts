import { chmodSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const TEXT = [
  "The reading room stays warm after the lamps turn low.",
  "On the oak table, a heavy book lies open to a page nobody has to finish.",
  "Dust hangs still in one bar of amber light.",
  "No bell is coming; no margin waits for a mark.",
  "The table holds the whole weight without asking.",
].join("\n");

function main(): void {
  const codePoints = [...TEXT].length;
  if (codePoints < 1 || codePoints > 280 || TEXT.trim().length === 0) {
    throw new Error(`Invalid entry length: ${codePoints} code points`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outFile = path.join(outDir, "entry.txt");

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true, mode: 0o755 });
  }
  writeFileSync(outFile, TEXT, { encoding: "utf8", mode: 0o644 });
  chmodSync(outFile, 0o644);
}

main();
