/* ==========================================================================
   Luz a las Naciones. Bilingual content system (EN / ES).
   --------------------------------------------------------------------------
   One DOM, two string maps. Each translatable node carries data-i18n="key".
   Attributes are translated with data-i18n-attrs="attr:key, attr2:key2"
   (for example data-i18n-attrs="alt:bld.alt"). Interior pages set
   data-page on <body> and carry page.<name>.title / .description keys.

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
      "footer.note": "Copy marked [NEED] is unconfirmed and is shown on purpose rather than invented. Photo slots name the shot that belongs there until the real photographs from Poptún arrive.",

      /* --- Interior pages --- */
      "page.story.title": "Our story | Luz a las Naciones",
      "page.story.description": "Harry has run Luz a las Naciones in Poptún, Guatemala since 2018, and built its two-story center himself from a plan that existed only in his head.",
      "page.programs.title": "Programs | Luz a las Naciones",
      "page.programs.description": "Four things happen at Luz a las Naciones week in and week out: English classes, a yearly gift drive, missionary care, and a girls' program built around identity and courage.",
      "page.visit.title": "Visit and host a team | Luz a las Naciones",
      "page.visit.description": "Host your team at our base camp in Poptún, Guatemala: a two-story center with bedrooms, a bunk room, a full commercial kitchen, and an upstairs worship hall.",
      "page.give.title": "Give | Luz a las Naciones",
      "page.give.description": "Support for Luz a las Naciones comes from a small, dedicated circle. Every gift keeps the lights on, the kitchen stocked, and the door open to the next team.",
      "page.contact.title": "Contact | Luz a las Naciones",
      "page.contact.description": "Get in touch with Luz a las Naciones in Poptún, Guatemala, about hosting a team, giving, or anything else.",
      "pending.eyebrow": "Pending",
      "story.eyebrow": "Our story",
      "story.title": "Built from a plan that only existed in Harry's head",
      "story.lede": "Harry has run Luz a las Naciones in Poptún, Guatemala since 2018. He built the ministry's two-story center himself, from a plan that existed only in his head, no blueprints, no contractor. Today it houses visiting teams, feeds neighbors, and teaches English to a community that keeps showing up.",
      "story.build.title": "Building the center",
      "story.build.body": "Harry built the two-story center himself, from a plan that existed only in his head. No blueprints, no contractor, just a plot of land and years of work. Today it has bedrooms and a bunk room for visiting teams, a full commercial kitchen, and an upstairs worship hall that doubles as a convention center for the region.",
      "story.name.title": "The name",
      "story.name.body": "The ministry used to go by Light of the World. It is now Luz a las Naciones, Light to the Nations, reflecting where the work has grown to reach.",
      "story.name.need": "[NEED: confirm this is the actual reason for the name change, or get the real one from Harry or Gary. The paragraph above is our own inference, not a quote from anyone.]",
      "story.why.title": "Why Poptún",
      "story.why.need": "[NEED, entirely: specific regional context from Gary or Harry. We know the center is in Guatemala and that Harry has been there since roughly 2018. We do not know why he chose Poptún or what makes the region distinct. This section ships empty rather than filled with generic missions language.]",
      "story.faq.q1": "What does the ministry's name mean?",
      "story.faq.a1": "Luz a las Naciones means Light to the Nations in Spanish.",
      "story.faq.q2": "When was it founded?",
      "story.faq.a2": "2018.",
      "story.faq.q3": "Who leads it?",
      "story.faq.a3": "Harry",
      "story.faq.a3.need": "[NEED: surname, unconfirmed]",
      "story.faq.q4": "Why Poptún?",
      "story.faq.a4.need": "[NEED: same as the Why Poptún section above]",
      "prog.page.eyebrow": "Programs · Index 01-04",
      "prog.page.title": "Four things happen here, week in and week out",
      "prog.page.lede": "A visiting team can usually plug into at least one of them directly.",
      "prog.page.toc": "Index",
      "prog.help.title": "How you can help",
      "prog.help.need": "[NEED: which of these actually apply to this program: bring a team, give supplies, support facility or program costs, sponsor materials. Confirm per program before listing any of them.]",
      "prog.ask": "Ask about this program",
      "prog.faq.q1": "Can a visiting team serve directly in one of these programs?",
      "prog.faq.a1.need": "[NEED: real answer from Harry or Gary]",
      "prog.faq.q2": "Can a donor support a specific program?",
      "prog.faq.a2": "That depends on how giving is set up, which is still being decided.",
      "prog.faq.a2.need": "[NEED: donation mechanism decision]",
      "visit.title": "Host your team at our base camp in Poptún",
      "visit.sub": "If your church wants to send a team instead of just a check, this is what they're sending them to.",
      "visit.photo.need": "[NEED: photo of the worship hall or convention space]",
      "visit.cta.plan": "Start planning a trip",
      "visit.cta.programs": "See the programs",
      "visit.facts.eyebrow": "Facility facts",
      "visit.facts.title": "What is here",
      "visit.facts.1": "About 12,000 to 15,000 square feet, two stories",
      "visit.facts.2": "Bedrooms plus a bunk room for visiting teams",
      "visit.facts.3": "Full commercial kitchen",
      "visit.facts.4": "Upstairs worship hall, also used as a convention space",
      "visit.facts.need1": "[NEED: exact bed count and bathroom count]",
      "visit.facts.need2": "[NEED: nearest airport or city teams typically fly into]",
      "visit.provide.eyebrow": "Expectations",
      "visit.provide.title": "What we provide and what your team provides",
      "visit.provide.we": "We provide",
      "visit.provide.you": "Your team provides",
      "visit.provide.we.need": "[NEED: the actual list from Harry or Gary, for example lodging or kitchen access. Not documented anywhere yet.]",
      "visit.provide.you.need": "[NEED: the actual list from Harry or Gary, for example travel or personal supplies. Not documented anywhere yet.]",
      "visit.trip.title": "What a trip looks like",
      "visit.trip.need": "[NEED, entirely undocumented: arrival logistics, typical daily rhythm, meals, what teams actually do while here, transportation from the airport, safety and security notes. Pending input from Harry and Gary. No placeholder logistics are written here on purpose, because a church leader could plan real travel around invented details.]",
      "visit.fit.title": "Team fit",
      "visit.fit.need": "[NEED: ideal team size and trip length, and whether there are teams that are not a good fit]",
      "visit.faq.q1": "What is the ideal team size and trip length?",
      "visit.faq.a1.need": "[NEED: team size and trip length]",
      "visit.faq.q2": "How far ahead should we plan?",
      "visit.faq.a2": "If you are not sure yet, send possible dates and we will work around them.",
      "visit.faq.a2.need": "[NEED: how far ahead teams should plan]",
      "visit.faq.q3": "What are sleeping and meal logistics like?",
      "visit.faq.a3": "Bedrooms plus a bunk room for the team, and a full commercial kitchen built for group meals.",
      "visit.faq.a3.need": "[NEED: the full answer, pending the trip section above]",
      "visit.faq.q4": "What about transportation?",
      "visit.faq.a4.need": "[NEED: transportation details]",
      "visit.faq.q5": "What language do we need?",
      "visit.faq.a5.need": "[NEED: what language a team needs]",
      "visit.faq.q6": "What does a typical day look like?",
      "visit.faq.a6": "Every trip is a little different. Tell us your goals and we will shape the day around them.",
      "visit.faq.a6.need": "[NEED: a typical daily rhythm]",
      "give.eyebrow": "Give",
      "give.title": "A ministry running on faith and a few faithful friends",
      "give.lede": "Support today comes from a small, dedicated circle around Gary and Harry. Every gift keeps the lights on, the kitchen stocked, and the door open to the next team.",
      "give.how.eyebrow": "How to give today",
      "give.how.title": "Reach out and we will get you set up",
      "give.how.body": "Send a message through the Contact page and we will set up your gift with you.",
      "give.how.cta": "Get in touch to give",
      "give.tax.eyebrow": "Receipts and tax status",
      "give.tax.need": "[NEED: tax-deductibility and receipt status. If gifts are deductible, state that clearly and explain how a receipt is issued. If they are not, say so plainly. Until this is answered, nothing on this page implies either.]",
      "give.faq.q1": "How is my gift used?",
      "give.faq.a1.need": "[NEED: at minimum a general answer, confirmed with Gary rather than invented]",
      "give.faq.q2": "Can I get a receipt?",
      "give.faq.a2.need": "[NEED: depends entirely on the tax-status answer]",
      "give.faq.q3": "Can I give to a specific program?",
      "give.faq.a3": "Not yet. Giving to a specific program, for example funding a Regalo Perfecto gift, is planned for a later version once the giving mechanism exists.",
      "give.faq.q4": "Is offline giving possible?",
      "give.faq.a4.need": "[NEED: whether offline giving is possible, and how]",
      "give.faq.q5": "How do I give right now?",
      "give.faq.a5": "Reach out through the Contact page and we will set it up with you.",
      "give.faq.a5.need": "[NEED: donation mechanism, still being decided]",
      "contact.title": "Get in touch",
      "contact.form.title": "Send a message",
      "contact.form.name": "Name",
      "contact.form.email": "Email",
      "contact.form.phone": "Phone (optional)",
      "contact.form.message": "Message",
      "contact.form.submit": "Send message",
      "contact.form.sent": "Your message is on its way.",
      "contact.direct.title": "Reach us directly",
      "contact.direct.email": "Email",
      "contact.direct.phone": "Phone",
      "contact.direct.social": "Facebook and Telegram",
      "contact.direct.location": "Location",
      "contact.faq.q1": "How fast will I hear back?",
      "contact.faq.q2": "What is the best channel?",
      "contact.faq.a2.need": "[NEED: whether Harry actually checks email, or whether WhatsApp or phone is better. Ask directly rather than assuming email is primary.]",
      "contact.faq.q3": "What should I include in my message?",
      "contact.faq.a3": "Let us know if you are asking about hosting a team, giving, or something else. It helps us route your message to the right person."
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
      "footer.note": "El texto marcado con [NEED] no está confirmado y se muestra a propósito en vez de inventarse. Los espacios para fotos indican la toma que corresponde hasta que lleguen las fotografías reales desde Poptún.",

      /* --- Interior pages --- */
      "page.story.title": "Nuestra historia | Luz a las Naciones",
      "page.story.description": "Harry dirige Luz a las Naciones en Poptún, Guatemala, desde 2018, y construyó él mismo su centro de dos pisos a partir de un plan que existía solo en su cabeza.",
      "page.programs.title": "Programas | Luz a las Naciones",
      "page.programs.description": "En Luz a las Naciones ocurren cuatro cosas semana tras semana: clases de inglés, una campaña anual de regalos, atención a misioneros y un programa para niñas centrado en la identidad y la valentía.",
      "page.visit.title": "Visitar y recibir un equipo | Luz a las Naciones",
      "page.visit.description": "Trae a tu equipo a nuestra base en Poptún, Guatemala: un centro de dos pisos con habitaciones, un dormitorio con literas, una cocina industrial completa y un salón de adoración en el piso de arriba.",
      "page.give.title": "Donar | Luz a las Naciones",
      "page.give.description": "El apoyo a Luz a las Naciones viene de un círculo pequeño y comprometido. Cada donación mantiene las luces encendidas, la cocina abastecida y la puerta abierta para el próximo equipo.",
      "page.contact.title": "Contacto | Luz a las Naciones",
      "page.contact.description": "Ponte en contacto con Luz a las Naciones en Poptún, Guatemala, para recibir un equipo, donar o cualquier otro asunto.",
      "pending.eyebrow": "Pendiente",
      "story.eyebrow": "Nuestra historia",
      "story.title": "Construido a partir de un plan que solo existía en la cabeza de Harry",
      "story.lede": "Harry dirige Luz a las Naciones en Poptún, Guatemala, desde 2018. Construyó él mismo el centro de dos pisos del ministerio, a partir de un plan que existía solo en su cabeza, sin planos y sin contratista. Hoy alberga a equipos visitantes, alimenta a los vecinos y enseña inglés a una comunidad que sigue presentándose.",
      "story.build.title": "La construcción del centro",
      "story.build.body": "Harry construyó él mismo el centro de dos pisos, a partir de un plan que existía solo en su cabeza. Sin planos, sin contratista, solo un terreno y años de trabajo. Hoy tiene habitaciones y un dormitorio con literas para equipos visitantes, una cocina industrial completa y un salón de adoración en el piso de arriba que también funciona como centro de convenciones para la región.",
      "story.name.title": "El nombre",
      "story.name.body": "El ministerio antes se llamaba Luz del Mundo. Ahora es Luz a las Naciones, Light to the Nations en inglés, lo que refleja hasta dónde ha llegado a crecer la obra.",
      "story.name.need": "[NEED: confirmar que esta es la razón real del cambio de nombre, o conseguir la verdadera con Harry o Gary. El párrafo anterior es una inferencia nuestra, no una cita de nadie.]",
      "story.why.title": "Por qué Poptún",
      "story.why.need": "[NEED, por completo: contexto regional específico de Gary o Harry. Sabemos que el centro está en Guatemala y que Harry lleva allí desde aproximadamente 2018. No sabemos por qué eligió Poptún ni qué distingue a la región. Esta sección se publica vacía en vez de rellenarse con lenguaje misionero genérico.]",
      "story.faq.q1": "¿Qué significa el nombre del ministerio?",
      "story.faq.a1": "Luz a las Naciones significa Light to the Nations en inglés.",
      "story.faq.q2": "¿Cuándo se fundó?",
      "story.faq.a2": "En 2018.",
      "story.faq.q3": "¿Quién lo dirige?",
      "story.faq.a3": "Harry",
      "story.faq.a3.need": "[NEED: apellido, sin confirmar]",
      "story.faq.q4": "¿Por qué Poptún?",
      "story.faq.a4.need": "[NEED: lo mismo que la sección Por qué Poptún]",
      "prog.page.eyebrow": "Programas · Índice 01-04",
      "prog.page.title": "Aquí ocurren cuatro cosas, semana tras semana",
      "prog.page.lede": "Un equipo visitante casi siempre puede sumarse directamente a por lo menos una de ellas.",
      "prog.page.toc": "Índice",
      "prog.help.title": "Cómo puedes ayudar",
      "prog.help.need": "[NEED: cuáles de estas opciones aplican realmente a este programa: traer un equipo, donar suministros, apoyar los costos de las instalaciones o del programa, patrocinar materiales. Confirmar por programa antes de publicar cualquiera de ellas.]",
      "prog.ask": "Pregunta por este programa",
      "prog.faq.q1": "¿Puede un equipo visitante servir directamente en uno de estos programas?",
      "prog.faq.a1.need": "[NEED: respuesta real de Harry o Gary]",
      "prog.faq.q2": "¿Puede un donante apoyar un programa específico?",
      "prog.faq.a2": "Depende de cómo se organice la donación, algo que aún se está decidiendo.",
      "prog.faq.a2.need": "[NEED: decisión sobre el mecanismo de donación]",
      "visit.title": "Trae a tu equipo a nuestra base en Poptún",
      "visit.sub": "Si tu iglesia quiere enviar un equipo y no solo un cheque, esto es a lo que lo estaría enviando.",
      "visit.photo.need": "[NEED: foto del salón de adoración o del espacio de convenciones]",
      "visit.cta.plan": "Empieza a planificar un viaje",
      "visit.cta.programs": "Conoce los programas",
      "visit.facts.eyebrow": "Datos de las instalaciones",
      "visit.facts.title": "Lo que hay aquí",
      "visit.facts.1": "Aproximadamente de 12,000 a 15,000 pies cuadrados, en dos pisos",
      "visit.facts.2": "Habitaciones más un dormitorio con literas para equipos visitantes",
      "visit.facts.3": "Cocina industrial completa",
      "visit.facts.4": "Salón de adoración en el piso de arriba, usado también como espacio de convenciones",
      "visit.facts.need1": "[NEED: número exacto de camas y de baños]",
      "visit.facts.need2": "[NEED: aeropuerto o ciudad más cercana a la que suelen volar los equipos]",
      "visit.provide.eyebrow": "Expectativas",
      "visit.provide.title": "Lo que nosotros proveemos y lo que provee tu equipo",
      "visit.provide.we": "Nosotros proveemos",
      "visit.provide.you": "Tu equipo provee",
      "visit.provide.we.need": "[NEED: la lista real de Harry o Gary, por ejemplo alojamiento o acceso a la cocina. Aún no está documentada en ningún lado.]",
      "visit.provide.you.need": "[NEED: la lista real de Harry o Gary, por ejemplo el viaje o los artículos personales. Aún no está documentada en ningún lado.]",
      "visit.trip.title": "Cómo es un viaje",
      "visit.trip.need": "[NEED, totalmente sin documentar: logística de llegada, ritmo de un día típico, comidas, qué hacen los equipos realmente aquí, transporte desde el aeropuerto, notas de seguridad. Pendiente de Harry y Gary. A propósito no se escribe aquí ninguna logística provisional, porque un líder de iglesia podría planificar un viaje real a partir de detalles inventados.]",
      "visit.fit.title": "Qué equipos encajan",
      "visit.fit.need": "[NEED: tamaño de equipo y duración de viaje ideales, y si hay equipos que no encajan bien]",
      "visit.faq.q1": "¿Cuál es el tamaño de equipo y la duración de viaje ideales?",
      "visit.faq.a1.need": "[NEED: tamaño del equipo y duración del viaje]",
      "visit.faq.q2": "¿Con cuánta anticipación debemos planificar?",
      "visit.faq.a2": "Si aún no lo tienes claro, envíanos fechas posibles y nos organizamos en torno a ellas.",
      "visit.faq.a2.need": "[NEED: con cuánta anticipación deben planificar los equipos]",
      "visit.faq.q3": "¿Cómo funcionan el alojamiento y las comidas?",
      "visit.faq.a3": "Habitaciones más un dormitorio con literas para el equipo, y una cocina industrial completa pensada para comidas en grupo.",
      "visit.faq.a3.need": "[NEED: la respuesta completa, pendiente de la sección sobre el viaje]",
      "visit.faq.q4": "¿Y el transporte?",
      "visit.faq.a4.need": "[NEED: detalles de transporte]",
      "visit.faq.q5": "¿Qué idioma necesitamos?",
      "visit.faq.a5.need": "[NEED: qué idioma necesita un equipo]",
      "visit.faq.q6": "¿Cómo es un día típico?",
      "visit.faq.a6": "Cada viaje es un poco distinto. Cuéntanos tus objetivos y organizamos el día en torno a ellos.",
      "visit.faq.a6.need": "[NEED: el ritmo de un día típico]",
      "give.eyebrow": "Donar",
      "give.title": "Un ministerio que funciona con fe y unos cuantos amigos fieles",
      "give.lede": "Hoy el apoyo viene de un círculo pequeño y comprometido alrededor de Gary y Harry. Cada donación mantiene las luces encendidas, la cocina abastecida y la puerta abierta para el próximo equipo.",
      "give.how.eyebrow": "Cómo donar hoy",
      "give.how.title": "Escríbenos y lo organizamos contigo",
      "give.how.body": "Envía un mensaje desde la página de Contacto y organizamos tu donación contigo.",
      "give.how.cta": "Escríbenos para donar",
      "give.tax.eyebrow": "Recibos y estatus fiscal",
      "give.tax.need": "[NEED: deducibilidad fiscal y estatus de los recibos. Si las donaciones son deducibles, decirlo con claridad y explicar cómo se emite el recibo. Si no lo son, decirlo sin rodeos. Hasta que se responda, nada en esta página implica ninguna de las dos cosas.]",
      "give.faq.q1": "¿Cómo se usa mi donación?",
      "give.faq.a1.need": "[NEED: como mínimo una respuesta general, confirmada con Gary y no inventada]",
      "give.faq.q2": "¿Puedo recibir un recibo?",
      "give.faq.a2.need": "[NEED: depende por completo de la respuesta sobre el estatus fiscal]",
      "give.faq.q3": "¿Puedo donar a un programa específico?",
      "give.faq.a3": "Todavía no. Donar a un programa específico, por ejemplo financiar un regalo de El Regalo Perfecto, está previsto para una versión posterior, cuando exista el mecanismo de donación.",
      "give.faq.q4": "¿Se puede donar sin usar internet?",
      "give.faq.a4.need": "[NEED: si es posible donar sin usar internet, y cómo]",
      "give.faq.q5": "¿Cómo puedo donar ahora mismo?",
      "give.faq.a5": "Escríbenos desde la página de Contacto y lo organizamos contigo.",
      "give.faq.a5.need": "[NEED: mecanismo de donación, aún por decidir]",
      "contact.title": "Ponte en contacto",
      "contact.form.title": "Envía un mensaje",
      "contact.form.name": "Nombre",
      "contact.form.email": "Correo electrónico",
      "contact.form.phone": "Teléfono (opcional)",
      "contact.form.message": "Mensaje",
      "contact.form.submit": "Enviar mensaje",
      "contact.form.sent": "Tu mensaje va en camino.",
      "contact.direct.title": "Contáctanos directamente",
      "contact.direct.email": "Correo electrónico",
      "contact.direct.phone": "Teléfono",
      "contact.direct.social": "Facebook y Telegram",
      "contact.direct.location": "Ubicación",
      "contact.faq.q1": "¿Qué tan rápido recibiré respuesta?",
      "contact.faq.q2": "¿Cuál es el mejor canal?",
      "contact.faq.a2.need": "[NEED: si Harry realmente revisa el correo, o si WhatsApp o el teléfono funcionan mejor. Preguntarlo directamente en vez de asumir que el correo es el canal principal.]",
      "contact.faq.q3": "¿Qué debo incluir en mi mensaje?",
      "contact.faq.a3": "Cuéntanos si escribes por recibir un equipo, por una donación o por otro motivo. Nos ayuda a dirigir tu mensaje a la persona correcta."
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

    // Home uses doc.*; interior pages declare data-page on <body> and use page.<name>.*
    var page = document.body ? document.body.getAttribute("data-page") : null;
    var titleKey = page ? "page." + page + ".title" : "doc.title";
    var descKey = page ? "page." + page + ".description" : "doc.description";
    if (lookup(titleKey)) document.title = lookup(titleKey);
    var desc = document.querySelector('meta[name="description"]');
    if (desc && lookup(descKey)) desc.setAttribute("content", lookup(descKey));

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
