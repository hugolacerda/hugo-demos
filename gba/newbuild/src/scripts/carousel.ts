// The deals and client-logo carousels (map ticket 09: Embla in place of Owl
// Carousel 2.3.4). The markup is Owl's own rendered DOM, emitted at build time
// by owlCarousel() in src/lib/html.ts, so custom.css styles it unchanged; items
// per view and the gaps are CSS (port.css, scripts/port_css.py), not options.
//
// Live behaviour kept (ticket 03, home.html inline Owl config): loop, advance
// one item every 5 s, a short slide close to Owl's 250 ms, pause while the
// pointer is over the carousel (arrows included), drag and swipe, arrows that
// move one item. Owl's dots are not drawn: the live carousels carry no
// `owl-theme` class, so their dot buttons render at 0 x 0 px.
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

export function initCarousels(): void {
  document.querySelectorAll<HTMLElement>('.owl-carousel[data-carousel]:not([data-carousel-ready])').forEach((root) => {
    const viewport = root.querySelector<HTMLElement>('.owl-stage-outer');
    if (!viewport) return;
    root.dataset.carouselReady = '';
    // duration 14: measured in headless Chrome against Owl on the live markup,
    // one step reaches 50 / 90 / 99 % of its distance at 70 / 170 / 237 ms
    // (Owl: 73 / 157 / 224 ms).
    const embla = EmblaCarousel(viewport, { loop: true, align: 'start', duration: 14 }, [
      Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true, rootNode: () => root }),
    ]);
    root.querySelector('.owl-prev')?.addEventListener('click', () => embla.scrollPrev());
    root.querySelector('.owl-next')?.addEventListener('click', () => embla.scrollNext());
  });
}
