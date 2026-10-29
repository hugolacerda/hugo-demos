document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.main-nav');
  if (!menuBtn || !nav) return;

  if (!nav.querySelector('.mobile-nav-cta')) {
    const cta = document.createElement('div');
    cta.className = 'mobile-nav-cta';
    cta.innerHTML = `
      <a href="https://calendly.com/gwba/one-on-one-with-gary"
         target="_blank" rel="noopener noreferrer">
        Book a Free 15-Min Call
      </a>
      <p class="mobile-nav-cta-sub">No obligation · Certified experts</p>
    `;
    nav.appendChild(cta);
  }

  function closeMenu() {
    nav.classList.remove('mobile-nav-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-is-open');
    document.querySelectorAll('.nav-dropdown.mobile-dd-open')
      .forEach(dd => dd.classList.remove('mobile-dd-open'));
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('mobile-nav-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('mobile-menu-is-open', isOpen);
  });

  nav.querySelectorAll('a').forEach(link => {
    const dropdown = link.closest('.nav-dropdown');
    if (dropdown && link === dropdown.querySelector(':scope > a')) {
      link.addEventListener('click', e => {
        if (nav.classList.contains('mobile-nav-open') && window.innerWidth < 1024) {
          e.preventDefault();
          dropdown.classList.toggle('mobile-dd-open');
        }
      });
    } else {
      link.addEventListener('click', closeMenu);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) closeMenu();
  });
});

// Where the visitor came from, for the contact form (contact.js sends it along
// with the message, and Netlify passes it to GHL). "first" is the first page of
// their first visit, kept 90 days; "visit" is the first page of this visit.
// Links from this site's own pages don't count as a referrer.
(() => {
  try {
    const params = new URLSearchParams(location.search);
    let referrer = '';
    try {
      if (document.referrer && new URL(document.referrer).host !== location.host) referrer = document.referrer;
    } catch (e) {}
    const touch = {
      referrer,
      landing: location.pathname,
      utm: ['utm_source', 'utm_medium', 'utm_campaign'].map(k => params.get(k) || '').join('|').replace(/^\|*$/, ''),
      gclid: params.has('gclid') ? 'yes' : '',
      at: new Date().toISOString(),
    };
    if (!sessionStorage.getItem('sbv_visit')) sessionStorage.setItem('sbv_visit', JSON.stringify(touch));
    const first = JSON.parse(localStorage.getItem('sbv_first') || 'null');
    if (!first || Date.now() - Date.parse(first.at) > 90 * 864e5) {
      localStorage.setItem('sbv_first', JSON.stringify(touch));
    }
  } catch (e) {}
})();
