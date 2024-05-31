'use client';

import { motion } from 'framer-motion';
import { DollarSign, Lock, X } from 'lucide-react';
import Image from 'next/image';
import { type Dispatch, type SetStateAction, forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '@/src/components/ui/input';
import { Toggle } from '@/src/components/ui/toggle';

import { KakeleItemModal } from './modal-item';

import type { KakeleEquipmentItems, KakeleEquipmentOrWeapon, KakeleWeaponItems } from '@/src/types';
import { getBestItemsForLevel } from '@/src/lib/kakele/set-calculator';
import kakeleItems from '@/src/lib/kakele/items.js';
import { cn } from '@/src/lib/utils';

import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

interface ComponentProps {
  lng: string;
}

interface ElementType {
  label: string;
  id: string;
  bgColor: string;
}

interface VocationType {
  label: string;
  id: string;
}

interface AttributeType {
  label: string;
  id: 'attack' | 'magic' | 'armor';
}

interface LockedItem {
  slot: string;
  item: KakeleEquipmentItems | KakeleWeaponItems;
}

export default function SetCalculatorContainer({ lng = 'en' }: ComponentProps) {
  const { t } = useTranslation();

  const elements: ElementType[] = [
    {
      label: 'Dark',
      id: 'Dark',
      bgColor: 'bg-[#52100e]',
    },
    {
      label: 'Light',
      id: 'Light',
      bgColor: 'bg-[#7f8227]',
    },
    {
      label: 'Nature',
      id: 'Nature',
      bgColor: 'bg-[#0e522c]',
    },
    {
      label: 'All',
      id: 'All',
      bgColor: 'bg-[#1b383d]',
    },
  ];

  const vocations: VocationType[] = [
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
  ];

  const attributes: AttributeType[] = [
    {
      label: t('kakele.attributes.Attack'),
      id: 'attack',
    },
    {
      label: t('kakele.attributes.Magic'),
      id: 'magic',
    },
    {
      label: t('kakele.attributes.Armor'),
      id: 'armor',
    },
  ];

  const [element, setElement] = useState<ElementType>(elements[elements.length - 1]);
  const [level, setLevel] = useState(500);
  const [vocation, setVocation] = useState<VocationType>(vocations[0]);
  const [attribute, setAttribute] = useState<AttributeType>(attributes[1]);
  const [ignore, setIgnore] = useState<number[]>([]);

  const [lockedSlots, setLockedSlots] = useState<LockedItem[]>([]);

  const [includeExpensive, setIncludeExpensive] = useState(false);

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const [currentItem, setCurrentItem] = useState<KakeleWeaponItems | KakeleEquipmentItems | null>(null);

  const [result, setResult] = useState<Record<string, KakeleWeaponItems | KakeleEquipmentItems> | null>(null);

  const totalAttack = () => {
    if (!result) return 0;

    return Object.values(result).reduce((acc, item) => acc + item.stats.attack, 0);
  };

  const totalMagic = () => {
    if (!result) return 0;

    return Object.values(result).reduce((acc, item) => acc + item.stats.magic, 0);
  };

  const totalArmor = () => {
    if (!result) return 0;

    return Object.values(result).reduce((acc, item) => acc + item.stats.armor, 0);
  };

  const totalElements = () => {
    let res: string[] = [];

    if (!result) return res;

    for (const item of Object.values(lockedSlots)) {
      res.push(item.item.energy);
    }

    for (const item of Object.values(result)) {
      if (lockedSlots.some((l) => l.slot === item.slot)) continue;

      res.push(item.energy);
    }

    res = res.sort((a, b) => (a === element.id && b !== element.id ? -1 : 1));

    return res;
  };

  useEffect(() => {
    const items = getBestItemsForLevel({
      level,
      lockedSlots: lockedSlots,
      includeExpensiveItems: includeExpensive,
      ignore: ignore,
      vocation: vocation.id,
      energy: element.id,
      attribute: attribute.id,
    });

    if (items) {
      setResult(items);
    }
  }, [level, element, vocation, ignore, attribute, includeExpensive, lockedSlots]);

  return (
    <div className='relative flex flex-col items-center justify-center space-y-8 p-8 text-center'>
      <div
        className='absolute top-0 flex w-full items-center justify-center'
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(20, 17, 15, 1) 100%)',
        }}
      >
        <KakeleItemModal isOpen={isItemModalOpen} item={currentItem} lng={lng} setIsOpen={setIsItemModalOpen} t={t} />
        <div className='flex h-auto w-[40rem] flex-col items-center justify-center'>
          <h2 className='mt-8 px-4 pt-8 text-2xl font-bold'>{t('setCalculator.toolTitle')}</h2>
          <p className='px-4 text-xs'>{t('setCalculator.toolDescription')}</p>
          <div className='flex flex-row items-center justify-center gap-4 p-4'>
            <h3 className='text-md font-bold'>Level</h3>
            <Input
              className='flex w-[8rem] items-center justify-center border-none text-center text-3xl font-bold'
              onChange={(e) => setLevel(e.target.valueAsNumber)}
              placeholder='0'
              type='number'
              value={level}
            />
          </div>
        </div>
      </div>
      <div
        className='absolute bottom-0 flex h-[10rem] w-full items-center justify-center'
        style={{
          background: 'linear-gradient(to top, rgba(20, 17, 15, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        }}
      />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className='flex flex-col gap-4 pb-20 pt-[10rem] lg:flex-row lg:pt-[10rem]'
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className='flex flex-col items-center gap-4'>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='flex h-fit w-full flex-col rounded-md border-[1px] border-stone-800 bg-stone-900 p-4'
            exit={{ opacity: 0, y: 30 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className='mb-4 flex flex-col items-center text-start lg:items-start'>
              <h2 className='text-xl font-bold'>{t('setCalculator.itemsInvTitle')}</h2>
              <span className='text-sm'>{t('setCalculator.itemsInvDescription')}</span>
            </div>
            {Object.keys(result || {}).length > 0 && result ? (
              <ItemsInventory
                lockedSlots={lockedSlots}
                setLockedSlots={setLockedSlots}
                items={{
                  0: lockedSlots.find((x) => x.slot === 'Necklace')?.item || result.necklace || null,
                  1: lockedSlots.find((x) => x.slot === 'Helmet')?.item || result.helmet || null,
                  2: lockedSlots.find((x) => x.slot === 'Ring')?.item || result.ring || null,
                  3: lockedSlots.find((x) => x.slot === 'Primary Hand')?.item || result.primary_hand || null,
                  4: lockedSlots.find((x) => x.slot === 'Armor')?.item || result.armor || null,
                  5: lockedSlots.find((x) => x.slot === 'Secondary Hand')?.item || result.secondary_hand || null,
                  6: lockedSlots.find((x) => x.slot === 'Tool')?.item || result.tool || null,
                  7: lockedSlots.find((x) => x.slot === 'Legs')?.item || result.legs || null,
                  8: lockedSlots.find((x) => x.slot === 'Boots')?.item || result.boots || null,
                }}
              />
            ) : (
              <ItemsInventorySkeleton />
            )}
            <div className='mt-4 flex flex-row items-center justify-center gap-1'>
              {Object.keys(result || {}).length > 0 &&
                result &&
                totalElements().map((x, index) => (
                  <motion.div
                    animate={{ opacity: 1 }}
                    className='h-4 w-4 overflow-visible rounded-full bg-stone-800 p-[2px]'
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    key={index}
                  >
                    <div className={cn(elements.find((y) => y.id === x)?.bgColor, 'h-full w-full rounded-full')} />
                  </motion.div>
                ))}
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='flex w-full flex-col items-center justify-center gap-4 rounded-md border-[1px] border-stone-800 bg-stone-900 p-2'
            exit={{ opacity: 0, y: 10 }}
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className='text-xs font-black'>{t('setCalculator.totalStatsTitle')}</span>
            <span className='w-full rounded-md bg-stone-950/50 px-4 text-xs'>
              {t('kakele.attributes.Attack')} {totalAttack()}
            </span>
            <span className='w-full rounded-md bg-stone-950/50 px-4 text-xs'>
              {t('kakele.attributes.Magic')} {totalMagic()}
            </span>
            <span className='w-full rounded-md bg-stone-950/50 px-4 text-xs'>
              {t('kakele.attributes.Armor')} {totalArmor()}
            </span>
          </motion.div>
          <div className='flex h-fit max-h-[10rem] w-full flex-col items-center justify-center overflow-hidden'>
            {ignore && ignore?.length > 0 && (
              <div className='mt-2 flex max-h-[10rem] w-[14rem] flex-col gap-2 text-sm'>
                <span>{t('setCalculator.ignoredItemsTitle')}</span>
                <div className='no-scrollbar flex flex-col gap-2 overflow-y-auto'>
                  {ignore?.map((item: number, index: number) => {
                    const ignoredItem = kakeleItems.find((i) => i.id === item);

                    if (!ignoredItem) return null;

                    return (
                      <div
                        className='cursor-pointer rounded-md bg-red-500/20 px-2 py-[2px]'
                        key={`${index}ignoredItems`}
                        onClick={() => {
                          setIgnore(ignore.filter((ignoredItem: number) => ignoredItem !== item));
                        }}
                        onKeyDown={() => {
                          setIgnore(ignore.filter((ignoredItem: number) => ignoredItem !== item));
                        }}
                      >
                        {/*
                   								     // @ts-ignore */}
                        {ignoredItem[`language.${lng}`]}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className='lg:max-w-auto flex max-w-[85vw] flex-col gap-2'
          exit={{ opacity: 0, y: 10 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='flex w-full flex-col gap-4 rounded-lg border-[1px] border-stone-800 bg-stone-900 p-4 lg:min-w-[32rem]'
            exit={{ opacity: 0, y: 30 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className='mb-4 flex flex-col items-start text-start'>
              <h2 className='text-xl font-bold'>{t('setCalculator.filtersTitle')}</h2>
              <span className='text-sm'>{t('setCalculator.filtersDescription')}</span>
            </div>
            <div className='flex w-full flex-row items-center justify-center gap-6'>
              <Popover>
                <PopoverTrigger className='flex flex-col'>
                  <span className='text-sm font-semibold'>{t('setCalculator.vocationMenuTitle')}</span>
                  <span className='mb-4 text-sm font-semibold text-stone-400'>
                    {t(`kakele.vocations.${vocation.id}`)}
                  </span>
                </PopoverTrigger>
                <PopoverContent className='flex w-fit flex-col items-center justify-center gap-4 bg-stone-950/80 backdrop-blur-md'>
                  <div className='flex w-full flex-col items-start'>
                    <span className='text-md'>Vocation</span>
                    <span className='text-xs'>Select your vocation</span>
                  </div>
                  <div className='flex w-full flex-wrap items-start gap-2'>
                    {vocations.map((v: VocationType, index: number) => (
                      <span
                        onClick={() => {
                          setVocation(v);
                        }}
                        key={v.id}
                        className={cn(
                          v.id === vocation.id ? 'bg-stone-800' : 'bg-stone-900',
                          'cursor-pointer rounded-md px-2 py-1 text-xs transition-all hover:bg-stone-800'
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
                  <span className='text-sm font-semibold'>{t('setCalculator.attributeMenuTitle')}</span>
                  <span className='mb-4 text-sm font-semibold text-stone-400'>
                    {t(`kakele.attributes.${attribute.id}`)}
                  </span>
                </PopoverTrigger>
                <PopoverContent className='flex w-fit flex-col items-center justify-center gap-4 bg-stone-950/80 backdrop-blur-md'>
                  <div className='flex w-full flex-col items-start'>
                    <span className='text-md'>Attribute</span>
                    <span className='text-xs'>Select attribute to filter</span>
                  </div>
                  <div className='flex w-full flex-wrap items-start gap-2'>
                    {attributes.map((v: AttributeType, index: number) => (
                      <span
                        onClick={() => {
                          setAttribute(v);
                        }}
                        key={v.id}
                        className={cn(
                          v.id === attribute.id ? 'bg-stone-800' : 'bg-stone-900',
                          'cursor-pointer rounded-md px-2 py-1 text-xs transition-all hover:bg-stone-800'
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
                  <span className='text-sm font-semibold'>{t('setCalculator.elementMenuTitle')}</span>
                  <span className='mb-4 text-sm font-semibold text-stone-400'>{t(`kakele.energy.${element.id}`)}</span>
                </PopoverTrigger>
                <PopoverContent className='flex w-fit flex-col items-center justify-center gap-4 bg-stone-950/80 backdrop-blur-md'>
                  <div className='flex w-full flex-col items-start'>
                    <span className='text-md'>Energy</span>
                    <span className='text-xs'>Select energy to filter</span>
                  </div>
                  <div className='flex w-full flex-wrap items-start gap-2'>
                    {elements.map((v: ElementType, index: number) => (
                      <span
                        onClick={() => {
                          setElement(v);
                        }}
                        key={v.id}
                        className={cn(
                          v.id === element.id ? 'bg-stone-800' : 'bg-stone-900',
                          'cursor-pointer rounded-md px-2 py-1 text-xs transition-all hover:bg-stone-800'
                        )}
                      >
                        {v.label}
                      </span>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Toggle aria-label='Toggle italic' onPressedChange={() => setIncludeExpensive(!includeExpensive)}>
                {t('setCalculator.excludeExpensiveItems')}
              </Toggle>
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='flex w-full flex-col gap-4 rounded-lg border-[1px] border-stone-800 bg-stone-900 p-4'
            exit={{ opacity: 0, y: 30 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className='mb-4 flex flex-col items-start text-start'>
              <h2 className='text-xl font-bold'>{t('setCalculator.resultTitle')}</h2>
              <span className='text-sm'>{t('setCalculator.resultDescription')}</span>
            </div>
            <div className='flex h-fit min-h-[10rem] w-full flex-col'>
              {Object.keys(result || {}).length > 0 && result ? (
                <div className='flex flex-col flex-wrap gap-3'>
                  {[
                    'Necklace',
                    'Helmet',
                    'Ring',
                    'Primary Hand',
                    'Armor',
                    'Secondary Hand',
                    'Tool',
                    'Legs',
                    'Boots',
                  ].map((v, index) => {
                    const r =
                      lockedSlots.find(
                        (x) => x.slot.toLowerCase().replace(' ', '_') === v.toLowerCase().replace(' ', '_')
                      )?.item || result[v.toLowerCase().replace(' ', '_')];

                    return r ? (
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className='relative flex h-fit flex-row items-center rounded-md border-[1px] border-stone-700 bg-stone-800 p-2 drop-shadow-md transition-all hover:bg-stone-700/60'
                        exit={{ opacity: 0, y: 50 }}
                        initial={{ opacity: 0, y: 50 }}
                        key={`${index}-${r.id}`}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      >
                        <div
                          className='absolute -right-2 m-2 flex h-full w-8 cursor-pointer items-center justify-center rounded-md hover:bg-red-700/50'
                          onClick={() => {
                            if (!lockedSlots.some((x) => x.slot === r.slot)) {
                              setIgnore([...ignore, r.id]);
                            }
                          }}
                          onKeyDown={() => setIgnore([...ignore, r.id])}
                        >
                          <X size={16} />
                        </div>
                        <div className='absolute -top-4 left-1 m-2 flex h-4 w-fit flex-row items-start justify-start gap-2 text-nowrap'>
                          <div
                            className={cn(
                              elements.find((y) => y.id === r.energy)?.bgColor,
                              'h-4 w-4 rounded-full drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]'
                            )}
                          />
                          <span className='flex h-4 items-center justify-center rounded-full border-[1px] border-stone-600 bg-stone-700  px-4 text-[0.6rem] drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]'>
                            {t(`kakele.itemTypes.${r.slot.replace(/ /g, '')}`)}
                          </span>
                          {r.expensive && (
                            <span className='flex h-4 items-center justify-center rounded-full border-[1px] border-stone-600 bg-stone-700 px-4 text-[0.6rem] drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]'>
                              <DollarSign size={12} color='#e1e273' />
                            </span>
                          )}
                        </div>
                        <div
                          onClick={() => {
                            setCurrentItem(r);
                            setIsItemModalOpen(true);
                          }}
                          className='flex h-full w-full cursor-pointer flex-row items-center justify-start'
                        >
                          <Image
                            alt={r.name}
                            className='h-12 w-12 p-1'
                            height={256}
                            width={256}
                            src={
                              new URL(
                                `https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/${r.name.replaceAll("'", '')}.png`
                              ).href
                            }
                          />
                          <div className='ml-4 flex flex-col gap-1 text-start'>
                            <span className='lg:text-md text-xs font-semibold'>
                              {/* 
														//@ts-ignore */}
                              {r[`language.${lng}`]}
                            </span>
                            <span className='text-[0.6rem]'>
                              {t(`kakele.attributes.${attribute.id}`)}{' '}
                              {/* 
														//@ts-ignore */}
                              {r.stats[attribute.id]}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      ''
                    );
                  })}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const ItemsInventory = forwardRef(
  ({
    items,
    lockedSlots,
    setLockedSlots,
  }: {
    items: Record<number, KakeleEquipmentOrWeapon | null>;
    lockedSlots: LockedItem[];
    setLockedSlots: Dispatch<SetStateAction<LockedItem[]>>;
  }) => {
    return (
      <div className='flex flex-col items-center justify-center'>
        <div className='grid grid-cols-3 gap-1'>
          {Array.from(Array(9)).map((_, index) => (
            <motion.div
              className={cn(
                lockedSlots.find((x) => x.slot === items[index]?.slot)
                  ? 'border-[2px] border-yellow-600/50'
                  : 'border-[1px] border-white/10',
                'group/effect relative flex h-20 w-20 items-center justify-center rounded-md bg-stone-800 transition-all lg:h-16 lg:w-16'
              )}
              key={index}
            >
              {items[index] && (
                <Image
                  onClick={() => {
                    if (lockedSlots.find((x) => x.slot === items[index]?.slot)) {
                      setLockedSlots(lockedSlots.filter((x) => x.slot !== items[index]?.slot));
                    } else {
                      setLockedSlots([
                        ...lockedSlots,
                        { slot: items[index]?.slot as string, item: items[index] as KakeleEquipmentOrWeapon },
                      ]);
                    }
                  }}
                  alt={items[index]?.name || 'Item'}
                  className='p-1'
                  height={256}
                  width={256}
                  src={
                    new URL(
                      `https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/${items[index]?.name.replaceAll("'", '')}.png`
                    ).href
                  }
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
);

const ItemsInventorySkeleton = forwardRef(() => {
  return (
    <div className='flex items-center justify-center'>
      <div className='grid grid-cols-3 gap-1'>
        <div className='h-20 w-20 rounded-md bg-stone-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-stone-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-stone-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-stone-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-stone-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-stone-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-stone-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-stone-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-stone-800 lg:h-16 lg:w-16' />
      </div>
    </div>
  );
});

const Bridge = () => <div className='absolute -top-[24px] left-0 right-0 h-[24px]' />;
const Nub = ({ id }: { id: string | null }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, []);

  const moveNub = () => {
    if (id) {
      const hoveredTab = document.getElementById(id);
      const overlayContent = document.getElementById('overlay-content');

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      animate={{ left }}
      className='absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900'
      style={{
        clipPath: 'polygon(0 0, 100% 0, 50% 50%, 0% 100%)',
      }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    />
  );
};

ItemsInventory.displayName = 'ItemsInventory';
ItemsInventorySkeleton.displayName = 'ItemsInventorySkeleton';
