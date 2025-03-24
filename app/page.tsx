import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { createSSRClient } from '@/services/supabase';
import { AvatarFallback } from '@radix-ui/react-avatar';
import Image from 'next/image';
import Link from 'next/link';

import { signOut } from './actions';

export default async function Home() {
  const supabase = await createSSRClient();
  const { data } = await supabase.auth.getUser();
  const { user } = data || { user: null };

  const authButtons = (
    <div className='absolute top-4 right-4 flex gap-2 items-center justify-center'>
      {!user?.email_confirmed_at ? (
        <>
          <Link href='/signup'>
            <Button variant='outline'>Sign up</Button>
          </Link>
          <Link href='/login'>
            <Button variant='outline'>Sign in</Button>
          </Link>
        </>
      ) : (
        <>
          <Link href='/profile'>
            <Button variant='outline'>Profile</Button>
          </Link>
          <Avatar>
            <AvatarImage src={user?.user_metadata?.avatar_url} referrerPolicy='no-referrer' />
            <AvatarFallback className='flex justify-center items-center bg-primary text-primary-foreground w-10'>
              {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </>
      )}
    </div>
  );
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      {authButtons}
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <Image className='dark:invert' src='/next.svg' alt='Next.js logo' width={180} height={38} priority />
        <ol className='list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]'>
          <li className='mb-2 tracking-[-.01em]'>
            {user ? (
              <span>
                Hi, welcome to the app {user?.email}. Your are logged in with{' '}
                <span className='font-bold'>{user?.app_metadata?.provider}</span> Auth provider.
              </span>
            ) : (
              <span>
                Hi, welcome to supabase auth example.{' '}
                <span className='font-bold'>Configure your supabase Auth and google cloud</span> to try signup, signin
                to the app with email or google provider. (see{' '}
                <a
                  target='_blank'
                  referrerPolicy='no-referrer'
                  href='https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=environment&environment=server'>
                  docs
                </a>
                )
              </span>
            )}
            {/* <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold'>
              app/page.tsx
            </code> */}
          </li>
          <li className='tracking-[-.01em]'>Save and see your changes instantly.</li>
        </ol>

        <div className='flex gap-4 items-center flex-col sm:flex-row'>
          <Button
            onClick={signOut}
            className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto'>
            <Image className='dark:invert' src='/vercel.svg' alt='Vercel logomark' width={20} height={20} />
            Logout
          </Button>
          <a
            className='rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]'
            href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'>
            Read our docs
          </a>
        </div>
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          <Image aria-hidden src='/file.svg' alt='File icon' width={16} height={16} />
          Learn
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          <Image aria-hidden src='/window.svg' alt='Window icon' width={16} height={16} />
          Examples
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          <Image aria-hidden src='/globe.svg' alt='Globe icon' width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
