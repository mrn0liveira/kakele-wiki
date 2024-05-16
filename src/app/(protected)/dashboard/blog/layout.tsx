'use client';

import { useRouter } from 'next/navigation';

import { useCurrentUser } from '@/src/hooks/use-current-user';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const user = useCurrentUser();
  const router = useRouter();

  if (!user || user.role !== 'ADMIN') {
    router.push('/dashboard');
  }

  return (
    <main className='md:max-h-auto flex h-full w-full flex-col'>
      <div className='my-8 ml-8'>
        <h1 className='text-start text-2xl font-semibold'>⚙️ Blog</h1>
        <p>Edit and publish for your blog</p>
      </div>
      <div className='no-scrollbar h-full w-full overflow-auto rounded-lg bg-zinc-800'>{children}</div>
    </main>
  );
}
