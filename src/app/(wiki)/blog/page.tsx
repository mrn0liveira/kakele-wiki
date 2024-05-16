import type { Blog } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import Content from '@/src/components/blog/content';
import { BentoGridItem } from '@/src/components/home/grid';
import { useServerTranslation } from '@/src/lib/i18n';

export const revalidate = 60 * 30; // 10 minutes

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog?id=*`, {
    next: { revalidate: 60 * 30 },
  });

  return await res.json();
}

async function getBlogById(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog?id=${id}`, {
    next: { revalidate: 60 * 60 * 24 },
  });

  return await res.json();
}

export default async function BlogPage({ searchParams }: { searchParams: { id: string } }) {
  const blog = await getBlogById(searchParams.id);
  let blogs = [];

  if (!blog) {
    blogs = await getBlogs();
  }

  const { t } = await useServerTranslation();

  if (!blog?.id) {
    return (
      <div className='mx-auto min-h-screen w-full max-w-5xl space-y-10 pt-10'>
        <div className='relative flex flex-row items-center justify-center gap-4'>
          <img
            alt=''
            className='unselectable pointer-events-none hidden opacity-30 lg:flex'
            src='/svg/text-decoration.svg'
            width={256}
          />
          <h2 className='__className_d6dd13 text-animation text-nowrap text-4xl'>{t('blog.title')}</h2>
          <img
            alt=''
            className='unselectable pointer-events-none hidden opacity-30 lg:flex'
            src='/svg/text-decoration.svg'
            width={256}
          />
        </div>
        {blogs?.length > 0 ? (
          <div className='flex flex-col gap-2'>
            {blogs?.map((blog: Blog) => (
              <Link href={`/blog?id=${blog.id}`} key={blog.id}>
                <BentoGridItem
                  className='group/effect max-w-h-[14rem] bg-zinc-900/50 p-4 shadow-input transition duration-200 hover:bg-zinc-950 hover:shadow-xl dark:border-white/[0.2] dark:shadow-none lg:max-h-[18rem]'
                  description={blog.description}
                  title={blog.title}
                >
                  <div className='relative flex flex-col justify-between overflow-hidden md:flex-row'>
                    {blog.imageUrl && (
                      <Image
                        alt={blog.title}
                        className='w-auto transition-all group-hover/effect:scale-110 md:static md:h-[6rem]'
                        height={512}
                        src={blog.imageUrl}
                        width={512}
                      />
                    )}
                    <div className='z-[99] flex flex-col text-start lg:ml-12'>
                      <span className='text-md line-clamp-1 font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'>
                        {blog.title}
                      </span>
                      <span className='line-clamp-4 text-xs'>{blog.description}</span>
                    </div>
                  </div>
                </BentoGridItem>
              </Link>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return (
    <div className='mx-auto min-h-screen max-w-5xl space-y-10 px-4 pb-20 pt-10'>
      <div className='space-y-5 sm:px-10'>
        <h1 className=' text-3xl font-bold dark:text-gray-200'>{blog?.title}</h1>
        <p className='text-sm dark:text-gray-400'>{new Date(blog?.createdAt).toDateString()}</p>
      </div>

      <div className='relative h-96 w-full'>
        {blog.imageUrl && (
          <Image
            alt='cover'
            className=' rounded-md border-[0.5px] border-zinc-600 object-cover object-center'
            fill
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            src={blog?.imageUrl}
          />
        )}
      </div>
      <Content content={blog.content} />
    </div>
  );
}
