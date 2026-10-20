import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { parse } from 'yaml';

const SIZE = 104;
const GAP = 26;

// App icons come from the content collection so a new app shows up here automatically.
const apps = readdirSync('src/content/apps')
  .filter((f) => f.endsWith('.yaml'))
  .map((f) => parse(readFileSync(`src/content/apps/${f}`, 'utf8')))
  .sort((a, b) => a.order - b.order);

// Gradient and surface colors mirror the theme in src/styles/global.css (--brand-gradient).
const base = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#ff7a1a"/>
      <stop offset="0.45" stop-color="#ffb02e"/>
      <stop offset="1" stop-color="#22c55e"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#252c36"/>
  <text x="80" y="120" font-family="Helvetica,Arial,sans-serif" font-size="24" font-weight="600" letter-spacing="3" fill="#a3adbb">PLAN TO LIVE LLC</text>
  <text x="80" y="250" font-family="Helvetica,Arial,sans-serif" font-size="92" font-weight="800" letter-spacing="-3" fill="#f1f3f5">Small apps for a</text>
  <text x="80" y="355" font-family="Helvetica,Arial,sans-serif" font-size="92" font-weight="800" letter-spacing="-3" fill="url(#g)">well-planned life.</text>
</svg>`;

const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}"><rect width="${SIZE}" height="${SIZE}" rx="26"/></svg>`,
);

const tiles = await Promise.all(
  apps.map(async (app, i) => ({
    input: await sharp(resolve('src/content/apps', app.icon), { density: 150 })
      .resize(SIZE, SIZE, { fit: 'cover' })
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer(),
    left: 80 + i * (SIZE + GAP),
    top: 450,
  })),
);

await Promise.all([
  sharp(Buffer.from(base)).composite(tiles).png({ palette: true, compressionLevel: 9 }).toFile('public/og.png'),
  sharp('public/favicon.svg', { density: 600 }).resize(180, 180).png().toFile('public/apple-touch-icon.png'),
]);
console.log(`wrote public/og.png (${apps.length} apps) and public/apple-touch-icon.png`);
