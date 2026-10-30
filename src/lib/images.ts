import type { ImageMetadata } from 'astro';

/**
 * Alle billeder i src/assets/images/ – slås op på filnavnet uden endelse,
 * fx images['service-paedagoger'] for service-paedagoger.jpg.
 * Astro optimerer billederne automatisk (WebP/AVIF i flere størrelser).
 */
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/*.{jpg,jpeg,png,webp}', {
  eager: true,
});

export const images: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [
    path
      .split('/')
      .pop()!
      .replace(/\.(jpe?g|png|webp)$/i, ''),
    mod.default,
  ]),
);
