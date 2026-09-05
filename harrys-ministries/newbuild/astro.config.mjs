// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Luz a las Naciones, Field Guide redesign.
// Static output only: this is a content site, not an app. No SSR adapter.
// Deployment target is Netlify (see netlify.toml) but nothing is deployed yet;
// `site` is deliberately unset until a domain exists. Absolute hreflang and
// canonical URLs in Base.astro switch on automatically once it is set.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      // English lives at the root, Spanish under /es/. Both are real static
      // pages built at compile time, so there is no client-side language
      // swap and nothing to hide before first paint.
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
