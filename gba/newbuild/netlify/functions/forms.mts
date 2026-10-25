// The site's two forms into GoHighLevel (map ticket 13). The contact form
// (src/components/ContactBlock.astro and the /contact-us page) posts to
// /action/contactus and the newsletter form (NewsletterModal.astro) to
// /action/enewsletter, the live addresses, so their markup is unchanged; this
// function answers both. It works without JavaScript: a plain form post, then a
// 303 to /thankyou, or back to the form with ?form=<problem> for src/scripts/forms.ts
// to show in the form's red message line.
//
// Into the GBA sub-account through the GHL API (Hugo, 2026-10-25): upsert the
// contact by email, set Inquiry: Service Type and Inquiry: Message Details (the
// fields the GHL form "GBA Website Contact Form" maps, KB_03 Section 7), add a
// note with the message so a second inquiry does not overwrite the first, and tag
// it. The GHL workflow "GBA Form Submitted" notifies on the tag gba-site-inquiry.
//
// Spam (Hugo, 2026-10-25: honeypot and checks, no captcha): a hidden field bots
// fill (`website`), a submit sooner than 3 s after the page loaded (`ts`, set by
// script; absent without JavaScript, then not held against anyone), and the
// workflow's own rules (a link in the message, a link or digits in the first
// name). Anything flagged is tagged spam-suspect instead and still saved, never
// dropped, so a real person caught by a rule is not lost.
//
// GHL_TOKEN: a Private Integration token of the GBA sub-account with the contacts
// scopes, set by Hugo as a Netlify environment variable (Functions scope, secret).
import type { Config, Context } from '@netlify/functions';

const API = 'https://services.leadconnectorhq.com';
const LOCATION_ID = 'VI80tuHy6XpjOOIv7OqH'; // GBA sub-account (not a secret)
const FIELD_SERVICE_TYPE = 'PT5UrJUUFaaqXHzdTRdV'; // Inquiry: Service Type, options below
const FIELD_MESSAGE = 'lDaSK1eN8qEDSPbcG7Po'; // Inquiry: Message Details (large text)
const SERVICES = new Set(['Selling a Business', 'Business Valuations']);
const TAG_INQUIRY = 'gba-site-inquiry';
const TAG_NEWSLETTER = 'gba-newsletter';
const TAG_SPAM = 'spam-suspect';
const MIN_SECONDS = 3;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINK = /(https?:\/\/|www\.)/i;

type Fields = Record<string, string>;

function back(req: Request, problem: string, anchor: string): Response {
  // Only ever send the visitor back to a page of this site.
  const site = new URL(req.url);
  let to = new URL('/', site);
  const referer = req.headers.get('referer');
  if (referer) {
    const r = new URL(referer);
    if (r.origin === site.origin) to = new URL(r.pathname, site);
  }
  to.searchParams.set('form', problem);
  to.hash = anchor;
  return Response.redirect(to.toString(), 303);
}

function suspect(f: Fields, message: string): string | null {
  if (f.website) return 'honeypot';
  const ts = Number(f.ts);
  if (f.ts && Number.isFinite(ts) && Date.now() - ts < MIN_SECONDS * 1000) return 'too fast';
  if (LINK.test(message)) return 'link in message';
  if (LINK.test(f.firstName ?? '') || /\d/.test(f.firstName ?? '')) return 'link or digits in name';
  return null;
}

async function ghl(path: string, token: string, body: unknown): Promise<any> {
  const res = await fetch(API + path, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, Version: '2021-07-28', 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GHL ${path}: ${res.status} ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

export default async (req: Request, context: Context) => {
  const contact = new URL(req.url).pathname === '/action/contactus';
  const anchor = contact ? 'frm_contactus' : 'frm_newsletter';
  const form = await req.formData();
  const f: Fields = {};
  for (const [k, v] of form.entries()) if (typeof v === 'string') f[k] = v.trim();

  const email = (contact ? f.email : f.emails) ?? '';
  if (!EMAIL.test(email) || (contact && !f.firstName)) return back(req, 'missing', anchor);

  const token = Netlify.env.get('GHL_TOKEN');
  if (!token) {
    console.error('GHL_TOKEN is not set');
    return back(req, 'failed', anchor);
  }

  const message = contact ? (f.comment ?? '') : '';
  const flag = suspect(f, message);
  const source = contact ? 'Website contact form' : 'Website newsletter form';
  const page = (() => {
    try { return new URL(req.headers.get('referer') ?? '').pathname; } catch { return ''; }
  })();

  try {
    const customFields = [];
    if (contact && SERVICES.has(f.serviceneeded)) customFields.push({ id: FIELD_SERVICE_TYPE, field_value: f.serviceneeded });
    if (contact && message) customFields.push({ id: FIELD_MESSAGE, field_value: message });
    const { contact: saved } = await ghl('/contacts/upsert', token, {
      locationId: LOCATION_ID,
      email,
      ...(contact && { firstName: f.firstName, lastName: f.lastname || undefined, phone: f.phone || undefined }),
      source,
      ...(customFields.length && { customFields }),
    });
    const tags = [flag ? TAG_SPAM : contact ? TAG_INQUIRY : TAG_NEWSLETTER];
    await ghl(`/contacts/${saved.id}/tags`, token, { tags });
    const lines = [
      `${source}${page ? ` (${page})` : ''}${flag ? `; flagged spam-suspect: ${flag}` : ''}`,
      ...(contact ? [`Service needed: ${SERVICES.has(f.serviceneeded) ? f.serviceneeded : 'not chosen'}`, `Message: ${message || '(none)'}`] : ['Subscribed to the newsletter']),
    ];
    await ghl(`/contacts/${saved.id}/notes`, token, { body: lines.join('\n') });
  } catch (e) {
    console.error(String(e));
    return back(req, 'failed', anchor);
  }
  return Response.redirect(new URL('/thankyou', req.url).toString(), 303);
};

export const config: Config = {
  path: ['/action/contactus', '/action/enewsletter'],
  method: 'POST',
};
