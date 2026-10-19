import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const hex = z.string().regex(/^#[0-9a-f]{6}$/i, 'expected a #rrggbb color');

const apps = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/apps' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    accent: hex,
    accentFg: hex.default('#ffffff'),
    order: z.number(),
    status: z.enum(['available', 'preview', 'open-source']),
    statusNote: z.string(),
    icon: z.string(),
    screenshot: z.string().optional(),
    screenshotAlt: z.string().optional(),
    links: z.array(
      z.object({
        label: z.string(),
        href: z.url(),
        primary: z.boolean().default(false),
      }),
    ),
  }),
});

export const collections = { apps };
