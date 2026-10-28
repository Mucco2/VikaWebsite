// Genererer public/og-image.png (delingsbillede til Facebook, LinkedIn m.fl.) ud fra navnet i src/config/site.ts.
// Kør: npm run og
import sharp from 'sharp';
import { site } from '../src/config/site.ts';

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fafaf8"/>
  <circle cx="1080" cy="80" r="260" fill="#e3eee9"/>
  <circle cx="1130" cy="560" r="160" fill="#f2f7f5"/>
  <rect x="80" y="80" width="64" height="64" rx="16" fill="#2f6b5e"/>
  <path d="M98 101 112 125l14-24" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="80" y="300" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="72" font-weight="700" fill="#1c2321">${escape(site.name)}</text>
  <text x="80" y="380" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="38" fill="#5b6360">Pædagogiske vikarer, I kan stole på</text>
  <text x="80" y="540" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="28" font-weight="600" fill="#2f6b5e">Daginstitutioner · Skoler · Specialskoler · Bosteder · Kommuner</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
console.log('public/og-image.png genereret');
