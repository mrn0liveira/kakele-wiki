'use client';

import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQueryState } from 'nuqs';
import Image from 'next/image';
import Fuse from 'fuse.js';

import { cn } from '@/src/lib/utils';
import { KakeleItemModal } from '../set-calculator/modal-item';

import type { KakeleAnyItem, KakeleItem } from '@/src/types';
import { getEnergyTextColor, getRarityTextColor } from '@/src/lib/kakele/util';
import items from '@/src/lib/kakele/items';
import { Popover, PopoverTrigger, PopoverContent } from '../../ui/popover';
import Card from '../../ui/bordered-card';
import { Input } from '../../ui/input';

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
      label: t('kakele.itemStats.Attack'),
      attribute: true,
      id: 'attack',
    },
    {
      label: t('kakele.itemStats.Magic'),
      attribute: true,
      id: 'magic',
    },
    {
      label: t('kakele.itemStats.Armor'),
      attribute: true,
      id: 'armor',
    },
    {
      label: t('kakele.itemStats.level'),
      id: 'level',
    },
    {
      label: t('kakele.itemStats.gold'),
      id: 'value',
    },
  ];

  const itemTypes: FilterOptions[] = [];

  for (const item of items) {
    if (!itemTypes.find((x) => x.id === item.slot)) {
      if (!item.slot || item.slot === 'Pet Food') continue;

      itemTypes.push({
        label: t(`items.filterBy.${item.slot.replaceAll(' ', '')}`),
        id: item.slot,
      });
    }
  }

  const filterByOptions: FilterOptions[] = [
    ...itemTypes,
    {
      label: t('items.filterBy.None'),
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
    filterByOptions.find((f) => f.id === queryFilter) || filterByOptions[filterByOptions.length - 1]
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
      <div className='relative flex flex-col items-center justify-center space-y-8 p-8 text-center'>
        <div className='absolute top-0 flex w-full items-center justify-center'>
          <div className='flex h-auto w-[40rem] flex-col items-center justify-center'>
            <h1 className='mt-8 px-4 pt-8 text-2xl font-bold'>{t('items.searchTitle')}</h1>
            <h2 className='px-4 pb-2 text-xs'>{t('items.searchDescription')}</h2>
            <Input className='max-w-[70vw] text-center' onChange={(e) => setValue(e.target.value)} value={value} />
          </div>
        </div>
        <div className='flex w-full flex-col items-center justify-center pt-[10rem]'>
          <KakeleItemModal
            isOpen={isItemModalOpen}
            setIsOpen={setIsItemModalOpen}
            t={t}
            lng={lng}
            //@ts-ignore
            item={currentItem}
          />
          <div className='grid grid-cols-2 gap-8 py-4 lg:grid-cols-4'>
            <Popover>
              <PopoverTrigger className='flex flex-col'>
                <span className='text-sm font-semibold'>{t('items.element')}</span>
                <span className='mb-4 text-sm font-semibold text-primary-foreground'>
                  {t(`kakele.energy.${element.id}`)}
                </span>
              </PopoverTrigger>
              <PopoverContent className='z-[999] flex w-fit flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-md'>
                <div className='flex w-full flex-col items-start'>
                  <span className='text-md'>{t('items.element')}</span>
                  <span className='text-xs'>Select your element</span>
                </div>
                <div className='flex w-full max-w-[8rem] flex-wrap items-start gap-2'>
                  {elements.map((v: ElementType, index: number) => (
                    <span
                      onClick={() => {
                        setElement(v);
                      }}
                      key={v.id}
                      className={cn(
                        v.id === element.id ? 'bg-secondary' : 'bg-secondary/50',
                        'cursor-pointer rounded-md px-2 py-1 text-xs transition-all hover:bg-secondary/30'
                      )}
                    >
                      {v.label}
                    </span>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger className='flex flex-col'>
                <span className='text-sm font-semibold'>{t('items.vocation')}</span>
                <span className='mb-4 text-sm font-semibold text-primary-foreground'>
                  {t(`kakele.vocations.${vocation.id}`)}
                </span>
              </PopoverTrigger>
              <PopoverContent className='z-[999] flex w-fit flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-md'>
                <div className='flex w-full flex-col items-start'>
                  <span className='text-md'>{t('items.vocation')}</span>
                  <span className='text-xs'>Select your vocation</span>
                </div>
                <div className='flex w-full max-w-[8rem] flex-wrap items-start gap-2'>
                  {vocations.map((v: VocationType, index: number) => (
                    <span
                      onClick={() => {
                        setVocation(v);
                      }}
                      key={v.id}
                      className={cn(
                        v.id === vocation.id ? 'bg-secondary' : 'bg-secondary/50',
                        'cursor-pointer rounded-md px-2 py-1 text-xs transition-all hover:bg-secondary/30'
                      )}
                    >
                      {v.label}
                    </span>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger className='flex flex-col'>
                <span className='text-sm font-semibold'>{t('items.sortByTitle')}</span>
                <span className='mb-4 text-sm font-semibold text-primary-foreground'>
                  {t(`kakele.vocations.${vocation.id}`)}
                </span>
              </PopoverTrigger>
              <PopoverContent className='z-[999] flex w-fit flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-md'>
                <div className='flex w-full flex-col items-start'>
                  <span className='text-md'>{t('items.sortByTitle')}</span>
                  <span className='text-xs'>Select sort type </span>
                </div>
                <div className='flex w-full max-w-[8rem] flex-wrap items-start gap-2'>
                  {sortByOptions.map((v: SortedItemsOptions, index: number) => (
                    <span
                      onClick={() => {
                        setSortBy(v);
                      }}
                      key={v.id}
                      className={cn(
                        v.id === sortBy.id ? 'bg-secondary' : 'bg-secondary/50',
                        'cursor-pointer rounded-md px-2 py-1 text-xs transition-all hover:bg-secondary/30'
                      )}
                    >
                      {v.label}
                    </span>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger className='flex flex-col'>
                <span className='text-sm font-semibold'>{t('items.filterByTitle')}</span>
                <span className='mb-4 text-sm font-semibold text-primary-foreground'>
                  {t(`items.filterBy.${filterBy.id.replaceAll(' ', '')}`)}
                </span>
              </PopoverTrigger>
              <PopoverContent className='z-[999] flex w-fit flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-md'>
                <div className='flex w-full flex-col items-start'>
                  <span className='text-md'>{t('items.filterByTitle')}</span>
                  <span className='text-xs'>Select filter type</span>
                </div>
                <div className='flex w-full max-w-[8rem] flex-wrap items-start gap-2'>
                  {filterByOptions.map((v: FilterOptions, index: number) => (
                    <span
                      onClick={() => {
                        setFilterBy(v);
                      }}
                      key={v.id}
                      className={cn(
                        v.id === filterBy.id ? 'bg-secondary' : 'bg-secondary/50',
                        'cursor-pointer rounded-md px-2 py-1 text-xs transition-all hover:bg-secondary/30'
                      )}
                    >
                      {v.label}
                    </span>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className='flex w-full flex-col'>
            {itemTypes.map((itemType) => (
              <div key={itemType.id} className='flex w-full flex-col gap-4'>
                {sortedItems.filter((x) => 'slot' in x && x.slot === itemType.id).length > 0 && (
                  <div className='group/effect sticky top-2 z-[100] flex h-full items-center justify-center overflow-hidden rounded-md bg-ring/80 opacity-100 md:static lg:-top-8'>
                    <div className='relative flex h-full w-full items-center justify-center'>
                      <Image
                        alt={itemType.label}
                        className='absolute w-full object-cover transition-all group-hover/effect:scale-110'
                        height={400}
                        src={`https://res.cloudinary.com/dl3asnoii/image/upload/v1711069907/kakele.com.br/items/${itemType.id.toLowerCase()}.png`}
                        width={400}
                      />
                      <span className='z-10 p-1 text-xl font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] lg:text-2xl'>
                        {t(`kakele.itemTypes.${itemType.id.replaceAll(' ', '')}`)}
                      </span>
                    </div>
                  </div>
                )}
                {sortedItems.filter((x) => 'slot' in x && x.slot === itemType.id).length > 0 && (
                  <div key={itemType.id}>
                    <div className='relative mb-20 grid w-full max-w-none grid-cols-1 items-center justify-center gap-2 sm:grid-cols-2 2xl:grid-cols-4'>
                      {sortedItems
                        .filter((x) => 'slot' in x && x.slot === itemType.id)
                        .map((item) => (
                          <div
                            className='w-full'
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
                            <div className='group/effect relative rounded-md border-border/50 bg-primary/10 p-1 px-8 shadow-input transition duration-200 hover:bg-primary/50 hover:shadow-xl'>
                              <div className='flex flex-col'>
                                <Image
                                  alt={item.name}
                                  className='absolute left-1 top-1 h-[2.5rem] w-[2.5rem] rounded-xl border-[1px] border-border/50 bg-secondary/50'
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
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
