/* ==========================================================================
   Luz a las Naciones. Bilingual content system (EN / ES).
   --------------------------------------------------------------------------
   One DOM, two string maps. Each translatable node carries data-i18n="key".
   Attributes are translated with data-i18n-attr-<name>="key"
   (for example data-i18n-attr-alt="bld.alt").

   Spanish is a 1:1 translation of the English draft. The [NEED: ...] marker
   keeps the English token in both languages so it stays searchable; its body
   is translated. No fact was invented to close a gap.

   Content rules: no em dashes, no emoji, no exclamation marks, either language.
   ========================================================================== */
(function (global) {
  "use strict";

  var STRINGS = {
    en: {
      "doc.title": "Luz a las Naciones | A mission base in Poptún, Guatemala",
      "doc.description": "Luz a las Naciones is a mission center in Poptún, Guatemala, founded by Harry in 2018. It houses visiting teams, feeds neighbors, and teaches English.",

      "skip.link": "Skip to main content",

      "nav.home": "Home",
      "nav.story": "Our story",
      "nav.programs": "Programs",
      "nav.visit": "Visit and host a team",
      "nav.give": "Give",
      "nav.contact": "Contact",
      "nav.label": "Main",
      "nav.menu": "Menu",
      "nav.menu.aria": "Open and close the main menu",

      "lang.label": "Language",
      "lang.en.aria": "English",
      "lang.es.aria": "Español",

      "hero.title": "Where a US church sends a team, not just a check",
      "hero.sub": "Luz a las Naciones is a mission center in Poptún, Guatemala, founded by Harry in 2018. It houses visiting teams, feeds neighbors, and teaches English to a community that keeps showing up.",
      "hero.cta.host": "Host your team",
      "hero.cta.support": "Support the work",
      "hero.photo.need": "[NEED: photo of the facility exterior or a visiting team]",

      "facts.title": "Quick facts",
      "facts.1": "Founded 2018",
      "facts.2": "Poptún, Guatemala",
      "facts.3": "Base camp for teams across the region",
      "facts.4.need": "[NEED: a real number, for example X teams hosted or X students taught, once we have permission and data. Drop to three facts if this does not land in time.]",

      "prog.eyebrow": "What we do · Index 01-04",
      "prog.title": "Four things happen here",
      "prog.lede": "English classes for local families, a yearly gift drive, meals and a bed for missionaries passing through, and a girls' program built around identity and courage. A visiting team can usually plug into at least one of them directly.",
      "prog.rail.label": "Programs",
      "prog.railnote.1": "Index · 04 entries",
      "prog.railnote.2": "Click to open",
      "prog.entry.1": "Entry 01 of 04",
      "prog.entry.2": "Entry 02 of 04",
      "prog.entry.3": "Entry 03 of 04",
      "prog.entry.4": "Entry 04 of 04",
      "prog.link": "See all our programs",

      "prog.ec.title": "English Classes",
      "prog.ec.alt": "Clases de Inglés",
      "prog.ec.body": "Free English lessons for Spanish-speaking neighbors in Poptún.",
      "prog.ec.need": "[NEED: who teaches it, how many students, how often it meets]",
      "prog.ec.photo": "[NEED: photo of an English class in session]",

      "prog.pv.title": "Princesses and Valiant Ones",
      "prog.pv.alt": "Princesas y Valientes",
      "prog.pv.body": "A program for local girls, built around identity and courage rather than a single lesson plan.",
      "prog.pv.need": "[NEED: how often it runs, how many girls, one specific story or moment]",
      "prog.pv.photo": "[NEED: photo of a Princesas y Valientes session]",

      "prog.rp.title": "The Perfect Gift",
      "prog.rp.alt": "El Regalo Perfecto",
      "prog.rp.body": "A yearly gift drive in Poptún that puts something wonderful in a child's hands.",
      "prog.rp.need": "[NEED: timing, how gifts are chosen or funded, a specific number from a past year]",
      "prog.rp.photo": "[NEED: photo of the gift drive]",

      "prog.mc.title": "Missionary Care",
      "prog.mc.alt": "Atención a Misioneros",
      "prog.mc.body": "A meal, a bed, and a breather for missionaries passing through the region.",
      "prog.mc.need": "[NEED: how often this happens, roughly how many missionaries per year]",
      "prog.mc.photo": "[NEED: photo of the kitchen or the bunk room]",

      "trust.eyebrow": "Visiting teams",
      "trust.lead": "Teams have come from as far as Peru.",
      "trust.need": "[NEED: confirm we can name this team, and whether other named examples exist. If no team can be named by launch, cut this section rather than run it vague.]",

      "bld.eyebrow": "The building",
      "bld.title": "Harry built this building himself",
      "bld.lede": "No blueprints. The plan existed in his head, and then it existed in concrete. Two floors, a commercial kitchen, and beds for a visiting team.",
      "bld.cta": "See the facility",
      "bld.alt": "Hand-drawn cross-section of the two-story mission base. Ground floor: commercial kitchen, bunk room, bedrooms, and a stair. Upstairs: one open worship hall the width of the building. The width is marked as not yet measured.",
      "bld.swipe": "Swipe sideways to see the whole drawing",

      "faq.title": "Common questions",
      "faq.q1": "Where are you located?",
      "faq.a1": "Poptún, Guatemala.",
      "faq.a1.need": "[NEED: region or department, unconfirmed]",
      "faq.q2": "How do I get in touch?",
      "faq.a2": "Reach us through the Contact page and we will get back to you.",
      "faq.a2.link": "Go to Contact",
      "faq.q3": "How can I support the ministry?",
      "faq.a3": "The Give page lays out how support works today and how to join it.",
      "faq.a3.link": "Go to Give",

      "next.eyebrow": "Next step",
      "next.title": "What happens after you contact us",
      "next.lede": "Every visit and every gift keeps the door open to the next team.",
      "step.1.label": "Step 01",
      "step.2.label": "Step 02",
      "step.3.label": "Step 03",
      "step.1": "Send your dates or your question.",
      "step.2a": "We reply within ",
      "step.2.need": "[NEED: X]",
      "step.2b": " business days.",
      "step.3": "We confirm next steps together.",
      "next.cta.trip": "Plan a trip",
      "next.cta.support": "Support the work",

      "footer.blurb": "A mission center run by Harry in Poptún, Guatemala since 2018.",
      "footer.contact": "Contact",
      "footer.contact.need": "[NEED: confirm whether +1 (720) 234-7679 is Harry's own number or a US forwarding line before publishing it as a direct line to Harry.]",
      "footer.follow": "Follow",
      "footer.follow.need": "[NEED: current, working Facebook and Telegram links. The ones on file are from an old archived snapshot.]",
      "footer.note": "Copy marked [NEED] is unconfirmed and is shown on purpose rather than invented. Photo slots name the shot that belongs there until the real photographs from Poptún arrive."
    },

    es: {
      "doc.title": "Luz a las Naciones | Una base misionera en Poptún, Guatemala",
      "doc.description": "Luz a las Naciones es un centro misionero en Poptún, Guatemala, fundado por Harry en 2018. Alberga a equipos visitantes, alimenta a los vecinos y enseña inglés.",

      "skip.link": "Saltar al contenido principal",

      "nav.home": "Inicio",
      "nav.story": "Nuestra historia",
      "nav.programs": "Programas",
      "nav.visit": "Visitar y recibir un equipo",
      "nav.give": "Donar",
      "nav.contact": "Contacto",
      "nav.label": "Principal",
      "nav.menu": "Menú",
      "nav.menu.aria": "Abrir y cerrar el menú principal",

      "lang.label": "Idioma",
      "lang.en.aria": "English",
      "lang.es.aria": "Español",

      "hero.title": "Donde una iglesia de Estados Unidos envía un equipo, no solo un cheque",
      "hero.sub": "Luz a las Naciones es un centro misionero en Poptún, Guatemala, fundado por Harry en 2018. Alberga a equipos visitantes, alimenta a los vecinos y enseña inglés a una comunidad que sigue presentándose.",
      "hero.cta.host": "Trae a tu equipo",
      "hero.cta.support": "Apoya la obra",
      "hero.photo.need": "[NEED: foto del exterior de las instalaciones o de un equipo visitante]",

      "facts.title": "Datos rápidos",
      "facts.1": "Fundado en 2018",
      "facts.2": "Poptún, Guatemala",
      "facts.3": "Base para equipos de toda la región",
      "facts.4.need": "[NEED: un número real, por ejemplo X equipos recibidos o X estudiantes, cuando tengamos permiso y datos. Reducir a tres datos si esto no llega a tiempo.]",

      "prog.eyebrow": "Lo que hacemos · Índice 01-04",
      "prog.title": "Aquí ocurren cuatro cosas",
      "prog.lede": "Clases de inglés para familias de la zona, una campaña anual de regalos, comida y una cama para misioneros de paso, y un programa para niñas centrado en la identidad y la valentía. Un equipo visitante casi siempre puede sumarse directamente a por lo menos una de ellas.",
      "prog.rail.label": "Programas",
      "prog.railnote.1": "Índice · 04 entradas",
      "prog.railnote.2": "Clic para abrir",
      "prog.entry.1": "Entrada 01 de 04",
      "prog.entry.2": "Entrada 02 de 04",
      "prog.entry.3": "Entrada 03 de 04",
      "prog.entry.4": "Entrada 04 de 04",
      "prog.link": "Conoce todos nuestros programas",

      "prog.ec.title": "Clases de Inglés",
      "prog.ec.alt": "English Classes",
      "prog.ec.body": "Clases de inglés gratuitas para vecinos hispanohablantes en Poptún.",
      "prog.ec.need": "[NEED: quién las imparte, cuántos estudiantes, con qué frecuencia se reúnen]",
      "prog.ec.photo": "[NEED: foto de una clase de inglés en curso]",

      "prog.pv.title": "Princesas y Valientes",
      "prog.pv.alt": "Princesses and Valiant Ones",
      "prog.pv.body": "Un programa para niñas de la zona, centrado en la identidad y la valentía más que en un solo plan de clase.",
      "prog.pv.need": "[NEED: con qué frecuencia se realiza, cuántas niñas participan, una historia o un momento concreto]",
      "prog.pv.photo": "[NEED: foto de una sesión de Princesas y Valientes]",

      "prog.rp.title": "El Regalo Perfecto",
      "prog.rp.alt": "The Perfect Gift",
      "prog.rp.body": "Una campaña anual de regalos en Poptún que pone algo maravilloso en las manos de un niño.",
      "prog.rp.need": "[NEED: fechas, cómo se eligen o financian los regalos, una cifra concreta de un año anterior]",
      "prog.rp.photo": "[NEED: foto de la campaña de regalos]",

      "prog.mc.title": "Atención a Misioneros",
      "prog.mc.alt": "Missionary Care",
      "prog.mc.body": "Comida, una cama y un respiro para los misioneros que pasan por la región.",
      "prog.mc.need": "[NEED: con qué frecuencia ocurre, aproximadamente cuántos misioneros por año]",
      "prog.mc.photo": "[NEED: foto de la cocina o del dormitorio con literas]",

      "trust.eyebrow": "Equipos visitantes",
      "trust.lead": "Han venido equipos desde tan lejos como Perú.",
      "trust.need": "[NEED: confirmar que podemos nombrar a este equipo y si existen otros ejemplos con nombre. Si no se puede nombrar a ningún equipo para el lanzamiento, eliminar esta sección en vez de publicarla de forma vaga.]",

      "bld.eyebrow": "El edificio",
      "bld.title": "Harry construyó este edificio con sus propias manos",
      "bld.lede": "Sin planos. El plan existía en su cabeza, y después existió en concreto. Dos pisos, una cocina industrial y camas para un equipo visitante.",
      "bld.cta": "Conoce las instalaciones",
      "bld.alt": "Corte transversal dibujado a mano de la base misionera de dos pisos. Planta baja: cocina industrial, dormitorio con literas, habitaciones y una escalera. Arriba: un salón de adoración abierto de todo el ancho del edificio. El ancho aparece marcado como pendiente de medir.",
      "bld.swipe": "Desliza hacia los lados para ver todo el dibujo",

      "faq.title": "Preguntas frecuentes",
      "faq.q1": "¿Dónde están ubicados?",
      "faq.a1": "Poptún, Guatemala.",
      "faq.a1.need": "[NEED: región o departamento, sin confirmar]",
      "faq.q2": "¿Cómo me pongo en contacto?",
      "faq.a2": "Escríbenos desde la página de Contacto y te responderemos.",
      "faq.a2.link": "Ir a Contacto",
      "faq.q3": "¿Cómo puedo apoyar el ministerio?",
      "faq.a3": "La página Donar explica cómo funciona el apoyo hoy y cómo sumarse.",
      "faq.a3.link": "Ir a Donar",

      "next.eyebrow": "Siguiente paso",
      "next.title": "Qué pasa después de que nos escribes",
      "next.lede": "Cada visita y cada donación mantiene la puerta abierta para el próximo equipo.",
      "step.1.label": "Paso 01",
      "step.2.label": "Paso 02",
      "step.3.label": "Paso 03",
      "step.1": "Envía tus fechas o tu pregunta.",
      "step.2a": "Respondemos en un plazo de ",
      "step.2.need": "[NEED: X]",
      "step.2b": " días hábiles.",
      "step.3": "Confirmamos juntos los siguientes pasos.",
      "next.cta.trip": "Planifica un viaje",
      "next.cta.support": "Apoya la obra",

      "footer.blurb": "Un centro misionero dirigido por Harry en Poptún, Guatemala, desde 2018.",
      "footer.contact": "Contacto",
      "footer.contact.need": "[NEED: confirmar si +1 (720) 234-7679 es el número propio de Harry o una línea de reenvío en Estados Unidos antes de publicarlo como una línea directa con Harry.]",
      "footer.follow": "Síguenos",
      "footer.follow.need": "[NEED: enlaces actuales y funcionales de Facebook y Telegram. Los que tenemos provienen de una captura archivada antigua.]",
      "footer.note": "El texto marcado con [NEED] no está confirmado y se muestra a propósito en vez de inventarse. Los espacios para fotos indican la toma que corresponde hasta que lleguen las fotografías reales desde Poptún."
    }
  };

  var SUPPORTED = ["en", "es"];
  var STORAGE_KEY = "lln_lang";

  function normalize(lang) { return SUPPORTED.indexOf(lang) > -1 ? lang : "en"; }

  function getStored() {
    try { return normalize(localStorage.getItem(STORAGE_KEY)); } catch (e) { return "en"; }
  }
  function store(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode, ignore */ }
  }

  function apply(lang) {
    lang = normalize(lang);
    var dict = STRINGS[lang];
    var fallback = STRINGS.en;
    var lookup = function (key) { return dict[key] != null ? dict[key] : fallback[key]; };

    document.documentElement.setAttribute("lang", lang);

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var val = lookup(nodes[i].getAttribute("data-i18n"));
      if (val != null) nodes[i].textContent = val;
    }

    // Attribute translations: data-i18n-attr-<attrName>="key".
    var attrNodes = document.querySelectorAll("[data-i18n-attrs]");
    for (var j = 0; j < attrNodes.length; j++) {
      var el = attrNodes[j];
      var pairs = el.getAttribute("data-i18n-attrs").split(",");
      for (var k = 0; k < pairs.length; k++) {
        var parts = pairs[k].split(":");
        if (parts.length !== 2) continue;
        var tval = lookup(parts[1].trim());
        if (tval != null) el.setAttribute(parts[0].trim(), tval);
      }
    }

    // Program names carry the other language's name underneath. Mark each
    // alternate name with the language it is actually in.
    var alts = document.querySelectorAll("[data-alt-lang]");
    for (var a = 0; a < alts.length; a++) {
      alts[a].setAttribute("lang", lang === "en" ? "es" : "en");
    }

    document.title = lookup("doc.title");
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", lookup("doc.description"));

    var toggles = document.querySelectorAll("[data-lang-btn]");
    for (var t = 0; t < toggles.length; t++) {
      toggles[t].setAttribute("aria-pressed", toggles[t].getAttribute("data-lang-btn") === lang ? "true" : "false");
    }

    store(lang);
    document.documentElement.classList.remove("i18n-pending");
    document.dispatchEvent(new CustomEvent("lln:langchange", { detail: { lang: lang } }));
  }

  global.LLNi18n = {
    supported: SUPPORTED,
    current: getStored,
    apply: apply,
    set: function (lang) { apply(lang); }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { apply(getStored()); });
  } else {
    apply(getStored());
  }
})(window);
