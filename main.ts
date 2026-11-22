import { chmodSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const TEXT = [
  "The kettle clicked off a while ago, still warm under its lid.",
  "Two mismatched mugs dry beside the sink.",
  "A late bus passes once down the avenue, and the street settles back.",
  "The porch light stays on till morning.",
  "Nobody here is waiting on an answer.",
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
