/* ==========================================================================
   Motion foundation. One place that owns GSAP, ScrollTrigger, and Lenis so
   every page-level tween shares the same ticker and the same reduced-motion
   guard.

   - Lenis drives smooth scroll and feeds ScrollTrigger.update on every
     scroll event; GSAP's ticker drives Lenis's raf (the canonical
     integration), with lagSmoothing off so scrub positions stay exact.
   - Under prefers-reduced-motion nothing here starts: no Lenis, no tweens.
     Pages check `reduceMotion` before creating any ScrollTrigger; static
     markup is already the finished state (hero phrase at scale 1, map path
     fully drawn with the marker at the end).
   Plugins in use: ScrollTrigger (hero emphasis on Home, the trek on Visit),
   DrawSVGPlugin and MotionPathPlugin (the trek only), all part of the free
   GSAP suite.
   ========================================================================== */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

gsap.registerPlugin(ScrollTrigger);

export let lenis: Lenis | null = null;

if (!reduceMotion) {
  lenis = new Lenis({ anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis?.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
