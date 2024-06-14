'use client';

import type { Blog } from '@prisma/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { cn } from '@/src/lib/utils';
import { BentoGrid, BlogPostSkeleton } from '@/src/components/home/grid';
import HeroTrailer from '@/src/components/home/hero-trailer';

import Card from '../components/ui/bordered-card';

import '@/src/styles/Text-Animation.scss';
import '@/src/styles/Home-card.css';

interface CardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  bgColor?: string;
}

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog?amount=4`, { next: { revalidate: 60 * 10 } });

  return await res.json();
}

export default function Home() {
  const [blogs, setBlogs] = useState<Omit<Blog, 'content' | 'published' | 'createdAt'>[]>([]);

  const { t } = useTranslation();

  const cards: CardProps[] = [
    {
      title: t('home.cards.coinshub.title'),
      description: t('home.cards.coinshub.description'),
      image: 'https://res.cloudinary.com/dl3asnoii/image/upload/v1709235385/kakele.com.br/home/shop.png',
      href: 'https://coinshub.com.br/affiliate/biridim/',
    },
    {
      title: t('home.cards.blessCalculator.title'),
      description: t('home.cards.blessCalculator.description'),
      image: 'https://res.cloudinary.com/dl3asnoii/image/upload/v1709235685/kakele.com.br/home/bless.png',
      href: '/tools/bless-calculator',
    },
    {
      title: t('home.cards.setCalculator.title'),
      description: t('home.cards.setCalculator.description'),
      image: 'https://res.cloudinary.com/dl3asnoii/image/upload/v1709076530/kakele.com.br/home/set-calculator.png',
      href: '/tools/set-calculator',
    },
    {
      title: t('home.cards.tasks.title'),
      description: t('home.cards.tasks.description'),
      image: 'https://res.cloudinary.com/dl3asnoii/image/upload/v1709076480/kakele.com.br/home/monsters.png',
      href: '/tools/task-calculator',
    },
    {
      title: t('home.cards.forgeCalculator.title'),
      description: t('home.cards.forgeCalculator.description'),
      image: 'https://res.cloudinary.com/dl3asnoii/image/upload/v1709076480/kakele.com.br/home/monsters.png',
      href: '/tools/forge-calculator',
    },
  ];
  useEffect(() => {
    getBlogs().then((data) => setBlogs(data));
  }, []);

  return (
    <div className='flex h-full min-w-full flex-col items-center justify-center'>
      <HeroTrailer ad={t('home.ad')} mobileAd={t('home.mobileAd')} subhead={t('home.subhead')} />
      <div className='relative flex flex-row items-center justify-center gap-4'>
        <motion.img
          alt=''
          className='unselectable pointer-events-none hidden lg:flex'
          initial={{ opacity: 0, x: -100, rotate: -10 }}
          src='/svg/text-decoration.svg'
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 0.4, x: 0, rotate: 0 }}
          width={180}
        />
        <motion.h2
          className='__className_d6dd13 text-animation mb-8 text-center text-3xl sm:text-5xl lg:mb-0'
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {t('home.quickAcess')}
        </motion.h2>
        <motion.img
          alt=''
          className='unselectable pointer-events-none hidden lg:flex'
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          src='/svg/text-decoration.svg'
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 0.4, x: 0, rotate: 0 }}
          width={180}
        />
      </div>
      <motion.div
        className='flex h-auto w-full flex-col gap-2'
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1 }}
      >
        <BentoGrid className='mx-auto w-full text-lg md:auto-rows-auto lg:grid-cols-5'>
          {cards.map((card) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              key={card.title}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Link href={card.href}>
                <Card
                  className={cn(
                    card.title === 'CoinsHub'
                      ? 'outline outline-1 outline-offset-2 outline-secondary/50 transition-all delay-75 hover:outline-4 hover:outline-secondary'
                      : '',
                    'bg-secondary/30'
                  )}
                >
                  <div className='flex flex-col'>
                    <span className='text-md font-black'>{card.title}</span>
                    <span className='line-clamp-2 text-xs text-white/50'>{card.description}</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </BentoGrid>
      </motion.div>
      <motion.div
        className='mb-20 mt-8 flex h-auto w-full flex-col gap-2 rounded-md border-[1px] border-border/50 bg-card p-2 transition-all'
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1 }}
      >
        {blogs.length === 0 ? (
          <>
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  key={`skeleton-${index}`}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <BlogPostSkeleton />
                </motion.div>
              ))}
          </>
        ) : (
          <div className='relative flex flex-col gap-2'>
            <div className='m-2 flex flex-col items-center justify-center gap-2 md:items-start'>
              <span className='ml-2 text-3xl md:text-xl'>{t('blog.title')}</span>
              {blogs.map((blog) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  key={blog.id}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1 }}
                >
                  <Link href={`/blog?id=${blog.id}`}>
                    <Card
                      noPadding
                      className='group/effect flex max-w-max flex-col border-border/50 bg-primary/20 hover:shadow-xl sm:flex-row lg:max-h-[18rem]'
                    >
                      <div className='flex min-h-full min-w-fit flex-row overflow-hidden rounded-xl'>
                        {blog.imageUrl && (
                          <Image
                            alt={blog.title}
                            className='min-h-full w-full transition-all group-hover/effect:scale-110 md:static'
                            height={256}
                            src={blog.imageUrl}
                            width={256}
                          />
                        )}
                      </div>
                      <div className='relative flex flex-col justify-start overflow-hidden sm:flex-row'>
                        <div className='flex flex-col p-4 text-start lg:ml-12'>
                          <span className='text-md line-clamp-1 font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'>
                            {blog.title}
                          </span>
                          <span className='line-clamp-4 text-xs'>{blog.description}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
            <a className='absolute -bottom-4 right-4 p-2 text-xs' href='/blog'>
              {t('home.viewAll')}
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
