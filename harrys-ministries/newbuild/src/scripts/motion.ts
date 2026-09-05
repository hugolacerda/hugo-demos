/* ==========================================================================
   Motion foundation. Lenis smooth scroll only; it steps aside for visitors
   who ask for reduced motion. GSAP is installed (package.json) but not
   imported anywhere yet: the scroll-triggered emphasis, split-panel scroll,
   and cursor-light passes are deliberately later work. When they land, this
   is the file that registers ScrollTrigger and syncs it to Lenis's ticker.
   ========================================================================== */
import Lenis from 'lenis';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!reduceMotion.matches) {
  new Lenis({
    autoRaf: true,
    anchors: true, // in-page links (the skip link) scroll through Lenis
  });
}
