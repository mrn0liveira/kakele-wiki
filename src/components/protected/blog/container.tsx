'use client';

import { Button } from '@nextui-org/react';
import type { Blog } from '@prisma/client';
import { BookCheck, BookDashed } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { cn } from '@/src/lib/utils';

import { readBlogAdmin, updateBlogById } from '@/src/actions/blog';

import '@/src/styles/Card-Shine.css';

export default function BlogsContainer() {
  const [isPending, startTransition] = useTransition();

  const [blogs, setBlogs] = useState<Blog[]>([]);

  const handlePublish = async (id: string) => {
    const data = blogs.filter((blog) => blog.id === id)[0];

    if (!data) {
      toast('Could not find a valid blog');
      return;
    }

    data.published = !data.published;

    await updateBlogById(id, data).catch(() => toast('Blog has not been published'));
  };

  useEffect(() => {
    startTransition(() => {
      readBlogAdmin().then((data) => {
        setBlogs(data);
      });
    });
  }, []);

  return (
    <div className='w-full'>
      <div className='flex flex-wrap items-center gap-2 rounded-lg border-[1px] border-b border-white/10 bg-black/10 p-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:flex-row sm:justify-between'>
        <Link href={'/dashboard/blog/create'}>
          <Button
            className={cn(
              'group flex items-center gap-2 rounded-md border border-blue-500 bg-zinc-800 px-3  py-2 text-sm transition-all disabled:border-gray-800 disabled:bg-gray-900'
            )}
            role='button'
            type='submit'
          >
            Create
          </Button>
        </Link>
      </div>

      {isPending ? (
        <div className='mt-4 flex flex-col justify-between gap-4 p-2 px-2'>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                className='card-shine-effect-2 relative flex w-full flex-row gap-2 rounded-md bg-black/10 p-4 px-8'
                key={index}
              >
                <div className='lg:max-w-auto mr-20 flex max-w-[80vw] flex-col gap-2'>
                  <span className='text-md h-4 w-[20rem] rounded-md bg-black/10 p-2' />
                  <span className='h-4 w-[40rem] rounded-md bg-black/10 p-2 text-xs' />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className='mt-4 flex flex-col justify-between gap-4 p-2 px-2'>
          {blogs.map((blog) => (
            <div className='relative flex w-fit flex-row gap-2 rounded-md bg-black/10 p-4 px-8' key={blog.id}>
              <div className='mr-24 flex flex-col'>
                <span className='text-md inli line-clamp-1'>{blog.title}</span>
                <span className='line-clamp-2 text-xs'>{blog.description}</span>
              </div>
              <div className='absolute right-0 top-0 flex h-full min-w-[4rem] flex-col rounded-l-xl  bg-black/10 p-2'>
                <div className='flex flex-row items-center justify-center gap-2'>
                  <div
                    className='flex cursor-pointer'
                    onClick={() => handlePublish(blog.id)}
                    onKeyDown={() => handlePublish(blog.id)}
                  >
                    {blog.published ? <BookDashed size={16} /> : <BookCheck size={16} />}
                  </div>
                </div>
              </div>
              {blog.published ? (
                <span className='absolute -top-2 left-2 rounded-xl bg-green-500 px-2 text-xs text-black'>
                  Published
                </span>
              ) : (
                <span className='absolute -top-2 left-2 rounded-xl bg-yellow-500 px-2 text-xs text-black'>
                  Un-Published
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
