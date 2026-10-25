// Search and sharing metadata (map ticket 15). Titles, descriptions and
// canonicals come from the content files (the live head, ticket 07); this file
// holds what ticket 15 changed on top of them, so a re-run of the extractor
// keeps it.
import { SITE_URL } from '../site.config';
import duplicates from '../data/duplicates.json';

const BRAND = 'Gateway Business Advisors';

// Eight core pages carry the generic live title "Gateway Business Advisors" and
// description "Gateway Business Advisors For Deals"; each gets its own, in the
// pattern of the pages already rewritten (Hugo approved the drafts, 2026-10-25).
export const META: Record<string, { title: string; description: string }> = {
  '/news-and-events': {
    title: `News and Events | ${BRAND}`,
    description: 'Articles on selling, valuing and buying a business: exit planning, buyers, deal structure and the sale process.',
  },
  '/cpa-skilled': {
    title: `CPA Skilled in M&A Taxation | ${BRAND}`,
    description: 'Why a CPA who knows the tax side of a business sale belongs on your team, and how good advice keeps more of your proceeds.',
  },
  '/m-and-a-attorney': {
    title: `M&A Attorney | ${BRAND}`,
    description: 'Why your attorney needs M&A experience when you sell your business, and how we help you find one who gets deals done.',
  },
  '/investment-advsior': {
    title: `Investment Advisor | ${BRAND}`,
    description: 'How your investment advisor and an M&A advisor work together to turn your business, often most of your wealth, into liquidity.',
  },
  '/m-and-a-advsior': {
    title: `M&A Advisor | ${BRAND}`,
    description: 'What a seasoned M&A advisor does when you sell: a structured process, vetted buyers, negotiated offers and a focused path to close.',
  },
  '/privacy-policy': { title: `Privacy Policy | ${BRAND}`, description: `The privacy policy of ${BRAND}.` },
  '/terms-of-use': { title: `Terms of Use | ${BRAND}`, description: `The terms of use of the ${BRAND} website.` },
  '/sitemap': { title: `Sitemap | ${BRAND}`, description: `Every page of the ${BRAND} website.` },
};

/** The listing's later pages: page 1's title and description, with the page number in the title (Hugo, 2026-10-25). */
export function listingTitle(page: number): string {
  return page === 1 ? META['/news-and-events'].title : `News and Events, Page ${page} | ${BRAND}`;
}

/**
 * The canonical path of an article: itself, or for the 44 near-duplicate copies
 * the oldest copy of its group (src/data/duplicates.json, scripts/duplicates.py;
 * Hugo, 2026-10-25). Duplicates are left out of the sitemap.
 */
export function canonicalPath(path: string): string {
  return (duplicates as Record<string, { canonical: string }>)[path]?.canonical ?? path;
}

export function isDuplicate(path: string): boolean {
  return canonicalPath(path) !== path;
}

/** The sharing image for pages without a banner (Home, 404): the homepage's first hero slide, also the JSON-LD image. */
export const DEFAULT_IMAGE = '/upload/slideshow/1725883419slide-1.jpg';

/** Absolute URL on the apex domain (map Notes: the apex stays primary, ticket 05). */
export function absolute(path: string): string {
  return SITE_URL + encodeURI(path);
}

/** Descriptions from the live heads carry raw line breaks (620 articles); one space each. */
export function clean(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}
