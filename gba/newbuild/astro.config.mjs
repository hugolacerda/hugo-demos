// @ts-check
import { defineConfig } from 'astro/config';

// gatewaybusinessadvisors.com, rebuilt as a static Astro site (map ticket 08).
// Static output only, deployed on Netlify from gba/newbuild (netlify.toml).
// The live site serves every page at a bare slug with no trailing slash
// (/start-here, /news-and-events/12), so pages build as files
// (dist/start-here.html) and URLs never gain a slash.
export default defineConfig({
  site: 'https://gatewaybusinessadvisors.com',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
