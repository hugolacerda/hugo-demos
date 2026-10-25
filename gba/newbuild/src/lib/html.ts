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

/**
 * Rewrite the first `.owl-carousel` element matching `open` into the DOM Owl
 * Carousel 2.3.4 renders live (stage, items, arrows, the dots row), so
 * custom.css styles it unchanged and src/scripts/carousel.ts (Embla) drives it.
 * The element's direct `.item` children become the slides, in order.
 */
export function owlCarousel(html: string, open: RegExp): string {
  const found = extractBlock(html, open);
  if (!found) return html;
  let rest = found.block.slice(found.openTag.length, -'</div>'.length);
  const items: string[] = [];
  let item: Block | null;
  while ((item = extractBlock(rest, /<div class="item">/))) {
    items.push(item.block);
    rest = item.after;
  }
  return found.before + owlMarkup(found.openTag, items) + found.after;
}

/** Owl's rendered carousel DOM around `items`, under the given opening tag. */
export function owlMarkup(openTag: string, items: string[]): string {
  const tag = openTag.replace(/\sclass="owl-carousel"/, ' class="owl-carousel owl-loaded owl-drag" data-carousel');
  const arrow = (dir: 'prev' | 'next', icon: string, label: string) =>
    `<button type="button" class="owl-${dir}" aria-label="${label}"><i class="fa-solid ${icon}" aria-hidden="true"></i></button>`;
  return tag
    + '<div class="owl-stage-outer"><div class="owl-stage">'
    + items.map((i) => `<div class="owl-item">${i}</div>`).join('')
    + '</div></div>'
    + `<div class="owl-nav">${arrow('prev', 'fa-angles-left', 'Previous')}${arrow('next', 'fa-angles-right', 'Next')}</div>`
    + '<div class="owl-dots" aria-hidden="true"></div>'
    + '</div>';
}

/** Escape text for use in HTML element content or a double-quoted attribute. */
export function escapeHtml(text: string): string {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
