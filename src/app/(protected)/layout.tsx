import type React from 'react';

import { Sidebar } from '@/src/components/protected/sidebar';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className='relative min-h-full min-w-full overflow-hidden'
      style={{
        backgroundImage: 'url(/img/new_background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='flex h-full w-full flex-col lg:flex-row'>
        <Sidebar />
        <div className='min-w-screen h-full min-h-screen w-full flex-1 px-2 py-2'>
          <div className='flex min-h-[40rem] w-full justify-center rounded-2xl border border-zinc-700 bg-zinc-900 p-4'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
