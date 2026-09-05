import { getRelativeLocaleUrl } from 'astro:i18n';
import { ui, defaultLang, type Lang, type UiKey } from './ui';

export type { Lang, UiKey };
export { languages, defaultLang } from './ui';

/** Page ids and their URL slugs. Same slugs in both locales for now. */
export const pages = {
  home: '',
  story: 'our-story',
  programs: 'programs',
  visit: 'visit',
  give: 'give',
  contact: 'contact',
} as const;
export type PageId = keyof typeof pages;

/** The `[...locale]` rest param is undefined for English (root) and "es" for Spanish. */
export function localeFromParams(param: string | undefined): Lang {
  return param === 'es' ? 'es' : defaultLang;
}

/** getStaticPaths for every page: one root (English) path, one /es/ path. */
export function localePaths() {
  return [{ params: { locale: undefined } }, { params: { locale: 'es' } }];
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Locale-aware URL for a page id, built by Astro's own i18n helper. */
export function href(lang: Lang, page: PageId): string {
  return getRelativeLocaleUrl(lang, pages[page]);
}
