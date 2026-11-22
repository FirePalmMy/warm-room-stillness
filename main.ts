import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const TEXT = [
  "Late rain on a tin roof, slow enough to count.",
  "Downstairs, the dishes are dry and the latch is turned.",
  "A hall lamp stays lit, not waiting, just keeping the dark soft.",
  "Nothing here is timed. Nobody needs the right word.",
  "The room holds its warmth all night.",
].join("\n");

function main(): void {
  const codePoints = [...TEXT].length;
  if (codePoints < 1 || codePoints > 280 || TEXT.trim().length === 0) {
    throw new Error(`Invalid entry length: ${codePoints} code points`);
  }

  const outDir = process.env.MAKEFUN_LOCAL_OUTPUT_DIR ?? "/output";
  const outFile = path.join(outDir, "entry.txt");

  mkdirSync(outDir, { recursive: true, mode: 0o755 });
  chmodSync(outDir, 0o755);
  writeFileSync(outFile, TEXT, { encoding: "utf8", mode: 0o644 });
  chmodSync(outFile, 0o644);
}

main();
