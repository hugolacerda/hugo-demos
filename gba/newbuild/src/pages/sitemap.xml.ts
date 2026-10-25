// sitemap.xml (map ticket 15): one entry per canonical page on the apex domain,
// none twice (the live file lists 19 twice), with `lastmod` the date of the
// last commit that touched the page's content file. Left out: the 44
// near-duplicate copies whose canonical is their twin (src/lib/seo.ts), the
// listing's pages 2 to 52 and the 404. If the checkout is shallow (only the
// latest commit), every file would date from it, so lastmod is dropped instead.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { execFileSync } from 'node:child_process';
import { absolute, isDuplicate } from '../lib/seo';

function lastCommitDates(): Map<string, string> {
  const dates = new Map<string, string>();
  try {
    if (execFileSync('git', ['rev-parse', '--is-shallow-repository'], { encoding: 'utf8' }).trim() === 'true') return dates;
    const prefix = execFileSync('git', ['rev-parse', '--show-prefix'], { encoding: 'utf8' }).trim();
    const log = execFileSync('git', ['log', '--format=@%cs', '--name-only', '--', 'src/content'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    let day = '';
    for (const line of log.split('\n')) {
      if (line.startsWith('@')) day = line.slice(1);
      else if (line && !dates.has(line.slice(prefix.length))) dates.set(line.slice(prefix.length), day);
    }
  } catch {
    // no git: no lastmod
  }
  return dates;
}

export const GET: APIRoute = async () => {
  const dates = lastCommitDates();
  const entries = [...(await getCollection('pages')), ...(await getCollection('articles'))]
    .filter((e) => !isDuplicate(e.data.path))
    .sort((a, b) => (a.data.path === '/' ? -1 : b.data.path === '/' ? 1 : a.data.path.localeCompare(b.data.path)));
  const urls = entries.map((e) => {
    const lastmod = e.filePath ? dates.get(e.filePath) : undefined;
    return `  <url>\n    <loc>${absolute(e.data.path)}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}  </url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
