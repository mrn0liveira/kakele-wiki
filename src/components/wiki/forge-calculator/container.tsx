'use client';

import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Input } from '../../ui/input';
import { useEffect, useState } from 'react';
import { getEquipmentUpgradeResources } from '@/src/lib/kakele/forge-calculator';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '../../ui/popover';
import { cn } from '@/src/lib/utils';

import { motion } from 'framer-motion';

export default function ForgeCalculatorContainer({ lng }: { lng: string }) {
  const { t } = useTranslation();

  const [firstForgeLevel, setFirstForgeLevel] = useState(0);
  const [resources, setResources] = useState(getEquipmentUpgradeResources(0));

  const [marketValues, setMarketValues] = useState({
    copper: 0,
    tin: 0,
    silver: 0,
    iron: 0,
    gold: 0,
  });

  const [debouncedValue] = useDebounce(firstForgeLevel, 2000);

  useEffect(() => {
    const value = Math.abs(Math.round((debouncedValue > 200 ? 200 : debouncedValue) / 5));

    const resources = getEquipmentUpgradeResources(value);

    setResources(resources);

    if (value % 5 !== 0) {
      setFirstForgeLevel(value * 5);
    }
  }, [debouncedValue]);

  const resourcesData: {
    [key: string]: { name: string; image: string };
  } = {
    copper: {
      name: t('forgeCalculator.copper'),
      image: 'Raw Copper',
    },
    tin: {
      name: t('forgeCalculator.tin'),
      image: 'Raw Tin',
    },
    silver: {
      name: t('forgeCalculator.silver'),
      image: 'Raw Silver',
    },
    iron: {
      name: t('forgeCalculator.iron'),
      image: 'Raw Iron',
    },
    gold: {
      name: t('forgeCalculator.gold'),
      image: 'Raw Gold',
    },
  };

  const handleMarketPriceChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const value = e.target.valueAsNumber;

    setMarketValues((prev) => ({ ...prev, [key]: value > 100_000 ? 100_000 : value }));
  };

  const handleTotalPrice = () => {
    let total = 0;

    for (const [key, value] of Object.entries(marketValues)) {
      total += value * resources[key as keyof typeof resources] || 0;
    }

    return total + resources.money;
  };

  return (
    <div className='relative flex min-h-[40rem] flex-col items-center justify-center space-y-8 p-8 text-center'>
      <div
        className='absolute top-0 flex w-full items-center justify-center'
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(20, 17, 15, 1) 100%)',
        }}
      >
        <div className='flex h-auto w-[40rem] flex-col items-center justify-center'>
          <h2 className='mt-8 px-4 pt-8 text-2xl font-bold'>{t('forgeCalculator.cardTitle')}</h2>
          <p className='px-4 text-xs'>{t('forgeCalculator.cardDescription')}</p>
          <div className='flex flex-row items-center justify-center gap-4 p-4'>
            <h3 className='text-md font-bold'>{t('forgeCalculator.inputText')}</h3>
            <Input
              className='flex w-[8rem] items-center justify-center border-none text-center text-3xl font-bold'
              onChange={(e) => setFirstForgeLevel(e.target.valueAsNumber)}
              placeholder='0'
              type='number'
              value={firstForgeLevel}
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
      <div className='flex flex-col items-center gap-4 pb-20 pt-[6rem] lg:pt-[8rem]'>
        <div className='mt-16 flex flex-wrap items-center justify-center gap-8'>
          {resources && (
            <AnimatePresence mode='wait'>
              {Object.keys(resources).map(
                (key) =>
                  resourcesData[key as keyof typeof resourcesData] && (
                    <div className='flex flex-col' key={`resources-${key}`}>
                      <Popover>
                        <PopoverTrigger
                          className={cn(
                            resources[key as keyof typeof resources] > 0
                              ? 'pointer-events-auto'
                              : 'pointer-events-none grayscale',
                            'relative items-center justify-center'
                          )}
                        >
                          {resources[key as keyof typeof resources] > 0 &&
                            marketValues[key as keyof typeof marketValues] > 0 && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                exit={{ opacity: 0, y: 20 }}
                                className=' absolute -top-6 flex flex-row items-center justify-center gap-1 rounded-md bg-stone-900/20 px-2'
                              >
                                <Image
                                  src={
                                    'http://res.cloudinary.com/dbkrvt2x0/image/upload/v1716477552/kakele-wiki/icons/gold.png'
                                  }
                                  className='aspect-square h-3 w-3'
                                  alt={`resources-${key}`}
                                  width={32}
                                  height={32}
                                />
                                <span className='text-xs'>
                                  {new Intl.NumberFormat().format(marketValues[key as keyof typeof marketValues])}
                                </span>
                              </motion.div>
                            )}
                          <div
                            className={cn(
                              'delay-[10] group/effect flex items-center justify-center rounded-lg border-[1px] border-stone-950 border-t-white/10 bg-stone-900 drop-shadow-md transition-all hover:bg-stone-800/80'
                            )}
                          >
                            <Image
                              src={`https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/${
                                resourcesData[key as keyof typeof resourcesData].image
                              }.png`}
                              className='delay-[50] w-32 transition-all group-hover/effect:scale-110 group-hover/effect:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                              alt={key}
                              width={256}
                              height={256}
                            />
                          </div>
                          <div className='flex flex-col'>
                            <span className='text-md font-bold'>
                              {resourcesData[key as keyof typeof resourcesData].name}
                            </span>
                            <span className='text-xl font-bold'>
                              {new Intl.NumberFormat().format(resources[key as keyof typeof resources])}
                            </span>
                          </div>
                        </PopoverTrigger>
                        {resources[key as keyof typeof resources] > 0 && (
                          <PopoverContent className='bg-stone-900 p-4'>
                            <div className='flex flex-col items-center justify-center gap-2 bg-none'>
                              <span>
                                {t(`forgeCalculator.${key}`)} {t('forgeCalculator.popoverTitle')}
                              </span>
                              <span className='text-xs text-white/70'>{t('forgeCalculator.popoverDescription')}</span>
                              <Input
                                className='flex w-[8rem] items-center justify-center border-none text-center text-3xl font-bold'
                                placeholder='0'
                                type='number'
                                onChange={(e) => handleMarketPriceChange(e, key)}
                                value={marketValues[key as keyof typeof marketValues]}
                              />
                            </div>
                          </PopoverContent>
                        )}
                      </Popover>
                    </div>
                  )
              )}
            </AnimatePresence>
          )}
        </div>
        <div className='flex w-fit flex-col items-center'>
          <div className='flex flex-row items-center justify-center rounded-md border-[1px] border-orange-800 bg-orange-800/40 px-4'>
            <Image
              src={'http://res.cloudinary.com/dbkrvt2x0/image/upload/v1716477552/kakele-wiki/icons/gold.png'}
              className='aspect-square h-6 w-6'
              alt={'Gold Icon'}
              width={128}
              height={128}
            />
            <span className='ml-2 text-3xl font-bold'>{new Intl.NumberFormat().format(handleTotalPrice())}</span>
          </div>
          {Object.keys(marketValues).some((key) => marketValues[key as keyof typeof marketValues] > 0) && (
            <div className='flex flex-col items-start mt-2'>
              <span className='text-xs'>
                {t('forgeCalculator.cost')} {new Intl.NumberFormat().format(resources.money)}
              </span>
              {Object.keys(marketValues).map(
                (key) =>
                  marketValues[key as keyof typeof marketValues] > 0 &&
                  resources[key as keyof typeof resources] > 0 && (
                    <div key={`market-${key}`}>
                      <span className='text-xs'>
                        {resources[key as keyof typeof resources]} {t(`forgeCalculator.${key}`)}:{' '}
                        {new Intl.NumberFormat().format(
                          resources[key as keyof typeof resources] * marketValues[key as keyof typeof marketValues]
                        )}
                      </span>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
