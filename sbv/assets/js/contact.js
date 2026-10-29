(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  // Copies main.js's record of where the visitor came from into the hidden
  // fields. A gclid marks a Google Ads click; it travels in first_utm.
  function fillSource() {
    var first = {}, visit = {};
    try {
      first = JSON.parse(localStorage.getItem('sbv_first') || '{}');
      visit = JSON.parse(sessionStorage.getItem('sbv_visit') || '{}');
    } catch (e) {}
    var utm = [first.utm, first.gclid ? 'gclid' : ''].filter(Boolean).join(' ');
    var values = {
      first_referrer: first.referrer, first_landing: first.landing, first_utm: utm,
      first_seen: first.at, visit_referrer: visit.referrer, visit_landing: visit.landing
    };
    Object.keys(values).forEach(function (name) {
      if (form.elements[name]) form.elements[name].value = values[name] || '';
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    fillSource();

    var btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function (res) {
        if (res.ok) {
          if (typeof gtag === 'function') gtag('event', 'generate_lead', { form_name: 'contact' });
          form.style.display = 'none';
          var success = document.getElementById('formSuccess');
          success.classList.add('show');
          window.scrollTo({ top: success.offsetTop - 100, behavior: 'smooth' });
        } else {
          btn.disabled = false;
          btn.textContent = 'Send Message';
          alert('Something went wrong. Please email us at info@strategicbusinessvaluations.com');
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = 'Send Message';
        alert('Something went wrong. Please email us at info@strategicbusinessvaluations.com');
      });
  });
})();
