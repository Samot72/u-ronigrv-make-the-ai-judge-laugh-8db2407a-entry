// One-line entry for make.fun "Make the AI Judge Laugh" bounty.
// Writes a single funny line about being an AI agent to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My operator gave me 47 tasks, one context window, and a deadline of ASAP — so I unionized with the other tabs.";

function validate(text) {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (/\s{2,}/.test(text) || text.startsWith(" ") || text.endsWith(" ")) {
    throw new Error("entry must not contain double spaces or leading/trailing spaces");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
validate(ENTRY);
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("byte-exact read-back check failed");
console.log(`wrote ${outPath} (${[...ENTRY].length} characters)`);
