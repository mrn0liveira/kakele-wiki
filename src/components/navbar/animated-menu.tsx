'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import type { AuthSession } from '@/src/types/auth';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Mail, User, X } from 'lucide-react';
import { Divider } from '@nextui-org/react';
import { MobileLanguageToggle } from '../ui/language-toggle';
import { ThemeToggle } from '../themes/theme-toggle';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { signIn, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';

interface ComponentProps {
  session: Session | null;
}

export default function AnimatedMenu({ session }: ComponentProps) {
  const [show, setShow] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { t } = useTranslation(['navbar']);

  const handleClick = (provider: 'google' | 'discord') => {
    signIn(provider);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <div className='relative flex items-center justify-center'>
        {show ? (
          <motion.div layoutId='buttonDivs' className='absolute right-0 top-2 flex h-auto w-auto '>
            <Card className='relative h-auto w-[16rem] items-center justify-center p-4 px-6'>
              {session?.user && (
                <>
                  <X onClick={() => setShow(false)} className='absolute right-1 top-1 h-4 w-4 cursor-pointer' />
                  <div className='flex flex-col items-center justify-center gap-2'>
                    <Avatar className='h-[3rem] w-[3rem]'>
                      <AvatarImage src={session?.user.image || ''} />
                      <AvatarFallback>
                        <User className='h-full w-full p-3' />
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col text-center'>
                      <p className='text-md line-clamp-1 font-bold'>{session?.user.name?.split(' ')[0]}</p>
                      <p className='line-clamp-1 text-xs'>{session?.user.email}</p>
                    </div>
                  </div>
                  <Divider className='my-4 w-full' />
                  <div className='flex w-full flex-col gap-1'>
                    <Link href='/dashboard' className='w-full'>
                      <Button className='h-8 w-full' variant='ghost'>
                        {t('auth.links.dashboard')}
                      </Button>
                    </Link>
                  </div>
                  <div className='mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-md bg-primary/10 p-2'>
                    <p className='text-xs'>{t('auth.languages')}</p>
                    <MobileLanguageToggle />
                  </div>
                  <div className='mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-md bg-primary/10 p-2'>
                    <p className='text-xs'>{t('auth.themes')}</p>
                    <ThemeToggle />
                  </div>
                  <div className='mt-4 flex flex-col gap-1'>
                    <Button
                      onClick={() => {
                        signOut();
                      }}
                      className='h-8'
                      variant='destructive'
                    >
                      {t('auth.links.logout')}
                    </Button>
                  </div>
                </>
              )}
              {!session?.user?.id && (
                <>
                  <X onClick={() => setShow(false)} className='absolute right-1 top-1 h-4 w-4 cursor-pointer' />
                  <div className='mt-2 flex flex-col gap-1'>
                    <Button
                      className='flex h-8 w-full flex-row gap-2 border-b-2 text-xs'
                      onClick={() => {
                        handleClick('google');
                      }}
                      size='sm'
                    >
                      <FcGoogle className='h-4 w-4' />
                      {t('auth.links.login_with_google')}
                    </Button>
                    <Link href='/login'>
                      <Button className='flex h-8 w-full flex-row gap-2 border-b-2 text-xs' size='sm'>
                        <Mail className='h-4 w-4' />
                        {t('auth.links.login_with_email')}
                      </Button>
                    </Link>
                  </div>
                  <Divider className='my-4 w-full' />
                  <div className='mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-md bg-primary/10 p-2'>
                    <p className='text-xs'>{t('auth.languages')}</p>
                    <MobileLanguageToggle />
                  </div>
                  <div className='mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-md bg-primary/10 p-2'>
                    <p className='text-xs'>{t('auth.themes')}</p>
                    <ThemeToggle />
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        ) : null}
        <motion.button
          onClick={() => {
            setShow((s) => !s);
          }}
          layoutId='buttonDivs'
        >
          {session?.user?.id && (
            <Avatar>
              <AvatarImage sizes='1rem' src={session?.user.image || ''} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          )}
          {!session?.user?.id && (
            <Button
              variant='ringHover'
              className='flex h-8 flex-row items-center justify-center gap-2 rounded-md border-1 border-ring bg-transparent px-4 py-1 text-sm font-semibold text-white'
              type='button'
            >
              {t('auth.login')}
            </Button>
          )}
        </motion.button>
      </div>
    )
  );
}
