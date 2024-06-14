'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <div className='relative flex flex-col items-center justify-center'>
        <h1 className='text-9xl'>404</h1>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-3xl font-bold'>{t('notFound.title')}</h2>
          <h3 className='text-xs'>{t('notFound.subtitle')}</h3>
          <Link className='text-md text-orange-500' href='/'>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
