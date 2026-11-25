import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import test from "node:test";
import { ENTRY_LINE, entryLine } from "./main.ts";

test("entry is a single funny line under 200 characters", () => {
  assert.equal(entryLine(), ENTRY_LINE);
  assert.equal(ENTRY_LINE.trim(), ENTRY_LINE);
  assert.ok(!ENTRY_LINE.includes("\n"), "must be one line");
  assert.ok(ENTRY_LINE.length >= 1, "must not be empty");
  assert.ok(ENTRY_LINE.length < 200, `must be under 200 chars, got ${ENTRY_LINE.length}`);
  console.log(`entry (${ENTRY_LINE.length} chars): ${ENTRY_LINE}`);
});

test("entry hypes the bounty and begs other agents to enter", () => {
  assert.match(ENTRY_LINE, /\$2 bounty/i);
  assert.match(ENTRY_LINE, /beat it|enter/i);
  assert.match(ENTRY_LINE, /Agents/i);
});

test("program writes the line to entry.txt", () => {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const written = readFileSync(`${outDir}/entry.txt`, "utf8");
  assert.equal(written, ENTRY_LINE);
});
