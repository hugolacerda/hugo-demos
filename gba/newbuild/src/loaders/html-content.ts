// Content loader for src/content: `.html` files with YAML front matter, as
// scripts/extract.py writes them (see src/content/README.md). Astro's glob()
// loader does not read .html, so this one does: list the folder, split each
// file on the second `---` line, parse the YAML, keep the HTML as the entry's
// body.
//
// Page files still carry two pieces of template chrome in their body, left in
// place by the extractor for this ticket to factor out: the headbanner block at
// the top (the banner image and the visible banner text, which the front
// matter already holds as `banner` and `title`) and the shared contact block
// at the bottom. Both are removed here; the contact block's class list (it
// varies: "contact", "contact sec-pad", "contact sec-pad mt-0") is kept as
// `contact_class` so the ContactBlock component renders it as live.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load as loadYaml } from 'js-yaml';
import type { Loader } from 'astro/loaders';
import { extractBlock, classOf } from '../lib/html';

export interface HtmlLoaderOptions {
  /** Folder relative to the project root, e.g. "src/content/pages". */
  dir: string;
  /** Pages carry the headbanner and contact chrome; articles do not. */
  stripChrome?: boolean;
}

function splitFrontMatter(raw: string): { data: Record<string, unknown>; body: string } {
  if (!raw.startsWith('---\n')) throw new Error('file does not start with front matter');
  const end = raw.indexOf('\n---\n', 4);
  if (end < 0) throw new Error('front matter is not closed');
  const data = (loadYaml(raw.slice(4, end)) ?? {}) as Record<string, unknown>;
  return { data, body: raw.slice(end + 5) };
}

function stripPageChrome(body: string): { body: string; contact_class: string | null } {
  let out = body;
  // The headbanner wrapper: <div class=""><div class="headbanner">...</div><div class="bodyheader"></div></div>
  const wrapper = extractBlock(out, /<div class="">/);
  if (wrapper && wrapper.before.trim() === '' && wrapper.block.includes('<div class="headbanner">')) {
    out = wrapper.after;
  }
  // The shared contact block, last in the body on the pages that carry it.
  let contact_class: string | null = null;
  const contact = extractBlock(out, /<div class="contact( [^"]*)?">/);
  if (contact && contact.after.trim() === '') {
    contact_class = classOf(contact.openTag);
    out = contact.before;
  }
  return { body: out.trim(), contact_class };
}

export function htmlLoader(options: HtmlLoaderOptions): Loader {
  return {
    name: 'gba-html-content',
    load: async ({ store, parseData, generateDigest, logger, config, watcher }) => {
      const root = fileURLToPath(config.root);
      const dir = join(root, options.dir);

      const sync = async () => {
        const names = (await readdir(dir)).filter((n) => n.endsWith('.html')).sort();
        const seen = new Set<string>();
        for (const name of names) {
          const file = join(dir, name);
          const raw = await readFile(file, 'utf8');
          const { data: front, body: rawBody } = splitFrontMatter(raw);
          const id = String(front.slug ?? name.replace(/\.html$/, ''));
          let body = rawBody;
          let contact_class: string | null = null;
          if (options.stripChrome) ({ body, contact_class } = stripPageChrome(rawBody));
          const filePath = relative(root, file);
          const data = await parseData({ id, data: { ...front, contact_class }, filePath });
          const digest = generateDigest(raw);
          store.set({ id, data, body, filePath, digest });
          seen.add(id);
        }
        for (const id of store.keys()) if (!seen.has(id)) store.delete(id);
        logger.info(`${options.dir}: ${names.length} entries`);
      };

      await sync();
      if (watcher) {
        watcher.add(dir);
        const onChange = (path: string) => {
          if (path.startsWith(dir) && path.endsWith('.html')) sync().catch((e) => logger.error(String(e)));
        };
        watcher.on('change', onChange);
        watcher.on('add', onChange);
        watcher.on('unlink', onChange);
      }
      // keep an eye on the folder's mtime in case readdir misses a rename on some filesystems
      await stat(dir);
    },
  };
}
