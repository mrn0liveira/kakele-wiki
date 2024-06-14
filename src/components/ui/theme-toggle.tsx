'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // The active theme is not available on the server.
  // If you have styling that is conditionally applied based on the active-theme,
  // you have to await the mounted state before rendering the active theme.
  useEffect(() => setMounted(true), []);

  const themeMapping: Record<string, string> = {
    dark: 'Default',
    'tropical-forest': 'Tropical Forest',
    'zygomorphic-focus': 'Zygomorphic Focus',
    'cocoon-rook': 'Cocoon Rook',
  };

  return (
    <div>
      <div className='mx-4 flex flex-row gap-4'>
        {Object.entries(themeMapping).map(([key, value]) => (
          <button
            key={key}
            className={`rounded-md px-2 font-semibold transition-colors duration-200 ${
              mounted && theme == key
                ? 'border border-primary bg-primary-foreground text-primary'
                : 'bg-primary text-primary-foreground'
            }`}
            onClick={() => {
              setTheme(key);
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
