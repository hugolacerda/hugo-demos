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
        if (nav.classList.contains('mobile-nav-open') && window.innerWidth < 768) {
          e.preventDefault();
          dropdown.classList.toggle('mobile-dd-open');
        }
      });
    } else {
      link.addEventListener('click', closeMenu);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeMenu();
  });
});
