// Booking links. "Speak with a Certified Expert" and the other call buttons go
// straight to Gary's Calendly, so a booking never passes through the contact
// form, GHL or GA4. On each click of a Calendly link this:
//  - sends the GA4 event book_call_click with link_url and link_text (GA4
//    built-in dimensions) and cta_location: mobile_menu, header, or the id or
//    first class of the section around the button (hero, final-cta,
//    post-sidebar, cta-band...). cta_location shows in reports once it is
//    registered as a custom dimension in GA4;
//  - adds utm_source=sbv-website, utm_medium=website, utm_campaign=<cta_location>
//    and utm_content=<page path> to the link. Calendly keeps them on the booking,
//    which is how SBV bookings tell themselves apart from GBA's on the same
//    calendar (calendly.com/gwba).
// Loaded on every page with a Calendly link. One listener on the document,
// since main.js adds the mobile menu's link after the page loads.
(() => {
  const placement = a => {
    if (a.closest('.mobile-nav-cta')) return 'mobile_menu';
    if (a.closest('header')) return 'header';
    const box = a.closest('section, aside, footer');
    return (box && (box.id || box.classList[0] || box.tagName.toLowerCase())) || 'page';
  };

  document.addEventListener('click', e => {
    const a = e.target instanceof Element && e.target.closest('a[href*="calendly.com/"]');
    if (!a) return;
    const where = placement(a);
    try {
      const url = new URL(a.href);
      url.searchParams.set('utm_source', 'sbv-website');
      url.searchParams.set('utm_medium', 'website');
      url.searchParams.set('utm_campaign', where);
      url.searchParams.set('utm_content', location.pathname);
      a.href = url.toString();
    } catch (err) {}
    if (typeof gtag === 'function') {
      gtag('event', 'book_call_click', {
        link_url: a.href.split('?')[0],
        link_text: a.textContent.trim().replace(/\s+/g, ' '),
        cta_location: where,
      });
    }
  }, true);
})();
