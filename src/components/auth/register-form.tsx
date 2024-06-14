'use client';

import '@/src/styles/Card-Shine.css';

import type * as z from 'zod';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/react';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { CardWrapper } from '@/src/components/auth/card-wrapper';
import { FormError } from '@/src/components/form-error';
import { FormSuccess } from '@/src/components/form-success';
import { cn } from '@/src/lib/utils';

import { register } from '@/src/actions/register';
import { RegisterSchema } from '@/src/schemas';

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      typeInterest: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log('dhsgadjhsagdjhsag');

    setError('');
    setSuccess('');

    startTransition(async () => {
      await register(values).then((data) => {
        console.log(data);

        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      backButtonHref='/login'
      backButtonLabel='Already have an account?'
      headerDescription='Create an account'
      headerTitle='Register'
      showSocial
    >
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Muroria's King" className='h-[2rem] text-xs' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='ghorannon123@gmail.com'
                      type='email'
                      className='h-[2rem] text-xs'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='******'
                      type='password'
                      className='h-[2rem] text-xs'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name='typeInterest'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>What is your type of interest?</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="I'm interested in..."
                      type='text'
                      className='h-[2rem] text-xs'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            className={cn(
              isPending
                ? 'border-gray-800 bg-gray-700 hover:border-zinc-700 hover:bg-zinc-600'
                : 'border-green-800 bg-green-700 hover:border-emerald-700 hover:bg-emerald-600',
              'card-shine-effect w-full rounded-md border-b-large'
            )}
            disabled={isPending}
            type='submit'
          >
            {isPending ? 'Registering...' : 'Create an account'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
