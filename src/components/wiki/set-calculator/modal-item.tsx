import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';

import { cn } from '@/src/lib/utils';

import type { KakeleEquipmentItems, KakeleWeaponItems } from '@/src/types';

function getRarityTextColor(rarity: string) {
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

function getEnergyTextColor(energy: string) {
  switch (energy) {
    case 'Dark':
      return 'text-[#bf6152]';
    case 'Light':
      return 'text-[#bfad52]';
    case 'Nature':
      return 'text-[#68bf52]';
    default:
      return 'text-[#adaaaa]';
  }
}

function getItemSource(sourceString: string) {
  const monsters: string[] = [];
  const npcs: string[] = [];
  const quests: string[] = [];

  const monsterPattern = /Monsters: ([^NQ]*)/;
  const npcPattern = /Npcs: ([^MQ]*)/;
  const questPattern = /Quests: ([^MN]*)/;

  const monsterMatch = sourceString.match(monsterPattern);
  const npcMatch = sourceString.match(npcPattern);
  const questMatch = sourceString.match(questPattern);

  if (monsterMatch && monsterMatch[1]) {
    monsters.push(...monsterMatch[1].split(',').map((monster) => monster.trim()));
  }

  if (npcMatch && npcMatch[1]) {
    npcs.push(...npcMatch[1].split(',').map((npc) => npc.trim()));
  }

  if (questMatch && questMatch[1]) {
    quests.push(...questMatch[1].split(',').map((quest) => quest.trim()));
  }

  return { monsters, npcs, quests };
}

export const KakeleItemModal = ({
  item,
  isOpen,
  setIsOpen,
  lng = 'en',
  t,
}: {
  item: KakeleEquipmentItems | KakeleWeaponItems | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  lng: string;
  t: (key: string) => string;
}) => {
  const { monsters, npcs, quests } = getItemSource(item?.sources || '');

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          animate={{ opacity: 1 }}
          className='no-scrollbar fixed inset-0 z-[999] grid h-screen w-full cursor-pointer place-items-center items-center justify-center overflow-auto overflow-x-hidden overflow-y-scroll bg-black/60 p-8 backdrop-blur-md'
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <div className='z-[60] flex h-full w-full flex-col items-center justify-center rounded-lg'>
            <motion.div
              animate={{
                opacity: 1,
                y: 0,
              }}
              className='z-[70] flex items-center justify-center px-8 pb-4'
              initial={{
                opacity: 0,
                y: 100,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            >
              <div className='relative max-w-[90vw] flex h-full w-full flex-col items-center justify-center gap-2 rounded-md p-2 px-8'>
                <div className='-top-48 w-fit text-nowrap text-center text-3xl font-bold'>
                  <span className='text-xs font-bold'>
                    {item.energy && (
                      <span className={cn(getEnergyTextColor(item.energy))}>{t(`kakele.energy.${item.energy}`)}</span>
                    )}{' '}
                    <span className={cn(getRarityTextColor(item.rarity))}>{t(`kakele.rarities.${item.rarity}`)}</span>{' '}
                    <span>{t(`kakele.itemTypes.${item.type}`)}</span>
                  </span>
                  <h3 className='text-md text-center text-wrap font-bold lg:text-lg'>
                    {item[`language.${lng}` as keyof typeof item]}
                  </h3>
                </div>
                <Image
                  alt={item.name}
                  className='h-24 w-24 rounded-full bg-black/40'
                  height={256}
                  src={
                    new URL(
                      `https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/${item.name.replaceAll(
                        "'",
                        ''
                      )}.png`
                    ).href
                  }
                  width={256}
                />
                {item.stats && (
                  <div className='flex items-center justify-center gap-8'>
                    <div className='flex flex-col items-center justify-center'>
                      <span className='text-center text-sm'>{t('kakele.attributes.attack')}</span>
                      <span className={cn(item.stats.attack < 0 ? 'text-red-500' : 'text-white', 'font-black')}>
                        {item.stats.attack}
                      </span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <span className='text-center text-sm'>{t('kakele.attributes.magic')}</span>
                      <span className={cn(item.stats.magic < 0 ? 'text-red-500' : 'text-white', 'font-black')}>
                        {item.stats.magic}
                      </span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <span className='text-center text-sm'>{t('kakele.attributes.armor')}</span>
                      <span className={cn(item.stats.armor < 0 ? 'text-red-500' : 'text-white', 'font-black')}>
                        {item.stats.armor}
                      </span>
                    </div>
                  </div>
                )}
                <div className='mt-4 flex w-full flex-row items-center justify-between gap-4'>
                  <div className='relative flex w-full items-center justify-center rounded-md bg-stone-800/80 p-2 px-4'>
                    {Intl.NumberFormat().format(item.level)}
                    <span className='absolute -top-2 text-xs font-black'>{t('kakele.itemStats.level')}</span>
                  </div>
                  <div className='relative flex w-full items-center justify-center rounded-md bg-stone-800/80 p-2 px-4'>
                    {Intl.NumberFormat().format(item.value)}
                    <span className='absolute -top-2 text-xs font-black'>{t('kakele.itemStats.value')}</span>
                  </div>
                </div>
                <div className='flex h-full w-full rounded-md bg-stone-800/80 py-2'>
                  <div className='flex w-full flex-col items-start gap-4 px-2'>
                    {monsters?.length > 0 && (
                      <div className='flex flex-col flex-wrap'>
                        <span className='text-start text-xs'>{t(`kakele.common.Monsters`)}</span>
                        <div className='flex flex-wrap gap-2'>
                          {monsters.map((monster) => (
                            <div key={monster} className='flex flex-col items-center justify-center'>
                              <span className='text-[0.5rem]'>{monster}</span>
                              <Image
                                alt={monster}
                                className='z-99 rounded-full'
                                height={40}
                                width={40}
                                src={
                                  new URL(
                                    `https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/monsters/${monster}.png`
                                  ).href
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {quests?.length > 0 && (
                      <div className='flex flex-col flex-wrap'>
                        <span className='text-start text-xs'>{t(`kakele.common.Quests`)}</span>
                        <div className='flex flex-wrap gap-2'>
                          {quests.map((quest) => (
                            <div key={quest} className='flex flex-col items-center justify-center'>
                              <span className='text-[0.5rem]'>{quest}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {npcs?.length > 0 && (
                      <div className='flex flex-col flex-wrap'>
                        <span className='text-start text-xs'>{t(`kakele.common.NPCs`)}</span>
                        <div className='flex flex-wrap gap-2'>
                          {npcs.map((npc) => (
                            <div key={npc} className='flex flex-col items-center justify-center'>
                              <span className='text-[0.5rem]'>{npc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
