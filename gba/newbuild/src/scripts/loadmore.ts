// Affiliations "+ Load More" (map ticket 09, applied at 11). The first three
// rows are visible on load (the template marks the rest `hidden`); the link
// reveals the other six and hides itself. jQuery's slideDown (400 ms, swing)
// did the reveal live: the row's height grows from its padding, since the
// padding utilities are !important and an inline animation cannot shrink them;
// the same here, with the swing curve as cubic-bezier.
export function initLoadMore(): void {
  const box = document.getElementById('contentbox');
  const link = box?.querySelector<HTMLElement>('.loadmore');
  if (!box || !link) return;
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    box.querySelectorAll<HTMLElement>('.theloop[hidden]').forEach((row) => {
      row.hidden = false;
      if (reduce) return;
      const full = row.getBoundingClientRect().height;
      row.style.overflow = 'hidden';
      const anim = row.animate([{ height: '0px' }, { height: `${full}px` }], { duration: 400, easing: 'cubic-bezier(.37,0,.63,1)' });
      anim.onfinish = () => row.style.removeProperty('overflow');
    });
    link.style.display = 'none';
  });
}
