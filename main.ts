import { chmodSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const TEXT = [
  "The tires slow on the gravel, then stop.",
  "The headlights go out. The cooling engine ticks once.",
  "Up front, two voices drop low to keep the quiet whole.",
  "Nobody asks if you are awake.",
  "Someone is already coming around to your side of the car.",
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
