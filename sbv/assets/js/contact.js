function handleSubmit() {
  // Placeholder: when a CRM is connected, replace this with a fetch() to the CRM endpoint.
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  form.style.display = 'none';
  success.classList.add('show');
  window.scrollTo({ top: success.offsetTop - 100, behavior: 'smooth' });
}
