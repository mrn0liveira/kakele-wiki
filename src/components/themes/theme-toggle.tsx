'use client';

import { cn } from '@/src/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const themeMapping: Record<string, { name: string; color?: string }> = {
  dark: {
    name: 'Default',
    color: 'bg-[#3F4337]',
  },
  'tropical-forest': {
    name: 'Tropical Forest',
    color: 'bg-[#6D795D]',
  },
  'zygomorphic-focus': {
    name: 'Zygomorphic Focus',
    color: 'bg-[#1C1B1D]',
  },
  'cocoon-rook': {
    name: 'Cocoon Rook',
    color: 'bg-[#072E4A]',
  },
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    mounted && (
      <div className='flex h-4 w-full flex-row items-center justify-center gap-2'>
        {Object.entries(themeMapping).map(([key, value]) => (
          <div
            onClick={() => setTheme(key)}
            key={themeMapping[key].name}
            className={cn(
              themeMapping[key].color,
              theme === key ? 'ring-2 ring-white/50' : '',
              'h-4 w-4 cursor-pointer rounded-full'
            )}
          />
        ))}
      </div>
    )
  );
}
