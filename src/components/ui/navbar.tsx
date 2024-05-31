'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Settings2, User, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { disableNavWithFooter } from '@/src/lib/constants';
import { cn } from '@/src/lib/utils';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from './navigation-menu';
import { MobileLanguageToggle } from './language-toggle';
import Card from './bordered-card';

export const Navbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const path = usePathname();

  const isDashboardPath = path.startsWith('/dashboard') || disableNavWithFooter.includes(path);

  const session = useSession();

  const itemOptions = [
    { label: 'Helmet', size: 2, id: 'Helmet', image: 'Dragon Winged Helmet' },
    {
      label: 'Armor',
      size: 1,
      id: 'Armor',
      image: 'Golden Dragon Scale Armor',
    },
    { label: 'Ring', size: 1, id: 'Ring', image: 'Power Ring' },
    { label: 'Tool', size: 2, id: 'Tool', image: 'Crest of Fire' },
    { label: 'Legs', size: 2, id: 'Legs', image: 'Chromatic Legs' },
    { label: 'Boots', size: 1, id: 'Boots', image: 'Kajin Boots' },
  ];

  const tools = [
    {
      label: 'Bless Calculator',
      id: 'blessCalculator',
      href: '/tools/bless-calculator',
    },
    {
      label: 'Set Calculator',
      id: 'setCalculator',
      href: '/tools/set-calculator',
    },
    { label: 'Tasks List', id: 'tasksList', href: '/tools/task-calculator' },
    { label: 'Game Map', id: 'gameMap', href: '/map' },
    { label: 'Forge Calculator', id: 'forgeCalculator', href: '/tools/forge-calculator' },
  ];

  return (
    !isDashboardPath && (
      <header className='z-50 h-16 w-full'>
        <nav className='flex w-full items-center justify-between px-8 py-8 lg:py-4'>
          <Link className='flex flex-row flex-nowrap items-center justify-center' href='/'>
            <Image
              className='h-6 w-6'
              alt='Kakele Online'
              height={64}
              src={
                'https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/Birthday Cake Slice.png'
              }
              width={64}
            />
            <div className={cn('flex flex-row flex-nowrap font-pixAntiqua font-bold text-white')}>
              Kakele <span className='font-bold text-orange-500'>Wiki</span>
            </div>
          </Link>
          <div className='hidden w-full flex-row items-center justify-end lg:flex'>
            <div className='ml-20 w-full px-8'>
              <NavigationMenu className='list-none'>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className='bg-transparent'>{t('navbar.items.label')}</NavigationMenuTrigger>
                  <NavigationMenuContent className='bg-stone-950'>
                    <ul className='grid w-[500px] grid-cols-2 gap-3 p-1'>
                      <div
                        className='relative rounded-lg'
                        style={{
                          backgroundImage: 'url(/img/decorations/navbar.jpeg)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      >
                        <div className='flex h-fit w-fit flex-col items-start justify-start'>
                          <div className='h-fit w-full justify-end'>
                            <div
                              className='absolute bottom-0 flex h-[10rem] w-full'
                              style={{
                                background: 'linear-gradient(to top, rgba(20, 17, 15, 1) 0%, rgba(0, 0, 0, 0) 100%)',
                              }}
                            />
                            <Image
                              alt='Kakele Items'
                              className='aspect-square h-[12rem] p-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'
                              height={200}
                              src={
                                'https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/Kajin%20Helmet.png'
                              }
                              width={200}
                            />
                            <div className='z-50 m-2 flex flex-col drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'>
                              <span className='text-2xl font-bold'>{t('navbar.items.title')}</span>
                              <span className='text-xs'>{t('navbar.items.subhead')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 items-center justify-center gap-2 p-2'>
                        {itemOptions.map((item) => (
                          <Link className='w-full h-full' href={`/items?filter=${item.id}`} key={item.id}>
                            <Card
                              noPadding
                              className='flex h-full w-full flex-col items-center justify-center bg-stone-900 p-1'
                            >
                              <Image
                                alt={item.label}
                                height={40}
                                src={`https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/${item.image}.png`}
                                width={40}
                              />
                              <span className='text-md ml-2'>
                                {t(`kakele.itemTypes.${item.id.replaceAll(' ', '')}`)}
                              </span>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className='bg-transparent'>{t('navbar.tools.label')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid w-[500px] grid-cols-2 gap-3 p-1'>
                      <div
                        className='relative rounded-lg'
                        style={{
                          backgroundImage: 'url(/img/decorations/navbar.jpeg)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      >
                        <div className='flex h-fit w-fit flex-col items-start justify-start'>
                          <div className='h-fit w-full justify-end'>
                            <div
                              className='absolute bottom-0 flex h-[10rem] w-full'
                              style={{
                                background: 'linear-gradient(to top, rgba(20, 17, 15, 1) 0%, rgba(0, 0, 0, 0) 100%)',
                              }}
                            />
                            <Image
                              alt='Kakele Items'
                              className='aspect-square h-[12rem] p-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'
                              height={200}
                              src={
                                'https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/Navigation Map.png'
                              }
                              width={200}
                            />
                            <div className='z-50 m-2 flex flex-col drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'>
                              <span className='text-2xl font-bold'>{t('navbar.tools.title')}</span>
                              <span className='text-xs'>{t('navbar.tools.subhead')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex h-full w-full flex-col items-center justify-center gap-2 p-1'>
                        {tools.map((item) => (
                          <Link className='w-full h-full' href={item.href} key={item.id}>
                            <Card
                              noPadding
                              className='flex h-full w-full flex-col items-center justify-center p-1'
                            >
                              <span className='text-md ml-2'>{t(`navbar.tools.${item.id}`)}</span>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenu>
            </div>
            <Link href={session.data?.user ? '/dashboard' : '/login'}>
              <button
                className='flex animate-buttonheartbeat flex-row items-center justify-center gap-2 rounded-md bg-orange-800/40 px-4 py-1 text-sm font-semibold text-white'
                type='button'
              >
                {session.data?.user ? <Settings2 size={16} /> : <User size={16} />}
                {session.data?.user ? 'Dashboard' : 'Login'}
              </button>
            </Link>
          </div>
          <div className='cursor-pointer lg:hidden' onClick={toggleMenu}>
            <Menu />
          </div>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.div
              animate='animate'
              className='fixed left-0 top-0 z-[999] h-screen w-full origin-top bg-stone-900 p-10 text-white backdrop-blur-xl'
              exit='exit'
              initial='initial'
              variants={{
                initial: {
                  scaleY: 0,
                },
                animate: {
                  scaleY: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
                exit: {
                  origin: 'bottom',
                  opacity: 0,
                  transition: {
                    delay: 0.5,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <div className='flex h-full flex-col'>
                <div className='flex justify-between'>
                  <Link className='flex flex-row flex-nowrap items-center justify-center' href='/'>
                    <Image
                      className='h-6 w-6'
                      alt='Kakele Online'
                      height={64}
                      src={
                        'https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/Birthday Cake Slice.png'
                      }
                      width={64}
                    />
                    <div className={cn('flex flex-row flex-nowrap font-pixAntiqua font-bold text-white')}>
                      Kakele <span className='font-bold text-orange-500'>Wiki</span>
                    </div>
                  </Link>
                  <p className='text-md cursor-pointer text-white' onClick={toggleMenu}>
                    <X />
                  </p>
                </div>
                <motion.div
                  animate='open'
                  className='font-lora flex h-full max-w-[90vw] flex-col items-start justify-between gap-4'
                  exit='initial'
                  initial='initial'
                  variants={containerVars}
                >
                  <motion.div
                    animate='open'
                    className='mt-12 flex h-fit w-full flex-wrap items-start justify-start gap-2 gap-x-12'
                    exit='initial'
                    initial='initial'
                    variants={containerVars}
                  >
                    <motion.div
                      className='flex h-fit w-fit flex-col items-start justify-start gap-2'
                      variants={mobileLinkVars}
                    >
                      <div className='flex flex-col gap-2'>
                        <div className='relative py-2'>
                          <h2 className='__className_d6dd13 text-3xl uppercase'>{t('navbar.items.title')}</h2>
                          <div
                            className='absolute -bottom-1 flex h-2 w-full items-center justify-center'
                            style={{
                              background: 'linear-gradient(to right, rgba(245,93,39,0.8) 0%, rgba(0, 0, 0, 0) 100%)',
                            }}
                          />
                        </div>

                        <motion.div animate='open' exit='initial' initial='initial' variants={containerVars}>
                          {itemOptions.map((option) => (
                            <motion.div
                              key={option.id}
                              variants={{
                                initial: {
                                  x: 30,
                                  transition: {
                                    duration: 0.5,
                                    ease: [0.37, 0, 0.63, 1],
                                  },
                                },
                                open: {
                                  x: 0,
                                  transition: {
                                    ease: [0, 0.55, 0.45, 1],
                                    duration: 0.7,
                                  },
                                },
                              }}
                            >
                              <Link href={`/items?filter=${option.id}`}>{t(`kakele.itemTypes.${option.id}`)}</Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                    <motion.div
                      className='flex h-fit w-fit flex-col items-start justify-start gap-2'
                      variants={mobileLinkVars}
                    >
                      <div className='flex flex-col gap-2'>
                        <div className='relative py-2'>
                          <h2 className='__className_d6dd13 text-3xl uppercase'>{t('navbar.tools.title')}</h2>
                          <div
                            className='absolute -bottom-1 flex h-2 w-full items-center justify-center'
                            style={{
                              background: 'linear-gradient(to right, rgba(245,93,39,0.8) 0%, rgba(0, 0, 0, 0) 100%)',
                            }}
                          />
                        </div>

                        <motion.div animate='open' exit='initial' initial='initial' variants={containerVars}>
                          {tools.map((option) => (
                            <motion.div
                              key={option.id}
                              variants={{
                                initial: {
                                  x: 30,
                                  transition: {
                                    duration: 0.5,
                                    ease: [0.37, 0, 0.63, 1],
                                  },
                                },
                                open: {
                                  x: 0,
                                  transition: {
                                    ease: [0, 0.55, 0.45, 1],
                                    duration: 0.7,
                                  },
                                },
                              }}
                            >
                              <Link href={option.href}>{t(`navbar.tools.${option.id}`)}</Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className='flex w-full flex-col items-center justify-center gap-2'
                    variants={mobileLinkVars}
                  >
                    <Link href={session.data?.user ? '/dashboard' : '/login'}>
                      <button
                        className='text-md relative flex items-center justify-center gap-2 rounded-md p-2 px-4 font-bold uppercase text-gray-300 transition-colors duration-400 hover:bg-stone-800 hover:text-white focus:text-white focus:outline-none'
                        type='button'
                      >
                        {session.data?.user ? <Settings2 size={16} /> : <User size={16} />}
                        {session.data?.user ? 'Dashboard' : 'Login'}
                      </button>
                    </Link>
                    <MobileLanguageToggle />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    )
  );
};

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            ref={ref}
            {...props}
          >
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

const mobileLinkVars = {
  initial: {
    y: '30vh',
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

const containerVars = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delay: 0.5,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};
