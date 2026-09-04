/* ==========================================================================
   Luz a las Naciones. Site chrome and the specimen index.
   - Language toggle wiring (strings live in i18n.js)
   - Sticky header compresses on scroll
   - Mobile nav
   - Specimen index: click-only tabs, panel flip whose direction follows the
     index, and an accordion layout on narrow screens (each panel moves under
     its own rail row; no duplicate DOM).
   No dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.addEventListener("DOMContentLoaded", function () {

    /* ---- Language toggle ------------------------------------------------ */
    var langButtons = document.querySelectorAll("[data-lang-btn]");
    for (var i = 0; i < langButtons.length; i++) {
      langButtons[i].addEventListener("click", function () {
        if (window.LLNi18n) window.LLNi18n.set(this.getAttribute("data-lang-btn"));
      });
    }

    /* ---- Header: full size at the top, compact once scrolled ------------- */
    var header = document.querySelector(".site-header");
    if (header) {
      var ticking = false;
      var update = function () {
        header.classList.toggle("is-compact", window.scrollY > 24);
        ticking = false;
      };
      window.addEventListener("scroll", function () {
        if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
      }, { passive: true });
      update();
    }

    /* ---- Mobile nav ------------------------------------------------------ */
    var navToggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-nav");
    if (navToggle && nav) {
      var setOpen = function (open) {
        nav.classList.toggle("is-open", open);
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      };
      navToggle.addEventListener("click", function () {
        setOpen(!nav.classList.contains("is-open"));
      });
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") setOpen(false);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); navToggle.focus(); }
      });
    }

    /* ---- Specimen index -------------------------------------------------- */
    var specimen = document.querySelector("[data-specimen]");
    if (specimen) initSpecimen(specimen);
  });

  function initSpecimen(root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll(".specimen__tab"));
    var panels = Array.prototype.slice.call(root.querySelectorAll(".specimen__panel"));
    var stage = root.querySelector(".specimen__stage");
    var narrow = window.matchMedia("(max-width: 800px)");
    var current = tabs.findIndex(function (t) { return t.getAttribute("aria-selected") === "true"; });
    if (current < 0) current = 0;

    function render(next, animate) {
      var forward = next > current;
      tabs.forEach(function (tab, i) {
        var on = i === next;
        tab.setAttribute("aria-selected", on ? "true" : "false");
        tab.setAttribute("tabindex", on ? "0" : "-1");
      });
      panels.forEach(function (panel, i) {
        var on = i === next;
        panel.hidden = !on;
        panel.classList.remove("is-flip-fwd", "is-flip-back");
        if (on && animate && !reduceMotion.matches) {
          // Restart the keyframe animation even if the same class was just removed.
          void panel.offsetWidth;
          panel.classList.add(forward ? "is-flip-fwd" : "is-flip-back");
        }
      });
      current = next;
    }

    tabs.forEach(function (tab, i) {
      // Click-only selection. A hover-triggered swap would fire every time
      // the cursor crossed the rail.
      tab.addEventListener("click", function () {
        if (i !== current) render(i, true);
      });
      tab.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (i + 1) % tabs.length;
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
        if (e.key === "Home") n = 0;
        if (e.key === "End") n = tabs.length - 1;
        if (n === null) return;
        e.preventDefault();
        tabs[n].focus();
        render(n, true);
      });
    });

    // Layout: on narrow screens each panel sits directly under its own rail
    // row (accordion). On wide screens all panels live in the stage column.
    function place() {
      if (narrow.matches) {
        panels.forEach(function (panel, i) {
          if (tabs[i].nextElementSibling !== panel) tabs[i].insertAdjacentElement("afterend", panel);
        });
      } else {
        panels.forEach(function (panel) {
          if (panel.parentNode !== stage) stage.appendChild(panel);
        });
      }
    }
    place();
    if (narrow.addEventListener) narrow.addEventListener("change", place);
    else narrow.addListener(place);

    render(current, false);
  }
})();
