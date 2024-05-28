'use client';

import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Input, Image as NextUIImage } from '@nextui-org/react';
import { useDebounce } from 'use-debounce';
import { useQueryState } from 'nuqs';
import Image from 'next/image';
import Fuse from 'fuse.js';

import { cn } from '@/src/lib/utils';
import { BentoGrid, BentoGridItem } from '@/src/components/home/grid';

import { NewHoverTabs } from '../set-calculator/new-hover-menu';
import { KakeleItemModal } from '../set-calculator/modal-item';

import type { KakeleAnyItem, KakeleItem } from '@/src/types';
import { getEnergyTextColor, getRarityTextColor } from '@/src/lib/kakele/util';
import items from '@/src/lib/kakele/items';

interface ComponentProps {
  lng: string;
}

interface SortedItemsOptions {
  label: string;
  id: string;
  attribute?: boolean;
}

interface FilterOptions {
  label: string;
  id: string;
}

interface VocationType {
  label: string;
  id: string;
}

interface ElementType {
  label: string;
  id: string;
}

export default function KakeleItemsContainer({ lng = 'en' }: ComponentProps) {
  const { t } = useTranslation();

  const testRef = useRef<null | HTMLDivElement>(null);

  const [queryValue, setQueryValue] = useQueryState('search');
  const [queryVocation, setQueryVocation] = useQueryState('v');
  const [queryElement, setQueryElement] = useQueryState('e');
  const [querySort, setQuerySort] = useQueryState('sort');
  const [queryFilter, setQueryFilter] = useQueryState('filter');

  const [value, setValue] = useState<string>(queryValue || '');

  const [currentItem, setCurrentItem] = useState<KakeleItem | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const [debouncedValue] = useDebounce(value, 3000);

  const elements = [
    {
      label: t('kakele.energy.Dark'),
      id: 'Dark',
    },
    {
      label: t('kakele.energy.Light'),
      id: 'Light',
    },
    {
      label: t('kakele.energy.Nature'),
      id: 'Nature',
    },
    {
      label: t('kakele.energy.All'),
      id: 'All',
    },
  ];

  const vocations = [
    {
      label: t('kakele.vocations.Mage'),
      id: 'Mage',
    },
    {
      label: t('kakele.vocations.Warrior'),
      id: 'Warrior',
    },
    {
      label: t('kakele.vocations.Alchemist'),
      id: 'Alchemist',
    },
    {
      label: t('kakele.vocations.Berserker'),
      id: 'Berserker',
    },
    {
      label: t('kakele.vocations.Hunter'),
      id: 'Hunter',
    },
    {
      label: t('kakele.vocations.All'),
      id: 'All',
    },
  ];

  const sortByOptions = [
    {
      label: t('kakele.sortBy.Attack'),
      attribute: true,
      id: 'attack',
    },
    {
      label: t('kakele.sortBy.Magic'),
      attribute: true,
      id: 'magic',
    },
    {
      label: t('kakele.sortBy.Defense'),
      attribute: true,
      id: 'armor',
    },
    {
      label: t('kakele.sortBy.Level'),
      id: 'level',
    },
    {
      label: t('kakele.sortBy.Value'),
      id: 'value',
    },
  ];

  const itemTypes: FilterOptions[] = [];

  for (const item of items) {
    if (!itemTypes.find((x) => x.id === item.slot)) {
      if (!item.slot || item.slot === 'Pet Food') continue;

      itemTypes.push({
        label: item.slot,
        id: item.slot,
      });
    }
  }

  const filterByOptions: FilterOptions[] = [
    ...itemTypes,
    {
      label: 'None',
      id: 'None',
    },
  ];

  const [element, setElement] = useState<ElementType>(
    elements.find((e) => e.id === queryElement) || elements[elements.length - 1]
  );
  const [vocation, setVocation] = useState<VocationType>(
    vocations.find((v) => v.id === queryVocation) || vocations[vocations.length - 1]
  );

  const [sortBy, setSortBy] = useState<SortedItemsOptions>(
    sortByOptions.find((s) => s.id === querySort) || sortByOptions[sortByOptions.length - 1]
  );

  const [filterBy, setFilterBy] = useState<FilterOptions>(
    filterByOptions.find((f) => f.id === queryFilter) || filterByOptions[0]
  );

  const [sortedItems, setSortedItems] = useState<KakeleAnyItem[]>(
    //@ts-ignore
    items
      .filter(
        (item) =>
          (element.id === 'All' ? true : item.energy === element.id) &&
          (vocation.id === 'All' ? true : item.vocation === vocation.id || item.vocation === 'All')
      )
      .sort((a, b) => {
        if (sortBy.attribute) {
          //@ts-ignore
          if (a.stats?.[sortBy.id] > b.stats?.[sortBy.id]) return -1;
          //@ts-ignore
          if (a.stats?.[sortBy.id] < b.stats?.[sortBy.id]) return 1;

          return 0;
        }
        //@ts-ignore
        if (a[sortBy.id] > b[sortBy.id]) return -1;

        //@ts-ignore
        if (a[sortBy.id] < b[sortBy.id]) return 1;

        return 0;
      })
  );

  useEffect(() => {
    if (debouncedValue.length >= 5) {
      setQueryValue(debouncedValue);

      const filter = {
        includeScore: true,
        shouldSort: true,
        threshold: 0.8,
        ignoreLocation: true,
        keys: [[`language.${lng}`]],
      };

      const fuse = new Fuse(items, filter);

      const result = fuse.search(debouncedValue).filter((e) => typeof e.score === 'number' && e.score <= 0.6);

      setSortedItems(
        // @ts-ignore
        result
          .map((x) => x.item)
          .filter(
            (item) =>
              (filterBy.id === 'None' ? true : item.slot === filterBy.id) &&
              (element.id === 'All' ? true : item.energy === element.id) &&
              (vocation.id === 'All' ? true : item.vocation === vocation.id || item.vocation === 'All')
          )
          .sort((a, b) => {
            if (sortBy.attribute) {
              //@ts-ignore
              if (a.stats?.[sortBy.id] > b.stats?.[sortBy.id]) return -1;

              //@ts-ignore
              if (a.stats?.[sortBy.id] < b.stats?.[sortBy.id]) return 1;

              return 0;
            }

            //@ts-ignore
            if (a[sortBy.id] > b[sortBy.id]) return -1;

            //@ts-ignore
            if (a[sortBy.id] < b[sortBy.id]) return 1;

            return 0;
          })
      );
      return;
    }

    setSortedItems(
      // @ts-ignore
      items
        .filter(
          (item) =>
            (filterBy.id === 'None' ? true : item.slot === filterBy.id) &&
            (element.id === 'All' ? true : item.energy === element.id) &&
            (vocation.id === 'All' ? true : item.vocation === vocation.id || item.vocation === 'All')
        )
        .sort((a, b) => {
          if (sortBy.attribute) {
            //@ts-ignore
            if (a.stats?.[sortBy.id] > b.stats?.[sortBy.id]) return -1;

            //@ts-ignore
            if (a.stats?.[sortBy.id] < b.stats?.[sortBy.id]) return 1;

            return 0;
          }

          //@ts-ignore
          if (a[sortBy.id] > b[sortBy.id]) return -1;

          //@ts-ignore
          if (a[sortBy.id] < b[sortBy.id]) return 1;

          return 0;
        })
    );
  }, [element, sortBy, vocation, filterBy, debouncedValue, lng, setQueryValue]);

  return (
    <AnimatePresence mode='wait'>
      <div className='relative flex flex-col items-center justify-center space-y-8 p-8 text-center' ref={testRef}>
        <KakeleItemModal
          isOpen={isItemModalOpen}
          setIsOpen={setIsItemModalOpen}
          t={t}
          lng={lng}
          //@ts-ignore
          item={currentItem}
        />
        <div
          className='absolute top-0 flex w-full items-center justify-center'
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(20, 17, 15, 1) 100%)',
          }}
        >
          <div className='flex h-auto w-[40rem] flex-col items-center justify-center'>
            <h1 className='mt-8 px-4 pt-8 text-2xl font-bold'>{t('items.searchTitle')}</h1>
            <h2 className='px-4 pb-2 text-xs'>{t('items.searchDescription')}</h2>
            <Input className='text-center' onChange={(e) => setValue(e.target.value)} value={value} />
          </div>
        </div>
        <div className='flex w-full flex-col items-center justify-center pt-[10rem]'>
          <div className='mb-8 grid grid-cols-2 items-center justify-center gap-4 gap-x-12 lg:grid-cols-4'>
            <div className='flex flex-col items-center justify-center'>
              <span className='text-sm font-semibold'>{t('items.element')}</span>
              <span className='mb-4 text-sm font-semibold text-zinc-400'>{t(`kakele.energy.${element.id}`)}</span>
              <NewHoverTabs
                trigger={
                  <NextUIImage
                    className='h-16 w-16 rounded-full bg-zinc-800 p-4 lg:h-20 lg:w-20'
                    height={100}
                    id='element-menu'
                    src={
                      new URL(
                        `https://res.cloudinary.com/dl3asnoii/image/upload/v1710366290/kakele.com.br/icons/${
                          element.id === 'All' ? 'all-energy' : element.id.toLowerCase()
                        }.png`
                      ).href
                    }
                    width={100}
                  />
                }
              >
                <motion.div
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className='absolute left-0 top-[calc(100%_+_24px)] z-[999] w-fit rounded-lg border border-zinc-700 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-800 p-[4px]'
                  exit={{
                    opacity: 0,
                    y: 8,
                  }}
                  id='overlay-content'
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                >
                  <div className='w-fit overflow-hidden'>
                    <motion.div
                      animate={{ opacity: 1, x: 0 }}
                      initial={{
                        opacity: 0,
                        x: -100,
                      }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className='flex flex-col gap-2 divide-neutral-700 lg:flex-row'>
                        {elements.map((v) => (
                          <div
                            className='flex w-16 flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50'
                            key={v.id}
                            onClick={() => {
                              setQueryElement(v.id);
                              setElement(v);
                            }}
                            onKeyDown={() => {
                              setQueryElement(v.id);
                              setElement(v);
                            }}
                          >
                            <NextUIImage
                              alt={`${v.label} Icon`}
                              className='h-[3rem] w-[3rem] rounded-full bg-zinc-700/40 p-2 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-zinc-600'
                              height={128}
                              src={
                                new URL(
                                  `https://res.cloudinary.com/dl3asnoii/image/upload/v1710366290/kakele.com.br/icons/${
                                    v.id === 'All' ? 'all-energy' : v.id.toLowerCase()
                                  }.png`
                                ).href
                              }
                              width={128}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </NewHoverTabs>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <span className='text-sm font-semibold'>{t('items.vocation')}</span>
              <span className='mb-4 text-sm font-semibold text-zinc-400'>{t(`kakele.vocations.${vocation.id}`)}</span>
              <NewHoverTabs
                trigger={
                  <NextUIImage
                    className='h-16 w-16 rounded-full bg-zinc-800 p-4 lg:h-20 lg:w-20'
                    height={100}
                    id='vocation-menu'
                    src={
                      new URL(
                        `https://res.cloudinary.com/dl3asnoii/image/upload/v1710366290/kakele.com.br/icons/${
                          vocation.id === 'All' ? 'all-vocation' : vocation.id.toLowerCase()
                        }.png`
                      ).href
                    }
                    width={100}
                  />
                }
              >
                <motion.div
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className='absolute left-0 top-[calc(100%_+_24px)] z-[999] w-fit rounded-lg border border-zinc-700 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-800 p-[4px]'
                  exit={{
                    opacity: 0,
                    y: 8,
                  }}
                  id='overlay-content'
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                >
                  <div className='w-fit overflow-hidden'>
                    <motion.div
                      animate={{ opacity: 1, x: 0 }}
                      initial={{
                        opacity: 0,
                        x: -100,
                      }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className='flex flex-col gap-2 divide-neutral-700 lg:flex-row'>
                        {vocations.map((v) => (
                          <div
                            className='flex w-16 flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50'
                            key={v.id}
                            onClick={() => {
                              setQueryVocation(v.id);
                              setVocation(v);
                            }}
                            onKeyDown={() => {
                              setQueryVocation(v.id);
                              setVocation(v);
                            }}
                          >
                            <NextUIImage
                              alt={`${v.label} Icon`}
                              className='h-[3rem] w-[3rem] rounded-full bg-zinc-700/40 p-2 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-zinc-600'
                              height={128}
                              src={
                                new URL(
                                  `https://res.cloudinary.com/dl3asnoii/image/upload/v1710366290/kakele.com.br/icons/${
                                    v.id === 'All' ? 'all-vocation' : v.id.toLowerCase()
                                  }.png`
                                ).href
                              }
                              width={128}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </NewHoverTabs>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <span className='text-sm font-semibold'>{t('items.sortByTitle')}</span>
              <span className='mb-4 text-sm font-semibold text-zinc-400'>{t(`items.sortBy.${sortBy.id}`)}</span>
              <NewHoverTabs
                trigger={
                  <NextUIImage
                    className='h-16 w-16 rounded-full bg-zinc-800 p-4 lg:h-20 lg:w-20'
                    height={100}
                    id='sortByOptions-menu'
                    src={
                      new URL(
                        `https://res.cloudinary.com/dl3asnoii/image/upload/v1710366290/kakele.com.br/icons/${sortBy.id}.png`
                      ).href
                    }
                    width={100}
                  />
                }
              >
                <motion.div
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className='absolute left-0 top-[calc(100%_+_24px)] z-[999] w-fit rounded-lg border border-zinc-700 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-800 p-[4px]'
                  exit={{
                    opacity: 0,
                    y: 8,
                  }}
                  id='overlay-content'
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                >
                  <div className='w-fit overflow-hidden'>
                    <motion.div
                      animate={{ opacity: 1, x: 0 }}
                      initial={{
                        opacity: 0,
                        x: -100,
                      }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className='flex flex-col gap-2 divide-neutral-700 lg:flex-row'>
                        {sortByOptions.map((v) => (
                          <div
                            className='flex w-16 flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50'
                            key={v.id}
                            onClick={() => {
                              setQuerySort(v.id);
                              setSortBy(v);
                            }}
                            onKeyDown={() => {
                              setQuerySort(v.id);
                              setSortBy(v);
                            }}
                          >
                            <NextUIImage
                              alt={`${v.label} Icon`}
                              className='h-[3rem] w-[3rem] rounded-full bg-zinc-700/40 p-2 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-zinc-600'
                              height={128}
                              src={
                                new URL(
                                  `https://res.cloudinary.com/dl3asnoii/image/upload/v1710366290/kakele.com.br/icons/${v.id.toLowerCase()}.png`
                                ).href
                              }
                              width={128}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </NewHoverTabs>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <span className='text-sm font-semibold'>{t('items.filterByTitle')}</span>
              <span className='mb-4 line-clamp-1 text-sm font-semibold text-zinc-400'>
                {t(`items.filterBy.${filterBy.id.replaceAll(' ', '')}`)}
              </span>
              <NewHoverTabs
                trigger={
                  <NextUIImage
                    className='h-16 w-16 rounded-full bg-zinc-800 lg:h-20 lg:w-20'
                    height={100}
                    id='sortByOptions-menu'
                    src={
                      new URL(
                        `https://res.cloudinary.com/dl3asnoii/image/upload/v1710366290/kakele.com.br/items/icons/${filterBy.id}.png`
                      ).href
                    }
                    width={100}
                  />
                }
              >
                <motion.div
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className='absolute -left-20 top-[calc(100%_+_24px)]  z-[999] w-fit rounded-lg border border-zinc-700 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-800 p-[4px] md:-left-12'
                  exit={{
                    opacity: 0,
                    y: 8,
                  }}
                  id='overlay-content'
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                >
                  <div className='w-fit overflow-hidden'>
                    <motion.div
                      animate={{ opacity: 1, x: 0 }}
                      initial={{
                        opacity: 0,
                        x: -100,
                      }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className='flex flex-col gap-2 divide-neutral-700'>
                        {filterByOptions.map((v) => (
                          <div
                            className='group/effect unselectable relative flex w-40 flex-col items-center justify-center overflow-hidden py-2 text-neutral-400 transition-colors hover:text-neutral-50'
                            key={v.id}
                            onClick={() => {
                              setQueryFilter(v.id);
                              setFilterBy(v);
                            }}
                            onKeyDown={() => {
                              setQueryFilter(v.id);
                              setFilterBy(v);
                            }}
                          >
                            <span className='text-md z-50 font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'>
                              {t(`items.filterBy.${v.id.replaceAll(' ', '')}`)}
                            </span>
                            <Image
                              alt={`${v.label} Icon`}
                              className='absolute top-0 h-[6rem] w-[10rem] bg-zinc-700/40 transition-all hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-zinc-600 group-hover/effect:scale-110'
                              height={400}
                              src={
                                new URL(
                                  `https://res.cloudinary.com/dl3asnoii/image/upload/v1711069907/kakele.com.br/items/${v.id.toLowerCase()}.png`
                                ).href
                              }
                              width={400}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </NewHoverTabs>
            </div>
          </div>
          <div className='flex w-full flex-col'>
            {itemTypes.map((itemType) => (
              <div key={itemType.id}>
                {sortedItems.filter((x) => 'slot' in x && x.slot === itemType.id).length > 0 && (
                  <BentoGrid
                    className='relative mb-20 w-full max-w-none items-center justify-center md:auto-rows-auto'
                    key={itemType.id}
                  >
                    <div className='group/effect sticky top-2 z-[100] flex h-full items-center justify-center overflow-hidden rounded-md bg-zinc-800 opacity-100 md:static lg:-top-8'>
                      <div className='relative flex h-full w-full items-center justify-center'>
                        <Image
                          alt={itemType.label}
                          className='absolute w-full object-cover transition-all group-hover/effect:scale-110'
                          height={400}
                          src={`https://res.cloudinary.com/dl3asnoii/image/upload/v1711069907/kakele.com.br/items/${itemType.id.toLowerCase()}.png`}
                          width={400}
                        />
                        <span className='z-10 text-xl font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] lg:text-2xl'>
                          {t(`kakele.itemTypes.${itemType.id.replaceAll(' ', '')}`)}
                        </span>
                      </div>
                    </div>

                    {sortedItems
                      .filter((x) => 'slot' in x && x.slot === itemType.id)
                      .map((item) => (
                        <div
                          key={item.name}
                          onClick={() => {
                            setCurrentItem(item);
                            setIsItemModalOpen(true);
                          }}
                          onKeyDown={() => {
                            setCurrentItem(item);
                            setIsItemModalOpen(true);
                          }}
                        >
                          <BentoGridItem className='group/effect relative h-fit w-full space-y-0 bg-zinc-900/50 p-4 shadow-input transition duration-200 hover:bg-zinc-950 hover:shadow-xl dark:border-white/[0.2] dark:shadow-none'>
                            <div className='relative flex w-full flex-col'>
                              <NextUIImage
                                alt={item.name}
                                className='absolute -left-6 -top-6 h-[3rem] w-[3rem] rounded-xl border-[1px] border-zinc-700 bg-zinc-900 lg:-left-2 lg:-top-2'
                                height={64}
                                src={
                                  new URL(
                                    `https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/${item.name.replaceAll("'", '')}.png`
                                  ).href
                                }
                                width={64}
                              />
                              <div className='max-w-[80vw] overflow-hidden text-nowrap text-center text-lg font-bold lg:text-3xl'>
                                <span className='text-xs font-bold'>
                                  {'energy' in item && (
                                    <span className={cn(getEnergyTextColor(item.energy))}>
                                      {t(`kakele.energy.${item.energy}`)}
                                    </span>
                                  )}{' '}
                                  <span className={cn(getRarityTextColor(item.rarity))}>
                                    {t(`kakele.rarities.${item.rarity}`)}
                                  </span>{' '}
                                </span>
                                <h3 className='text-center text-sm font-bold'>
                                  {/* 
                         									         // @ts-ignore */}
                                  {item[`language.${lng}`]}
                                </h3>
                              </div>
                              <span className='text-xs'>
                                {t(`items.sortBy.${sortBy.id}`)}{' '}
                                {'stats' in item && sortBy.attribute
                                  ? new Intl.NumberFormat().format(
                                      // @ts-ignore
                                      item.stats[sortBy.id]
                                    )
                                  : new Intl.NumberFormat().format(
                                      // @ts-ignore
                                      item[sortBy.id]
                                    )}
                              </span>
                            </div>
                          </BentoGridItem>
                        </div>
                      ))}
                  </BentoGrid>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
