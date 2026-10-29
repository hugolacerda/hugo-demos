// Copies each contact-form inquiry into GoHighLevel (Oct 29, 2026).
//
// Netlify runs a function with this exact name after every form submission it
// accepts; spam it catches (honeypot, Akismet) never gets here. Netlify Forms
// keeps doing everything it did before: it stores the submission and emails it
// to Gary. This only adds the GHL copy, so if GHL is down or the token is
// missing, nothing changes for the visitor or for Gary's email; the error shows
// in the Netlify function log.
//
// In the SBV sub-account: upsert the contact by email, set Source, tag it
// sbv-website-form plus one sbv-source-<channel> tag, and add a note with the
// message, the interest picked and where the visitor came from (first visit and
// this visit, filled in by assets/js/main.js and contact.js).
//
// GHL_SBV_TOKEN: a Private Integration token of the SBV sub-account with the
// contacts scopes, set as a Netlify environment variable on the sbv site only
// (Functions scope). Named apart from the GBA rebuild's GHL_TOKEN, which holds
// the GBA sub-account's token on that site.
//
// This folder sits inside the published sbv/ folder; _redirects keeps
// /netlify/* from being served as files.

const API = 'https://services.leadconnectorhq.com';
const LOCATION_ID = 'ETrWQNJ5xzOqQPGGXk5a'; // SBV sub-account (not a secret)
const SOURCE = 'SBV website contact form';
const TAG_FORM = 'sbv-website-form';
const INTERESTS = {
  valuation: 'Business Valuation',
  exit: 'Exit Planning',
  advisory: 'Buy-Sell Advisory',
  general: 'General Inquiry',
  other: 'Other',
};

const SEARCH = /(^|\.)(google|bing|duckduckgo|yahoo|ecosia|brave|yandex|baidu)\./;
const AI = /(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|you\.com)$/;
const SOCIAL = /(^|\.)(facebook\.com|fb\.com|instagram\.com|linkedin\.com|lnkd\.in|t\.co|x\.com|twitter\.com|youtube\.com|reddit\.com)$/;

// One word for how the visitor first arrived, used in the tag: search, ai,
// social, paid, email, campaign, referral or direct.
export function channel(referrer, utm) {
  const u = (utm || '').toLowerCase();
  if (/\bgclid\b|\|(cpc|ppc|paid)/.test(u)) return { name: 'paid', detail: utm };
  if (/\|email\|?/.test(u)) return { name: 'email', detail: utm };
  if (u.replace(/[|\s]/g, '')) return { name: 'campaign', detail: utm };
  let host = '';
  try { host = new URL(referrer).host.replace(/^www\./, ''); } catch (e) {}
  if (!host) return { name: 'direct', detail: '' };
  if (AI.test(host)) return { name: 'ai', detail: host };
  if (SEARCH.test(host + '.')) return { name: 'search', detail: host };
  if (SOCIAL.test(host)) return { name: 'social', detail: host };
  return { name: 'referral', detail: host };
}

// GHL wants a full number; anything that isn't a plain US number stays in the note only.
export function phone(raw) {
  const d = (raw || '').replace(/\D/g, '');
  if (d.length === 10) return '+1' + d;
  if (d.length === 11 && d[0] === '1') return '+' + d;
  return undefined;
}

async function ghl(path, token, body) {
  const res = await fetch(API + path, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GHL ${path}: ${res.status} ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

export const handler = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body).payload;
  } catch (e) {
    console.error('submission-created: unreadable event body');
    return { statusCode: 200 };
  }
  if (payload.form_name !== 'contact') return { statusCode: 200 };

  const f = payload.data || {};
  const email = (f.email || '').trim();
  const token = process.env.GHL_SBV_TOKEN;
  if (!email) return { statusCode: 200 };
  if (!token) {
    console.error('submission-created: GHL_SBV_TOKEN is not set; inquiry stays in Netlify Forms only');
    return { statusCode: 200 };
  }

  const ch = channel(f.first_referrer, f.first_utm);
  const interest = INTERESTS[f.interest] || 'Not chosen';
  let submittedFrom = '';
  try { submittedFrom = new URL(f.referrer).pathname; } catch (e) {}
  const note = [
    `${SOURCE}${submittedFrom ? ` (${submittedFrom})` : ''}`,
    `Interested in: ${interest}`,
    `Message: ${(f.message || '').trim() || '(none)'}`,
    ...(phone(f.phone) || !f.phone ? [] : [`Phone as typed: ${f.phone}`]),
    '',
    `How they found us: ${ch.name}${ch.detail ? ` (${ch.detail})` : ''}`,
    `First visit: ${f.first_seen || 'unknown'}, landed on ${f.first_landing || 'unknown'}, from ${f.first_referrer || 'no referrer'}`,
    `This visit: landed on ${f.visit_landing || 'unknown'}, from ${f.visit_referrer || 'no referrer'}`,
  ].join('\n');

  try {
    const { contact } = await ghl('/contacts/upsert', token, {
      locationId: LOCATION_ID,
      email,
      firstName: (f.firstName || '').trim() || undefined,
      lastName: (f.lastName || '').trim() || undefined,
      phone: phone(f.phone),
      source: SOURCE,
    });
    await ghl(`/contacts/${contact.id}/tags`, token, { tags: [TAG_FORM, `sbv-source-${ch.name}`] });
    await ghl(`/contacts/${contact.id}/notes`, token, { body: note });
    console.log(`submission-created: saved to GHL contact ${contact.id} (${ch.name})`);
  } catch (e) {
    console.error(`submission-created: ${String(e)}`);
  }
  return { statusCode: 200 };
};
