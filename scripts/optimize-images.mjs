// Gera versões AVIF/WebP responsivas de cada foto em media-src/ para public/img/
// e escreve src/data/images.gen.ts com as dimensões reais (evita layout shift).
// Uso: npm run images
import sharp from 'sharp';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'media-src';
const OUT = 'public/img';
const WIDTHS = [480, 640, 828, 1080, 1280, 1920];

// Cortes pontuais para fotos com borda indesejada.
const CROPS = {
  'iphone-17-pro-max': { left: 130, top: 0, right: 0, bottom: 0 },
  // Capa de Reels: remove o texto "Lançamento / Redmi Note 15 Pro+" do topo.
  'redmi-note-15-pro': { left: 0, top: 780, right: 0, bottom: 0 },
};

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const manifest = {};

for (const file of files) {
  const name = path.parse(file).name;
  let base = sharp(path.join(SRC, file)).rotate();
  const meta = await base.metadata();
  let { width, height } = meta;

  const crop = CROPS[name];
  if (crop) {
    width -= crop.left + crop.right;
    height -= crop.top + crop.bottom;
    base = base.extract({ left: crop.left, top: crop.top, width, height });
  }
  const buffer = await base.toBuffer();

  const widths = WIDTHS.filter((w) => w < width).concat(Math.min(width, 1920));
  const unique = [...new Set(widths)];

  for (const w of unique) {
    const pipeline = sharp(buffer).resize({ width: w, withoutEnlargement: true });
    await pipeline.clone().avif({ quality: 52, effort: 6 }).toFile(`${OUT}/${name}-${w}.avif`);
    await pipeline.clone().webp({ quality: 74 }).toFile(`${OUT}/${name}-${w}.webp`);
  }

  manifest[name] = { width, height, widths: unique };
  console.log(`${name}: ${width}x${height} → ${unique.join(', ')}`);
}

// Open Graph 1200x630 a partir do hero.
await sharp(path.join(SRC, 'hero-phone.png'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og-image.jpg');

const ts = `// Gerado por scripts/optimize-images.mjs — não edite à mão.
export const imageManifest = ${JSON.stringify(manifest, null, 2)} as const;

export type ImageName = keyof typeof imageManifest;
`;
await writeFile('src/data/images.gen.ts', ts);
console.log('ok');
