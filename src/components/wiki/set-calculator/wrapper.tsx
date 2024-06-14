'use client';

import { type Dispatch, type SetStateAction, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import type { KakeleEquipmentOrWeapon } from '@/src/types';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';
import { Button } from '../../ui/button';
import RangeBlessPicker from '../bless-calculator/rating';
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group';
import { Bold } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Attributes = {
  attack: number;
  magic: number;
  armor: number;
  bless: number;
};

type SlotAttribute = Record<string, Attributes>;

interface ComponentProps {
  id: string;
  item?: KakeleEquipmentOrWeapon;
  isLockedSlot: boolean;
  setLockedSlots: Dispatch<SetStateAction<{ slot: string; item: KakeleEquipmentOrWeapon }[]>>;
  lockedSlots: { slot: string; item: KakeleEquipmentOrWeapon }[];
  slotsAttribute: SlotAttribute | null;
  setSlotsAttribute: Dispatch<SetStateAction<SlotAttribute | null>>;
  lng: string;
}

export default function Wrapper({ ...props }: ComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAttribute, setCurrentAttribute] = useState('attack');

  const language = props.lng || 'en';

  const { t } = useTranslation(['setCalculator']);

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleAttribute = (value: number) => {
    if (value > 100) return 100;
    if (value < 0) return 0;

    return value;
  };

  const [ref, { height }] = useMeasure();

  return (
    props.item?.id && (
      <div className='w-full'>
        <MotionConfig transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}>
          <motion.div
            animate={{ height: height > 0 ? height : undefined }}
            className={'overflow-hidden rounded-md bg-card'}
          >
            <div ref={ref} className='relative flex w-full flex-col items-center p-1'>
              <motion.div
                onClick={onClickHandler}
                layout
                className={cn(
                  props.isLockedSlot
                    ? 'outline-dotted outline-2 outline-offset-2 outline-destructive'
                    : 'outline-white/20',
                  'flex w-full cursor-pointer flex-row items-center justify-start rounded-md p-3 outline-offset-2 transition-all hover:outline'
                )}
                animate={{ background: isOpen ? 'hsl(var(--primary))' : 'hsl(var(--secondary))' }}
              >
                <div>
                  <AnimatePresence mode='popLayout'>
                    <div className='relative flex items-center justify-start'>
                      <Image
                        alt={props.item.name}
                        className='absolute h-12 w-12 rounded-full bg-card p-1'
                        height={256}
                        width={256}
                        src={
                          new URL(
                            `https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/${props.item.name.replaceAll("'", '')}.png`
                          ).href
                        }
                      />
                      <div className='relative ml-16 mr-8 mt-2 flex flex-col'>
                        <motion.h2
                          layoutId={`${props.id}-h2`}
                          className='absolute -top-2 text-center text-[0.6rem] text-primary-foreground/60'
                        >
                          {props.item?.slot}
                        </motion.h2>
                        <motion.h2 layoutId={`${props.id}-item-name`} className={'text-nowrap text-sm'}>
                          {/* 
                          //@ts-ignore} */}
                          {props.item?.[`language.${language}`]}
                        </motion.h2>
                      </div>
                    </div>
                  </AnimatePresence>
                </div>
                {/* <motion.div layout className='flex flex-col items-end justify-center gap-2'>
                  <button
                    type='button'
                    className='flex h-7 w-7 items-center justify-center rounded-full bg-white'
                    onClick={onClickHandler}
                  >
                    <svg width='15' height='11' viewBox='0 0 15 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <title>Open</title>
                      <path
                        d='M14.8734 5.50599C14.8525 5.45868 14.3452 4.33339 13.2175 3.2057C11.7149 1.70311 9.8171 0.908998 7.72821 0.908998C5.63932 0.908998 3.74147 1.70311 2.23889 3.2057C1.1112 4.33339 0.601554 5.46048 0.582989 5.50599C0.555748 5.56726 0.541672 5.63357 0.541672 5.70063C0.541672 5.76768 0.555748 5.83399 0.582989 5.89526C0.603949 5.94257 1.1112 7.06727 2.23889 8.19496C3.74147 9.69694 5.63932 10.4911 7.72821 10.4911C9.8171 10.4911 11.7149 9.69694 13.2175 8.19496C14.3452 7.06727 14.8525 5.94257 14.8734 5.89526C14.9007 5.83399 14.9147 5.76768 14.9147 5.70063C14.9147 5.63357 14.9007 5.56726 14.8734 5.50599ZM7.72821 9.53285C5.88486 9.53285 4.27448 8.86271 2.94137 7.54158C2.3944 6.9976 1.92904 6.37732 1.55976 5.70003C1.9289 5.02265 2.39428 4.40235 2.94137 3.85848C4.27448 2.53735 5.88486 1.8672 7.72821 1.8672C9.57156 1.8672 11.1819 2.53735 12.515 3.85848C13.0631 4.40226 13.5295 5.02255 13.8997 5.70003C13.4679 6.50612 11.5868 9.53285 7.72821 9.53285ZM7.72821 2.82541C7.15966 2.82541 6.60389 2.994 6.13116 3.30987C5.65843 3.62574 5.28998 4.07469 5.07241 4.59996C4.85484 5.12523 4.79791 5.70322 4.90883 6.26084C5.01974 6.81846 5.29353 7.33067 5.69555 7.73269C6.09757 8.13471 6.60978 8.40849 7.1674 8.51941C7.72502 8.63033 8.30301 8.5734 8.82828 8.35583C9.35355 8.13826 9.8025 7.76981 10.1184 7.29708C10.4342 6.82435 10.6028 6.26857 10.6028 5.70003C10.602 4.93787 10.2989 4.20717 9.76 3.66824C9.22107 3.12932 8.49036 2.8262 7.72821 2.82541ZM7.72821 7.61644C7.34918 7.61644 6.97866 7.50404 6.66351 7.29347C6.34836 7.08289 6.10272 6.78358 5.95768 6.43341C5.81263 6.08323 5.77468 5.6979 5.84862 5.32615C5.92257 4.95441 6.10509 4.61293 6.3731 4.34492C6.64112 4.0769 6.98259 3.89438 7.35434 3.82044C7.72608 3.74649 8.11141 3.78445 8.46159 3.92949C8.81177 4.07454 9.11107 4.32017 9.32165 4.63533C9.53223 4.95048 9.64462 5.321 9.64462 5.70003C9.64462 6.20829 9.44271 6.69574 9.08332 7.05513C8.72392 7.41453 8.23647 7.61644 7.72821 7.61644Z'
                        fill='black'
                      />
                    </svg>
                  </button>
                  <button type='button' className='flex h-7 w-7 items-center justify-center rounded-full bg-white'>
                    <svg width='14' height='13' viewBox='0 0 14 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <title>Remove</title>
                      <line
                        x1='0.0430813'
                        y1='4.2107'
                        x2='13.4133'
                        y2='4.2107'
                        stroke='#060606'
                        strokeWidth='1.45864'
                      />
                      <circle
                        cx='9.07162'
                        cy='3.98707'
                        r='1.85832'
                        fill='white'
                        stroke='black'
                        strokeWidth='0.345903'
                      />
                      <line
                        x1='0.0430813'
                        y1='9.56476'
                        x2='13.4133'
                        y2='9.56476'
                        stroke='#060606'
                        strokeWidth='1.45864'
                      />
                      <circle cx='4.10234' cy='9.468' r='1.8215' fill='white' stroke='black' strokeWidth='0.339049' />
                    </svg>
                  </button>
                </motion.div> */}
              </motion.div>

              {isOpen && (
                <div className='h-fit w-full'>
                  <div className='m-2 mt-2 flex flex-col items-center justify-between gap-2 rounded-md bg-primary/40 p-2 px-4 lg:justify-center'>
                    <div className='flex w-full flex-row items-center justify-between gap-2 lg:justify-center lg:gap-8'>
                      <div className='flex flex-col'>
                        <div className='flex flex-row items-center justify-center gap-2'>
                          <Image
                            alt={'Attack Icon'}
                            className='h-4 w-4 rounded-md bg-card'
                            height={256}
                            width={256}
                            src={
                              'https://res.cloudinary.com/dbkrvt2x0/image/upload/v1715883713/kakele-wiki/icons/attack.png'
                            }
                          />
                          <span className='text-xs font-black'>{t('attributes.attack')}</span>
                        </div>
                        <span>{props.item.stats.attack}</span>
                      </div>
                      <div className='flex flex-col'>
                        <div className='flex flex-row items-center justify-center gap-2'>
                          <Image
                            alt={'Magic Icon'}
                            className='h-4 w-4 rounded-md bg-card'
                            height={256}
                            width={256}
                            src={
                              'https://res.cloudinary.com/dbkrvt2x0/image/upload/v1715883713/kakele-wiki/icons/magic.png'
                            }
                          />
                          <span className='text-xs font-black'>{t('attributes.magic')}</span>
                        </div>
                        <span>{props.item.stats.magic}</span>
                      </div>
                      <div className='flex flex-col'>
                        <div className='flex flex-row items-center justify-center gap-2'>
                          <Image
                            alt={'Armor Icon'}
                            className='h-4 w-4 rounded-md bg-card'
                            height={256}
                            width={256}
                            src={
                              'https://res.cloudinary.com/dbkrvt2x0/image/upload/v1715883713/kakele-wiki/icons/armor.png'
                            }
                          />
                          <span className='text-xs font-black'>{t('attributes.armor')}</span>
                        </div>
                        <span>{props.item.stats.armor}</span>
                      </div>
                    </div>
                    <div className='flex w-full flex-row items-center justify-center gap-2 rounded-md bg-primary/50 p-2'>
                      <Image
                        alt={'Gold Icon'}
                        className='h-4 w-4'
                        height={256}
                        width={256}
                        src={'https://res.cloudinary.com/dbkrvt2x0/image/upload/v1715883713/kakele-wiki/icons/gold.png'}
                      />
                      <span className='text-sm'>{new Intl.NumberFormat().format(props.item.value)}</span>
                    </div>
                  </div>
                  <div className='m-2 flex flex-col items-center justify-center gap-2 rounded-md bg-primary/40 p-2 px-4'>
                    {/* {JSON.stringify(props.slotsAttribute?.[props.item?.slot as string])} */}
                    <div className='flex flex-col'>
                      <span className='text-md font-bold'>{t('wrapperAttributeOptions')}</span>
                      <span className='text-xs'>{t('wrapperAttributeOptionsDescription')}</span>
                    </div>
                    <div className='flex w-full flex-col gap-2 rounded-md bg-primary/60 p-2'>
                      <div className='flex flex-col'>
                        <span className='text-xs font-bold'>{t('wrapperForgeOptions')}</span>
                        <span className='text-[0.6rem]'>{t('wrapperForgeOptionsDescription')}</span>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <ToggleGroup
                          onValueChange={(value) => setCurrentAttribute(value)}
                          defaultValue={currentAttribute}
                          type='single'
                        >
                          <ToggleGroupItem className='h-8' value='attack'>
                            {t('attributes.attack')}
                          </ToggleGroupItem>
                          <ToggleGroupItem className='h-8' value='magic'>
                            {t('attributes.magic')}
                          </ToggleGroupItem>
                          <ToggleGroupItem className='h-8' value='armor'>
                            {t('attributes.armor')}
                          </ToggleGroupItem>
                        </ToggleGroup>
                        <div className='w-full rounded-md bg-primary p-2'>
                          {/* {JSON.stringify(props.slotsAttribute?.[props.item.slot])} */}

                          <div className='flex flex-row items-center justify-center gap-2'>
                            <Button
                              onClick={(value) => {
                                if (!props.slotsAttribute?.[props.item?.slot as string]) {
                                  props.setSlotsAttribute({
                                    ...props.slotsAttribute,
                                    [props.item?.slot as string]: {
                                      attack: 0,
                                      magic: 0,
                                      armor: 0,
                                      bless: 0,
                                    },
                                  });
                                } else {
                                  props.setSlotsAttribute({
                                    ...props.slotsAttribute,
                                    [props.item?.slot as string]: {
                                      ...props.slotsAttribute?.[props.item?.slot as string],
                                      [currentAttribute as keyof Attributes]: handleAttribute(
                                        props.slotsAttribute?.[props.item?.slot as string][
                                          currentAttribute as keyof Attributes
                                        ] - 5
                                      ),
                                    },
                                  });
                                }
                              }}
                              variant='ghost'
                              className='h-6 w-6'
                            >
                              -
                            </Button>
                            <span className='text-xl font-bold'>
                              {props.slotsAttribute?.[props.item.slot]?.[currentAttribute as keyof Attributes] || 0}
                            </span>
                            <Button
                              onClick={(value) => {
                                if (!props.slotsAttribute?.[props.item?.slot as string]) {
                                  props.setSlotsAttribute({
                                    ...props.slotsAttribute,
                                    [props.item?.slot as string]: {
                                      attack: 0,
                                      magic: 0,
                                      armor: 0,
                                      bless: 0,
                                    },
                                  });
                                } else {
                                  props.setSlotsAttribute({
                                    ...props.slotsAttribute,
                                    [props.item?.slot as string]: {
                                      ...props.slotsAttribute?.[props.item?.slot as string],
                                      [currentAttribute as keyof Attributes]: handleAttribute(
                                        props.slotsAttribute?.[props.item?.slot as string][
                                          currentAttribute as keyof Attributes
                                        ] + 5
                                      ),
                                    },
                                  });
                                }
                              }}
                              variant='ghost'
                              className='h-6 w-6'
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex w-full flex-col gap-2 rounded-md bg-primary/60 p-2'>
                      <div className='flex flex-col'>
                        <span className='text-xs font-bold'>{t('wrapperBlessOptions')}</span>
                        <span className='text-[0.6rem]'>{t('wrapperBlessOptionsDescription')}</span>
                      </div>
                      <div className='flex flex-col'>
                        <RangeBlessPicker
                          value={props.slotsAttribute?.[props.item?.slot as string]?.bless || 0}
                          setValue={(value: number) => {
                            if (!props.slotsAttribute?.[props.item?.slot as string]) {
                              props.setSlotsAttribute({
                                ...props.slotsAttribute,
                                [props.item?.slot as string]: {
                                  attack: 0,
                                  magic: 0,
                                  armor: 0,
                                  bless: value,
                                },
                              });
                            } else {
                              props.setSlotsAttribute({
                                ...props.slotsAttribute,
                                [props.item?.slot as string]: {
                                  ...props.slotsAttribute?.[props.item?.slot as string],
                                  bless: value,
                                },
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='m-2 flex flex-row flex-wrap items-center justify-center gap-2 rounded-md bg-primary/40 p-2 px-4'>
                    <Button
                      onClick={() => {
                        if (props.lockedSlots.find((x) => x.slot === props.item?.slot)) {
                          props.setLockedSlots(props.lockedSlots.filter((x) => x.slot !== props.item?.slot));
                        } else {
                          props.setLockedSlots([
                            ...props.lockedSlots,
                            { slot: props.item?.slot as string, item: props.item as KakeleEquipmentOrWeapon },
                          ]);
                        }
                      }}
                      variant='ghost'
                      className='h-8'
                    >
                      {t('wrapperLockItems')}
                    </Button>
                    {/* <Button variant='ghost' className='h-8'>
                      Change Item
                    </Button> */}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </MotionConfig>
      </div>
    )
  );
}
