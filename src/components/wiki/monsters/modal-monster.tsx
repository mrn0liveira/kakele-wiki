import { cn } from '@/src/lib/utils';
import { KakeleItem, KakeleMonster } from '@/src/types';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';

import items from '@/public/kakele-data/items';
import tasks from '@/public/kakele-data/tasks';

interface ComponentProps {
  monster: KakeleMonster | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  lng: string;
  t: (key: string) => string;
}

function getMonsterTasks(monster: string) {
  return tasks.filter((task) => task.name === monster);
}

function getItemId(itemName: string) {
  return items.find((item) => item.name === itemName)?.id;
}

function getItemByName(itemName: string) {
  return items.find((item) => item.name === itemName);
}

export default function ModalMonster({ monster, isOpen, setIsOpen, lng = 'en', t }: ComponentProps) {
  return (
    <AnimatePresence>
      {isOpen && monster && (
        <motion.div
          animate={{ opacity: 1 }}
          className='no-scrollbar fixed inset-0 z-[999] grid h-screen w-full cursor-pointer place-items-center items-center justify-center overflow-auto overflow-x-hidden overflow-y-scroll bg-black/60 backdrop-blur-md'
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <div className='z-[60] flex min-h-[100vh] min-w-[100vw] flex-col items-center justify-center rounded-lg'>
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
              <X onClick={() => setIsOpen(false)} className='absolute right-4 top-4' />
              <div className='relative flex h-full w-full max-w-[90vw] flex-col items-center justify-center gap-2 rounded-md p-2 px-8'>
                <div className='flex flex-col'>
                  <p>
                    <span className='text-xs'>{t(`energy.${monster.energy}`)}</span>{' '}
                    {monster.boss && <span className='text-xs font-bold text-purple-600'>{t('boss')}</span>}
                  </p>
                  <h2 className='text-lg font-bold'>{monster[`language.${lng}` as keyof KakeleMonster]}</h2>
                </div>
                <Image
                  src={`https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/monsters/${monster.name}.png`}
                  width={128}
                  height={128}
                  alt='Item Sprite'
                  className={'w-[6rem]'}
                />
                <div className='mt-4 flex w-full flex-col items-center justify-center gap-4 lg:flex-row'>
                  <div className='relative flex w-full min-w-[6rem] items-center justify-center rounded-md bg-stone-800/80 p-2 px-4'>
                    {Intl.NumberFormat().format(monster.health)}
                    <span className='absolute -top-2 text-xs font-black'>{t('modal.health')}</span>
                  </div>
                  <div className='relative flex w-full min-w-[6rem] items-center justify-center rounded-md bg-stone-800/80 p-2 px-4'>
                    {Intl.NumberFormat().format(monster.gold)}
                    <span className='absolute -top-2 text-xs font-black'>{t('modal.gold')}</span>
                  </div>
                  <div className='relative flex w-full min-w-[6rem] items-center justify-center rounded-md bg-stone-800/80 p-2 px-4'>
                    {Intl.NumberFormat().format(monster.experience)}
                    <span className='absolute -top-2 text-xs font-black'>{t('modal.experience')}</span>
                  </div>
                </div>
                <div className='mt-2 flex h-full w-full rounded-md bg-stone-800/80 p-4 py-2'>
                  <div className='flex w-full flex-row items-start gap-4 px-2'>
                    <div className='flex w-full flex-col flex-wrap gap-2'>
                      <span className='lg:text-md ml-4 text-start text-sm'>{t('loot')}</span>
                      <div className='no-scrollbar flex max-h-28 w-full flex-col gap-[0.3rem] overflow-y-auto rounded-md bg-zinc-900 p-1 transition-all'>
                        {monster.loot.map((loot) => (
                          <div
                            key={loot}
                            className='flex flex-row items-center justify-start bg-zinc-800/40 p-1 hover:bg-zinc-800'
                          >
                            <Image
                              alt={loot}
                              className='z-99 rounded-full'
                              height={18}
                              width={18}
                              src={
                                new URL(
                                  `https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/${loot.includes('Card') ? 'Card' : loot}.png`
                                ).href
                              }
                            />
                            <span className='text-nowrap text-xs'>
                              {loot.includes('Card')
                                ? monster[`language.${lng}` as keyof KakeleMonster]
                                : getItemByName(loot)?.[`language.${lng}` as keyof KakeleItem]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {getMonsterTasks(monster.name)?.length > 0 && (
                  <div className='mt-2 flex h-full w-full rounded-md bg-stone-800/80 p-4 py-2'>
                    <div className='flex w-full flex-row items-start gap-4 px-2'>
                      <div className='flex w-full flex-col flex-wrap gap-2'>
                        <span className='lg:text-md ml-4 text-start text-sm'>{t('tasks')}</span>
                        <div className='no-scrollbar flex max-h-28 w-full flex-col gap-[0.3rem] overflow-y-auto rounded-md bg-zinc-900 p-1 transition-all'>
                          {getMonsterTasks(monster.name).map((task) => (
                            <div key={task.name} className='flex flex-row items-center justify-start gap-2'>
                              <Image
                                src={`https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/${task.target ? 'items/' + task.target : 'monsters/' + task.name}.png`}
                                alt={task.name}
                                width={18}
                                height={18}
                              />
                              <span className='text-xs font-bold text-green-500'>{task.amount}</span>
                              <span className='text-xs'>
                                {task.target
                                  ? getItemByName(task.target)?.[`language.${lng}` as keyof KakeleItem]
                                  : monster[`language.${lng}` as keyof KakeleMonster]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
