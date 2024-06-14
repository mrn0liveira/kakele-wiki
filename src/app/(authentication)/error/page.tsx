import { ErrorCard } from '@/src/components/auth/error-card';

export default function AuthErrorPage() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <ErrorCard />
    </div>
  );
}
