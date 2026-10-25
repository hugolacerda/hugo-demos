// The homepage hero (map ticket 09: plain JS and a CSS crossfade in place of
// FlexSlider 2.7.2). The slides stay the live `.flexslider > .slides > li`
// markup and this script adds the same paging dots and arrows FlexSlider
// rendered, so flexslider.css and custom.css style everything unchanged; the
// fade itself is a CSS opacity transition in port.css.
//
// Live behaviour kept (ticket 03, home.html inline FlexSlider config): 1.5 s
// crossfade, a new slide every 7 s from window load, no pause on hover, the
// first slide shown without a fade, dots and arrows, swipe on touch screens,
// and the left and right arrow keys. Changed on purpose: a click on a dot or an
// arrow restarts the 7 s count (FlexSlider let the old timer run on, so the
// next slide could arrive a moment after a click), and the hidden slides are
// inert so their buttons cannot be reached by Tab.
const INTERVAL = 7000;
const SWIPE = 50;

export function initHero(root: HTMLElement): void {
  const slides = Array.from(root.querySelectorAll<HTMLLIElement>(':scope > .slides > li'));
  if (slides.length < 2) return;

  let current = Math.max(0, slides.findIndex((li) => li.classList.contains('flex-active-slide')));
  let timer: number | undefined;

  const link = (text: string, className?: string): HTMLAnchorElement => {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = text;
    a.setAttribute('role', 'button');
    if (className) a.className = className;
    return a;
  };

  const paging = document.createElement('ol');
  paging.className = 'flex-control-nav flex-control-paging';
  const dots = slides.map((_, i) => {
    const a = link(String(i + 1));
    a.setAttribute('aria-label', `Show slide ${i + 1}`);
    a.addEventListener('click', (e) => { e.preventDefault(); go(i); });
    const li = document.createElement('li');
    li.append(a);
    paging.append(li);
    return a;
  });

  const arrows = document.createElement('ul');
  arrows.className = 'flex-direction-nav';
  for (const [dir, label] of [['prev', 'Previous'], ['next', 'Next']] as const) {
    const a = link(label, `flex-${dir}`);
    a.addEventListener('click', (e) => { e.preventDefault(); go(current + (dir === 'next' ? 1 : -1)); });
    const li = document.createElement('li');
    li.className = `flex-nav-${dir}`;
    li.append(a);
    arrows.append(li);
  }
  root.append(paging, arrows);

  function show(i: number): void {
    current = (i + slides.length) % slides.length;
    slides.forEach((li, k) => {
      li.classList.toggle('flex-active-slide', k === current);
      li.inert = k !== current;
    });
    dots.forEach((a, k) => a.classList.toggle('flex-active', k === current));
  }

  function start(): void {
    window.clearInterval(timer);
    timer = window.setInterval(() => show(current + 1), INTERVAL);
  }

  function go(i: number): void {
    show(i);
    start();
  }

  // Swipe: touch only, as FlexSlider; `touch-action: pan-y` (port.css) keeps
  // vertical scrolling native and hands horizontal gestures to this handler.
  let startX: number | null = null;
  root.addEventListener('pointerdown', (e) => { startX = e.pointerType === 'touch' ? e.clientX : null; });
  root.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) >= SWIPE) go(current + (dx < 0 ? 1 : -1));
  });
  root.addEventListener('pointercancel', () => { startX = null; });

  // Arrow keys anywhere on the page, as FlexSlider's `keyboard: true`, except
  // while typing in a field or with a modal or the off-canvas menu open.
  document.addEventListener('keyup', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable], .modal, .offcanvas')) return;
    if (document.querySelector('.modal.show, .offcanvas.show')) return;
    go(current + (e.key === 'ArrowRight' ? 1 : -1));
  });

  show(current);
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}
