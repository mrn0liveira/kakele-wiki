'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { Input } from '@/src/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form';
import { CardWrapper } from '@/src/components/auth/card-wrapper';
import { FormError } from '@/src/components/form-error';
import { FormSuccess } from '@/src/components/form-success';
import { Button } from '@/src/components/ui/button';

import { ResetPasswordSchema as ResetSchema } from '@/src/schemas';
import { resetPassword as reset } from '@/src/actions/reset-password';

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      backButtonHref='/login'
      backButtonLabel='Back to login'
      headerDescription='Enter your email and we will send you a link to reset your password'
      headerTitle='Reset password'
    >
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder='john.doe@example.com' type='email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className='w-full' disabled={isPending} type='submit'>
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
