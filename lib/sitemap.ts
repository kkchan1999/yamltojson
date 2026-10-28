import { SITEMAP_LASTMOD, SITEMAP_PATHS, SITE_URL } from "@/lib/site";

export function buildSitemapXml(): string {
  const urls = SITEMAP_PATHS.map(({ path, changefreq, priority }) => {
    const loc = path === "/" ? SITE_URL : new URL(path, SITE_URL).href;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${SITEMAP_LASTMOD}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
