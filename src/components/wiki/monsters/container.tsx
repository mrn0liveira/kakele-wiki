'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import monsters from '@/public/kakele-data/monsters';

import Image from 'next/image';
import { KakeleMonster } from '@/src/types';
import ModalMonster from './modal-monster';

interface ComponentProps {
  lng: string;
}

export default function KakeleMonsters({ lng = 'en' }: ComponentProps) {
  const { t } = useTranslation(['monsters']);

  const [search, setSearch] = useState('');
  const [currentMonsters, setCurrentMonsters] = useState<KakeleMonster | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='relative flex flex-col items-center justify-center space-y-8 p-8 text-center'>
      {/* <div className='absolute top-0 flex w-full items-center justify-center'>
        <div className='flex h-auto w-[40rem] flex-col items-center justify-center'>
          <h1 className='mt-8 px-4 pt-8 text-2xl font-bold'>{t('searchTitle')}</h1>
          <h2 className='px-4 pb-2 text-xs'>{t('searchDescription')}</h2>
          <Input className='max-w-[70vw] text-center' onChange={(e) => setSearch(e.target.value)} value={search} />
        </div>
      </div> */}
      <div className='flex w-full flex-col items-center justify-center gap-12'>
        <ModalMonster monster={currentMonsters} lng={lng} isOpen={isModalOpen} setIsOpen={setIsModalOpen} t={t} />

        <div className='flex w-full flex-col items-center justify-center gap-4'>
          <div className='flex w-full items-center justify-center rounded-md bg-secondary/30 p-1 px-8'>
            <h2 className='text-xl font-bold'>{t('common_monsters')}</h2>
          </div>
          <div className='grid w-full grid-cols-1 items-center justify-center gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
            {monsters
              .filter((x) => !x.boss)
              .map((monster) => (
                <div
                  onClick={() => {
                    setCurrentMonsters(monster);
                    setIsModalOpen(true);
                  }}
                  className='relative flex h-full w-full cursor-pointer flex-col items-center justify-end rounded-md border-[1px] border-accent bg-primary/30 p-2 transition-all hover:bg-secondary/50'
                  key={monster.name}
                >
                  <Image
                    src={`https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/monsters/${monster.name}.png`}
                    alt={monster.name}
                    width={64}
                    height={64}
                  />
                  <div className='flex flex-col'>
                    <p className='text-md font-bold'>{monster[`language.${lng}` as keyof KakeleMonster]}</p>
                    <p className='text-xs'>{t('energy.' + monster.energy)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className='flex w-full flex-col items-center justify-center gap-4'>
          <div className='flex w-full items-center justify-center rounded-md bg-secondary/30 p-1 px-8'>
            <h2 className='text-xl font-bold'>{t('bosses')}</h2>
          </div>
          <div className='grid w-full grid-cols-1 items-center justify-center gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
            {monsters
              .filter((x) => x.boss)
              .map((monster) => (
                <div
                  onClick={() => {
                    setCurrentMonsters(monster);
                    setIsModalOpen(true);
                  }}
                  className='relative flex h-full w-full cursor-pointer flex-col items-center justify-end rounded-md border-[1px] border-accent bg-primary/30 p-2 transition-all hover:bg-secondary/50'
                  key={monster.name}
                >
                  <Image
                    src={`https://raw.githubusercontent.com/mrn0liveira/kakele-biridim/main/src/assets/sprites/monsters/${monster.name}.png`}
                    alt={monster.name}
                    width={64}
                    height={64}
                  />
                  <div className='flex flex-col'>
                    <p className='text-md font-bold'>{monster[`language.${lng}` as keyof KakeleMonster]}</p>
                    <p className='text-xs'>{t('energy.' + monster.energy)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
