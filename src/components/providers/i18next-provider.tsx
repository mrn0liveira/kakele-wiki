"use client";

import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { useRef } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

import { type Language, getOptions } from "@/src/lib/i18n/settings";
import zodMessages from "@/src/lib/i18n/locales/pt/zod";
import zodMessagesEn from "@/src/lib/i18n/locales/en/zod";
import zodMessagesEs from "@/src/lib/i18n/locales/es/zod";
import zodMessagesPl from "@/src/lib/i18n/locales/pl/zod";
import messages from "@/src/lib/i18n/locales/pt/common";
import messagesEn from "@/src/lib/i18n/locales/en/common";
import messagesEs from "@/src/lib/i18n/locales/es/common";
import messagesPl from "@/src/lib/i18n/locales/pl/common";


export const langaugeCookieExpirationTimeMs = 1000 * 60 * 60 * 24 * 365;

//@ts-ignore
void i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(
		resourcesToBackend(
			(language: string, namespace: string) =>
				import(`../../lib/i18n/locales/${language}/${namespace}.ts`),
		),
	)
	.init({
		...getOptions(),
		resources: {
			pt: {
				zod: zodMessages,
				common: messages,
			},
			en: {
				zod: zodMessagesEn,
				common: messagesEn,
			},
			es: {
				zod: zodMessagesEs,
				common: messagesEs,
			},
			pl: {
				zod: zodMessagesPl,
				common: messagesPl,
			}
		},
		lng: undefined,
		detection: {
			order: ["cookie", "querystring", "htmlTag", "navigator"],
			caches: ["cookie"],
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
	//@ts-ignore
	const [, i18Next] = useTranslation();

	if (i18Next.language !== initialLanguage && !languacheChangedRef.current) {
		void i18Next.changeLanguage(initialLanguage);
		languacheChangedRef.current = true;
		z.setErrorMap(zodI18nMap);
	}

	return <>{children}</>;
};
