'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { Language } from '@/src/lib/i18n/settings';

const languagesMap = [
  {
    label: 'Português',
    icon: 'br',
    id: 'pt',
  },
  {
    label: 'English',
    icon: 'us',
    id: 'en',
  },
  {
    label: 'Español',
    icon: 'es',
    id: 'es',
  },
];

export function MobileLanguageToggle() {
  const [open, setOpen] = useState(false);

  const [t, i18n] = useTranslation();
  const router = useRouter();

  const handleChangeLanguage = async (language: Language) => {
    await i18n.changeLanguage(language);
    await i18n.changeLanguage(language);

    router.refresh();
  };

  return (
    <div className='flex h-4 flex-row items-center justify-center gap-2'>
      {languagesMap.map((item) => (
        <div
          className='flex h-auto w-auto cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md p-1 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-500/50 hover:text-zinc-950'
          key={item.id}
          onClick={() => {
            handleChangeLanguage(item.id as Language);
            setOpen(false);
          }}
          onKeyDown={() => {
            handleChangeLanguage(item.id as Language);
            setOpen(false);
          }}
        >
          <img alt='language flag' src={`https://hatscripts.github.io/circle-flags/flags/${item.icon}.svg`} width='16' />
        </div>
      ))}
    </div>
  );
}

export default function LanguageToggle() {
  const [open, setOpen] = useState(false);

  const [t, i18n] = useTranslation();
  const router = useRouter();

  const handleChangeLanguage = async (language: Language) => {
    await i18n.changeLanguage(language);
    await i18n.changeLanguage(language);
    router.refresh();
  };

  return (
    <div className='flex items-center justify-center'>
      <motion.div animate={open ? 'open' : 'closed'} className='relative'>
        <button
          className='bg-zinc-red/30 -z-10 flex items-center gap-2 rounded-md px-3 py-2 text-indigo-50 transition-colors hover:bg-orange-900'
          onClick={() => setOpen((pv) => !pv)}
          onKeyDown={() => setOpen((pv) => !pv)}
          onMouseEnter={() => setOpen(true)}
          type='button'
        >
          <Image
            alt={'language flag'}
            height={20}
            src={i18n.language === 'pt' ? '/img/flags/br.svg' : '/img/flags/us.svg'}
            width={20}
          />
        </button>

        <motion.ul
          className='absolute left-[50%] top-[120%] flex w-48 flex-col gap-2 overflow-hidden rounded-lg bg-zinc-800/40 p-2 shadow-xl'
          initial={wrapperVariants.closed}
          style={{ originY: 'top', translateX: '-50%' }}
          variants={wrapperVariants}
        >
          {languagesMap.map((item) => (
            <motion.li
              className='flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-md p-2 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-500/50 hover:text-zinc-950'
              key={item.id}
              onClick={() => {
                handleChangeLanguage(item.id as Language);
                setOpen(false);
              }}
              variants={itemVariants}
            >
              <motion.span variants={actionIconVariants}>
                <Image alt={item.label} height={20} src={item.icon} width={20} />
              </motion.span>
              <span className='font-black'>{t(item.label)}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}
const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: 'afterChildren',
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
