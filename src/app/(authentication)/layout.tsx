import type React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className='relative h-screen min-h-screen w-screen overflow-hidden'
      style={{
        backgroundImage: 'url(/img/auth_background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='z-10 flex h-full items-center justify-center'>{children}</div>
    </div>
  );
}
