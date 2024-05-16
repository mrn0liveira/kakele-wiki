'use client';

import '@/src/styles/Card-Shine.css';

import { useSearchParams } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { useCallback, useEffect, useRef, useState } from 'react';

import { CardWrapper } from '@/src/components/auth/card-wrapper';
import { FormError } from '@/src/components/form-error';
import { FormSuccess } from '@/src/components/form-success';

import { newVerification } from '@/src/actions/new-verification';

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const initialized = useRef(false);
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Invalid token');
      return;
    }
    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError('Something went wrong');
      });
  }, [token, success, error]);

  const handleCardColor = () => {
    if (error) {
      return 'card-shine-effect-red';
    }

    if (success) {
      return 'card-shine-effect-green';
    }

    return '';
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    onSubmit();
  }, [onSubmit]);
  [];

  return (
    <CardWrapper
      backButtonHref='/login'
      backButtonLabel='Back to login'
      className={handleCardColor()}
      headerDescription='Please wait while we confirm your email'
      headerTitle='Confirming your Email'
    >
      <div className='flex w-full items-center justify-center'>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
