import assert from "node:assert/strict";
import { test } from "node:test";
import { convert } from "./convert.ts";

test("tab indent YAML reports line 3 column 1", () => {
  const source = `service: harbor
version: "1.4.2"
	enabled: true
`;
  const result = convert(source, "yaml-to-json");
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.line, 3);
  assert.equal(result.column, 1);
  assert.match(result.error, /line 3, column 1/i);
});

test("valid YAML has no error location", () => {
  const result = convert("name: ada\n", "yaml-to-json");
  assert.equal(result.ok, true);
});

test("JSON syntax errors include line and column when V8 reports them", () => {
  const result = convert("{\nfoo}", "json-to-yaml");
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.line, 2);
  assert.equal(result.column, 1);
});

test("JSON errors without a location do not invent one", () => {
  const result = convert('{"a":', "json-to-yaml");
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.line, undefined);
  assert.equal(result.column, undefined);
});
