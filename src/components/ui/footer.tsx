'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { disableNavWithFooter } from '@/src/lib/constants';

export default function Footer() {
  const path = usePathname();

  const isDashboardPath = path.startsWith('/dashboard') || disableNavWithFooter.includes(path);

  return (
    <>
      {isDashboardPath ? (
        <></>
      ) : (
        <footer className='relative mt-40 flex w-full flex-col items-center justify-center gap-2 rounded-md bg-transparent p-4'>
          {/* <div className='absolute bottom-0 w-full'>
            <img className='unselectable w-full' src='/svg/decoration-1.svg' alt='' />
          </div> */}
          <div className='z-10'>
            <p className='whitespace max-w-[100rem]-pre-line justify-center text-center text-xs'>
              © {new Date().getFullYear()} <span className='font-bold text-orange-500'>Kakele Wiki</span> All rights
              reserved.
            </p>
          </div>
        </footer>
      )}
    </>
  );
}
