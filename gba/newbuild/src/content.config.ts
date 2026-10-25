import { defineCollection, z } from 'astro:content';
import { htmlLoader } from './loaders/html-content';

// Front matter fields as scripts/extract.py writes them (src/content/README.md).
const common = {
  slug: z.string(),
  path: z.string(),
  title: z.string(),
  banner: z.string().nullable(),
  banner_alt: z.string().nullable(),
  meta_title: z.string(),
  meta_description: z.string(),
  canonical: z.string(),
  source: z.string(),
};

const pages = defineCollection({
  loader: htmlLoader({ dir: 'src/content/pages', stripChrome: true }),
  schema: z.object({
    ...common,
    kind: z.literal('page'),
    sections: z.array(z.string()),
    // class list of the shared contact block the page carries live, or null when it has none
    contact_class: z.string().nullable(),
  }),
});

const articles = defineCollection({
  loader: htmlLoader({ dir: 'src/content/articles' }),
  schema: z.object({
    ...common,
    kind: z.literal('article'),
    author: z.string(),
    excerpt: z.string(),
    section_label: z.string(),
    related_links: z.array(z.object({ text: z.string(), href: z.string() })),
    contact_class: z.string().nullable(),
  }),
});

export const collections = { pages, articles };
