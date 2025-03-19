import { AuthForm } from '@/components/auth-form';
import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';

import { signup } from './actions';

export default function SignupPage() {
  return (
    <>
      <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
        <div className='flex w-full max-w-sm flex-col gap-6'>
          <Link href='/' className='flex items-center gap-2 self-center font-medium'>
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            Fluxo
          </Link>
          <AuthForm
            type='signup'
            onEmailAuth={signup}
            title='Welcome to ...'
            description='Create your account with your Email'
          />
        </div>
      </div>
    </>
  );
}
