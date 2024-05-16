"use client";

import { ThemeProvider } from "next-themes";

import type { Language } from "@/src/lib/i18n/settings";

import { Toaster } from "../ui/sonner";

import { I18NextProvider } from "./i18next-provider";

export default function ClientSideProviders({
	children,
	initialLanugage,
}: {
	children: React.ReactNode;
	initialLanugage: Language;
}) {
	return (
		<I18NextProvider initialLanguage={initialLanugage}>
			<ThemeProvider attribute="class" forcedTheme="dark">
				<Toaster />
				{children}
			</ThemeProvider>
		</I18NextProvider>
	);
}
