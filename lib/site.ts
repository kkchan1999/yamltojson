/**
 * Canonical site origin. Change this before deploying to a different domain.
 * metadataBase, canonical URLs, Open Graph, JSON-LD, robots.txt, and sitemap.xml
 * all read this value.
 */
export const SITE_URL = "https://yamltojson.xyz";

export const SITE_NAME = "YAML to JSON";

export const SITE_TITLE = "YAML to JSON – Free Online Converter";

export const SITE_DESCRIPTION =
  "Free online YAML to JSON converter. Paste YAML in your browser and get formatted JSON instantly. No sign-up, and your text is not uploaded.";

export const SITEMAP_LASTMOD = "2026-10-28";

export const SITEMAP_PATHS = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/how-to", changefreq: "monthly", priority: "0.7" },
  { path: "/about", changefreq: "monthly", priority: "0.4" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
] as const;
