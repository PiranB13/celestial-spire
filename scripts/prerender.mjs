// Build-time prerendering: renders each route to static HTML so the site
// works for crawlers and paints instantly, without a headless browser.
// Runs as part of `npm run build` (see package.json).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const distServer = path.join(root, "dist-server");

const routes = [
  { url: "/", file: "index.html" },
  { url: "/guides/build-vs-hire", file: "guides/build-vs-hire/index.html" },
  { url: "/unsubscribe", file: "unsubscribe/index.html" },
  // Catch-all 404 page for hosts that serve 404.html on unknown paths
  { url: "/this-page-does-not-exist", file: "404.html" },
];

const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");
if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
  throw new Error("index.html is missing <!--app-head--> / <!--app-html--> placeholders");
}

const { render } = await import(path.join(distServer, "entry-server.js"));

for (const { url, file } of routes) {
  const { html, head } = render(url);
  const out = template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
  const target = path.join(dist, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, out);
  console.log(`prerendered ${url} -> dist/${file} (${(out.length / 1024).toFixed(1)} kB)`);
}

// The SSR bundle is only needed during this script
fs.rmSync(distServer, { recursive: true, force: true });
