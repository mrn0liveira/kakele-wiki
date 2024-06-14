'use client';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useRef } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';

import { type Language, getOptions } from '@/src/lib/i18n/settings';

import zodMessagesPt from '@/src/lib/i18n/locales/pt/zod';
import zodMessagesEn from '@/src/lib/i18n/locales/en/zod';
import zodMessagesEs from '@/src/lib/i18n/locales/es/zod';
import zodMessagesPl from '@/src/lib/i18n/locales/pl/zod';

import commonPt from '@/src/lib/i18n/locales/pt/common';
import commonEn from '@/src/lib/i18n/locales/en/common';
import commonEs from '@/src/lib/i18n/locales/es/common';
import commonPl from '@/src/lib/i18n/locales/pl/common';

import navbarPt from '@/src/lib/i18n/locales/pt/navbar';
import navbarEn from '@/src/lib/i18n/locales/en/navbar';
import navbarEs from '@/src/lib/i18n/locales/es/navbar';
import navbarPl from '@/src/lib/i18n/locales/pl/navbar';

import monstersPt from '@/src/lib/i18n/locales/pt/monsters';
import monstersPl from '@/src/lib/i18n/locales/pl/monsters';
import monstersEn from '@/src/lib/i18n/locales/en/monsters';
import monstersEs from '@/src/lib/i18n/locales/es/monsters';

import setCalculatorPt from '@/src/lib/i18n/locales/pt/set-calculator';
import setCalculatorEn from '@/src/lib/i18n/locales/en/set-calculator';
import setCalculatorPl from '@/src/lib/i18n/locales/pl/set-calculator';
import setCalculatorEs from '@/src/lib/i18n/locales/es/set-calculator';

export const langaugeCookieExpirationTimeMs = 1000 * 60 * 60 * 24 * 365;

void i18next
  //@ts-ignore
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: Language, namespace: string, callback: any) => {
      import(`@/src/lib/i18n/locales/${language}/${namespace}.ts`)
        .then((resources) => {
          callback(null, resources);
        })
        .catch((error) => {
          callback(error, null);
        });
    })
  )
  .init({
    ...getOptions(),
    resources: {
      pt: {
        zod: zodMessagesPt,
        common: commonPt,
        navbar: navbarPt,
        monsters: monstersPt,
        setCalculator: setCalculatorPt,
      },
      en: {
        zod: zodMessagesEn,
        common: commonEn,
        navbar: navbarEn,
        monsters: monstersEn,
        setCalculator: setCalculatorEn,
      },
      es: {
        zod: zodMessagesEs,
        common: commonEs,
        navbar: navbarEs,
        monsters: monstersEs,
        setCalculator: setCalculatorEs,
      },
      pl: {
        zod: zodMessagesPl,
        common: commonPl,
        navbar: navbarPl,
        monsters: monstersPl,
        setCalculator: setCalculatorPl,
      },
    },
    lng: undefined,
    detection: {
      order: ['cookie', 'querystring', 'htmlTag', 'navigator'],
      caches: ['cookie'],
      cookieOptions: {
        expires: new Date(Date.now() + langaugeCookieExpirationTimeMs),
      },
    },
  });
z.setErrorMap(zodI18nMap);
export const I18NextProvider = ({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage: Language;
}) => {
  const languacheChangedRef = useRef(false);
  const [, i18Next] = useTranslation();

  if (i18Next.language !== initialLanguage && !languacheChangedRef.current) {
    void i18Next.changeLanguage(initialLanguage);
    languacheChangedRef.current = true;
    z.setErrorMap(zodI18nMap);
  }

  return <>{children}</>;
};
