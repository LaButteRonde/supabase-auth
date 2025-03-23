import { AuthForm } from '@/components/auth-form';
import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';

import { login } from './actions';

export default function LoginPage() {
  // TODO: Change this to your app name
  const yourAppName = 'Your App Name';

  return (
    <>
      <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
        <div className='flex w-full max-w-sm flex-col gap-6'>
          <Link href='/' className='flex items-center gap-2 self-center font-medium'>
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            {yourAppName}
          </Link>
          <div className='justify-center items-center flex flex-col w-full h-full'>
            <AuthForm
              type='login'
              onEmailAuth={login}
              title='Welcome back to ...'
              description='Login with your Email'
            />
          </div>
        </div>
      </div>
    </>
  );
}
