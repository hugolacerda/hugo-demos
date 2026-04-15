(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

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
