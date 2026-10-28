// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/config/site.ts';

export default defineConfig({
  // SITE_URL og BASE_PATH sættes af GitHub Pages-workflowet (.github/workflows/deploy.yml).
  // På eget domæne bruges site.url fra config-filen og ingen base-sti.
  site: process.env.SITE_URL || site.url,
  base: process.env.BASE_PATH || '/',
  integrations: [
    sitemap({
      // Kvitteringssiden skal ikke i søgemaskinerne
      filter: (page) => !page.includes('/tak'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
