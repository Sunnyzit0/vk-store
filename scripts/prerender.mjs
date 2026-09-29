// Pré-renderiza o app em dist/index.html: HTML pronto no primeiro byte (LCP rápido, SEO)
// e injeta title, meta, Open Graph, schema.org e preload do hero a partir do content.ts.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ssr = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);

async function replaceAsync(str, regex, fn) {
  const match = str.match(regex);
  if (!match) return str;
  return str.replace(match[0], await fn(...match));
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const { meta } = ssr;
const ogImage = new URL('/og-image.jpg', meta.url).href;

const heroWidths = ssr.heroWidths;
const heroSrcset = heroWidths.map((w) => `/img/hero-phone-${w}.avif ${w}w`).join(', ');

const head = [
  `<meta name="description" content="${esc(meta.description)}" />`,
  `<link rel="canonical" href="${esc(meta.url)}" />`,
  `<meta property="og:type" content="website" />`,
  `<meta property="og:locale" content="${esc(meta.locale)}" />`,
  `<meta property="og:site_name" content="VK Store" />`,
  `<meta property="og:title" content="${esc(meta.title)}" />`,
  `<meta property="og:description" content="${esc(meta.description)}" />`,
  `<meta property="og:url" content="${esc(meta.url)}" />`,
  `<meta property="og:image" content="${esc(ogImage)}" />`,
  `<meta property="og:image:width" content="1200" />`,
  `<meta property="og:image:height" content="630" />`,
  `<meta name="twitter:card" content="summary_large_image" />`,
  `<meta name="geo.region" content="BR-GO" />`,
  `<meta name="geo.placename" content="Padre Bernardo" />`,
  `<link rel="preload" as="image" type="image/avif" imagesrcset="${heroSrcset}" imagesizes="(max-width: 640px) 210vw, (max-width: 768px) 150vw, 100vw" fetchpriority="high" />`,
  `<script type="application/ld+json">${JSON.stringify(ssr.structuredData())}</script>`,
].join('\n    ');

const file = 'dist/index.html';
let html = await readFile(file, 'utf8');
html = html
  .replace(/<title>.*?<\/title>/, `<title>${esc(meta.title)}</title>`)
  .replace('<!--app-head-->', head)
  .replace('<!--app-html-->', ssr.render());

// CSS embutido: elimina a requisição bloqueante (~9 KB gzip) e antecipa o primeiro paint.
html = await replaceAsync(html, /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, async (_, href) => {
  const css = await readFile(path.join('dist', href), 'utf8');
  return `<style>${css}</style>`;
});
await writeFile(file, html);
await rm('dist-ssr', { recursive: true, force: true });
console.log('prerender ok');
