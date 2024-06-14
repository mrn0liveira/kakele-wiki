import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import localFont from 'next/font/local';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Lora } from 'next/font/google';
import { CookiesProvider } from 'next-client-cookies/server';

import { auth } from '@/auth';
import ClientSideProviders from '@/src/components/providers/client-providers';
import Footer from '@/src/components/ui/footer';
import { Navbar } from '@/src/components/ui/navbar';
import { detectLanguage, useServerTranslation as serverSideTranslation } from '@/src/lib/i18n';
import { cn } from '@/src/lib/utils';
import CoinshubAd from '@/src/components/ui/coinshub-ad';
import AdModal from '@/src/components/ui/ad-modal';

import './globals.css';

const PixAntiqua = localFont({
  src: [
    {
      path: '../../public/fonts/PixAntiqua.ttf',
    },
  ],
  variable: '--font-pixAntiqua',
});

const poppins = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await serverSideTranslation();

  return {
    title: t('seo.homeLayout.title'),
    description: t('seo.homeLayout.description'),
    keywords: t('seo.homeLayout.keywords'),
    metadataBase: new URL('https://kakele.com.br/'),
    openGraph: {
      title: t('seo.homeLayout.title'),
      description: t('seo.homeLayout.description'),
      url: 'https://kakele.com.br/',
      images: [
        {
          type: 'image/png',
          url: 'https://res.cloudinary.com/dbkrvt2x0/image/upload/v1715882892/kakele-wiki/og/og.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title: t('seo.homeLayout.title'),
      description: t('seo.homeLayout.description'),
      images: [
        {
          type: 'image/png',
          url: 'https://res.cloudinary.com/dbkrvt2x0/image/upload/v1715882892/kakele-wiki/og/og.png',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

interface LayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: LayoutProps) {
  const initialLanguage = await detectLanguage();

  const session = await auth();

  const { t } = await serverSideTranslation();

  return (
    <SessionProvider session={session}>
      <html lang={initialLanguage} suppressHydrationWarning>
        <body className={cn(poppins.className, 'bg-background')}>
          <ClientSideProviders initialLanugage={initialLanguage}>
            <CookiesProvider>
              <div className='container flex min-h-full flex-1 flex-col items-center justify-center px-2'>
                <CoinshubAd text={t('home.ad')} />
                <Navbar session={session} />
                {children}
                {/* <div className='fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center gap-2 rounded-full bg-gray-800 p-3 font-mono text-xs text-white'>
                  <div className='block sm:hidden'>xs</div>
                  <div className='hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden'>sm</div>
                  <div className='hidden md:block lg:hidden xl:hidden 2xl:hidden'>md</div>
                  <div className='hidden lg:block xl:hidden 2xl:hidden'>lg</div>
                  <div className='hidden xl:block 2xl:hidden'>xl</div>
                  <div className='hidden 2xl:block'>2xl</div>
                </div> */}
                <AdModal text1={t('coinsHub.modal1')} text2={t('coinsHub.modal2')} text3={t('coinsHub.modal3')} />
                <Footer />
              </div>
            </CookiesProvider>
          </ClientSideProviders>
          <GoogleAnalytics gaId='G-46X65MBKNL' />
        </body>
      </html>
    </SessionProvider>
  );
}
