// Small string tools for the verbatim HTML in src/content. The files come from
// scripts/extract.py (BeautifulSoup output: every <div> has a matching </div>),
// so balanced-tag scanning is enough and no DOM library is needed.

export interface Block {
  before: string;
  block: string;
  after: string;
  openTag: string;
}

/**
 * Find the first element whose opening tag matches `open` and return it with
 * its balanced closing tag, plus what precedes and follows it. Returns null
 * when no opening tag matches. Only elements with the same tag name are
 * counted while balancing, so nested elements of other kinds do not matter.
 */
export function extractBlock(html: string, open: RegExp): Block | null {
  const m = open.exec(html);
  if (!m) return null;
  const tag = /^<([a-zA-Z0-9]+)/.exec(m[0])?.[1];
  if (!tag) return null;
  const scanner = new RegExp(`<${tag}\\b[^>]*>|</${tag}>`, 'g');
  scanner.lastIndex = m.index;
  let depth = 0;
  let t: RegExpExecArray | null;
  while ((t = scanner.exec(html))) {
    if (t[0].startsWith('</')) {
      depth -= 1;
      if (depth === 0) {
        const end = t.index + t[0].length;
        return { before: html.slice(0, m.index), block: html.slice(m.index, end), after: html.slice(end), openTag: m[0] };
      }
    } else {
      depth += 1;
    }
  }
  return null;
}

/** The value of `class="..."` on an opening tag, or null. */
export function classOf(openTag: string): string | null {
  return /\sclass="([^"]*)"/.exec(openTag)?.[1] ?? null;
}

/**
 * Change the heading level of every `<from>` element inside the first element
 * matching `within`, in document order: the n-th heading gets `to[n]`, and the
 * last entry of `to` serves every heading beyond its length. Attributes are
 * kept. Used to apply the map's heading rule (the visible banner or hero text
 * is the H1 and heading order is correct) without touching the content files.
 */
export function retagHeadings(html: string, within: RegExp, from: string, to: string[]): string {
  const found = extractBlock(html, within);
  if (!found) return html;
  let n = 0;
  const re = new RegExp(`<${from}(\\s[^>]*)?>([\\s\\S]*?)</${from}>`, 'g');
  const block = found.block.replace(re, (_all, attrs = '', inner) => {
    const tag = to[Math.min(n, to.length - 1)];
    n += 1;
    return `<${tag}${attrs}>${inner}</${tag}>`;
  });
  return found.before + block + found.after;
}
