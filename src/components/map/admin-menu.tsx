'use client';

import { useState, useTransition } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/src/lib/utils';

import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

import { parseCoordinatesToFloatArray } from './map';

import { useCurrentUser } from '@/src/hooks/use-current-user';
import { createGenericMapPoints } from '@/src/lib/map';

export default function AdminMenu({
  trigger,
  mapCoordinates,
}: {
  trigger: React.ReactNode;
  mapCoordinates: [string, string];
}) {
  const [error, setError] = useState<string | null>(null);
  const [sucess, setSuccess] = useState<string | null>(null);

  const [open, setOpen] = useState(false);

  const [ingameCoordinates, setIngameCoordinates] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const [isLoading, startTransition] = useTransition();

  const user = useCurrentUser();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const onSubmit = () => {
    setSuccess(null);

    if (!name) return setError('Name is required');

    if (!tag) return setError('Tag is required');

    if (!ingameCoordinates) return setError('Ingame coordinates are required');

    const coordinates = parseCoordinatesToFloatArray(ingameCoordinates);

    const _mapCoordinates = parseCoordinatesToFloatArray(mapCoordinates);

    if (!coordinates || !_mapCoordinates) return setError('Ingame coordinates are invalid');

    setError(null);

    startTransition(() => {
      createGenericMapPoints({
        name: name,
        tag: 'City',
        ingameCoordinates: coordinates,
        mapCoordinates: _mapCoordinates,
        authorId: user?.id || 'unknown',
      })
        .catch(() => {
          setSuccess(null);

          setError('Something went wrong');
        })
        //@ts-ignore
        .then((data) => {
          //@ts-ignore
          if (data?.error) {
            setError("You don't have permission to do that");

            setName(null);
            setTag(null);
            setIngameCoordinates(null);
            return;
          }

          if (!data) {
            setError('Something went wrong');

            setName(null);
            setTag(null);
            setIngameCoordinates(null);
            return;
          }

          setError(null);

          setName(null);
          setTag(null);
          setIngameCoordinates(null);

          setSuccess('Point created');
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className={cn('absolute z-[999] flex w-auto flex-col gap-1 px-4 py-2')}>
        <div className='flex flex-col items-start justify-center gap-2 text-start'>
          <div className='flex flex-col items-start justify-center'>
            <span>Add Point</span>
            <span className='mb-4 text-xs'>Add new point in the map</span>
          </div>
          <div className='flex w-full flex-col items-center justify-center'>
            <ToggleGroup className='w-full' type='single' value={tag as string}>
              <div className='flex w-full flex-col items-center justify-center gap-[2px]'>
                {['City', 'Depot', 'Dungeon'].map((value) => (
                  <ToggleGroupItem
                    className='h-6 w-full border-[1px] border-zinc-500/20'
                    key={value}
                    onClick={() => setTag(value)}
                    size='sm'
                    value={value}
                  >
                    <span className='text-xs'>{value}</span>
                  </ToggleGroupItem>
                ))}
              </div>
            </ToggleGroup>
          </div>
          <div className='flex flex-col items-center justify-center gap-4 rounded-md bg-stone-950 px-4 py-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'>
            <div className='flex flex-col items-center justify-center gap-[2px]'>
              <span className='text-nowrap text-center text-xs'>Ingame Coordinate</span>
              <Input
                className='h-6 text-center'
                onChange={(e) => setIngameCoordinates(e.target.value)}
                placeholder='0, 0'
                value={ingameCoordinates || ''}
              />
              <span className='text-nowrap text-center text-xs'>Name</span>
              <Input
                className='h-6 text-center'
                onChange={(e) => setName(e.target.value)}
                placeholder='Muroria'
                value={name || ''}
              />
            </div>
          </div>
          <div className='flex w-full flex-col items-center justify-center'>
            <Button className='h-6 w-full bg-green-600' disabled={isLoading} onClick={onSubmit}>
              {isLoading ? 'Adding...' : 'Add'}
            </Button>
          </div>
          {error && <span className=' w-full max-w-full text-center text-xs text-red-500'>{error}</span>}
          {sucess && <span className=' w-full max-w-full text-center text-xs text-green-500'>{sucess}</span>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
