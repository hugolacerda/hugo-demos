// Copies the vendored third-party files from node_modules into public/vendor/.
// Runs before `astro dev` and `astro build` (see package.json). public/vendor/
// is generated and git-ignored; the versions are pinned in package.json.
//
// Why copy instead of importing through Astro: the live site loads Bootstrap
// before custom.css, and custom.css overrides Bootstrap in hundreds of places.
// Plain <link> tags in Base.astro keep that cascade order exact; Astro-bundled
// CSS would be injected at a position of its own choosing.
import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nm = join(root, 'node_modules');
const out = join(root, 'public', 'vendor');

const copies = [
  // Bootstrap 5.0.2, the version the live site loads from jsdelivr (BRIEF.md, "Head, every page").
  ['bootstrap/dist/css/bootstrap.min.css', 'bootstrap-5.0.2/css/bootstrap.min.css'],
  ['bootstrap/dist/js/bootstrap.bundle.min.js', 'bootstrap-5.0.2/js/bootstrap.bundle.min.js'],
  // Font Awesome 6.5.2, the version the live site loads from cdnjs: the social icons and carousel arrows.
  ['@fortawesome/fontawesome-free/css/all.min.css', 'fontawesome-6.5.2/css/all.min.css'],
  ['@fortawesome/fontawesome-free/webfonts', 'fontawesome-6.5.2/webfonts'],
  // Free look-alike faces (map ticket 02): Cinzel for Trajan Pro, Metropolis for Gotham.
  // Used only when src/site.config.ts selects the look-alike set; public/fonts/lookalike.css maps them.
  ['@fontsource-variable/cinzel/files/cinzel-latin-wght-normal.woff2', 'fonts/cinzel-latin-wght-normal.woff2'],
  ['@fontsource-variable/cinzel/files/cinzel-latin-ext-wght-normal.woff2', 'fonts/cinzel-latin-ext-wght-normal.woff2'],
  ...['400', '500', '700'].flatMap((w) => ['normal', 'italic'].map((s) => [
    `@fontsource/metropolis/files/metropolis-latin-${w}-${s}.woff2`,
    `fonts/metropolis-latin-${w}-${s}.woff2`,
  ])),
];

for (const [from, to] of copies) {
  const src = join(nm, from);
  const dest = join(out, to);
  if (!existsSync(src)) {
    console.error(`vendor: missing ${from}; run npm install`);
    process.exit(1);
  }
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true });
}
console.log(`vendor: ${copies.length} entries copied to public/vendor/`);
