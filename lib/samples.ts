import { convert } from "@/lib/convert";

export const SAMPLE_YAML = `service: harbor
version: "1.4.2"
enabled: true
ports:
  - 8080
  - 8443
owner:
  name: Ada Lovelace
  role: maintainer
limits:
  requests: 100
  window: 60s
`.trim();

const sampleJson = convert(SAMPLE_YAML, "yaml-to-json");

if (!sampleJson.ok) {
  throw new Error(sampleJson.error);
}

export const SAMPLE_JSON = sampleJson.output;
