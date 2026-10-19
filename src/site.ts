import { getCollection } from 'astro:content';

export const SITE_NAME = 'Plan To Live LLC';
export const SITE_SHORT = 'Plan To Live';
export const CONTACT_EMAIL = 'hello@plantolive.app';
export const LEGAL_UPDATED = 'October 18, 2026';

/** App names in display order, e.g. "Lantern, mealQ, Binmark, and vivo". */
export async function appNames() {
  const apps = (await getCollection('apps')).sort((a, b) => a.data.order - b.data.order);
  return new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(
    apps.map((a) => a.data.name),
  );
}
