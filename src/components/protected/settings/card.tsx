'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { Button } from '@nextui-org/react';

import { FormError } from '@/src/components/form-error';
import { FormSuccess } from '@/src/components/form-success';
import { Card } from '@/src/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { Switch } from '@/src/components/ui/switch';

import { settings } from '@/src/actions/settings';
import { useCurrentUser } from '@/src/hooks/use-current-user';
import { SettingsSchema } from '@/src/schemas';

export default function SettingsContainer() {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      newPassword: undefined,
      password: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError('Something went wrong!'));
    });
  };
  return (
    <Card className='h-full w-full bg-zinc-800'>
      <FormError message={error} />
      <FormSuccess message={success} />
      <div className='m-4 my-8'>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} className='max-w-md' disabled={isPending} placeholder='John Doe' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOauth === false && (
                <FormField
                  control={form.control}
                  name='isTwoFactorEnabled'
                  render={({ field }) => (
                    <FormItem className='flex max-w-md items-center justify-between rounded-lg border p-3 shadow-sm'>
                      <div className='space-y-0.5'>
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>Enable two factor authentication for your account</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} disabled={isPending} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className='justify-end'>
              <Button
                className='card-shine-effect border-b-large border-green-800 bg-green-700 text-white hover:border-emerald-700 hover:bg-emerald-600'
                color='success'
                disabled={isPending}
                size='md'
                type='submit'
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
}
