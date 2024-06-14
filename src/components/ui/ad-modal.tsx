'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Frown, X } from 'lucide-react';
import { useCookies } from 'next-client-cookies';
import Image from 'next/image';
import Link from 'next/link';

export default function AdModal({ text1, text2, text3 }: { text1: string; text2: string; text3: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const cookieStore = useCookies();
  const lastAd = cookieStore.get('coinshub-modal-ad');

  const setCookie = () => {
    cookieStore.set('coinshub-modal-ad', 'true', {
      expires: new Date(Date.now() + 20 * 60 * 1000),
    });
  };

  useEffect(() => {
    if (!lastAd) {
      setIsOpen(true);
    }
  }, [lastAd]);

  if (isOpen)
    return (
      <motion.div
        animate={{ opacity: 1 }}
        className='no-scrollbar fixed inset-0 z-[999] grid h-screen cursor-pointer place-items-center items-center justify-center overflow-auto overflow-x-hidden overflow-y-scroll bg-black/60 p-8 backdrop-blur-md'
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
      >
        <div className='absolute right-4 top-4'>
          <X
            onClick={() => {
              setIsOpen(false);
              setCookie();
            }}
            size={24}
          />
        </div>
        <div className='z-[60] flex flex-col items-center justify-end rounded-lg bg-transparent'>
          <motion.div
            animate={{
              opacity: 1,
              y: 0,
            }}
            className='z-[70] flex max-w-[90vw] flex-col items-center justify-center'
            initial={{
              opacity: 0,
              y: 100,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
          >
            <Link href='https://coinshub.com.br/affiliate/biridim/'>
              <div
                className='relative flex max-w-[90vw] flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border-[2px] border-white/20 bg-cover bg-center p-4 px-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] transition-all lg:flex-row'
                style={{
                  backgroundImage:
                    'url(https://res.cloudinary.com/dbkrvt2x0/image/upload/v1715882864/kakele-wiki/background/fmjsfk5yb2ush4si68b6.jpg)',
                }}
              >
                <Image
                  alt='Coinshub'
                  className='z-50 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] transition-all'
                  height={100}
                  src='https://res.cloudinary.com/dbkrvt2x0/image/upload/v1716930792/kakele-wiki/icons/shop.png'
                  width={100}
                />
                <div
                  className='absolute bottom-0 flex h-[10rem] w-full items-center justify-center'
                  style={{
                    background: 'linear-gradient(to top, rgba(20, 17, 15, 1) 0%, rgba(0, 0, 0, 0) 100%)',
                  }}
                />
                <h3 className='z-50 text-center text-xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] lg:text-3xl'>
                  <span className='text-xs font-semibold lg:text-lg'>{text1}</span> <br /> {text2}{' '}
                  <span className='text-orange-400'>CoinsHub</span>
                </h3>
              </div>
            </Link>
            <span
              className='txt-xs relative mt-4 flex items-center justify-center rounded-md border-[1px] border-white/10 bg-red-900/20 px-4 font-bold transition-all hover:bg-red-900/60'
              onClick={() => {
                setCookie();
                setIsOpen(false);
              }}
              onKeyDown={() => {
                setCookie();
                setIsOpen(false);
              }}
            >
              <Frown
                className='relative -left-12 rounded-full border-[1px] border-white/20 bg-red-900 p-[2px]'
                size={24}
              />
              {text3}
            </span>
          </motion.div>
        </div>
      </motion.div>
    );
}
