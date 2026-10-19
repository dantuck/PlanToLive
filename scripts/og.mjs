import sharp from 'sharp';

const apps = [
  ['L', '#d98e04'],
  ['M', '#2f8f5b'],
  ['B', '#3b6fd4'],
];

const icons = apps
  .map(
    ([c, fill], i) => `
  <rect x="${80 + i * 130}" y="440" width="104" height="104" rx="28" fill="${fill}"/>
  <text x="${132 + i * 130}" y="512" text-anchor="middle" font-family="Georgia,serif" font-size="56" fill="#fff">${c}</text>`,
  )
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#fbf7f0"/>
  <text x="80" y="120" font-family="Helvetica,Arial,sans-serif" font-size="26" letter-spacing="4" fill="#6b645a">PLAN TO LIVE LLC</text>
  <text x="80" y="260" font-family="Georgia,serif" font-size="96" font-weight="600" fill="#1d1a16">Small apps for a</text>
  <text x="80" y="370" font-family="Georgia,serif" font-size="96" font-weight="600" fill="#1d1a16">well-planned life.</text>
  ${icons}
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('wrote public/og.png');
