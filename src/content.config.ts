/**
 * Artikler til "Viden"-sektionen.
 * Hver artikel er en Markdown-fil i src/content/viden/. Filnavnet bliver adressen,
 * fx tjekliste-til-vikaren.md → /viden/tjekliste-til-vikaren.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const viden = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/viden' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      /** Hvem artiklen henvender sig til */
      audience: z.enum(['institutioner', 'vikarer']),
      /** Sti til billedet, relativt til Markdown-filen */
      image: image(),
      imageAlt: z.string(),
      draft: z.boolean().optional(),
    }),
});

export const collections = { viden };
