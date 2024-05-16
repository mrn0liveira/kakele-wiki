'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { EyeOpenIcon, Pencil1Icon, RocketIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { BsSave } from 'react-icons/bs';
import type * as z from 'zod';

import { cn } from '@/src/lib/utils';
import { Textarea } from '@/src/components/ui/textarea';
import { Switch } from '@/src/components/ui/switch';
import { Input } from '@/src/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/src/components/ui/form';

import MarkdownPreview from './markdown-preview';

import { BlogFormSchema, type BlogFormSchemaType } from '@/src/schemas';

export default function BlogForm({
  onHandleSubmit,
  defaultBlog,
}: {
  defaultBlog: {
    title: string;
    content: string;
    published: boolean;
    imageUrl: string;
  };
  onHandleSubmit: (data: BlogFormSchemaType) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [isPreview, setPreivew] = useState(false);

  const form = useForm<z.infer<typeof BlogFormSchema>>({
    mode: 'all',
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: defaultBlog?.title,
      content: defaultBlog?.content,
      published: defaultBlog.published,
    },
  });

  const onSubmit = (data: z.infer<typeof BlogFormSchema>) => {
    startTransition(() => {
      onHandleSubmit({
        ...data,
      });
    });
  };

  return (
    <Form {...form}>
      <form
        className='no-scrollbar w-full max-w-md overflow-y-scroll border lg:max-w-screen-lg xl:max-w-screen-xl'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex flex-wrap items-center gap-2 rounded-lg border-[1px] border-b border-white/10 bg-black/10 p-5 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:flex-row sm:justify-between'>
          <div className='flex flex-wrap items-center gap-5'>
            <Button
              className='flex items-center gap-2 rounded-md border bg-zinc-800 px-3 py-2 text-sm transition-all hover:border-zinc-400'
              onClick={() => {
                setPreivew(!isPreview && !form.getFieldState('imageUrl').invalid);
              }}
              role='button'
              tabIndex={0}
            >
              {!isPreview ? (
                <>
                  <EyeOpenIcon />
                  Preivew
                </>
              ) : (
                <>
                  <Pencil1Icon />
                  Edit
                </>
              )}
            </Button>
            <FormField
              control={form.control}
              name='published'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex h-[2.5rem] items-center gap-1 rounded-md border bg-zinc-800 p-2'>
                      <RocketIcon />

                      <span className='text-sm'>Publish</span>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            className={cn(
              'group flex items-center gap-2 rounded-md border border-green-500 bg-zinc-800 px-3  py-2 text-sm transition-all disabled:border-red-900 disabled:bg-zinc-900'
            )}
            disabled={!form.formState.isValid}
            role='button'
            type='submit'
          >
            <BsSave className='hover:border-zinc-400' />
            Save
          </Button>
        </div>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <div className={cn('flex w-full gap-2 break-words p-2', isPreview ? 'divide-x-0' : 'divide-x')}>
                    <Input
                      placeholder='Blog title'
                      {...field}
                      autoFocus
                      className={cn(
                        'border-none text-lg font-medium leading-relaxed ring-green-500 focus:ring-1',
                        isPreview ? 'w-0 p-0' : 'w-full lg:w-1/2'
                      )}
                    />
                    <div className={cn('lg:px-10', isPreview ? 'mx-auto w-full lg:w-4/5 ' : ' hidden w-1/2 ')}>
                      <h1 className='text-3xl font-bold dark:text-gray-200'>
                        {form.getValues().title || 'Untittle blog'}
                      </h1>
                    </div>
                  </div>
                </>
              </FormControl>

              {form.getFieldState('title').invalid && form.getValues().title && (
                <div className='px-2'>
                  <FormMessage />
                </div>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <div className={cn('flex w-full gap-2 break-words p-2', isPreview ? 'divide-x-0' : 'divide-x')}>
                    <Input
                      placeholder='Blog description'
                      {...field}
                      autoFocus
                      className={cn(
                        'border-none text-lg font-medium leading-relaxed ring-green-500 focus:ring-1',
                        isPreview ? 'w-0 p-0' : 'w-full lg:w-1/2'
                      )}
                    />
                    <div className={cn('lg:px-10', isPreview ? 'mx-auto w-full lg:w-4/5 ' : ' hidden w-1/2')}>
                      <h2 className='text-md dark:text-gray-200'>
                        {form.getValues().description || 'enter a description'}
                      </h2>
                    </div>
                  </div>
                </>
              </FormControl>

              {form.getFieldState('title').invalid && form.getValues().title && (
                <div className='px-2'>
                  <FormMessage />
                </div>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='imageUrl'
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <div
                    className={cn('flex w-full items-center gap-2 divide-x p-2', isPreview ? 'divide-x-0' : 'divide-x')}
                  >
                    <Input
                      placeholder='🔗 Image url'
                      {...field}
                      className={cn(
                        'border-none text-lg font-medium leading-relaxed ring-green-500 focus:ring-1 ',
                        isPreview ? 'w-0 p-0' : 'w-full lg:w-1/2'
                      )}
                      type='url'
                    />
                    <div
                      className={cn(' relative', isPreview ? 'mx-auto w-full px-0 lg:w-4/5 ' : 'hidden w-1/2 px-10')}
                    >
                      {isPreview ? (
                        <div className='relative mt-10 h-80 w-full rounded-md border'>
                          <Image
                            alt='preview'
                            className=' rounded-md object-cover object-center'
                            fill
                            src={form.getValues().imageUrl || ''}
                          />
                        </div>
                      ) : (
                        <p className='text-gray-400'>👆 click on preview to see image</p>
                      )}
                    </div>
                  </div>
                </FormControl>

                <div className='px-3'>
                  <FormMessage />
                </div>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className={cn('flex w-full gap-2 p-2', !isPreview ? 'h-70vh divide-x' : 'divide-x-0')}>
                  <Textarea
                    placeholder='Blog content'
                    {...field}
                    className={cn(
                      'no-scrollbar h-[10rem] max-h-[40rem] resize-none border-none text-lg font-medium leading-relaxed  ring-green-500 focus:ring-1',
                      isPreview ? 'w-0 p-0' : 'w-full lg:w-1/2'
                    )}
                  />
                  <div
                    className={cn(
                      'no-scrollbar h-full overflow-scroll pb-12',
                      isPreview ? 'mx-auto w-full lg:w-4/5 ' : 'hidden w-1/2'
                    )}
                  >
                    <MarkdownPreview className='no-scrollbar lg:px-10' content={form.getValues().content} />
                  </div>
                </div>
              </FormControl>

              {form.getFieldState('content').invalid && form.getValues().content && <FormMessage />}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
