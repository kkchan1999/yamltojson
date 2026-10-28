import { parseAllDocuments, stringify } from "yaml";

export type Direction = "yaml-to-json" | "json-to-yaml";

export type ConvertResult =
  | { ok: true; output: string }
  | { ok: false; error: string };

const PARSE_OPTIONS = {
  prettyErrors: true,
  logLevel: "silent" as const,
  merge: true,
  intAsBigInt: true,
};

const MAX_ALIAS_COUNT = 1000;

export function convert(source: string, direction: Direction): ConvertResult {
  if (source.trim() === "") {
    return { ok: true, output: "" };
  }

  try {
    const output =
      direction === "yaml-to-json" ? yamlToJson(source) : jsonToYaml(source);
    return { ok: true, output };
  } catch (error) {
    const fallback =
      direction === "yaml-to-json"
        ? "This YAML could not be parsed."
        : "This JSON could not be parsed.";
    return { ok: false, error: messageFrom(error, fallback) };
  }
}

function yamlToJson(source: string): string {
  const docs = parseAllDocuments(stripBom(source), PARSE_OPTIONS);
  if (docs.length === 0) {
    return "";
  }

  for (const doc of docs) {
    if (doc.errors.length > 0) {
      throw doc.errors[0];
    }
  }

  const values = docs.map((doc) =>
    normalize(doc.toJS({ maxAliasCount: MAX_ALIAS_COUNT })),
  );
  const payload = values.length === 1 ? values[0] : values;
  const json = JSON.stringify(payload, null, 2);
  return typeof json === "string" ? json : "";
}

function jsonToYaml(source: string): string {
  const value: unknown = JSON.parse(stripBom(source));
  return stringify(value).replace(/\n$/, "");
}

function stripBom(value: string): string {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value;
}

function normalize(value: unknown, stack: Set<object> = new Set()): unknown {
  if (typeof value === "bigint") {
    const max = BigInt(Number.MAX_SAFE_INTEGER);
    const min = BigInt(Number.MIN_SAFE_INTEGER);
    if (value > max || value < min) {
      const digits = value.toString();
      const shown =
        digits.length > 40 ? `${digits.slice(0, 20)}...${digits.slice(-8)}` : digits;
      throw new TypeError(
        `This YAML contains an integer JSON cannot store exactly (${shown}). Quote it if you need to keep every digit as a string.`,
      );
    }
    return Number(value);
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new TypeError(
        "This YAML contains NaN or Infinity, which JSON cannot represent.",
      );
    }
    return value;
  }

  if (value === null || typeof value !== "object") {
    return value;
  }

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw new TypeError(
        "This YAML contains an invalid date, which JSON cannot represent.",
      );
    }
    return value.toISOString();
  }

  if (value instanceof Uint8Array) {
    throw new TypeError(
      "This YAML contains binary data, which JSON cannot represent.",
    );
  }

  if (stack.has(value)) {
    throw new TypeError(
      "This YAML contains a circular alias, which JSON cannot represent.",
    );
  }

  stack.add(value);

  if (Array.isArray(value)) {
    const next = value.map((item) => normalize(item, stack));
    stack.delete(value);
    return next;
  }

  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    stack.delete(value);
    throw new TypeError("This YAML contains a value JSON cannot represent.");
  }

  const output: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) {
    output[key] = normalize(entry, stack);
  }
  stack.delete(value);
  return output;
}

function messageFrom(error: unknown, fallback: string): string {
  if (error instanceof ReferenceError && /alias count/i.test(error.message)) {
    return "This YAML uses too many aliases to convert safely.";
  }
  if (!(error instanceof Error) || error.message.trim() === "") {
    return fallback;
  }
  const line = error.message.split("\n")[0]?.trim().replace(/:$/, "") ?? "";
  return line || fallback;
}
