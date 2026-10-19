import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const apps = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/apps' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    accent: z.string(),
    order: z.number(),
    status: z.enum(['live', 'beta', 'soon']).default('live'),
    links: z
      .object({
        ios: z.url().optional(),
        android: z.url().optional(),
        web: z.url().optional(),
      })
      .default({}),
  }),
});

export const collections = { apps };
