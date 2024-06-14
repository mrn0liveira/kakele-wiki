export const fallbackLng = 'en' as const;
export const languages = [fallbackLng, 'pt', 'es', 'pl'] as const;
export const defaultNamespace: string = 'common';
export type Language = (typeof languages)[number];

export function getOptions(lng: Language = fallbackLng, ns: string = defaultNamespace) {
  return {
    supportedLngs: languages,
    fallbackLng: languages,
    lng,
    fallbackNS: defaultNamespace,
    defaultNS: defaultNamespace,
    ns,
  };
}
