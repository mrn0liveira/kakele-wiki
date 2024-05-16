'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { useSearchParams } from 'next/navigation';

import { CardWrapper } from '@/src/components/auth/card-wrapper';
import { FormError } from '@/src/components/form-error';
import { FormSuccess } from '@/src/components/form-success';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form';

import { newPassword } from '@/src/actions/new-password';
import { NewPasswordSchema } from '@/src/schemas';

export const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      backButtonHref='/login'
      backButtonLabel='Back to login'
      headerDescription='Enter a new password'
      headerTitle='New password'
    >
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder='******' type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className='w-full' disabled={isPending} type='submit'>
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
