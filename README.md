# YAML to JSON

Free online YAML to JSON converter. Paste YAML in the browser and copy formatted JSON. Conversion stays on the device. There is no account and no payment.

You can also switch the editor to JSON → YAML.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
```

## Site URL

The canonical origin is `SITE_URL` in [`lib/site.ts`](lib/site.ts). It is currently `https://yamltojson.xyz`.

That constant feeds `metadataBase`, canonical links, Open Graph and Twitter URLs, JSON-LD, `robots.txt`, and `sitemap.xml`. If production uses a different domain, change `SITE_URL` and redeploy.

## Deploy on Vercel

1. Import this repository. Framework preset: Next.js.
2. No environment variables are required.
3. Build command: `npm run build`. Output is the default Next.js build.
4. Point the domain at the deployment, and set `SITE_URL` in `lib/site.ts` if it is not `https://yamltojson.xyz`.

Pasted YAML and JSON are parsed in the browser. There is no API route that receives editor contents.

## Stack

Next.js 15 App Router, React 19, TypeScript, and the [`yaml`](https://github.com/eemeli/yaml) package.
