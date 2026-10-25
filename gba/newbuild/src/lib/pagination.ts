// The News and Events pagination bar, reproducing the markup CodeIgniter's
// pagination library writes live (harvest/2026-10-24, all 54 listing pages):
// two numbered links either side of the current page; "‹ First" once page 1
// drops out of that window; Prev and Next; "Last ›" while the last page is not
// in the window; non-breaking spaces around Prev and Next. Page n lives at
// /news-and-events/<(n-1)*12>, page 1 at /news-and-events. No whitespace
// between the items, as live.
// tests/pagination.test.ts checks this against the 54 harvested bars.

export const PER_PAGE = 12;
const NUM_LINKS = 2;

export function pageHref(page: number): string {
  return page === 1 ? '/news-and-events' : `/news-and-events/${(page - 1) * PER_PAGE}`;
}

export function paginationHtml(current: number, total: number): string {
  const link = (page: number, inner: string, rel?: string) =>
    `<a data-ci-pagination-page="${page}" href="${pageHref(page)}"${rel ? ` rel="${rel}"` : ''}>${inner}</a>`;
  const items: string[] = [];
  const start = Math.max(1, current - NUM_LINKS);
  const end = Math.min(total, current + NUM_LINKS);
  if (start > 1) {
    items.push(`<li class="pag_first" style="padding-right: 5px !important;">${link(1, '&lsaquo; First', 'start')}</li>`);
  }
  if (current > 1) {
    items.push(`<li>${link(current - 1, '<i class="fa-solid fa-arrow-left"></i><small style="color:#B48737">&nbsp;Prev&nbsp;</small>', 'prev')}</li>`);
  }
  for (let page = start; page <= end; page++) {
    items.push(page === current ? `<li><a class="active">${page}</a></li>` : `<li>${link(page, String(page), page === 1 ? 'start' : undefined)}</li>`);
  }
  if (current < total) {
    items.push(`<li>${link(current + 1, '<small style="color:#B48737">&nbsp;Next&nbsp;</small><i class="fa-solid fa-arrow-right"></i>', 'next')}</li>`);
  }
  if (end < total) {
    items.push(`<li style="padding-left: 5px !important;">${link(total, 'Last &rsaquo;')}</li>`);
  }
  return `<ul class="pagination">${items.join('')}</ul>`;
}
