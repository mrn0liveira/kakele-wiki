'use client';

import { AlertTriangle, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from '@nextui-org/react';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/src/lib/utils';
import kakeleItems from '@/public/kakele-data/items.js';

import SearchBar from './search-bar';
import BlessPicker from './rating';
import type { Option } from './dropdown';

import { BlessPercentages } from '@/src/lib/constants';
import type { KakeleEquipmentItems, KakeleEquipmentOrWeapon, KakeleWeaponItems } from '@/src/types';
import { getBless } from '@/src/lib/kakele/bless-calculator';

import '@/src/styles/Card-Shine.css';

interface InventoryItem {
  count: number;
}

interface Inventory {
  [itemName: string]: InventoryItem;
}

interface BlessData {
  gold: number;
  inventory: Inventory;
}

function getItemRarityColor(rarity: string) {
  switch (rarity) {
    case 'Common':
      return 'text-[#adaaaa]';
    case 'Uncommon':
      return 'text-[#378eb0]';
    case 'Rare':
      return 'text-[#b09437]';
    case 'Legendary':
      return 'text-[#b03f37]';
    default:
      return 'text-[#adaaaa]';
  }
}

function subtractBlessData(items1: BlessData, items2: BlessData): BlessData {
  const result: BlessData = {
    gold: items2.gold - items1.gold,
    inventory: { ...items2.inventory },
  };

  for (const itemName in items1.inventory) {
    const item1 = items1.inventory[itemName];
    const existingItem = result.inventory[itemName];

    if (existingItem) {
      existingItem.count -= item1.count;

      if (existingItem.count <= 0) {
        delete result.inventory[itemName];
      }
    }
  }

  return result;
}

export default function BlessCalculatorContainer({ lng = 'en' }: { lng: string }) {
  const { t } = useTranslation();

  const [queryFirstBless, setQueryFirstBless] = useQueryState('b1');
  const [querySecondBless, setQuerySecondBless] = useQueryState('b2');

  const [queryMagic, setQueryMagic] = useQueryState('magic');
  const [queryAttack, setQueryAttack] = useQueryState('attack');
  const [queryArmor, setQueryArmor] = useQueryState('armor');

  const [queryItem, setQueryItem] = useQueryState('item');
  const [queryIgnore, setQueryIgnore] = useQueryState('ignore', parseAsArrayOf(parseAsString));

  const [warnMessage, setWarnMessage] = useState<{
    message: string;
    id: string;
  } | null>(null);

  const [value, setValue] = useState<Option>();

  const [initialValue, setInitialValue] = useState<number>(Number(queryFirstBless) || 0);
  const [finalValue, setFinalValue] = useState<number>(Number(querySecondBless) || 6);

  const [blessItems, setBlessItems] = useState<KakeleEquipmentOrWeapon[]>([]);
  const [ignoredItems, setIgnoredItems] = useState<string[]>(queryIgnore || []);
  const [gold, setGold] = useState<number>(0);

  const [magic, setMagic] = useState<number>(Number(queryMagic) || 0);
  const [attack, setAttack] = useState<number>(Number(queryAttack) || 0);
  const [armor, setArmor] = useState<number>(Number(queryArmor) || 0);

  const [item, setItem] = useState<KakeleEquipmentOrWeapon | null>(null);

  const language = lng;

  useEffect(() => {
    const item = kakeleItems.find((x: any) => x.name.toLowerCase() === value?.value.toLowerCase());

    if (item) {
      //@ts-ignore
      setItem(item);
    }
  }, [value]);

  useEffect(() => {
    if (initialValue === undefined || finalValue === undefined) return;

    if (Number.isNaN(initialValue) || Number.isNaN(finalValue) || item?.name == null) {
      setWarnMessage({
        message: t('blessCalculator.error.initialAndFinalValuesMustBeNumbers'),
        id: 'blessError.initialAndFinalValuesMustBeNumbers',
      });
      return;
    }

    if (initialValue >= finalValue) {
      setWarnMessage({
        message: t('blessCalculator.error.initialValueGreaterThanFinalValue'),
        id: 'blessError.initialValueGreaterThanFinalValue',
      });
      return;
    }

    try {
      const result_one: any = getBless(item.name, initialValue, ignoredItems);

      const result_two: any = getBless(item.name, finalValue, ignoredItems);

      const result = subtractBlessData(result_one, result_two);

      const blessItems = Object.keys(result.inventory);

      const blessResultItems: KakeleEquipmentOrWeapon[] = [];

      setGold(result.gold);

      for (let index = 0; index < blessItems.length; index++) {
        if (blessItems[index] === 'gold') continue;

        const i = kakeleItems.find((x) => x.name === blessItems[index]);

        if (i) {
          //@ts-ignore
          i.amount = result.inventory[blessItems[index]].count;
          blessResultItems.push(i as KakeleEquipmentOrWeapon);
        }
      }

      setWarnMessage(null);
      setBlessItems(blessResultItems);
    } catch (error) {
      setWarnMessage({
        message: t('blessCalculator.error.noItems'),
        id: 'blessError.noItems',
      });
    }
  }, [initialValue, finalValue, item?.name, ignoredItems, t]);

  useEffect(() => {
    const item = kakeleItems.find(
      (x) => x.id === Number(queryItem) && (x.type === 'Equipment' || x.type === 'Weapon')
    ) as KakeleEquipmentItems | KakeleWeaponItems | null;

    if (item) {
      setItem(item);
    }
  }, [queryItem]);

  return (
    <div className='relative flex min-h-lvh flex-col items-center justify-center space-y-8 p-8 text-center'>
      <div
        className='absolute top-0 flex w-full items-center justify-center'
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(20, 17, 15, 1) 100%)',
        }}
      >
        <div className='flex h-auto w-[40rem] flex-col items-center justify-center'>
          <h2 className='mt-4 text-2xl font-bold'>{t('blessCalculator.searchTitle')}</h2>
          <SearchBar
            emptyMessage={t('blessCalculator.searchEmpty')}
            isDisabled={false}
            language={language}
            placeholder={t('blessCalculator.searchPlaceholder')}
            setValue={(value) => {
              setQueryItem(value.id);
              setValue(value);
            }}
            value={value}
          />
        </div>
      </div>
      <div
        className='absolute bottom-0 flex h-[10rem] w-full items-center justify-center'
        style={{
          background: 'linear-gradient(to top, rgba(20, 17, 15, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        }}
      />
      {item ? (
        <BlessItemContainer>
          <div className='flex h-full w-[18rem] flex-col justify-center gap-2'>
            <BlessItemHeader
              blessValue={finalValue}
              item={item}
              itemType={t(`blessCalculator.itemTypes.${item.type}`)}
              lng={language}
              rarityName={t(`blessCalculator.rarities.${item.rarity}`)}
            />
            <BlessItemInfo
              energyText={t('blessCalculator.energy')}
              item={item}
              levelText={t('blessCalculator.level')}
              t={t}
              valueText={t('blessCalculator.value')}
            />
            <div className='relative flex h-fit w-[18rem] flex-col items-start justify-center rounded-xl border-[1px] border-stone-800 bg-stone-900 p-4 md:hidden'>
              {warnMessage &&
                [
                  'blessError.initialValueGreaterThanFinalValue',
                  'blessError.initialAndFinalValuesMustBeNumbers',
                ].includes(warnMessage?.id) && (
                  <div className='absolute -top-4 left-2 flex rounded-lg border-[1px] border-red-600 bg-red-700 p-[2px] px-4 text-xs'>
                    {warnMessage.message}
                  </div>
                )}
              <div className='items-cenre flex flex-col text-start'>
                <h2 className='text-xl font-bold'>{t('blessCalculator.optionsTitle')}</h2>
                <span className='text-sm'>{t('blessCalculator.optionsDescription')}</span>
              </div>
              <div className='flex flex-col text-sm'>
                <span className='my-4'>{t('blessCalculator.blessRange')}</span>
                <BlessPicker
                  disabledValues={Array.from({ length: 11 }, (_, index) => index).map((index) => {
                    if (index >= finalValue) return index;
                  })}
                  setValue={(value) => {
                    setQueryFirstBless(value.toString());
                    setInitialValue(value);
                  }}
                  topText='Initial Bless'
                  value={initialValue}
                />
                <BlessPicker
                  disabledValues={Array.from({ length: 11 }, (_, index) => index).map((index) => {
                    if (index <= initialValue) return index;
                  })}
                  setValue={(value) => {
                    setQuerySecondBless(value.toString());
                    setFinalValue(value);
                  }}
                  topText='Desired Bless'
                  value={finalValue}
                />
              </div>
            </div>
            <BlessItemStats
              blessBonus={Math.floor(
                (((item.stats.attack < 0 ? 0 : item.stats.attack) + attack) *
                  //@ts-ignore
                  ((BlessPercentages[item.rarity]?.[finalValue] as number) || 0)) /
                  100
              )}
              blessBonusText={t('blessCalculator.blessBonus')}
              forgeBonusText={t('blessCalculator.forgeBonus')}
              imageUrl={'https://res.cloudinary.com/dl3asnoii/image/upload/v1709322199/kakele.com.br/icons/attack.png'}
              itemBonusText={t('blessCalculator.itemBonus')}
              itemStat={attack}
              label={t('blessCalculator.attack')}
              setItemStat={(value) => {
                setQueryAttack(value.toString());
                setAttack(value);
              }}
              totalBonusText={t('blessCalculator.totalBonus')}
              value={item.stats.attack}
            />
            <BlessItemStats
              blessBonus={Math.floor(
                (((item.stats.magic < 0 ? 0 : item.stats.magic) + magic) *
                  //@ts-ignore
                  (BlessPercentages[item.rarity]?.[finalValue as number] || 0)) /
                  100
              )}
              blessBonusText={t('blessCalculator.blessBonus')}
              forgeBonusText={t('blessCalculator.forgeBonus')}
              imageUrl={'https://res.cloudinary.com/dl3asnoii/image/upload/v1709322199/kakele.com.br/icons/magic.png'}
              itemBonusText={t('blessCalculator.itemBonus')}
              itemStat={magic}
              label={t('blessCalculator.magic')}
              setItemStat={(value) => {
                setQueryMagic(value.toString());
                setMagic(value);
              }}
              totalBonusText={t('blessCalculator.totalBonus')}
              value={item.stats.magic}
            />
            <BlessItemStats
              blessBonus={Math.floor(
                (((item.stats.armor < 0 ? 0 : item.stats.armor) + armor) *
                  //@ts-ignore
                  (BlessPercentages[item.rarity]?.[finalValue as number] || 0)) /
                  100
              )}
              blessBonusText={t('blessCalculator.blessBonus')}
              forgeBonusText={t('blessCalculator.forgeBonus')}
              imageUrl={'https://res.cloudinary.com/dl3asnoii/image/upload/v1709322199/kakele.com.br/icons/armor.png'}
              itemBonusText={t('blessCalculator.itemBonus')}
              itemStat={armor}
              label={t('blessCalculator.armor')}
              setItemStat={(value) => {
                setQueryArmor(value.toString());
                setArmor(value);
              }}
              totalBonusText={t('blessCalculator.totalBonus')}
              value={item.stats.armor}
            />
          </div>
          <div className='relative mt-8 flex h-fit flex-col items-center justify-center gap-2 md:mt-0'>
            <BlessItemInfoGold text={t('blessCalculator.blessGold')} value={gold} />
            <div className='relative h-fit w-[18rem] rounded-xl border-[1px] border-stone-700 bg-stone-800 p-4 md:w-[22rem]'>
              {warnMessage && ['blessError.noItems'].includes(warnMessage?.id) && (
                <div className='absolute -top-4 left-2 flex rounded-lg border-[1px] border-red-600 bg-red-700 p-[2px] px-4 text-xs'>
                  {warnMessage.message}
                </div>
              )}
              <div className='mb-4 flex flex-col items-start text-start'>
                <h2 className='text-xl font-bold'>{t('blessCalculator.requiredItemsTitle')}</h2>
                <span className='text-sm'>{t('blessCalculator.requiredItemsDescription')}</span>
              </div>

              {blessItems && (
                <div className='mt-8 flex min-h-[24rem] flex-col gap-2'>
                  <AnimatePresence mode='wait'>
                    {blessItems.map((item: KakeleEquipmentItems | KakeleWeaponItems, index: number) => {
                      return (
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          className='relative flex flex-row items-center rounded-md border-[1px] border-stone-600 bg-stone-700 p-2 drop-shadow-md hover:border-stone-400'
                          exit={{ opacity: 0, y: 30 }}
                          initial={{ opacity: 0, y: 30 }}
                          key={`${index}${item.id}`}
                          transition={{ duration: 0.1, ease: 'easeOut' }}
                        >
                          <Image
                            alt={item.name}
                            height={64}
                            src={
                              new URL(
                                `https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/${item.name.replaceAll("'", '')}.png`
                              ).href
                            }
                            width={64}
                          />
                          <div className='ml-2 flex flex-col items-start text-start'>
                            <span className='text-sm font-black'>{item.amount}</span>
                            <span className='text-sm'>
                              {/*
                       										     // @ts-ignore */}
                              {item[`language.${lng}`]}
                            </span>
                          </div>
                          <div
                            className='absolute right-0 top-0 m-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full hover:bg-red-700'
                            onClick={() => {
                              setQueryIgnore([...ignoredItems, item.id.toString()]);
                              setIgnoredItems([...ignoredItems, item.id.toString()]);
                            }}
                            onKeyDown={() => {
                              setIgnoredItems([...ignoredItems, item.id.toString()]);
                              setQueryIgnore([...ignoredItems, item.id.toString()]);
                            }}
                          >
                            <X size={16} />
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='relative hidden h-fit w-[18rem] flex-col items-center justify-center rounded-xl border-[1px] border-stone-800 bg-stone-900 p-4 md:flex'>
              {warnMessage &&
                [
                  'blessError.initialValueGreaterThanFinalValue',
                  'blessError.initialAndFinalValuesMustBeNumbers',
                ].includes(warnMessage?.id) && (
                  <div className='absolute -top-4 left-2 flex rounded-lg border-[1px] border-red-600 bg-red-700 p-[2px] px-4 text-xs'>
                    {warnMessage.message}
                  </div>
                )}
              <div className='items-cenre flex flex-col text-start'>
                <h2 className='text-xl font-bold'>{t('blessCalculator.optionsTitle')}</h2>
                <span className='text-sm'>{t('blessCalculator.optionsDescription')}</span>
              </div>
              <div className='mt-4 flex flex-col gap-2 text-sm'>
                <span>{t('blessCalculator.blessRange')}</span>
                <BlessPicker
                  disabledValues={Array.from({ length: 11 }, (_, index) => index).map((index) => {
                    if (index >= finalValue) return index;
                  })}
                  setValue={(value) => {
                    setQueryFirstBless(value.toString());
                    setInitialValue(value);
                  }}
                  topText='Initial Bless'
                  value={initialValue}
                />
                <BlessPicker
                  disabledValues={Array.from({ length: 11 }, (_, index) => index).map((index) => {
                    if (index <= initialValue) return index;
                  })}
                  setValue={(value) => {
                    setQuerySecondBless(value.toString());
                    setFinalValue(value);
                  }}
                  topText='Desired Bless'
                  value={finalValue}
                />
              </div>
            </div>
            {ignoredItems && ignoredItems?.length > 0 && (
              <div className='mt-4 flex h-[10rem] max-h-[10rem] w-[18rem] flex-col gap-2 text-sm'>
                <span>{t('blessCalculator.ignoredItemsTitle')}</span>
                <div className='no-scrollbar flex flex-col gap-2 overflow-y-auto'>
                  {ignoredItems?.map((item: string, index: number) => {
                    const ignoredItem = kakeleItems.find((i) => i.id.toString() === item);

                    if (!ignoredItem) return null;

                    return (
                      <div
                        className='cursor-pointer rounded-md bg-red-500/20 px-2 py-[2px]'
                        key={`${index}-ignoredItems`}
                        onClick={() => {
                          setQueryIgnore(ignoredItems.filter((i) => i !== item));
                          setIgnoredItems(ignoredItems.filter((ignoredItem: string) => ignoredItem !== item));
                        }}
                        onKeyDown={() => {
                          setIgnoredItems(ignoredItems.filter((ignoredItem: string) => ignoredItem !== item));
                          setQueryIgnore(ignoredItems.filter((i) => i !== item));
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
        </BlessItemContainer>
      ) : (
        <BlessItemContainer> </BlessItemContainer>
      )}
    </div>
  );
}

const BlessItemContainer = React.forwardRef(({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 pb-20 pt-[4rem] md:items-start lg:flex-row'>
      {children}
    </div>
  );
});

const BlessItemHeader = React.forwardRef(
  ({
    item,
    lng,
    rarityName,
    itemType,
    blessValue,
  }: {
    item: KakeleEquipmentItems | KakeleWeaponItems;
    lng: string;
    rarityName: string;
    itemType: string;
    blessValue: number;
  }) => {
    return (
      <div className='card-shine-effect-2 border-stone flex w-full flex-col items-center justify-center rounded-lg border-[1px] border-stone-800/70 bg-stone-900 p-4'>
        <span className='text-xs'>
          <span className={cn(getItemRarityColor(item.rarity), 'font-black')}>{rarityName}</span> {itemType}
        </span>
        <span className='text-md max-w-[20rem] font-semibold'>
          {/*
         			 // @ts-ignore */}
          {item[`language.${lng}`]}
        </span>
        <span className='text-md font-semibold text-green-500'>
          {/*
         			 // @ts-ignore */}
          +{BlessPercentages[item.rarity][blessValue]}%
        </span>
        <Image
          alt={item.name}
          className='h-40 w-40'
          src={
            new URL(
              `https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/${item.name.replaceAll("'", '')}.png`
            ).href
          }
        />
      </div>
    );
  }
);

const BlessItemInfo = React.forwardRef(
  ({
    item,
    levelText,
    valueText,
    energyText,
    t,
  }: {
    item: KakeleEquipmentItems | KakeleWeaponItems;
    levelText: string;
    valueText: string;
    energyText: string;
    t: (key: string) => string;
  }) => {
    return (
      <div className='w-full rounded-xl border-[1px] border-stone-700 bg-stone-800'>
        {item.level && (
          <div className='flex flex-row items-center justify-between space-x-12 p-2 text-xs'>
            <h3 className='font-bold text-stone-400'>{levelText}</h3>
            <h4 className='rounded-md bg-stone-900/70 p-[2px] px-4'>{Intl.NumberFormat().format(item.level)}</h4>
          </div>
        )}
        {item.value && (
          <div className='flex flex-row items-center justify-between space-x-12 p-2 text-xs'>
            <h3 className='font-bold text-stone-400'>{valueText}</h3>
            <h4 className='rounded-md bg-stone-900/70 p-[2px] px-4'>{Intl.NumberFormat().format(item.value)}</h4>
          </div>
        )}
        {item.energy && (
          <div className='flex flex-row items-center justify-between space-x-12 p-2 text-xs'>
            <h3 className='font-bold text-stone-400'>{energyText}</h3>
            <h4 className='rounded-md bg-stone-900/70 p-[2px] px-4'>{t(`kakele.energy.${item.energy}`)}</h4>
          </div>
        )}
      </div>
    );
  }
);

const BlessItemInfoGold = React.forwardRef(({ value, text }: { value: number; text: string }) => {
  return (
    <div className='relative flex w-full flex-row items-center justify-start gap-8 rounded-lg border-[1px] border-yellow-700 bg-yellow-800 font-bold'>
      <Image
        alt='Gold Icon'
        className='h-8 w-8 rounded-lg bg-yellow-500/70'
        height={128}
        src='https://res.cloudinary.com/dl3asnoii/image/upload/v1709425094/kakele.com.br/icons/gold.png'
        width={128}
      />
      <span className='absolute -top-6 left-2 rounded-md border-[1px] border-yellow-600 bg-yellow-700 px-4 text-xs text-yellow-400'>
        {text}
      </span>
      <span className=''>{Intl.NumberFormat().format(value)}</span>
    </div>
  );
});

const BlessItemStats = React.forwardRef(
  ({
    value,
    label,
    blessBonus,
    itemStat,
    setItemStat,
    imageUrl,
    itemBonusText,
    forgeBonusText,
    blessBonusText,
    totalBonusText,
  }: {
    value: number;
    label: string;
    blessBonus: number;
    itemStat: number;
    setItemStat: (value: number) => void;
    imageUrl: string;
    itemBonusText: string;
    forgeBonusText: string;
    blessBonusText: string;
    totalBonusText: string;
  }) => {
    return (
      <>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-row gap-2'>
            <div className='flex flex-row'>
              <Image alt={`${label} Icon`} className='h-8 w-8 bg-red-950' height={128} src={imageUrl} width={128} />
            </div>
            <div className='flex w-full flex-row items-center justify-between rounded-xl border-[1px] border-red-900/50 bg-red-950 px-4'>
              <div>
                <span className='text-xs font-bold'>{label}</span>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <div
                  className='cursor-pointer rounded-md bg-red-800 p-[1px] px-2 text-center text-xs drop-shadow-md'
                  onClick={() => (itemStat <= 0 ? setItemStat(0) : setItemStat(itemStat - 5))}
                  onKeyDown={(e) => {
                    itemStat <= 0 ? setItemStat(0) : setItemStat(itemStat - 5);
                  }}
                >
                  -
                </div>
                <div
                  className='cursor-pointer rounded-md bg-red-800 p-[1px] px-2 text-center text-xs drop-shadow-md'
                  onClick={() => (itemStat >= 100 ? setItemStat(100) : setItemStat(itemStat + 5))}
                  onKeyDown={() => {
                    itemStat >= 100 ? setItemStat(100) : setItemStat(itemStat + 5);
                  }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
          <div className='ml-8 flex flex-col items-start text-sm'>
            <span className='flex flex-row items-center gap-2 text-xs text-stone-300'>
              {value < 0 && <AlertTriangle color='yellow' size={12} />}
              {itemBonusText} {Intl.NumberFormat().format(value)}
            </span>
            <span className='text-xs text-green-500'>
              {forgeBonusText} {Intl.NumberFormat().format(itemStat)}
            </span>
            <span className='text-xs text-yellow-500'>
              {blessBonusText} {Intl.NumberFormat().format(blessBonus)}
            </span>
            <span className='mt-2 rounded-md bg-stone-950 p-[2px] px-2 text-xs text-orange-500'>
              {totalBonusText}{' '}
              <span className='font-bold'>
                {Intl.NumberFormat().format((value < 0 ? 0 : value) + itemStat + blessBonus)}
              </span>{' '}
            </span>
          </div>
        </div>
      </>
    );
  }
);

BlessItemHeader.displayName = 'BlessItemHeader';
BlessItemInfo.displayName = 'BlessItemInfo';
BlessItemStats.displayName = 'BlessItemStats';
BlessItemContainer.displayName = 'BlessItemContainer';
BlessItemInfoGold.displayName = 'BlessItemInfoGold';
