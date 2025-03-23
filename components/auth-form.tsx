import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const googleIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <path
      d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
      fill='currentColor'
    />
  </svg>
);

const ThirdPartyButton = ({
  icon,
  id,
  label,
  ...props
}: React.ComponentProps<'button'> & { label: ReactNode; icon: ReactNode }) => {
  return (
    <Button key={id} variant='outline' className='w-full' {...props}>
      {icon}
      {label}
    </Button>
  );
};

const thirdPartyAuthData = {
  APPLE: { icon: null, id: 'apple', label: 'Login with Apple' },
  GITHUB: { icon: null, id: 'github', label: 'Login with Github' },
  GOOGLE: { icon: googleIcon, id: 'google', label: 'Login with Google' },
  MICROSOFT: { icon: null, id: 'microsoft', label: 'Login with Microsoft' },
  TWITTER: { icon: null, id: 'twitter', label: 'Login with Twitter' },
};

type AuthFormProps = {
  title: ReactNode;
  description: ReactNode;
  thirdPartyAuth?: ('GOOGLE' | 'APPLE' | 'MICROSOFT' | 'TWITTER' | 'GITHUB')[];
  type: 'signup' | 'login';
  onEmailAuth: (formData: FormData) => void;
} & React.ComponentProps<'div'>;

export function AuthForm({
  className,
  description,
  onEmailAuth,
  thirdPartyAuth,
  title,
  type = 'login',
  ...props
}: AuthFormProps) {
  const thirdPartyAuthButtons = !thirdPartyAuth ? null : (
    <div className='flex flex-col gap-4'>
      {thirdPartyAuth.map((auth) => (
        <ThirdPartyButton key={auth} {...thirdPartyAuthData[auth]} />
      ))}
    </div>
  );

  const divider = !thirdPartyAuth ? null : (
    <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
      <span className='bg-background text-muted-foreground relative z-10 px-2'>Or continue with</span>
    </div>
  );

  const emailForm = (
    <form action={onEmailAuth}>
      <div className='grid gap-6'>
        <div className='grid gap-3'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' type='email' name='email' placeholder='m@example.com' required />
        </div>
        <div className='grid gap-3'>
          <div className='flex items-center'>
            <Label htmlFor='password'>Password</Label>
          </div>
          <Input id='password' type='password' name='password' required />
        </div>
        <Button type='submit' className='w-full'>
          {type === 'signup' ? 'Sign up' : 'Login'}
        </Button>
      </div>
      <div className='mt-4 text-center text-sm'>
        {type === 'signup' ? (
          <>
            Already have an account?{' '}
            <a href='/login' className='underline underline-offset-4'>
              Login
            </a>
          </>
        ) : (
          <>
            Don&apos;t have an account?{' '}
            <a href='/signup' className='underline underline-offset-4'>
              Sign up
            </a>
          </>
        )}
      </div>
    </form>
  );

  const privacyPolicy = (
    <div className=' text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
      By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
    </div>
  );

  return (
    <div className={cn('flex flex-col gap-6 min-w-[240px]', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-6'>
            {thirdPartyAuthButtons}
            {divider}
            {emailForm}
          </div>
        </CardContent>
      </Card>
      {privacyPolicy}
    </div>
  );
}
