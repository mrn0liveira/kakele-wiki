'use client';

import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Image from 'next/image';

import tasksData from '@/public/kakele-data/tasks.js';

import { KakeleTaskItemModal } from './modal-item';

import type { KakeleTaskItem } from '@/src/types';

export default function TaskCalculatorContainer({ lng }: { lng: string }) {
  const { t } = useTranslation();

  const [tasks, setTasks] = useState(tasksData);
  const [currentTask, setCurrentTask] = useState<KakeleTaskItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatePresence mode='wait'>
      <div className='relative flex flex-col items-center justify-center space-y-8 p-8 text-center'>
        <div className='absolute top-0 flex w-full items-center justify-center'>
          <div className='flex h-auto w-[40rem] flex-col items-center justify-center'>
            <h2 className='mt-8 px-4 pt-8 text-2xl font-bold'>{t('taskCalculator.containerTitle')}</h2>
            <p className='px-4 text-xs'>{t('taskCalculator.containerDescription')}</p>
          </div>
        </div>
        <div className='flex flex-col gap-4 pb-20 pt-[8rem] lg:flex-row lg:pt-[10rem]'>
          <div className='flex flex-col gap-8'>
            <KakeleTaskItemModal isOpen={isOpen} lng={lng} setIsOpen={setIsOpen} t={t} task={currentTask} />
            <div className='flex flex-wrap justify-center gap-2 gap-x-4 gap-y-16 md:auto-rows-auto md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10'>
              {tasks
                .filter((x) => x.type === 'item')
                .map((task: KakeleTaskItem) => (
                  <div
                    key={task.name}
                    onClick={() => {
                      setIsOpen(true);
                      setCurrentTask(task);
                    }}
                    onKeyDown={() => {
                      setIsOpen(true);
                      setCurrentTask(task);
                    }}
                  >
                    <div
                      className={
                        'group/effect flex h-28 w-28 items-center justify-center space-y-0 rounded-lg bg-primary/10 py-1 shadow-input transition duration-200 hover:scale-110 hover:bg-primary/40 hover:shadow-xl dark:shadow-none md:col-span-1'
                      }
                      key={task.name}
                    >
                      <div className='relative flex h-[4rem] w-[4rem] flex-col items-center justify-center'>
                        <Image
                          alt={task.name}
                          className='absolute'
                          height={256}
                          src={
                            new URL(
                              `https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/monsters/${task.name}.png`
                            ).href
                          }
                          width={256}
                        />
                        <Image
                          alt={task.name}
                          className='absolute -bottom-8 rounded-full bg-primary/60 transition-all group-hover/effect:translate-y-2 group-hover/effect:scale-110'
                          height={32}
                          src={
                            new URL(
                              `https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/items/${task.target?.replaceAll("'", '')}.png`
                            ).href
                          }
                          width={32}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
