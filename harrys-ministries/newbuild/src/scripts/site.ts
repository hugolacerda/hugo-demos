/* ==========================================================================
   Site chrome. Sticky header compaction, mobile nav, the rail-and-panel
   blocks (specimen index and FAQ), and the contact form's post-redirect
   confirmation. No dependencies.
   The language toggle is plain links now (real per-locale pages), so there is
   no client-side i18n at all.
   ========================================================================== */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function init() {
  /* Header: full size at the top, compact once scrolled. */
  const header = document.querySelector<HTMLElement>('.site-header');
  if (header) {
    let ticking = false;
    const update = () => {
      header.classList.toggle('is-compact', window.scrollY > 24);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* Mobile nav */
  const navToggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (navToggle && nav) {
    const setOpen = (open: boolean) => {
      nav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    navToggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => { if ((e.target as HTMLElement).tagName === 'A') setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); navToggle.focus(); }
    });
  }

  /* Rail-and-panel blocks: the specimen index (flip) and the FAQ (fade) */
  document.querySelectorAll<HTMLElement>('[data-rail]').forEach(initRail);

  /* Contact form: show the confirmation after Netlify redirects back. */
  const sent = document.getElementById('form-sent');
  if (sent && /[?&]sent=1(&|$)/.test(window.location.search)) {
    sent.hidden = false;
    sent.setAttribute('tabindex', '-1');
    sent.focus();
  }
}

/* A rail of tabs beside a stage of panels. root.dataset.rail picks the
   panel-entry animation: "flip" (the specimen index's 3D turn, direction
   following the index) or "fade" (the FAQ's short fade-and-slide). Click-only
   selection; arrow keys, Home and End move between tabs. Below 800px each
   panel moves under its own tab as an accordion, no duplicate DOM. */
function initRail(root: HTMLElement) {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
  const stage = root.querySelector<HTMLElement>('[data-rail-stage]');
  const anim = root.dataset.rail === 'flip'
    ? { fwd: 'is-flip-fwd', back: 'is-flip-back' }
    : { fwd: 'is-fade-fwd', back: 'is-fade-back' };
  const narrow = window.matchMedia('(width < 801px)');
  let current = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
  if (current < 0) current = 0;

  function render(next: number, animate: boolean) {
    const forward = next > current;
    tabs.forEach((tab, i) => {
      const on = i === next;
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
      tab.setAttribute('tabindex', on ? '0' : '-1');
    });
    panels.forEach((panel, i) => {
      const on = i === next;
      panel.hidden = !on;
      panel.classList.remove(anim.fwd, anim.back);
      if (on && animate && !reduceMotion.matches) {
        // Restart the keyframe animation even if the same class was just removed.
        void panel.offsetWidth;
        panel.classList.add(forward ? anim.fwd : anim.back);
      }
    });
    current = next;
  }

  tabs.forEach((tab, i) => {
    // Click-only selection. A hover-triggered swap would fire every time the
    // cursor crossed the rail.
    tab.addEventListener('click', () => { if (i !== current) render(i, true); });
    tab.addEventListener('keydown', (e) => {
      let n: number | null = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = tabs.length - 1;
      if (n === null) return;
      e.preventDefault();
      tabs[n].focus();
      render(n, true);
    });
  });

  // Narrow screens: each panel sits under its own tab (accordion).
  // Wide screens: all panels live in the stage column.
  function place() {
    if (narrow.matches) {
      panels.forEach((panel, i) => {
        if (tabs[i].nextElementSibling !== panel) tabs[i].insertAdjacentElement('afterend', panel);
      });
    } else if (stage) {
      panels.forEach((panel) => { if (panel.parentNode !== stage) stage.appendChild(panel); });
    }
  }
  place();
  narrow.addEventListener('change', place);

  render(current, false);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
