'use client';

import { ThemeProvider } from 'next-themes';

import type { Language } from '@/src/lib/i18n/settings';

import { Toaster } from '../ui/sonner';

import { I18NextProvider } from './i18next-provider';

interface ComponentProps {
  children: React.ReactNode;
  initialLanugage: Language;
}

export default function ClientSideProviders({ children, initialLanugage }: ComponentProps) {
  return (
    <I18NextProvider initialLanguage={initialLanugage}>
      <ThemeProvider
        defaultTheme='dark'
        enableColorScheme
        themes={['dark', 'dark-classic', 'tangerine', 'dark-tangerine', 'mint', 'dark-mint']}
      >
        <Toaster />
        {children}
      </ThemeProvider>
    </I18NextProvider>
  );
}
