// The contact and newsletter forms in the browser (map ticket 13). The forms work
// without this script (netlify/functions/forms.mts takes a plain post); it adds:
//  - the load time in each form's hidden `ts` field, which the function uses to
//    flag submissions sent sooner than a person could type;
//  - the live phone mask, (999) 999-9999 as typed (jquery.maskedinput live, ticket 09);
//  - the message for ?form=missing or ?form=failed, which the function sends the
//    visitor back with, in the form's red message line (the empty
//    <p style="color:red"> the live forms carry); the newsletter modal reopens.

const PHONE = '(904) 759-7902';
const EMAIL = 'info@gatewaybusinessadvisors.com';
const MESSAGES: Record<string, { contact: string; newsletter: string }> = {
  missing: {
    contact: 'Please enter your first name and a valid email address.',
    newsletter: 'Please enter a valid email address.',
  },
  failed: {
    contact: `Sorry, your message could not be sent. Please call ${PHONE} or email ${EMAIL}.`,
    newsletter: `Sorry, we could not add you to the newsletter. Please try again later or email ${EMAIL}.`,
  },
};

function formatPhone(value: string): string {
  const d = value.replace(/\D/g, '').replace(/^1(?=\d{10})/, '').slice(0, 10);
  if (d.length <= 3) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function initForms(): void {
  const now = String(Date.now());
  document.querySelectorAll<HTMLInputElement>('form input[name="ts"]').forEach((i) => { i.value = now; });

  document.querySelectorAll<HTMLInputElement>('form input[name="phone"]').forEach((input) => {
    input.addEventListener('input', () => {
      const formatted = formatPhone(input.value);
      if (formatted !== input.value) input.value = formatted;
    });
  });

  const problem = new URLSearchParams(location.search).get('form');
  if (!problem || !(problem in MESSAGES)) return;
  if (location.hash === '#frm_newsletter') {
    const slot = document.getElementById('newsletter-message');
    if (slot) { slot.textContent = MESSAGES[problem].newsletter; slot.hidden = false; }
    document.querySelector<HTMLElement>('.opnnewslettr')?.click();
  } else {
    const form = document.getElementById('frm_contactus');
    const slot = form?.closest('.contact, .contactForm')?.querySelector<HTMLElement>('p[style*="color:red"]');
    if (slot) slot.textContent = MESSAGES[problem].contact;
  }
}
