// Global site scripts

// FAQ toggle (works on any page with .faq-question elements)
document.querySelectorAll('.faq-question').forEach(function(question) {
  question.addEventListener('click', function() {
    var item = this.parentElement;
    item.classList.toggle('active');
  });
});

// Mobile navigation toggle
var navToggle = document.querySelector('.nav-toggle');
var mainNav = document.querySelector('.main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', function() {
    mainNav.classList.toggle('open');
  });
}

// Tab functionality (sell-your-business page)
document.querySelectorAll('.tab-nav button').forEach(function(button) {
  button.addEventListener('click', function() {
    var tabId = this.getAttribute('data-tab');

    // Remove active class from all buttons and tabs
    document.querySelectorAll('.tab-nav button').forEach(function(btn) {
      btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(function(content) {
      content.classList.remove('active');
    });

    // Add active class to clicked button and corresponding tab
    this.classList.add('active');
    var target = document.getElementById(tabId);
    if (target) {
      target.classList.add('active');
    }
  });
});

// Filter functionality (proof page)
document.querySelectorAll('.filter-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    var filter = this.getAttribute('data-filter');

    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(function(t) {
      t.classList.remove('active');
    });
    this.classList.add('active');

    // Filter cards
    document.querySelectorAll('.tombstone-card').forEach(function(card) {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
