'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import { type Dispatch, type SetStateAction, forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '@/src/components/ui/input';
import { Toggle } from '@/src/components/ui/toggle';

import { KakeleItemModal } from './modal-item';
import { NewHoverTabs } from './new-hover-menu';

import type { KakeleEquipmentItems, KakeleEquipmentOrWeapon, KakeleWeaponItems } from '@/src/types';
import { getBestItemsForLevel } from '@/src/lib/kakele/set-calculator';
import kakeleItems from '@/src/lib/kakele/items.js';

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

    for (const item of Object.values(result)) {
      res.push(item.energy);
    }

    res = res.sort((a, b) => (a === element.id && b !== element.id ? -1 : 1));

    return res;
  };

  useEffect(() => {
    const items = getBestItemsForLevel({
      level,
      includeExpensiveItems: includeExpensive,
      ignore: ignore,
      vocation: vocation.id,
      energy: element.id,
      attribute: attribute.id,
    });

    if (items) {
      setResult(items);
    }
  }, [level, element, vocation, ignore, attribute, includeExpensive]);

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
            className='flex h-fit w-full flex-col rounded-md border-[1px] border-zinc-800 bg-zinc-900 p-4'
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
                items={{
                  0: result.necklace || null,
                  1: result.helmet || null,
                  2: result.ring || null,
                  3: result.primary_hand || null,
                  4: result.armor || null,
                  5: result.secondary_hand || null,
                  6: result.tool || null,
                  7: result.legs || null,
                  8: result.boots || null,
                }}
                setCurrentItem={setCurrentItem}
                setIsItemModalOpen={setIsItemModalOpen}
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
                    className='h-4 w-4 overflow-visible rounded-full bg-zinc-800 p-[2px]'
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    key={index}
                  >
                    <Image
                      alt={`${x}-element`}
                      height={64}
                      src={
                        new URL(
                          `https://res.cloudinary.com/dl3asnoii/image/upload/v1710366290/kakele.com.br/icons/${x.toLowerCase()}.png`
                        ).href
                      }
                      width={64}
                    />
                  </motion.div>
                ))}
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='flex w-full flex-col items-center justify-center gap-4 rounded-md border-[1px] border-zinc-800 bg-zinc-900 p-2'
            exit={{ opacity: 0, y: 10 }}
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className='text-xs font-black'>{t('setCalculator.totalStatsTitle')}</span>
            <span className='w-full rounded-md bg-zinc-950/50 px-4 text-xs'>
              {t('kakele.attributes.Attack')} {totalAttack()}
            </span>
            <span className='w-full rounded-md bg-zinc-950/50 px-4 text-xs'>
              {t('kakele.attributes.Magic')} {totalMagic()}
            </span>
            <span className='w-full rounded-md bg-zinc-950/50 px-4 text-xs'>
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
            className='flex w-full flex-col gap-4 rounded-lg border-[1px] border-zinc-800 bg-zinc-900 p-4 lg:min-w-[32rem]'
            exit={{ opacity: 0, y: 30 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className='mb-4 flex flex-col items-start text-start'>
              <h2 className='text-xl font-bold'>{t('setCalculator.filtersTitle')}</h2>
              <span className='text-sm'>{t('setCalculator.filtersDescription')}</span>
            </div>
            <div className='flex flex-row items-center justify-center gap-8'>
              <div className='flex flex-col items-center justify-center'>
                <span className='text-sm font-semibold'>{t('setCalculator.vocationMenuTitle')}</span>
                <span className='mb-4 text-sm font-semibold text-zinc-400'>{t(`kakele.vocations.${vocation.id}`)}</span>
                <NewHoverTabs
                  trigger={
                    <Image
                      alt='Vocation Icon'
                      className='h-16 w-16 rounded-full bg-zinc-800 lg:h-20 lg:w-20'
                      height={100}
                      id='vocation-menu'
                      src={
                        new URL(
                          `https://res.cloudinary.com/dl3asnoii/image/upload/v1710366290/kakele.com.br/icons/${vocation.id.toLowerCase()}.png`
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
                    {/* <Bridge /> */}
                    {/* <Nub id="vocation-menu" /> */}

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
                              onClick={() => setVocation(v)}
                              onKeyDown={() => setVocation(v)}
                            >
                              <Image
                                alt={`${v.label} Icon`}
                                className='h-[3rem] w-[3rem] rounded-full bg-zinc-700/40 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-zinc-600'
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
                <span className='text-sm font-semibold'>{t('setCalculator.attributeMenuTitle')}</span>
                <span className='mb-4 text-sm font-semibold text-zinc-400'>
                  {t(`kakele.attributes.${attribute.id}`)}
                </span>
                <NewHoverTabs
                  trigger={
                    <Image
                      alt='Attribute Icon'
                      className='h-16 w-16 rounded-full bg-zinc-800 p-2 lg:h-20 lg:w-20'
                      height={100}
                      id='attribute-menu'
                      src={
                        new URL(
                          `https://res.cloudinary.com/dl3asnoii/image/upload/v1710366290/kakele.com.br/icons/${attribute.id.toLowerCase()}.png`
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
                    {/* <Bridge /> */}
                    {/* <Nub id="attribute-menu" /> */}

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
                          {attributes.map((v) => (
                            <div
                              className='flex w-16 flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50'
                              key={v.id}
                              onClick={() => setAttribute(v)}
                              onKeyDown={() => setAttribute(v)}
                            >
                              <Image
                                alt={`${v.label} Icon`}
                                className='h-[3rem] w-[3rem] rounded-full bg-zinc-700/40 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-zinc-600'
                                height={128}
                                src={
                                  new URL(
                                    `https://res.cloudinary.com/dl3asnoii/image/upload/v1710366290/kakele.com.br/icons/${v.id}.png`
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
                <span className='text-sm font-semibold'>{t('setCalculator.elementMenuTitle')}</span>
                <span className='mb-4 text-sm font-semibold text-zinc-400'>{t(`kakele.energy.${element.id}`)}</span>
                <NewHoverTabs
                  trigger={
                    <Image
                      alt='Element Icon'
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
                    {/* <Bridge /> */}
                    {/* <Nub id="element-menu" /> */}

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
                              onClick={() => setElement(v)}
                              onKeyDown={() => setElement(v)}
                            >
                              <Image
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
            </div>
            <div>
              <Toggle aria-label='Toggle italic' onPressedChange={() => setIncludeExpensive(!includeExpensive)}>
                {t('setCalculator.excludeExpensiveItems')}
              </Toggle>
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='flex w-full flex-col gap-4 rounded-lg border-[1px] border-zinc-800 bg-zinc-900 p-4'
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
                <div className='flex flex-col flex-wrap gap-2'>
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
                    const r = result[v.toLowerCase().replace(' ', '_')];

                    return r ? (
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className='relative flex h-fit flex-row items-center rounded-md border-[1px] border-zinc-700 bg-zinc-800 p-2 drop-shadow-md hover:border-zinc-500 hover:bg-zinc-700/60'
                        exit={{ opacity: 0, y: 50 }}
                        initial={{ opacity: 0, y: 50 }}
                        key={`${index}-${r}`}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <div
                          className='absolute right-0 top-0 m-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full hover:bg-red-700'
                          onClick={() => setIgnore([...ignore, r.id])}
                          onKeyDown={() => setIgnore([...ignore, r.id])}
                        >
                          <X size={16} />
                        </div>
                        <div className='absolute -top-3 left-1 m-2 flex h-4 w-fit items-center justify-center gap-2'>
                          <span className='rounded-full border-[1px] border-zinc-600 bg-zinc-700 px-4 text-xs'>
                            {t(`kakele.itemTypes.${r.slot.replace(/ /g, '')}`)}
                          </span>
                          {r.expensive && (
                            <svg
                              className='lucide lucide-circle-alert rounded-full bg-black/50'
                              fill='none'
                              height='20'
                              stroke='#bb2000'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='2'
                              viewBox='0 0 24 24'
                              width='20'
                            >
                              <title>Circle Alert</title>
                              <circle cx='12' cy='12' r='10' />
                              <line x1='12' x2='12' y1='8' y2='12' />
                              <line x1='12' x2='12.01' y1='16' y2='16' />
                            </svg>
                          )}
                        </div>
                        <Image
                          alt={r.name}
                          className='h-12 w-12'
                          height={64}
                          src={
                            new URL(
                              `https://res.cloudinary.com/dl3asnoii/image/upload/v1713726404/sprites/items/${r.name}.png`
                            ).href
                          }
                          width={64}
                        />
                        <div className='ml-4 flex flex-col gap-1'>
                          <span className='lg:text-md text-xs font-semibold'>
                            {/* 
														//@ts-ignore */}
                            {r[`language.${lng}`]}
                          </span>
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
    setIsItemModalOpen,
    setCurrentItem,
  }: {
    items: Record<number, KakeleEquipmentOrWeapon | null>;
    setCurrentItem: (item: KakeleEquipmentOrWeapon | null) => void;
    setIsItemModalOpen: Dispatch<SetStateAction<boolean>>;
  }) => {
    return (
      <div className='flex flex-col items-center justify-center'>
        <div className='grid grid-cols-3 gap-1'>
          {Array.from(Array(9)).map((_, index) => (
            <motion.div
              className='flex h-20 w-20 items-center justify-center rounded-md border-[1px] border-white/10 bg-zinc-800 hover:bg-zinc-700 lg:h-16 lg:w-16'
              key={index}
              onClick={() => {
                setIsItemModalOpen(true);
                setCurrentItem(items[index]);
              }}
              whileHover={{ scale: 1.05 }}
            >
              {items[index] && (
                <Image
                  alt={items[index]?.name || 'Item'}
                  height={64}
                  src={
                    new URL(
                      `https://res.cloudinary.com/dl3asnoii/image/upload/v1713726404/sprites/items/${items[index]?.name}.png`
                    ).href
                  }
                  width={64}
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
        <div className='h-20 w-20 rounded-md bg-zinc-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-zinc-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-zinc-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-zinc-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-zinc-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-zinc-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-zinc-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-zinc-800 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-zinc-800 lg:h-16 lg:w-16' />
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
