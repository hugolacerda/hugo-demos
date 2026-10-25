// Site-wide switches. Keep this file small: one place for the choices that the
// map's tickets leave open, so a later ticket flips a value here and nothing else.

// Which font files back the "Trajan Pro" and "Gotham" family names that
// public/css/custom.css uses (map ticket 02; Hugo picked at ticket 10, 2026-10-25).
//   'lookalike' public/fonts/lookalike.css, Cinzel for Trajan Pro and Metropolis for Gotham,
//               size-matched, copied into public/vendor/fonts by scripts/vendor.mjs. What ships.
//   'live'      public/fonts/stylesheet.css, the faces Chuck's server serves (licence open).
//               Test builds only: tests/fidelity.py compares a GBA_FONTS=live build, so its
//               number measures the port, not the font drift. Never deploy it.
// custom.css is served as-is either way: the family names do not change, only the files behind them.
export const FONTS: 'live' | 'lookalike' = process.env.GBA_FONTS === 'live' ? 'live' : 'lookalike';

export const FONT_STYLESHEET = FONTS === 'live' ? '/fonts/stylesheet.css' : '/fonts/lookalike.css';

export const SITE_URL = 'https://gatewaybusinessadvisors.com';
