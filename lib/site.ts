/**
 * Canonical site origin. Change this before deploying to a different domain.
 * metadataBase, canonical URLs, Open Graph, JSON-LD, robots.txt, and sitemap.xml
 * all read this value.
 */
export const SITE_URL = "https://yaml-to-json.com";

export const SITE_NAME = "YAML to JSON";

export const SITE_TITLE =
  "Online YAML to JSON Converter – Free (Browser-Only)";

export const SITE_DESCRIPTION =
  "Convert YAML to JSON online in your browser. Paste YAML, get formatted JSON instantly—or switch to JSON to YAML. Free YAML converter / formatter style output, no sign-up, nothing uploaded.";

export const SITEMAP_LASTMOD = "2026-10-28";

export const SITEMAP_PATHS = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/how-to", changefreq: "monthly", priority: "0.7" },
  { path: "/about", changefreq: "monthly", priority: "0.4" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
] as const;
