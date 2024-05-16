'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <Image
          src={
            new URL(
              'https://res.cloudinary.com/dl3asnoii/image/upload/v1713726404/sprites/items/Compass of Enlightenment.png'
            ).href
          }
          alt='404'
          width={200}
          height={200}
        />
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-3xl font-bold'>{t('notFound.title')}</h2>
          <h3 className='text-md'>{t('notFound.subtitle')}</h3>
          <Link className='text-md text-orange-500' href='/'>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
