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
import Wrapper from './wrapper';
import { BlessPercentages } from '@/src/lib/constants';

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

interface TypeAttribute {
  id: string;
  item?: KakeleEquipmentItems | KakeleWeaponItems;

  genericAttributes: {
    attack: number;
    magic: number;
    armor: number;
  };
  aditionalAttributes: {
    attack: number;
    magic: number;
    armor: number;
    bless: number;
  };
}

export default function SetCalculatorContainer({ lng = 'en' }: ComponentProps) {
  const { t } = useTranslation(['setCalculator']);

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
      label: t('vocations.Mage'),
      id: 'Mage',
    },
    {
      label: t('vocations.Warrior'),
      id: 'Warrior',
    },
    {
      label: t('vocations.Alchemist'),
      id: 'Alchemist',
    },
    {
      label: t('vocations.Berserker'),
      id: 'Berserker',
    },
    {
      label: t('vocations.Hunter'),
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

  const [error, setError] = useState<string | null>(null);

  const [lockedSlots, setLockedSlots] = useState<LockedItem[]>([]);

  const [includeExpensive, setIncludeExpensive] = useState(false);

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const [currentItem, setCurrentItem] = useState<KakeleWeaponItems | KakeleEquipmentItems | null>(null);

  const [result, setResult] = useState<Record<string, KakeleWeaponItems | KakeleEquipmentItems> | null>(null);

  const [attributeTypes, setAttributeTypes] = useState<TypeAttribute[]>([]);

  const [slotsAttribute, setSlotsAttribute] = useState<Record<
    string,
    { attack: number; magic: number; armor: number; bless: number }
  > | null>(null);

  const getBlessPercentage = (data: TypeAttribute) => {
    if (!data) return 0;

    const itemStats = data.item?.stats?.[attribute.id] || 0;
    const slotStats = slotsAttribute?.[data.id]?.[attribute.id] || 0;
    const blessValue = slotsAttribute?.[data.id]?.bless || 0;

    return Math.floor(
      ((itemStats + slotStats) / 100) * BlessPercentages[data.item?.rarity as keyof typeof data.item]?.[blessValue]
    );
  };

  const getTotalItemAttribute = () => {
    let total = 0;

    for (const slot of [
      'Necklace',
      'Helmet',
      'Ring',
      'Primary Hand',
      'Armor',
      'Secondary Hand',
      'Tool',
      'Legs',
      'Boots',
    ]) {
      const item =
        result?.[slot.toLowerCase().replaceAll(' ', '_') as keyof typeof result] ||
        lockedSlots.find((l) => l.slot === slot)?.item;

      if (!item) continue;

      const itemAttribute = item.stats[attribute.id] || 0;

      total += itemAttribute;
    }

    return total;
  };

  const getTotalForgeAttribute = () => {
    let total = 0;

    for (const slot of [
      'Necklace',
      'Helmet',
      'Ring',
      'Primary Hand',
      'Armor',
      'Secondary Hand',
      'Tool',
      'Legs',
      'Boots',
    ]) {
      const slotAttribute = slotsAttribute?.[slot]?.[attribute.id] || 0;

      total += slotAttribute;
    }

    return total;
  };

  const getTotalBlessAttribute = () => {
    let total = 0;

    for (const slot of [
      'Necklace',
      'Helmet',
      'Ring',
      'Primary Hand',
      'Armor',
      'Secondary Hand',
      'Tool',
      'Legs',
      'Boots',
    ]) {
      const item =
        result?.[slot.toLowerCase().replaceAll(' ', '_') as keyof typeof result] ||
        lockedSlots.find((l) => l.slot === slot)?.item;

      if (!item) continue;

      const blessData = { item, id: item.slot } as TypeAttribute;

      const blessValue = getBlessPercentage(blessData) || 0;

      total += blessValue;
    }

    return total || 0;
  };

  const getTotalAttribute = () => {
    let total = 0;

    for (const slot of [
      'Necklace',
      'Helmet',
      'Ring',
      'Primary Hand',
      'Armor',
      'Secondary Hand',
      'Tool',
      'Legs',
      'Boots',
    ]) {
      const item =
        result?.[slot.toLowerCase().replaceAll(' ', '_') as keyof typeof result] ||
        lockedSlots.find((l) => l.slot === slot)?.item;

      if (!item) continue;

      const blessData = { item, id: item.slot } as TypeAttribute;

      const itemAttribute = item.stats[attribute.id] || 0;
      const slotAttribute = slotsAttribute?.[item.slot]?.[attribute.id] || 0;

      const blessValue = getBlessPercentage(blessData) || 0;

      const totalAttribute = itemAttribute + slotAttribute + blessValue;

      total += totalAttribute;
    }

    const playerLevel = level || 0;

    return total + playerLevel;
  };

  const totalElements = () => {
    let res: string[] = [];

    if (!result) return res;

    for (const item of Object.values(lockedSlots)) {
      if (item.item) res.push(item.item.energy);
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

    if (items && Object.keys(items).length > 0) {
      setResult(items);
      setError(null);
    } else {
      setError('No items found');
    }

    let attributesResult: TypeAttribute[] = [];

    for (const slot of [
      'Necklace',
      'Helmet',
      'Ring',
      'Primary Hand',
      'Armor',
      'Secondary Hand',
      'Tool',
      'Legs',
      'Boots',
    ]) {
      const item =
        (lockedSlots.find((l) => l.item.slot === slot)?.item as KakeleEquipmentOrWeapon) ||
        (items[slot.toLowerCase().replaceAll(' ', '_') as keyof typeof items] as KakeleEquipmentOrWeapon);
      const slotAttribute = slotsAttribute?.[slot] || { attack: 0, magic: 0, armor: 0, bless: 0 };

      // console.log(lockedSlots, slot);
      // console.log(lockedSlots.find((l) => l.item.slot === item.slot));

      if (!item) continue;

      attributesResult.push({
        id: slot,
        item: item,
        genericAttributes: {
          attack: item?.stats?.attack,
          magic: item?.stats?.magic,
          armor: item?.stats?.armor,
        },
        aditionalAttributes: {
          armor: slotAttribute.armor,
          attack: slotAttribute.attack,
          magic: slotAttribute.magic,
          bless: slotAttribute.bless,
        },
      });
    }

    attributesResult = attributesResult.sort((a, b) => b.genericAttributes.magic - a.genericAttributes.magic);

    // console.log(attributesResult);

    //@ts-ignore
    setAttributeTypes(attributesResult);
  }, [level, element, vocation, ignore, attribute, includeExpensive, lockedSlots, slotsAttribute]);

  return (
    <div className='relative flex flex-col items-center justify-center space-y-8 p-8 text-center'>
      <div className='absolute top-0 flex w-full items-center justify-center'>
        <KakeleItemModal isOpen={isItemModalOpen} item={currentItem} lng={lng} setIsOpen={setIsItemModalOpen} t={t} />
        <div className='flex h-auto w-[40rem] flex-col items-center justify-center'>
          <h2 className='mt-8 px-4 pt-8 text-2xl font-bold'>{t('toolTitle')}</h2>
          <p className='px-4 text-xs'>{t('toolDescription')}</p>
          <div className='flex flex-row items-center justify-center gap-4 p-4'>
            <h3 className='text-md font-bold'>{t('level')}</h3>
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

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className='flex w-max flex-col pb-20 pt-[10rem] lg:flex-row lg:pt-[10rem]'
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className='flex w-auto flex-col items-center gap-2 lg:max-w-[20rem]'>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='flex h-fit w-full flex-col rounded-md border-[1px] border-border/50 bg-primary/30 p-4'
            exit={{ opacity: 0, y: 30 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className='mb-4 flex flex-col items-center text-start lg:items-start'>
              <h2 className='text-xl font-bold'>{t('itemsInvTitle')}</h2>
              <span className='text-sm'>{t('itemsInvDescription')}</span>
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
                    className='h-4 w-4 overflow-visible rounded-full bg-primary/30 p-[2px]'
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    key={`item-element-${index}`}
                  >
                    <div className={cn(elements.find((y) => y.id === x)?.bgColor, 'h-full w-full rounded-full')} />
                  </motion.div>
                ))}
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='flex w-full flex-col items-center justify-center gap-1 rounded-md border-[1px] border-border/50 bg-primary/30 p-2 px-4'
            exit={{ opacity: 0, y: 10 }}
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className='flex w-full flex-col items-center justify-center'>
              <span className='font-bold'>{attribute.label}</span>
              <span className='text-xl font-bold'>{getTotalAttribute()}</span>
              <span className='mt-4 text-xs'>{t('attributesTitle')}</span>
              <div className='flex flex-row flex-wrap gap-2 py-2'>
                <div className='flex flex-col items-center justify-center'>
                  <span className='text-[0.7rem] text-green-500'>{t('item')}</span>
                  <span className='text-[0.7rem] text-green-500'>{getTotalItemAttribute()}</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <span className='text-[0.7rem] text-blue-500'>{t('forge')}</span>
                  <span className='text-[0.7rem] text-blue-500'>{getTotalForgeAttribute()}</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <span className='text-[0.7rem] text-yellow-500'>{t('bless')}</span>
                  <span className='text-[0.7rem] text-yellow-500'>{getTotalBlessAttribute()}</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <span className='text-[0.7rem] text-white/80'>{t('level')}</span>
                  <span className='text-[0.7rem] text-white/80'>{level}</span>
                </div>
              </div>
              <div className='flex w-full flex-col items-start justify-center gap-1 rounded-md bg-primary/20 p-1 px-2 text-[0.7rem]'>
                {Object.values(attributeTypes).map((x) => (
                  <div key={`attribute-${x.id}`}>
                    <span>
                      {x.item?.[`language.${lng}` as keyof typeof x.item]}{' '}
                      <span className='text-green-500'>{x.item?.stats?.[attribute.id]}</span>{' '}
                      {slotsAttribute?.[x.id]?.[attribute.id] && slotsAttribute?.[x.id]?.[attribute.id] > 0 ? (
                        <span className='text-blue-500'>{slotsAttribute?.[x.id]?.[attribute.id]}</span>
                      ) : null}{' '}
                      {getBlessPercentage(x) > 0 ? (
                        <span className='text-yellow-500'>{getBlessPercentage(x)}</span>
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <div className='flex h-fit max-h-[10rem] w-full flex-col items-center justify-center overflow-hidden'>
            {ignore && ignore?.length > 0 && (
              <div className='mt-2 flex max-h-[10rem] w-[14rem] flex-col gap-2 text-sm'>
                <span>{t('ignoredItemsTitle')}</span>
                <div className='no-scrollbar flex flex-col gap-2 overflow-y-auto'>
                  {ignore?.map((item: number, index: number) => {
                    const ignoredItem = kakeleItems.find((i) => i.id === item);

                    if (!ignoredItem) return null;

                    return (
                      <div
                        className='cursor-pointer rounded-md bg-destructive/30 px-2 py-[2px]'
                        key={`ignoredItems-${item}`}
                        onClick={() => {
                          setIgnore(ignore.filter((ignoredItem: number) => ignoredItem !== item));
                        }}
                        onKeyDown={() => {
                          setIgnore(ignore.filter((ignoredItem: number) => ignoredItem !== item));
                        }}
                      >
                        {ignoredItem[`language.${lng}` as keyof typeof ignoredItem]}
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
            className='flex w-full flex-col gap-4 rounded-lg border-[1px] border-border/50 bg-primary/30 p-4 lg:min-w-[32rem]'
            exit={{ opacity: 0, y: 30 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className='mb-4 flex flex-col items-start text-start'>
              <h2 className='text-xl font-bold'>{t('filtersTitle')}</h2>
              <span className='text-sm'>{t('filtersDescription')}</span>
            </div>
            <div className='flex w-full flex-row items-center justify-center gap-6'>
              <Popover>
                <PopoverTrigger className='flex flex-col items-center justify-center rounded-md bg-primary/20 p-1 px-3'>
                  <span className='text-sm font-semibold'>{t('vocationMenuTitle')}</span>
                  <span className='mb-4 text-xs text-primary-foreground'>{t(`kakele.vocations.${vocation.id}`)}</span>
                </PopoverTrigger>
                <PopoverContent className='flex w-fit max-w-[16rem] flex-row flex-wrap items-center justify-center gap-4 bg-background/80 backdrop-blur-md'>
                  <div className='flex w-full flex-col items-start'>
                    <span className='text-md'>{t('vocationPopoverTitle')}</span>
                    <span className='text-xs'>{t('vocationPopoverDescription')}</span>
                  </div>
                  <div className='flex w-full flex-wrap items-start gap-2'>
                    {vocations.map((v: VocationType, index: number) => (
                      <span
                        onClick={() => {
                          setVocation(v);
                        }}
                        key={v.id}
                        className={cn(
                          v.id === vocation.id ? 'bg-secondary/50' : 'bg-secondary/20',
                          'cursor-pointer rounded-md px-2 py-1 text-xs transition-all hover:bg-secondary/50'
                        )}
                      >
                        {v.label}
                      </span>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger className='flex flex-col items-center justify-center rounded-md bg-primary/20 p-1 px-3'>
                  <span className='text-sm font-semibold'>{t('attributeMenuTitle')}</span>
                  <span className='mb-4 text-xs text-primary-foreground'>{t(`kakele.attributes.${attribute.id}`)}</span>
                </PopoverTrigger>
                <PopoverContent className='flex w-fit max-w-[16rem] flex-row flex-wrap items-center justify-center gap-4 bg-background/80 backdrop-blur-md'>
                  <div className='flex w-full flex-col items-start'>
                    <span className='text-md'>{t('attributePopoverTitle')}</span>
                    <span className='text-xs'>{t('attributePopoverDescription')}</span>
                  </div>
                  <div className='flex w-full flex-wrap items-start gap-2'>
                    {attributes.map((v: AttributeType, index: number) => (
                      <span
                        onClick={() => {
                          setAttribute(v);
                        }}
                        key={v.id}
                        className={cn(
                          v.id === attribute.id ? 'bg-secondary/50' : 'bg-secondary/20',
                          'cursor-pointer rounded-md px-2 py-1 text-xs transition-all hover:bg-secondary/50'
                        )}
                      >
                        {v.label}
                      </span>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger className='flex flex-col items-center justify-center rounded-md bg-primary/20 p-1 px-3'>
                  <span className='text-sm font-semibold'>{t('elementMenuTitle')}</span>
                  <span className='mb-4 text-xs text-primary-foreground'>{t(`kakele.energy.${element.id}`)}</span>
                </PopoverTrigger>
                <PopoverContent className='flex w-fit max-w-[16rem] flex-row flex-wrap items-center justify-center gap-4 bg-background/80 backdrop-blur-md'>
                  <div className='flex w-full flex-col items-start'>
                    <span className='text-md'>{t('elementPopoverTitle')}</span>
                    <span className='text-xs'>{t('elementPopoverDescription')}</span>
                  </div>
                  <div className='flex w-full flex-wrap items-start gap-2'>
                    {elements.map((v: ElementType, index: number) => (
                      <span
                        onClick={() => {
                          setElement(v);
                        }}
                        key={v.id}
                        className={cn(
                          v.id === element.id ? 'bg-secondary/50' : 'bg-secondary/20',
                          'cursor-pointer rounded-md px-2 py-1 text-xs transition-all hover:bg-secondary/50'
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
                {t('excludeExpensiveItems')}
              </Toggle>
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='flex w-full flex-col gap-4 rounded-lg border-[1px] border-border/50 bg-primary/30 p-4'
            exit={{ opacity: 0, y: 30 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className='mb-4 flex flex-col items-start text-start'>
              <h2 className='text-xl font-bold'>{t('resultTitle')}</h2>
              <span className='text-sm'>{t('resultDescription')}</span>
              {error && <span className='p-1 px-2 text-sm text-red-500'>{error}</span>}
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
                        (x) => x.slot?.toLowerCase().replace(' ', '_') === v.toLowerCase().replace(' ', '_')
                      )?.item || result[v.toLowerCase().replace(' ', '_')];

                    return r ? (
                      <div className='relative flex w-full flex-row items-start justify-start' key={`${index}-${r.id}`}>
                        <Wrapper
                          lng={lng}
                          setSlotsAttribute={setSlotsAttribute}
                          slotsAttribute={slotsAttribute}
                          lockedSlots={lockedSlots}
                          setLockedSlots={setLockedSlots}
                          isLockedSlot={!!lockedSlots.some((x) => x.slot === r.slot)}
                          id={`wrapper-${r.id}`}
                          item={r}
                        />
                        {!lockedSlots.some((x) => x.slot === r.slot) && (
                          <div
                            className='absolute -right-1 m-2 flex h-11 w-8 cursor-pointer items-center justify-center rounded-md bg-primary/50 backdrop-blur-lg transition-all hover:bg-destructive/30'
                            onClick={() => {
                              if (!lockedSlots.some((x) => x.slot === r.slot)) {
                                setIgnore([...ignore, r.id]);
                              }
                            }}
                            onKeyDown={() => setIgnore([...ignore, r.id])}
                          >
                            <X size={16} />
                          </div>
                        )}
                      </div>
                    ) : (
                      // <div
                      //   className={cn(
                      //     lockedSlots.some((x) => x.slot === r.slot)
                      //       ? 'border-[3px] border-destructive/30'
                      //       : 'border-[1px] border-secondary/80',
                      //     'relative flex h-fit flex-row items-center rounded-md bg-secondary/20 p-2 drop-shadow-md transition-all hover:bg-secondary/40'
                      //   )}
                      //   key={`${index}-${r.id}`}
                      // >
                      //   {!lockedSlots.some((x) => x.slot === r.slot) && (
                      //     <div
                      //       className='absolute -right-2 m-2 flex h-full w-8 cursor-pointer items-center justify-center rounded-md transition-all hover:bg-destructive/30'
                      //       onClick={() => {
                      //         if (!lockedSlots.some((x) => x.slot === r.slot)) {
                      //           setIgnore([...ignore, r.id]);
                      //         }
                      //       }}
                      //       onKeyDown={() => setIgnore([...ignore, r.id])}
                      //     >
                      //       <X size={16} />
                      //     </div>
                      //   )}
                      //   <div className='absolute -top-4 left-1 m-2 flex h-4 w-fit flex-row items-start justify-start gap-2 text-nowrap'>
                      //     <div
                      //       className={cn(elements.find((y) => y.id === r.energy)?.bgColor, 'h-4 w-4 rounded-full ')}
                      //     />
                      //     <span className='flex h-4 items-center justify-center rounded-full border-[1px] border-border/50 bg-secondary/80 px-4 text-[0.6rem] backdrop-blur-lg'>
                      //       {t(`kakele.itemTypes.${r.slot.replace(/ /g, '')}`)}
                      //     </span>
                      //     {r.expensive && (
                      //       <span className='flex h-4 items-center justify-center rounded-full border-[1px] border-border/50 bg-secondary px-4 text-[0.6rem]'>
                      //         <DollarSign size={12} color='#e1e273' />
                      //       </span>
                      //     )}
                      //   </div>
                      //   <div
                      //     onClick={() => {
                      //       setCurrentItem(r);
                      //       setIsItemModalOpen(true);
                      //     }}
                      //     className='flex h-full w-full cursor-pointer flex-row items-center justify-start'
                      //   >
                      //     <Image
                      //       alt={r.name}
                      //       className='h-12 w-12 p-1'
                      //       height={256}
                      //       width={256}
                      //       src={
                      //         new URL(
                      //           `https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/${r.name.replaceAll("'", '')}.png`
                      //         ).href
                      //       }
                      //     />
                      //     <div className='ml-4 flex flex-col gap-1 text-start'>
                      //       <span className='lg:text-md text-xs font-semibold'>
                      //         {r[`language.${lng}` as keyof KakeleEquipmentOrWeapon]}
                      //       </span>
                      //       <span className='text-[0.6rem]'>
                      //         {t(`kakele.attributes.${attribute.id}` as keyof typeof attribute)} {r.stats[attribute.id]}
                      //       </span>
                      //     </div>
                      //   </div>
                      // </div>
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
                  ? 'border-[2px] border-destructive/80'
                  : 'border-[1px] border-border/30',
                'group/effect relative flex h-20 w-20 items-center justify-center rounded-md bg-secondary/50 transition-all lg:h-16 lg:w-16'
              )}
              key={index}
            >
              <div
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
                className='absolute hidden h-full w-full items-center justify-center rounded-md bg-secondary/50 backdrop-blur-lg transition-all group-hover/effect:flex'
              >
                <Lock size={32} className='opacity-40' />
              </div>
              {items[index] && (
                <Image
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
        <div className='h-20 w-20 rounded-md bg-secondary/30 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-secondary/30 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-secondary/30 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-secondary/30 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-secondary/30 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-secondary/30 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-secondary/30 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-secondary/30 lg:h-16 lg:w-16' />
        <div className='h-20 w-20 rounded-md bg-secondary/30 lg:h-16 lg:w-16' />
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
