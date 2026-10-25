// Checks src/lib/pagination.ts against the 54 pagination bars the live listing
// served on 2026-10-24 (harvest/2026-10-24, git-ignored; ticket 11).
// Run: node --experimental-strip-types tests/pagination.test.ts
import { readFileSync } from 'node:fs';
import { paginationHtml } from '../src/lib/pagination.ts';

const LIVE_PAGES = 54;

// Attribute order, entity spelling and stray class spaces are not visible: compare without them.
function canon(html: string): string {
  return html
    .replaceAll('&lsaquo;', '‹').replaceAll('&rsaquo;', '›').replaceAll('&nbsp;', '\u00a0')
    .replace(/<([a-z]+)((?:\s+[a-z-]+="[^"]*")*)\s*>/g, (_all, tag: string, attrs: string) => {
      const list = [...attrs.matchAll(/([a-z-]+)="([^"]*)"/g)].map(([, k, v]) => `${k}="${k === 'class' ? v.trim().split(/\s+/).join(' ') : v}"`);
      return `<${tag}${list.sort().map((a) => ' ' + a).join('')}>`;
    });
}
let failed = 0;
for (let page = 1; page <= LIVE_PAGES; page++) {
  const file = page === 1 ? 'news-and-events' : `news-and-events__${(page - 1) * 12}`;
  const html = readFileSync(new URL(`../harvest/2026-10-24/pages/${file}.html`, import.meta.url), 'utf8');
  const live = /<ul class="pagination">[\s\S]*?<\/ul>/.exec(html)?.[0].replaceAll('https://gatewaybusinessadvisors.com', '');
  const ours = paginationHtml(page, LIVE_PAGES);
  if (!live || canon(live) !== canon(ours)) {
    failed += 1;
    console.log(`page ${page} differs\n  live: ${live}\n  ours: ${ours}`);
  }
}
console.log(failed ? `${failed} of ${LIVE_PAGES} differ` : `all ${LIVE_PAGES} bars match`);
process.exit(failed ? 1 : 0);
